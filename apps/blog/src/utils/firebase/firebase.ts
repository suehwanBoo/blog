"use client";

import { createFirebaseApp } from "@boo/firebase";
import {
  createfirebaseAuth,
  loginWithGithub,
  loginWithGoogle,
  logout,
  setSessionPersistence,
  subscribeAuth,
} from "@boo/firebase/auth";
import type { User } from "@boo/firebase/type";

const firebaseApp = createFirebaseApp({
  apiKey: process.env.NEXT_PUBLIC_APIKEY!,
  appId: process.env.NEXT_PUBLIC_APPID!,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECTID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID!,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID!,
});

const firebaseAuth = createfirebaseAuth(firebaseApp);

export type LoginKey = "google" | "github";

export const getLoginHandler = async (platform: LoginKey) => {
  await setSessionPersistence(firebaseAuth);
  const loginMap = {
    google: () => loginWithGoogle(firebaseAuth),
    github: () => loginWithGithub(firebaseAuth),
  };
  return loginMap[platform];
};

export const subscribeAuthHandler = (callback: (user: User | null) => void) =>
  subscribeAuth(firebaseAuth, callback);

export const logoutHandler = () => logout(firebaseAuth);
