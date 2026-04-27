"use client";

import { createFirebaseApp } from "@boo/firebase";
import {
  createfirebaseAuth,
  loginWithGithub,
  loginWithGoogle,
} from "@boo/firebase/auth";

export const firebaseApp = createFirebaseApp({
  apiKey: process.env.NEXT_PUBLIC_APIKEY!,
  appId: process.env.NEXT_PUBLIC_APPID!,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECTID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID!,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID!,
});

export const firebaseAuth = createfirebaseAuth(firebaseApp);

type LoginKey = "google" | "github";

export const getLogin = (platform: LoginKey) => {
  const loginMap = {
    google: () => loginWithGoogle(firebaseAuth),
    github: () => loginWithGithub(firebaseAuth),
  };

  return loginMap[platform];
};
