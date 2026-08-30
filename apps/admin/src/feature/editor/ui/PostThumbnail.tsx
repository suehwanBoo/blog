import { Button, Modal } from "@boo/ui";
import type { PostMetaProps } from "../type";
import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { postThumbnailStyles as styles } from "./PostThumbnail.css";
import { makeThumbnailBlob } from "../utils/thumbnail";
import { useToast } from "@boo/ui/client";
import { Controller, useFormContext } from "react-hook-form";
import useObjectUrl from "../hooks/useObjectUrl";
import type { ArticleFormType } from "@boo/firebase/schema/article";

export default function PostThumbnail({ close, onSuccess }: PostMetaProps) {
  const [isloading, setIsLoading] = useState(false);
  const { trigger, getFieldState, watch } = useFormContext<ArticleFormType>();
  const { apply } = useToast();
  const thumbBlobs = watch("thumbnail");
  const submitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isSuccess = await trigger("thumbnail");
      if (!isSuccess) {
        const err = getFieldState("thumbnail").error;
        throw new Error(err?.message || "알 수 없는 오류가 발생하였습니다.");
      }
      onSuccess();
    } catch (err) {
      if (err instanceof Error)
        apply({ description: err.message, variant: "danger" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal ariaLabel="썸네일 폼">
      <Modal.Header closeHandler={close} title="썸네일" />
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <ThumbnailInput onLoad={setIsLoading} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            ariaLabel="next"
            size="large"
            state={thumbBlobs?.length === 4 ? "active" : "disabled"}
            type="submit"
          >
            다음
          </Button>
        </Modal.Footer>
      </form>
      {isloading && <div className={styles.loading} />}
    </Modal>
  );
}

type ThumbnailInputProps = {
  onLoad: (isLoad: boolean) => void;
};

function ThumbnailInput({ onLoad }: ThumbnailInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { control, watch } = useFormContext<ArticleFormType>();
  const { apply } = useToast();
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      onLoad(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const thumbBlobs = await makeThumbnailBlob(file);
      return thumbBlobs;
    } catch (err) {
      if (err instanceof Error)
        apply({ description: err.message, variant: "danger" });
    } finally {
      e.target.value = "";
      onLoad(false);
    }
  };

  const blob = watch("thumbnail.0.blob");

  const preview = useObjectUrl(blob);

  return (
    <>
      <div className={styles.preview} onClick={() => ref.current?.click()}>
        {preview ? (
          <img src={preview} style={{ width: "100%", height: "100%" }} />
        ) : (
          <div className={styles.imageAddButton} />
        )}
      </div>
      <Controller
        name="thumbnail"
        control={control}
        render={({ field }) => (
          <input
            ref={ref}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={async (e) => {
              const blobs = await onChangeImage(e);
              if (!blobs) return;
              field.onChange(blobs);
            }}
            hidden
          />
        )}
      />
    </>
  );
}
