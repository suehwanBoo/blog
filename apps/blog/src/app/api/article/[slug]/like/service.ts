import { getAdminFirebase } from "@/utils/firebase/admin";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import "server-only";

export const toggleLikesWithFirebase = async (
  postId: string,
  userId: string,
) => {
  const app = getAdminFirebase();
  const db = getFirestore(app);

  const articleRef = db.collection("articles").doc(postId);
  const likeRef = articleRef.collection("likes").doc(userId);

  return db.runTransaction(async (tx) => {
    const articleDoc = await tx.get(articleRef);

    if (!articleDoc.exists) {
      throw new Error("article not found");
    }

    const likeDoc = await tx.get(likeRef);

    if (likeDoc.exists) {
      tx.delete(likeRef);
      tx.update(articleRef, {
        likeCount: FieldValue.increment(-1),
      });

      return false;
    }

    tx.set(likeRef, {
      createdAt: FieldValue.serverTimestamp(),
    });

    tx.update(articleRef, {
      likeCount: FieldValue.increment(1),
    });

    return true;
  });
};

export const isLikedWithFirebase = async (postId: string, userId: string) => {
  const app = getAdminFirebase();
  const db = getFirestore(app);

  const articleRef = db.collection("articles").doc(postId);
  const likeRef = await articleRef.collection("likes").doc(userId).get();
  return likeRef.exists;
};
