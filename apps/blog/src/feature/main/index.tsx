import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { OrderValue } from "../post/constants";
import { getLatestPost, getMainPosts, getPopularPost } from "./api/server";
import PopularPost from "./ui/PopularPost";
import RecentPost from "./ui/RecentPost";
import SimpleAbout from "./ui/SimpleAbout";
import SimplePost from "./ui/SimplePost";

export default async function MainPage({
  initialOrderValue,
}: {
  initialOrderValue: OrderValue;
}) {
  const main_revalidate = 86400;

  const [latestResult, popularResult] = await Promise.allSettled([
    getLatestPost(main_revalidate, 1),
    getPopularPost(main_revalidate, 2),
  ]);

  if (latestResult.status === "rejected") {
    console.error("[getLatestPost failed]", latestResult.reason);
  }

  const latestPosts =
    latestResult.status === "fulfilled" ? latestResult.value : [];

  const latestPost = latestPosts?.[0];

  const popularPosts =
    popularResult.status === "fulfilled" ? popularResult.value : [];

  const simplePostClient = await getOrderPostQueryClient(
    initialOrderValue,
    main_revalidate,
  );

  return (
    <>
      <RecentPost post={latestPost} />
      <PopularPost posts={popularPosts} />
      <HydrationBoundary state={dehydrate(simplePostClient)}>
        <SimplePost initialOrderValue={initialOrderValue} />
      </HydrationBoundary>
      <SimpleAbout />
    </>
  );
}

async function getOrderPostQueryClient(order: OrderValue, revalidate: number) {
  const queryClient = new QueryClient();
  const LIMIT = 5;
  const INIT_TAG = "all";

  await queryClient
    .infiniteQuery({
      queryKey: ["main-posts", order, INIT_TAG],
      queryFn: ({ pageParam }) =>
        getMainPosts(
          revalidate,
          LIMIT,
          order,
          INIT_TAG,
          pageParam ?? undefined,
        ),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage: { nextCursor: string | undefined }) =>
        lastPage.nextCursor ?? undefined,
    })
    .catch(() => {});

  return queryClient;
}
