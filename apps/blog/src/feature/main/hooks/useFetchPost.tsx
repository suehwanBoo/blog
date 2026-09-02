import { fetchPosts } from "@/feature/page/api/client";
import type { OrderValue, Tag } from "@/feature/post/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useFetchPost(order: OrderValue, tag: Tag) {
  return useInfiniteQuery({
    queryKey: ["main-posts", order, tag],

    queryFn: ({ pageParam }) =>
      fetchPosts({
        order,
        tag,
        cursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60,
  });
}
