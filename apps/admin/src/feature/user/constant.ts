import GithubIcon from "./ui/GithubIcon";
import GoogleIcon from "./ui/GoogleIcon";

export const AUTH_GROUP = {
  google: {
    icon: GoogleIcon,
    label: "Google",
  },
  github: {
    icon: GithubIcon,
    label: "Github",
  },
} as const;

export type AuthGroup = (typeof AUTH_GROUP)[keyof typeof AUTH_GROUP];

export const AUTH_ERROR_MESSAGE: Record<AuthErrorCode, string> = {
  "auth/popup-closed-by-user": "세션이 종료되었습니다.",
  "auth/popup-blocked": "팝업이 차단되었습니다.",
  "auth/cancelled-popup-request": "팝업이 차단되었습니다.",
  "auth/account-exists-with-different-credential":
    "이미 다른 방식으로 가입된 이메일입니다.",
  "auth/operation-not-allowed": "로그인 방식이 비활성화 되어있습니다.",
  "auth/unauthorized-domain": "허용되지 않은 도메인입니다.",
  "auth/network-request-failed": "네트워크 오류가 발생하였습니다.",
} as const;

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
