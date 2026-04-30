import {
  AUTH_ERROR_CODE_SET,
  AuthErrorCode,
  FirebaseError,
} from "@boo/firebase/auth";

export const AUTH_ERROR_HANDLER: Record<AuthErrorCode, () => void> = {
  "auth/popup-closed-by-user": () => {},
  "auth/popup-blocked": () => alert("팝업 차단됨"),
  "auth/cancelled-popup-request": () => {},
  "auth/account-exists-with-different-credential": () =>
    alert("이미 다른 방식으로 가입된 계정입니다."),
  "auth/operation-not-allowed": () =>
    alert("로그인 방식이 비활성화되어 있습니다."),
  "auth/unauthorized-domain": () => alert("허용되지 않은 도메인입니다."),
  "auth/network-request-failed": () => alert("네트워크 오류가 발생했습니다."),
};

export function isFirebaseError(error: unknown): error is { code: string } {
  return error instanceof FirebaseError;
}

export function isAuthErrorCode(code: unknown): code is AuthErrorCode {
  return typeof code === "string" && AUTH_ERROR_CODE_SET.has(code);
}
