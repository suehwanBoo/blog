import { useAuthStore } from "@/store/store";
import { userLikePost } from "../api/client";
import { useMemo } from "react";
import useCheckUserLikedQuery from "./useCheckUserLikedQuery";
import { useOptimisticDebounceMutation } from "@boo/hooks";
import { useToast } from "@boo/ui/client";

export default function useLikeMutation(postId: string) {
  const { auth } = useAuthStore();
  const { apply } = useToast();

  const likedQueryKey = useMemo(
    () => ["article", postId, "liked", auth?.uid],
    [postId, auth],
  );
  const { data } = useCheckUserLikedQuery(postId);
  return useOptimisticDebounceMutation<boolean, boolean>({
    queryKey: likedQueryKey,
    compareData: data,
    mutationFn: async () => {
      if (!auth) throw new Error("허용되지 않은 사용자입니다.");
      const token = await auth.getIdToken();
      return await userLikePost({ postId, token });
    },
    getNextData: (prev) => !prev,
    shouldMutate: (prev, next) => prev !== next,
    delay: 500,
    onMutationError: (err) => {
      let message = "좋아요 요청에 실패하였습니다.";
      if (err && typeof err === "object" && "message" in err && err.message)
        message = "" + err.message;
      apply({
        variant: "danger",
        description: message,
      });
    },
  });
}
