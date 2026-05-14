import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import type { NextRequest } from "next/server";

function getAdminFirebase() {
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
