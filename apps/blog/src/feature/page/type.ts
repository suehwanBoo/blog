import type { ArticleSubmitType } from "@boo/firebase/schema/article";
import type { Timestamp } from "firebase-admin/firestore";

export type ArticleSubmitMain = Omit<ArticleSubmitType, "content"> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likeCount: number;
  commentCount: number;
};

export type ArticleSubmitContent = Pick<ArticleSubmitType, "content">;

export type ArticleDetailType = ArticleSubmitMain & ArticleSubmitContent;

export type ArticleMainAttr = Omit<
  ArticleSubmitMain,
  "createdAt" | "updatedAt"
> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticlePostMain = {
  posts: Array<ArticleMainAttr>;
  nextCursor: string | undefined;
  hasNextPage: boolean;
};

type ImageSource = {
  src: string;
  width: number;
  height: number;
};

export type CardProps = {
  id: string;
  thumbnail: {
    desktop: ImageSource;
    mobile: ImageSource;
  };
  title: string;
  date: string;
  tags: string[];
};
