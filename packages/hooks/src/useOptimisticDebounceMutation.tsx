import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type OptimisticDebounceMutationType<TData, TVariable> = {
  queryKey: unknown[];
  getNextData: (prev: TData, variable: TVariable) => TData;
  shouldMutate: (prev: TData, next: TData) => boolean;
  compareData: TData | undefined;

  onOptimisticUpdate?: (params: {
    prev: TData;
    next: TData;
    variables: TVariable;
  }) => void | Promise<void>;

  delay?: number;
} & UseMutationOptions<unknown, unknown, TVariable>;

/**
 * Query 캐시는 즉시 낙관적으로 업데이트하고,
 * 실제 Mutation 요청만 debounce하여 실행하는 훅입니다.
 *
 * 연속된 상태 변경 중 마지막 상태와 마지막 서버 동기화 상태를 비교하여
 * `shouldMutate`가 `true`인 경우에만 Mutation을 실행합니다.
 *
 * @template TData 기준 Query에 저장되는 데이터 타입
 * @template TVariable Mutation 함수에 전달되는 변수 타입
 *
 * @param options 훅 설정
 * @param options.queryKey 낙관적 업데이트 및 서버 동기화의 기준이 되는 Query Key
 * @param options.getNextData 현재 캐시와 Mutation 변수를 기반으로 다음 낙관적 상태를 계산하는 함수
 * @param options.shouldMutate 마지막 서버 동기화 상태와 최종 낙관적 상태를 비교하여 Mutation 실행 여부를 결정하는 함수
 * @param options.compareData Query 캐시가 아직 존재하지 않을 때 비교 기준으로 사용할 초기 데이터
 * @param options.delay Mutation 실행을 지연할 debounce 시간(ms). 기본값은 300ms
 * @param options.onOptimisticUpdate 기준 Query 업데이트와 함께 추가적인 낙관적 업데이트를 수행할 때 사용하는 콜백
 * @param options.mutationOptions TanStack Query의 `useMutation`에 전달되는 나머지 옵션
 *
 * @returns TanStack Query Mutation 결과와 debounce가 적용된 `debouncedMutate` 함수
 *
 * @remarks
 * `debouncedMutate` 호출 시 Query 캐시는 즉시 변경되지만 실제 Mutation은
 * debounce 이후 실행됩니다. debounce 동안 상태가 원래 서버 상태로 돌아온 경우
 * `shouldMutate`를 통해 불필요한 서버 요청을 생략할 수 있습니다.
 *
 * Mutation이 완료되면 기준 Query를 invalidate하여 서버 상태와 다시 동기화합니다.
 */
export function useOptimisticDebounceMutation<TData, TVariable>({
  queryKey,
  getNextData,
  shouldMutate,
  delay = 300,
  compareData,
  onOptimisticUpdate,
  ...mutationOptions
}: OptimisticDebounceMutationType<TData, TVariable>) {
  const queryClient = useQueryClient();
  const timerRef = useRef<number | null>(null);
  const lastSentDataRef = useRef<TData | undefined>(compareData);

  const mutation = useMutation<unknown, unknown, TVariable>({
    ...mutationOptions,
    onSettled: async (...args) => {
      await queryClient.invalidateQueries({ queryKey });
      const res = queryClient.getQueryData<TData>(queryKey);
      lastSentDataRef.current = res;
      mutationOptions.onSettled?.(...args);
    },
  });

  const debouncedMutate = async (variables: TVariable) => {
    await queryClient.cancelQueries({ queryKey });

    const prev = queryClient.getQueryData<TData>(queryKey);
    if (prev === undefined) return;
    const next = getNextData(prev, variables);
    queryClient.setQueryData(queryKey, next);

    await onOptimisticUpdate?.({
      prev,
      next,
      variables,
    });

    if (timerRef.current !== null) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(async () => {
      try {
        if (
          lastSentDataRef.current === undefined ||
          shouldMutate(lastSentDataRef.current, next)
        ) {
          await mutation.mutateAsync(variables);
          lastSentDataRef.current = next;
        }
      } finally {
        timerRef.current = null;
      }
    }, delay);
  };

  useEffect(() => {
    lastSentDataRef.current = queryClient.getQueryData<TData>(queryKey);
  }, [queryKey, queryClient]);

  useEffect(() => {
    if (compareData !== undefined && lastSentDataRef.current === undefined) {
      lastSentDataRef.current = compareData;
    }
  }, [compareData]);

  return { debouncedMutate, ...mutation };
}
