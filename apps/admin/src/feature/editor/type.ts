export type PresignedResponse = {
  key: string;
  publicUrl: string;
  uploadUrl: string;
};

export type PostMetaProps = {
  close: () => void;
  onSuccess: () => void;
};
