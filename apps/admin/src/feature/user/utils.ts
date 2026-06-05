import {
  loginWithGithub,
  loginWithGoogle,
  setSessionPersistence,
  subscribeAuth,
} from "@boo/firebase/auth";
import { AUTH_ERROR_CODE_SET, type AuthErrorCode } from "./constant";
import { FirebaseError, type User } from "@boo/firebase/type";
import { firebaseAuth } from "@/firebase";

type LoginKey = "google" | "github";

export const getLoginHandler = async (platform: LoginKey) => {
  await setSessionPersistence(firebaseAuth);
  const loginMap = {
    google: () => loginWithGoogle(firebaseAuth),
    github: () => loginWithGithub(firebaseAuth),
  };
  return loginMap[platform];
};

export function isFirebaseError(error: unknown): error is FirebaseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string" &&
    error instanceof FirebaseError
  );
}
export function isAuthErrorCode(code: unknown): code is AuthErrorCode {
  return typeof code === "string" && AUTH_ERROR_CODE_SET.has(code);
}

export const subscribeAuthHandler = (callback: (user: User | null) => void) =>
  subscribeAuth(firebaseAuth, callback);
