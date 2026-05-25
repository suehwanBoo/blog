import { Button, Input, Modal } from "@boo/ui";
import { postSummaryStyles as styles } from "./PostSummary.css";
import { useFormContext } from "react-hook-form";
import type { ArticleType } from "../schema/article";
import { useEffect, type SubmitEvent } from "react";
import type { PostMetaProps } from "../type";

export default function PostSummary({ close, onSuccess }: PostMetaProps) {
  const { register, trigger, formState } = useFormContext<ArticleType>();

  const submitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess();
  };

  useEffect(() => {
    trigger("summary");
  }, [trigger]);

  return (
    <Modal ariaLabel="글 요약 모달">
      <Modal.Header title="글 요약" closeHandler={close}></Modal.Header>
      <Modal.Body className={styles.wrapper}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            {...register("summary", {
              onChange: () => {
                trigger("summary");
              },
            })}
          />
          <Button
            ariaLabel="next-button"
            size="large"
            state={formState.errors.summary ? "disabled" : "active"}
          >
            다음
          </Button>
        </form>
        <p className={styles.hint({ error: !!formState.errors.summary })}>
          {formState?.errors?.summary?.message ||
            "본문의 글을 간략히 설명해주세요."}
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
