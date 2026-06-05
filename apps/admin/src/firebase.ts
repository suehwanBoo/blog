import { createFirebaseApp } from "@boo/firebase";
import { createfirebaseAuth } from "@boo/firebase/auth";
import { getFirestore } from "@boo/firebase/firestore";

const firebaseApp = createFirebaseApp({
  apiKey: import.meta.env.VITE_APIKEY!,
  appId: import.meta.env.VITE_APPID!,
  authDomain: import.meta.env.VITE_AUTHDOMAIN!,
  projectId: import.meta.env.VITE_PROJECTID!,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET!,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID!,
  measurementId: import.meta.env.VITE_MEASUREMENTID!,
});

const fireStore = getFirestore(firebaseApp);

const firebaseAuth = createfirebaseAuth(firebaseApp);

export { firebaseApp, fireStore, firebaseAuth };
