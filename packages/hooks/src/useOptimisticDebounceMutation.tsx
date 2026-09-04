import {
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type MutationLifecycleOptions<TData, TMutationData, TError, TVariable> = {
  /**
   * Query 캐시가 낙관적으로 변경된 직후 실행됩니다.
   * 실제 서버 Mutation 실행 여부와 관계없이 interaction마다 호출됩니다.
   */
  onOptimisticUpdate?: (params: {
    prev: TData;
    next: TData;
    variables: TVariable;
  }) => void | Promise<void>;

  /**
   * 실제 서버 Mutation 하나가 성공했을 때 실행됩니다.
   */
  onMutationSuccess?: (params: {
    data: TMutationData;
    variables: TVariable;
    confirmedData: TData;
  }) => void | Promise<void>;

  /**
   * 실제 서버 Mutation 하나가 실패했을 때 실행됩니다.
   */
  onMutationError?: (params: {
    error: TError;
    variables: TVariable;
  }) => void | Promise<void>;

  /**
   * 실행 중이던 Mutation과 pending Mutation이 모두 종료되고,
   * 기준 Query의 최종 invalidate/refetch까지 완료된 뒤 실행됩니다.
   */
  onSyncSettled?: () => void | Promise<void>;
};

type OptimisticDebounceMutationOptions<
  TData,
  TMutationData,
  TError,
  TVariable,
> = {
  queryKey: QueryKey;

  /**
   * 현재 Query 캐시와 interaction 변수를 기반으로
   * 다음 optimistic 상태를 계산합니다.
   */
  getNextData: (prev: TData, variable: TVariable) => TData;

  /**
   * 서버에 마지막으로 반영된 상태와 현재 desired 상태를 비교하여
   * 서버 Mutation이 필요한지 결정합니다.
   */
  shouldMutate: (confirmed: TData, desired: TData) => boolean;

  /**
   * 최초 서버 동기화 상태를 알고 있을 경우 전달합니다.
   */
  compareData?: TData;

  /**
   * 서버 Mutation debounce 시간입니다.
   *
   * @default 300
   */
  delay?: number;
} & MutationLifecycleOptions<TData, TMutationData, TError, TVariable> &
  Omit<
    UseMutationOptions<TMutationData, TError, TVariable>,
    "onSuccess" | "onError" | "onSettled"
  >;

type PendingMutation<TData, TVariable> = {
  variables: TVariable;
  next: TData;
};

/**
 * Query 캐시는 interaction 즉시 낙관적으로 갱신하고,
 * 실제 서버 Mutation만 debounce하여 실행합니다.
 *
 * Mutation 실행 중 새로운 interaction이 발생하면 UI는 계속 즉시 변경하지만,
 * debounce가 완료된 서버 요청은 pending 상태로 보관합니다.
 *
 * 실행 중인 Mutation이 종료된 후 가장 최신 pending 상태만 이어서 처리하므로
 * 동일 Mutation의 동시 실행을 방지합니다.
 *
 * 모든 pending Mutation 처리가 끝난 뒤 기준 Query를 invalidate하여
 * 최종 서버 상태와 다시 동기화합니다.
 */
export function useOptimisticDebounceMutation<
  TData,
  TMutationData = unknown,
  TError = unknown,
  TVariable = void,
>({
  queryKey,
  getNextData,
  shouldMutate,
  compareData,
  delay = 300,

  onOptimisticUpdate,
  onMutationSuccess,
  onMutationError,
  onSyncSettled,

  ...mutationOptions
}: OptimisticDebounceMutationOptions<TData, TMutationData, TError, TVariable>) {
  const queryClient = useQueryClient();

  /**
   * 현재 interaction의 debounce timer.
   */
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * 서버에 마지막으로 반영됐다고 확인된 상태.
   */
  const lastConfirmedDataRef = useRef<TData | undefined>(compareData);

  /**
   * 현재 실제 서버 Mutation 실행 여부.
   *
   * 하나의 훅 인스턴스에서 Mutation 과정 추적을 위해 사용합니다(race condition).
   */
  const isMutatingRef = useRef(false);

  /**
   * debounce는 완료됐지만 기존 Mutation 때문에
   * 아직 실행하지 못한 가장 최신 요청.
   *
   * 중간 상태는 필요 없으므로 항상 최신 값으로 덮어씁니다.
   */
  const pendingRef = useRef<PendingMutation<TData, TVariable> | null>(null);

  const mutation = useMutation<TMutationData, TError, TVariable>({
    ...mutationOptions,
  });

  /**
   * 모든 서버 Mutation 처리가 끝난 뒤 서버 데이터를 다시 조회하여
   * confirmed 상태를 확정합니다.
   */
  const syncConfirmedState = async () => {
    await queryClient.invalidateQueries({
      queryKey,
    });

    lastConfirmedDataRef.current = queryClient.getQueryData<TData>(queryKey);

    await onSyncSettled?.();
  };

  /**
   * 실제 서버 Mutation을 실행합니다.
   *
   * 동시에 두 Mutation이 실행되지 않도록하며,
   * 완료 후 pending 요청이 존재하면 최신 pending 요청을 이어서 처리합니다.
   * pending 또한 하위 debounce 함수에 의해 처리되어 debounce처리 됩니다.
   */
  const executeMutation = async (
    variables: TVariable,
    next: TData,
  ): Promise<void> => {
    isMutatingRef.current = true;

    try {
      const data = await mutation.mutateAsync(variables);
      /**
       * 이 요청이 성공했으므로 서버는 next 상태까지
       * 반영됐다고 간주할 수 있습니다.
       */
      lastConfirmedDataRef.current = next;
      await onMutationSuccess?.({
        data,
        variables,
        confirmedData: next,
      });
    } catch (error) {
      /**
       * 실패한 요청 이후의 pending 상태는
       * 현재 서버 상태를 기준으로 판단하기 어려우므로 폐기합니다.
       *
       * 이후 invalidate를 통해 실제 서버 상태를 다시 확인하고 함수를 즉시 종료합니다.
       */
      pendingRef.current = null;
      await onMutationError?.({
        error: error as TError,
        variables,
      });
      isMutatingRef.current = false;
      await syncConfirmedState();
      return;
    }

    isMutatingRef.current = false;

    const pending = pendingRef.current;

    if (pending) {
      pendingRef.current = null;

      const confirmed = lastConfirmedDataRef.current;

      /**
       * 현재 요청 처리 결과와 최신 pending 상태가 이미 같다면
       * 추가 Mutation은 필요하지 않습니다.
       * 쿼리 최신화 이후, 함수 종료를 시행합니다.
       */
      if (confirmed !== undefined && !shouldMutate(confirmed, pending.next)) {
        await syncConfirmedState();
        return;
      }

      /**
       * pending은 이미 자신의 debounce 시간을 모두 지난 상태이므로
       * 추가 debounce 없이 바로 이어서 실행합니다.
       */
      await executeMutation(pending.variables, pending.next);
      return;
    }

    /**
     * 더 이상 처리할 pending 요청이 없으므로
     * 최종 서버 상태와 동기화합니다.
     */
    await syncConfirmedState();
  };

  const debouncedMutate = async (variables: TVariable) => {
    await queryClient.cancelQueries({
      queryKey,
    });

    const prev = queryClient.getQueryData<TData>(queryKey);

    if (prev === undefined) return;

    /**
     * confirmed 상태가 아직 초기화되지 않았다면
     * optimistic update 이전의 현재 Query 값을 기준으로 잡습니다.
     *
     * 이렇게 하면 QueryKey 배열 reference 변경 등에 의해
     * optimistic cache가 confirmed 값으로 잘못 들어가는 것을 피할 수 있습니다.
     */
    if (lastConfirmedDataRef.current === undefined) {
      lastConfirmedDataRef.current = compareData ?? prev;
    }

    const next = getNextData(prev, variables);

    /**
     * UI는 서버 요청 상태와 관계없이 즉시 변경합니다.
     */
    queryClient.setQueryData(queryKey, next);

    await onOptimisticUpdate?.({
      prev,
      next,
      variables,
    });

    /**
     * 마지막 interaction을 기준으로 debounce 시간을 다시 계산합니다.
     */
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      /**
       * 기존 Mutation이 아직 실행 중이라면
       * 현재 confirmed 상태는 아직 비교 기준으로 사용할 수 없습니다.
       *
       * debounce가 완료된 최신 상태를 pending으로 보관합니다.
       */
      if (isMutatingRef.current) {
        pendingRef.current = {
          variables,
          next,
        };

        return;
      }

      const confirmed = lastConfirmedDataRef.current;

      /**
       * 현재 desired 상태가 이미 서버에 반영된 상태와 동일하다면
       * 서버 요청 자체를 생략합니다.
       */
      if (confirmed !== undefined && !shouldMutate(confirmed, next)) {
        return;
      }

      void executeMutation(variables, next);
    }, delay);
  };

  /**
   * compareData가 비동기로 들어오는 경우
   * 아직 confirmed 값이 없다면 초기값으로 사용합니다.
   */
  useEffect(() => {
    if (
      compareData !== undefined &&
      lastConfirmedDataRef.current === undefined
    ) {
      lastConfirmedDataRef.current = compareData;
    }
  }, [compareData]);

  return {
    debouncedMutate,
    ...mutation,
  };
}
