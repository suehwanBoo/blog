"use client";

import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { commentSchema, type CommentSchemaType } from "../schema/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@boo/ui/client";
import { commentInputStyles as styles } from "./CommentInput.css";
import { Button } from "@boo/ui";

export default function CommentInput() {
  const { register, handleSubmit } = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
    mode: "onTouched",
  });
  const { apply } = useToast();

  const onSubmit: SubmitHandler<CommentSchemaType> = (data) => {
    // later added some api logic
    console.log(data);
  };

  const onError: SubmitErrorHandler<CommentSchemaType> = (error) => {
    const message = error.comment?.message || "알 수 없는 오류입니다.";
    apply({ description: message, closable: true, variant: "danger" });
  };

  return (
    <form
      className={styles.inputWrapper}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <textarea
        className={styles.textarea}
        rows={1}
        placeholder="댓글"
        aria-label="댓글 입력"
        {...register("comment")}
      />
      <Button
        type="submit"
        className={styles.submitButton}
        state="active"
        size="large"
        ariaLabel="submit comment"
      >
        Submit
      </Button>
    </form>
  );
}
