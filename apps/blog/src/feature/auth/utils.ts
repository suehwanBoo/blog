import { FirebaseError } from "@boo/firebase/type";
import { AUTH_ERROR_CODE_SET, type AuthErrorCode } from "./constant";

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
