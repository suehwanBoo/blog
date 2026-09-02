import type {
  ArticleSubmitContent,
  ArticleSubmitMain,
} from "@/feature/page/type";
import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export const articleMainConverter: FirestoreDataConverter<ArticleSubmitMain> = {
  toFirestore(article) {
    return article;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return snapshot.data() as ArticleSubmitMain;
  },
};

export const articleContentConverter: FirestoreDataConverter<ArticleSubmitContent> =
  {
    toFirestore(article) {
      return article;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot) {
      return snapshot.data() as ArticleSubmitContent;
    },
  };
