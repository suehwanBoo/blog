import PostPage from "@/feature/post";
import type { ProxyPostType } from "@/feature/post/constants";

export default async function Post({
  params,
}: {
  params: Promise<{ query: ProxyPostType }>;
}) {
  const query = (await params).query;

  return <PostPage postParams={query} />;
}
