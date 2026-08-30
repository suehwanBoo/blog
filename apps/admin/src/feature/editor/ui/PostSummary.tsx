import { Button, Input, Modal } from "@boo/ui";
import { postSummaryStyles as styles } from "./PostSummary.css";
import { useFormContext } from "react-hook-form";
import { type SubmitEvent } from "react";
import type { PostMetaProps } from "../type";
import type { ArticleFormType } from "@boo/firebase/schema/article";

export default function PostSummary({ close, onSuccess }: PostMetaProps) {
  const { watch, register, trigger, formState } =
    useFormContext<ArticleFormType>();

  const submitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger("summary");
    if (!isValid) return;
    onSuccess();
  };

  const summary = watch("summary");

  const summaryError = formState.errors.summary;

  const disabled = !summary || !!summaryError;

  return (
    <Modal ariaLabel="글 요약 모달">
      <Modal.Header title="글 요약" closeHandler={close}></Modal.Header>
      <Modal.Body className={styles.wrapper}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            {...register("summary", {
              onChange: () => {
                if (summaryError) trigger("summary");
              },
            })}
          />
          <Button
            ariaLabel="next-button"
            size="large"
            state={disabled ? "disabled" : "active"}
          >
            다음
          </Button>
        </form>
        <p className={styles.hint({ error: !!summaryError })}>
          {summaryError?.message || "본문의 글을 간략히 설명해주세요."}
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
