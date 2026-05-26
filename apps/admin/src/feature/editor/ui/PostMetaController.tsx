import { useState } from "react";
import PostSummary from "./PostSummary";
import PostThumbnail from "./PostThumbnail";
import PostTag from "./PostTag";
import type { PostMetaProps } from "../type";

type StepType = 0 | 1 | 2;

export default function PostMetaController({
  close,
}: Pick<PostMetaProps, "close">) {
  const [step, setStep] = useState<StepType>(0);
  if (step === 0)
    return <PostSummary close={close} onSuccess={() => setStep(1)} />;
  if (step === 1)
    return <PostThumbnail close={close} onSuccess={() => setStep(2)} />;
  if (step === 2) return <PostTag close={close} onSuccess={() => {}} />;
}
