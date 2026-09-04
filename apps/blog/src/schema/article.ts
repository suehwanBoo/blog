import * as z from "zod";

export const likeBodySchema = z.object({
  postId: z.string(),
});
export type LikeBodyType = z.infer<typeof likeBodySchema>;
