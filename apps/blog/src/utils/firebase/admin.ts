import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import type { NextRequest } from "next/server";
import type { ArticleSubmitType } from "@boo/firebase/schema/article";

export function getAdminFirebase() {
  const app = getApps()[0];
  if (app) return app;

  return initializeApp({
    credential: cert({
      projectId: process.env.ADMIN_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.ADMIN_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.ADMIN_FIREBASE_PRIVATE_KEY!,
    }),
  });
}

export async function hasAdminToken(req: NextRequest) {
  const authorization = req.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) return false;

  try {
    const token = authorization.replace("Bearer ", "");
    const decoded = await getAuth(getAdminFirebase()).verifyIdToken(token);

    return decoded.role === "admin";
  } catch {
    return false;
  }
}

export async function getFirebaseUserByRequest(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return false;

  try {
    const token = authorization.replace("Bearer ", "");
    const decoded = await getAuth(getAdminFirebase()).verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}

export async function postArticle(article: ArticleSubmitType) {
  const app = getAdminFirebase();
  const db = getFirestore(app);

  const batch = db.batch();

  const articleRef = db.collection("articles").doc();
  const detailRef = db.collection("articleDetails").doc(articleRef.id);

  const now = Timestamp.now();

  batch.set(articleRef, {
    title: article.title,
    summary: article.summary,
    thumbnail: article.thumbnail,
    tags: article.tags,
    createdAt: now,
    updatedAt: now,
    likeCount: 0,
    commentCount: 0,
  });

  batch.set(detailRef, {
    content: article.content,
  });

  try {
    await batch.commit();
    return articleRef.id;
  } catch {
    throw new Error("firebase batch error");
  }
}
