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
