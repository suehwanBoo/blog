// Import the functions you need from the SDKs you need
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseOptions,
} from "firebase/app";

export function createFirebaseApp(config: FirebaseOptions) {
  return getApps().length > 0 ? getApp() : initializeApp(config);
}
