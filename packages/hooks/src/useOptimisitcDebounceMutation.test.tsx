import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useOptimisticDebounceMutation } from "./useOptimisticDebounceMutation";

describe("useOptimisticDebounceMutation", () => {
  let queryClient: QueryClient;

  const createWrapper = () => {
    return function Wrapper({ children }: { children: ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  };

  const flushPromises = async () => {
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
  };

  beforeEach(() => {
    vi.useFakeTimers();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    queryClient.clear();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("interaction 즉시 optimistic update를 적용한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    const mutationFn = vi.fn().mockResolvedValue(undefined);
    const onOptimisticUpdate = vi.fn();

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
          onOptimisticUpdate,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await act(async () => {
      await result.current.debouncedMutate();
    });

    expect(queryClient.getQueryData(queryKey)).toBe(true);

    expect(onOptimisticUpdate).toHaveBeenCalledWith({
      prev: false,
      next: true,
      variables: undefined,
    });

    expect(mutationFn).not.toHaveBeenCalled();
  });

  it("debounce 시간이 지나기 전에는 mutation을 실행하지 않는다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    const mutationFn = vi.fn().mockResolvedValue(undefined);

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(299);
    });

    expect(mutationFn).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
      await flushPromises();
    });

    expect(mutationFn).toHaveBeenCalledTimes(1);
  });

  it("debounce 동안 상태가 confirmed 상태로 돌아오면 mutation을 생략한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    const mutationFn = vi.fn().mockResolvedValue(undefined);

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    // false -> true
    await act(async () => {
      await result.current.debouncedMutate();
    });

    // true -> false
    await act(async () => {
      await result.current.debouncedMutate();
    });

    expect(queryClient.getQueryData(queryKey)).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
      await flushPromises();
    });

    expect(mutationFn).not.toHaveBeenCalled();
  });

  it("mutation 진행 중 새 interaction이 발생하면 UI는 즉시 반영하고 debounce 완료 후 pending으로 미룬다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    let resolveFirst!: () => void;
    let resolveSecond!: () => void;

    const mutationFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    // false -> true
    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(mutationFn).toHaveBeenCalledTimes(1);

    // 첫 mutation 진행 중 true -> false
    await act(async () => {
      await result.current.debouncedMutate();
    });

    expect(queryClient.getQueryData(queryKey)).toBe(false);

    // 두 번째 interaction의 debounce 종료
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    // 아직 첫 mutation 중이므로 두 번째 서버 요청은 pending
    expect(mutationFn).toHaveBeenCalledTimes(1);

    // 첫 mutation 완료
    await act(async () => {
      resolveFirst();
      await flushPromises();
    });

    // pending 요청이 이어서 실행
    expect(mutationFn).toHaveBeenCalledTimes(2);

    await act(async () => {
      resolveSecond();
      await flushPromises();
    });

    expect(mutationFn).toHaveBeenCalledTimes(2);
  });

  it("mutation 진행 중 여러 interaction이 발생하면 마지막 pending 상태만 처리한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    let resolveFirst!: () => void;
    let resolveSecond!: () => void;

    const mutationFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    // false -> true
    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(mutationFn).toHaveBeenCalledTimes(1);

    // 첫 mutation 진행 중
    // true -> false -> true -> false
    await act(async () => {
      await result.current.debouncedMutate();
      await result.current.debouncedMutate();
      await result.current.debouncedMutate();
    });

    expect(queryClient.getQueryData(queryKey)).toBe(false);

    // 마지막 interaction 기준 debounce 종료
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(mutationFn).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveFirst();
      await flushPromises();
    });

    // 중간 상태는 버리고 최신 pending 하나만 실행
    expect(mutationFn).toHaveBeenCalledTimes(2);

    await act(async () => {
      resolveSecond();
      await flushPromises();
    });

    expect(mutationFn).toHaveBeenCalledTimes(2);
  });

  it("실제 mutation 성공 시 onMutationSuccess를 호출한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    const mutationFn = vi.fn().mockResolvedValue({ success: true });

    const onMutationSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<
          boolean,
          { success: boolean },
          Error,
          string
        >({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
          onMutationSuccess,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await act(async () => {
      await result.current.debouncedMutate("like");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
      await flushPromises();
    });

    expect(onMutationSuccess).toHaveBeenCalledTimes(1);

    expect(onMutationSuccess).toHaveBeenCalledWith({
      data: {
        success: true,
      },
      variables: "like",
      confirmedData: true,
    });
  });

  it("실제 mutation 실패 시 onMutationError를 호출한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    const error = new Error("mutation failed");

    const mutationFn = vi.fn().mockRejectedValue(error);
    const onMutationError = vi.fn();

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
          onMutationError,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
      await flushPromises();
    });

    expect(onMutationError).toHaveBeenCalledTimes(1);

    expect(onMutationError).toHaveBeenCalledWith({
      error,
      variables: undefined,
    });
  });

  it("pending mutation까지 모두 끝난 뒤 onSyncSettled를 한 번 호출한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    let resolveFirst!: () => void;
    let resolveSecond!: () => void;

    const mutationFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const onSyncSettled = vi.fn();

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
          onSyncSettled,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    // 첫 mutation
    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(mutationFn).toHaveBeenCalledTimes(1);

    // pending 생성
    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(onSyncSettled).not.toHaveBeenCalled();

    // 첫 요청 완료 → pending 이어서 실행
    await act(async () => {
      resolveFirst();
      await flushPromises();
    });

    expect(mutationFn).toHaveBeenCalledTimes(2);

    // 아직 pending mutation 진행 중
    expect(onSyncSettled).not.toHaveBeenCalled();

    // 마지막 mutation 완료
    await act(async () => {
      resolveSecond();
      await flushPromises();
    });

    expect(onSyncSettled).toHaveBeenCalledTimes(1);
  });

  it("mutation 실패 시 pending을 폐기하고 sync를 종료한다", async () => {
    const queryKey = ["article", "post-1", "liked"];

    queryClient.setQueryData(queryKey, false);

    let rejectFirst!: (error: Error) => void;

    const mutationFn = vi.fn().mockImplementationOnce(
      () =>
        new Promise<void>((_, reject) => {
          rejectFirst = reject;
        }),
    );

    const onMutationError = vi.fn();
    const onSyncSettled = vi.fn();

    const { result } = renderHook(
      () =>
        useOptimisticDebounceMutation<boolean, void, Error, void>({
          queryKey,
          compareData: false,
          delay: 300,

          getNextData: (prev) => !prev,
          shouldMutate: (confirmed, desired) => confirmed !== desired,

          mutationFn,
          onMutationError,
          onSyncSettled,
        }),
      {
        wrapper: createWrapper(),
      },
    );

    // 첫 mutation 시작
    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(mutationFn).toHaveBeenCalledTimes(1);

    // 첫 mutation 진행 중 pending 생성
    await act(async () => {
      await result.current.debouncedMutate();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    // 첫 mutation 실패
    const error = new Error("failed");

    await act(async () => {
      rejectFirst(error);
      await flushPromises();
    });

    expect(onMutationError).toHaveBeenCalledWith({
      error,
      variables: undefined,
    });

    // pending은 폐기되므로 추가 mutation 없음
    expect(mutationFn).toHaveBeenCalledTimes(1);

    // 실패 이후 최종 sync lifecycle은 종료
    expect(onSyncSettled).toHaveBeenCalledTimes(1);
  });
});
