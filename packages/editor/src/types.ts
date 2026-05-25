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
  mode?: "editor" | "view";
};

type TagTypes =
  | "all"
  | "framework"
  | "ui"
  | "architecture"
  | "performance"
  | "troubleshooting"
  | "ux"
  | "infra";

type ImageSource = {
  src: string;
  width: number;
  height: number;
};

type MainThumbnail = {
  alt: string;
  ratio: "3:2";
  sources: ImageSource[];
};

type SubThumbnail = {
  alt: string;
  source: ImageSource;
};

type Article = {
  id: string;
  title: string;
  summary: string;
  thumbnail: {
    main: MainThumbnail;
    sub: SubThumbnail;
  };
  tags: TagTypes[];
  likeCount: number;
  viewCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

type ArticleContent = {
  id: string;
  content: string; // json 변형 후 삽입할것임
  createdAt: Date;
  updatedAt: Date;
};

type ArticleComment = {
  id: string;
  authorId: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
};
type ArticleLike = {
  id: string;
  userId: string;
  createdAt: Date;
};

type ArticleView = {
  id: string;
  visitorId: string;
  createdAt: Date;
};

type Subscription = {
  id: string;
  emails: string[]; // 정규화된 email
  createdAt: Date;
  updatedAt: Date;
};
