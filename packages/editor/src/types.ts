export type OpenGraphMetadata = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
};

export type LinkCardProps = {
  metadata: OpenGraphMetadata;
  className?: string;
};
