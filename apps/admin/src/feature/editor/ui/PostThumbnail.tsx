import { Button, Modal } from "@boo/ui";
import type { PostMetaProps } from "../type";
import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { postThumbnailStyles as styles } from "./PostThumbnail.css";
import { makeThumbnailBlob, type BlobImageTuple } from "../utils/thumbnail";
import { useToast } from "@boo/ui/client";
import useThumbnailUpload from "../hooks/useThumbnailUpload";
import { useFormContext } from "react-hook-form";
import type { ArticleType } from "../schema/article";
import useRevokeTempUrl from "../hooks/useRevokeTempUrl";

export default function PostThumbnail({ close, onSuccess }: PostMetaProps) {
  const [isloading, setIsLoading] = useState(false);
  const [thumbnailBlobs, setThumbnailBlobs] = useState<BlobImageTuple | null>(
    null,
  );
  const { setValue, trigger, getFieldState } = useFormContext<ArticleType>();
  const { apply } = useToast();
  const upload = useThumbnailUpload(thumbnailBlobs);
  const submitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await upload();
      setValue(
        "thumbnail",
        {
          main: {
            alt: "thumbnail",
            sources: data.slice(0, 3),
          },
          sub: {
            alt: "thumbnail",
            source: data[3],
          },
        },
        {
          shouldDirty: true,
          shouldValidate: false,
        },
      );
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
          <ThumbnailInput onLoad={setIsLoading} onUpload={setThumbnailBlobs} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            ariaLabel="next"
            size="large"
            state={thumbnailBlobs ? "active" : "disabled"}
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
  onUpload: (data: BlobImageTuple | null) => void;
  onLoad: (isLoad: boolean) => void;
};

function ThumbnailInput({ onUpload, onLoad }: ThumbnailInputProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const { apply } = useToast();
  useRevokeTempUrl(imgUrl);
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      onLoad(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const thumbBlobs = await makeThumbnailBlob(file);
      const preview = URL.createObjectURL(thumbBlobs[0].blob);
      setImgUrl(preview);
      onUpload(thumbBlobs);
    } catch (err) {
      if (err instanceof Error)
        apply({ description: err.message, variant: "danger" });
      onUpload(null);
    } finally {
      e.target.value = "";
      onLoad(false);
    }
  };

  return (
    <>
      <div className={styles.preview} onClick={() => ref.current?.click()}>
        {imgUrl ? (
          <img src={imgUrl} style={{ width: "100%", height: "100%" }} />
        ) : (
          <div className={styles.imageAddButton} />
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onChangeImage}
        hidden
      />
    </>
  );
}
