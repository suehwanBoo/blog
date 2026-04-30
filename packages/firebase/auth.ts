import type { FirebaseApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";

export const createfirebaseAuth = (app: FirebaseApp) => getAuth(app);

export const loginWithGoogle = (auth: Auth) => {
  const proivder = new GoogleAuthProvider();
  return signInWithPopup(auth, proivder);
};

export const loginWithGithub = (auth: Auth) => {
  const proivder = new GithubAuthProvider();
  return signInWithPopup(auth, proivder);
};

export const signupWithEmail = (
  auth: Auth,
  email: string,
  password: string,
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = (auth: Auth) => signOut(auth);

export const subscribeAuth = (
  auth: Auth,
  callback: (user: User | null) => void,
) => onAuthStateChanged(auth, callback);

export { FirebaseError } from "firebase/app";

export const AuthErrorCode = {
  POPUP_CLOSED: "auth/popup-closed-by-user",
  POPUP_BLOCKED: "auth/popup-blocked",
  CANCELLED: "auth/cancelled-popup-request",
  ACCOUNT_EXISTS: "auth/account-exists-with-different-credential",
  OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
  UNAUTHORIZED_DOMAIN: "auth/unauthorized-domain",
  NETWORK_ERROR: "auth/network-request-failed",
} as const;

export const AUTH_ERROR_CODE_SET = new Set<string>(
  Object.values(AuthErrorCode),
);

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];
