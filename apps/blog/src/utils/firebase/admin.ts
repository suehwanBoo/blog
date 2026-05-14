import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import type { NextRequest } from "next/server";

export const adminFirebase =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      clientEmail: process.env.ADMIN_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.ADMIN_FIREBASE_PRIVATE_KEY!,
      projectId: process.env.ADMIN_FIREBASE_PROJECT_ID!,
    }),
  });

export const hasAdminToken = async (req: NextRequest) => {
  const authorization = req.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return false;
  }

  const token = authorization.replace("Bearer ", "");
  const decoded = await getAuth(adminFirebase).verifyIdToken(token);
  console.log(decoded);
  return decoded.role === "admin";
};
