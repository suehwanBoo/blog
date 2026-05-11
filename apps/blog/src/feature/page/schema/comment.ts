import * as z from "zod";

export type CommentSchemaType = z.infer<typeof commentSchema>;

export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, {
      error: "댓글을 입력해주세요.",
    })
    .max(300, {
      error: "댓글은 300자 이하로 입력해주세요.",
    })
    .regex(/\S/, {
      error: "댓글을 입력해주세요.",
    }),
});
