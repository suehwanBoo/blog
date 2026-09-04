import type { OrderValue, Tag } from "@/feature/post/constants";
import type { ArticlePostMain } from "../type";

export const fetchPosts = async ({
  cursor,
  tag,
  order,
}: {
  cursor?: string | undefined;
  tag: Tag;
  order: OrderValue;
}) => {
  const params = new URLSearchParams({
    tag,
    order,
    limit: "5",
  });

  if (cursor) {
    params.set("cursor", cursor);
  }

  const res = await fetch(`/api/article?${params}`);

  if (!res.ok) {
    throw new Error("게시글 조회에 실패했습니다.");
  }

  const data = (await res.json()) as ArticlePostMain;

  return data;
};

type LikedPostParams = { token: string; postId: string };
export const isUserLikedPost = async ({ token, postId }: LikedPostParams) => {
  const res = await fetch(`/api/article/${postId}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("유저 좋아요 조회에 실패하였습니다.");
  }
  const data = (await res.json()) as { liked: boolean };

  return data.liked;
};

export const userLikePost = async ({ postId, token }: LikedPostParams) => {
  const res = await fetch(`/api/article/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("좋아요에 실패하였습니다.");
  }

  const data = (await res.json()) as { liked: boolean };
  return data.liked;
};
