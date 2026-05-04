import * as z from "zod";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export type SubscribeSchema = z.infer<typeof subscribeSchema>;

export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, {
      error: "이메일을 입력해주세요.",
    })
    .regex(emailRegex, {
      error: "정확하지 않은 이메일 형식입니다.",
    }),
});
