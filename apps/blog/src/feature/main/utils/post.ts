import type { ArticleMainAttr, CardProps } from "@/feature/page/type";
import { makeDateString } from "@/utils/article/date";

export function makeCardProps(
  post: ArticleMainAttr | undefined,
): CardProps | null {
  if (!post) return null;
  const thumb = post.thumbnail;
  return {
    date: makeDateString(post.createdAt),
    id: post.id,
    tags: post.tags,
    thumbnail: {
      desktop: {
        src: thumb.main.sources[0]?.src || "",
        width: thumb.main.sources[0]?.width || 0,
        height: thumb.main.sources[0]?.height || 0,
      },
      mobile: {
        src: thumb.main.sources[2]?.src || "",
        width: thumb.main.sources[2]?.width || 0,
        height: thumb.main.sources[2]?.height || 0,
      },
    },
    title: post.title,
  };
}
