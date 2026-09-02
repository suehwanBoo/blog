import type { OrderValue, Tag } from "@/feature/post/constants";
import { getAdminFirebase } from "@/utils/firebase/admin";
import { articleMainConverter } from "@/utils/firebase/converter";
import { getFirestore } from "firebase-admin/firestore";
import { unstable_cache } from "next/cache";

export const findLatestPost = async (limit: number) => {
  const app = getAdminFirebase();
  const db = getFirestore(app);

  const snapshot = await db
    .collection("articles")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .withConverter(articleMainConverter)
    .get();

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  });
};

export const findPopularPost = async (limit: number) => {
  const app = getAdminFirebase();
  const db = getFirestore(app);

  const snapshot = await db
    .collection("articles")
    .orderBy("likeCount", "desc")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .withConverter(articleMainConverter)
    .get();

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  });
};

export const findPostByOption = async (
  limit: number,
  order: OrderValue,
  tag: Tag = "all",
  cursor?: string,
) => {
  const app = getAdminFirebase();
  const db = getFirestore(app);

  let query: FirebaseFirestore.Query = db.collection("articles");
  if (tag !== "all") query = query.where("tags", "array-contains", tag);
  if (order !== "recent") {
    const orderStr = order == "likes" ? "likeCount" : "commentCount";
    query = query.orderBy(orderStr, "desc");
  }

  query = query.orderBy("createdAt", "desc");
  if (cursor) {
    const cursorDoc = await db.collection("articles").doc(cursor).get();
    if (cursorDoc.exists) {
      query = query.startAfter(cursorDoc);
    }
  }
  const snapshot = await query
    .limit(limit + 1)
    .withConverter(articleMainConverter)
    .get();

  const hasNextPage = snapshot.docs.length > limit;
  const docs = snapshot.docs.slice(0, limit);

  return {
    posts: docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString(),
      };
    }),
    nextCursor: hasNextPage ? docs.at(-1)?.id : undefined,
    hasNextPage,
  };
};

export const getPopularPost = (revalidate: number, limit: number) =>
  unstable_cache(() => findPopularPost(limit), ["popular", `${limit}`], {
    tags: [`popular:${limit}`, `home`],
    revalidate,
  })();

export const getLatestPost = (revalidate: number, limit: number) =>
  unstable_cache(
    async () => {
      try {
        const posts = await findLatestPost(5);
        console.log("latest posts", posts.length);
      } catch (err) {
        console.error("findLatestPost failed", err);
      }
    },
    ["latest", `${limit}`],
    {
      tags: [`latest:${limit}`, `home`],
      revalidate,
    },
  )();

export const getMainPosts = (
  revalidate: number,
  limit: number,
  order: OrderValue,
  tag: Tag = "all",
  cursor?: string,
) =>
  unstable_cache(
    () => findPostByOption(limit, order, tag, cursor),
    ["main", `${order}:${tag}:${cursor}`],
    {
      tags: [`main:${order}:${tag}:${cursor}`, `home`],
      revalidate,
    },
  )();
