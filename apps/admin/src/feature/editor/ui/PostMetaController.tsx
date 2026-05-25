import { useState } from "react";
import PostSummary from "./PostSummary";
import PostThumbnail from "./PostThumbnail";

type PostMetaProps = {
  close: () => void;
};

export default function PostMetaController({ close }: PostMetaProps) {
  const [step, setStep] = useState(0);
  if (step === 0)
    return <PostSummary close={close} onSuccess={() => setStep(1)} />;
  if (step === 1)
    return <PostThumbnail close={close} onSuccess={() => setStep(2)} />;
}
