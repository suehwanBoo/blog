import PostPage from "@/feature/post";
import { ORDERS, TAGS, type ProxyPostType } from "@/feature/post/constants";
import { isValidOrderValue } from "@/feature/post/utils/parseOrder";
import { isValidTag } from "@/feature/post/utils/parseTag";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams(): { query: ProxyPostType }[] {
  return TAGS.flatMap((tag) =>
    ORDERS.map(({ value }) => ({
      query: [tag, value],
    })),
  );
}
export default async function Post({
  params,
}: {
  params: Promise<{ query: ProxyPostType }>;
}) {
  const query = (await params).query;
  if (!query || query.length !== 2) notFound();
  if (!isValidTag(query[0]) || !isValidOrderValue(query[1])) notFound();

  return <PostPage postParams={query} />;
}
