import { Button } from "@boo/ui";
import { postButtonStyles as styles } from "./PostButton.css";
import { useFormContext } from "react-hook-form";
import { useOverlay, useToast } from "@boo/ui/client";
import type { ArticleType } from "../schema/article";
import PostMetaController from "./PostMetaController";

export default function PostButton() {
  const { trigger, getFieldState } = useFormContext<ArticleType>();
  const { apply } = useToast();
  const { open } = useOverlay();

  const titleAndContentValidate = async () => {
    const isValid = await trigger(["title", "content"]);
    if (!isValid) {
      const titleError = getFieldState("title").error?.message;
      const contentError = getFieldState("content").error?.message;
      if (titleError) apply({ description: titleError, variant: "danger" });
      if (contentError) apply({ description: contentError, variant: "danger" });
      return;
    }
    open(({ close }) => <PostMetaController close={close} />, {
      closeOnBackdrop: false,
    });
  };

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={titleAndContentValidate}
        ariaLabel="post-complete"
        size="large"
        state="active"
        type="button"
      >
        작성 완료
      </Button>
    </div>
  );
}
