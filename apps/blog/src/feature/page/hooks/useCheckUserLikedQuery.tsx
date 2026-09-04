import { useAuthStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { isUserLikedPost } from "../api/client";

export default function useCheckUserLikedQuery(postId: string) {
  const { auth } = useAuthStore();
  return useQuery({
    queryKey: ["article", postId, "liked", auth?.uid],
    queryFn: async () => {
      const token = await auth!.getIdToken();
      return await isUserLikedPost({ postId, token });
    },
    enabled: !!auth,
  });
}
