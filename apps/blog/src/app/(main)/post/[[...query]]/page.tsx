import PostPage from "@/feature/post";
import type { ProxyPostType } from "@/feature/post/constants";
import { isValidOrderValue } from "@/feature/post/utils/parseOrder";
import { isValidTag } from "@/feature/post/utils/parseTag";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ query: ProxyPostType }>;
}) {
  const query = (await params).query;

  if (!isValidTag(query[0]) || !isValidOrderValue(query[1])) notFound();

  return <PostPage postParams={query} />;
}
