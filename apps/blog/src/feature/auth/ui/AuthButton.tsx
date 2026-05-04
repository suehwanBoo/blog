"use client";

import { Button } from "@boo/ui";
import { Tooltip, useOverlay, useToast } from "@boo/ui/client";
import AuthModal from "./AuthModal";
import { authButtonStyles as styles } from "./AuthButton.css";

const AuthButton = Object.assign(() => <></>, {
  Signin,
  Logout,
});

export default AuthButton;

function Signin() {
  const overlay = useOverlay();
  return (
    <Tooltip content="로그인" placement="bottom">
      <Button
        size="large"
        ariaLabel="Sign in"
        state="default"
        onClick={() => {
          overlay.open(({ close }) => <AuthModal close={close} />, {
            closeOnBackdrop: false,
          });
        }}
      >
        Sign in
      </Button>
    </Tooltip>
  );
}

function Logout() {
  const { apply } = useToast();
  const logout = async () => {
    try {
      const { logoutHandler } = await import("@/utils/firebase/firebase");
      await logoutHandler();
      apply({
        description: "로그아웃 성공",
        variant: "success",
        closable: true,
      });
    } catch {
      apply({
        title: "로그아웃 오류",
        description: "새로고침 후 다시 시도해주세요.",
        variant: "danger",
        closable: true,
      });
    }
  };
  return (
    <Tooltip content="로그아웃" placement="bottom">
      <button aria-label="log out" className={styles.logout} onClick={logout}>
        <User />
      </button>
    </Tooltip>
  );
}

function User() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
