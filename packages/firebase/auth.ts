import type { FirebaseApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
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
