import { useState } from "react";
import PostSummary from "./PostSummary";
import PostThumbnail from "./PostThumbnail";
import PostTag from "./PostTag";
import type { PostMetaProps } from "../type";
import { useFormContext } from "react-hook-form";
import useTiptap from "../hooks/useTiptap";
import useThumbnailUpload from "../hooks/useThumbnailUpload";
import { useToast } from "@boo/ui/client";
import useArticleUpload from "../hooks/useArticleUpload";
import {
  articleSubmitSchema,
  type ArticleFormType,
} from "@boo/firebase/schema/article";

type StepType = 0 | 1 | 2;

export default function PostMetaController({
  close,
}: Pick<PostMetaProps, "close">) {
  const { reset } = useFormContext<ArticleFormType>();
  const [step, setStep] = useState<StepType>(0);
  const editor = useTiptap();
  const upload = useUpload();

  const submitHandler = async (d: ArticleFormType) => {
    await upload(d);
    resetAllEditor();
  };

  const resetAllEditor = () => {
    editor?.commands.clearContent();
    reset();
    close();
  };
  if (step === 0)
    return <PostSummary close={close} onSuccess={() => setStep(1)} />;
  if (step === 1)
    return <PostThumbnail close={close} onSuccess={() => setStep(2)} />;
  if (step === 2) return <PostTag close={close} onSuccess={submitHandler} />;
}

function useUpload() {
  const { apply } = useToast();
  const imgUrlUpload = useThumbnailUpload();
  const articleUpload = useArticleUpload();

  const upload = async (data: ArticleFormType) => {
    const blobThumbnail = data.thumbnail;
    try {
      const urlData = await imgUrlUpload(blobThumbnail);
      const parsed = await articleSubmitSchema.safeParseAsync({
        ...data,
        thumbnail: {
          main: {
            alt: "thumbnail",
            sources: urlData.slice(0, 3),
          },
          sub: {
            alt: "thumbnail",
            source: urlData[3],
          },
        },
      });
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) =>
          apply({
            description: issue.message,
            variant: "danger",
          }),
        );
        return;
      }
      // firebase 추가 로직
      const article = parsed.data;
      await articleUpload(article);
    } catch (err) {
      if (err instanceof Error)
        apply({ description: err.message, variant: "danger" });
    }
  };

  return upload;
}
