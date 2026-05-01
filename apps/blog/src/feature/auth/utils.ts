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

export function isFirebaseError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  );
}
export function isAuthErrorCode(code: unknown): code is AuthErrorCode {
  return typeof code === "string" && AUTH_ERROR_CODE_SET.has(code);
}

export async function loginWith({
  key,
  isLoading,
  setIsLoading,
  close,
}: {
  key: "github" | "google";
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  close: () => void;
}) {
  if (isLoading) return;

  setIsLoading(true);

  try {
    const { getLogin } = await import("@/utils/firebase/firebase");

    await getLogin(key)();
    close();
  } catch (err) {
    if (isFirebaseError(err) && isAuthErrorCode(err.code)) {
      AUTH_ERROR_HANDLER[err.code]();
    }
  } finally {
    setIsLoading(false);
  }
}
