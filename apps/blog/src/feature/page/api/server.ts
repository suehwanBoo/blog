import "server-only";

import { getAdminFirebase } from "@/utils/firebase/admin";
import {
  getFirestore,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";
import type { ArticleSubmitContent, ArticleSubmitMain } from "../type";

const mainConverter: FirestoreDataConverter<ArticleSubmitMain> = {
  toFirestore(article) {
    return article;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return snapshot.data() as ArticleSubmitMain;
  },
};

const contentConverter: FirestoreDataConverter<ArticleSubmitContent> = {
  toFirestore(article) {
    return article;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return snapshot.data() as ArticleSubmitContent;
  },
};

export async function findArticle(slug: string) {
  const app = getAdminFirebase();
  const db = getFirestore(app);
  const [snapshot, detailSnapshot] = await Promise.all([
    db.collection("articles").doc(slug).withConverter(mainConverter).get(),
    db
      .collection("articleDetails")
      .doc(slug)
      .withConverter(contentConverter)
      .get(),
  ]);

  if (!snapshot.exists || !detailSnapshot.exists) return null;

  const snD = snapshot.data();
  const dD = detailSnapshot.data();
  if (!snD || !dD) return null;

  return {
    ...snD,
    ...dD,
    createdAt: snD.createdAt.toDate().toISOString(),
    updatedAt: snD.updatedAt.toDate().toISOString(),
  };
}

export const getArticle = (slug: string, revalidate: number) =>
  unstable_cache(() => findArticle(slug), ["article", slug], {
    tags: [`article:${slug}`],
    revalidate,
  })();
