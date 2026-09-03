"use client";

type CopyToClipboardParameter = {
  text: string;
  onSuccess?: () => void;
  onFail?: (err: unknown) => void;
};

export const copyToClipboard = ({
  text,
  onSuccess,
  onFail,
}: CopyToClipboardParameter) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      onSuccess?.();
    })
    .catch((err) => {
      onFail?.(err);
    });
};
