"use client";

import { useState } from "react";
import { mobileButtonStyles as styles } from "./MobileButton.css";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import useScrollLock from "@/hooks/useScrollLock";
import { useOverlay, useToast } from "@boo/ui/client";
import AuthModal from "@/feature/auth/ui/AuthModal";
import SubscribeModal from "@/feature/subscribe/ui/SubscribeModal";
import { useAuthStore } from "@/store/store";

type MenuState = {
  open: boolean;
  close: () => void;
};

type CloseProps = Pick<MenuState, "close">;

export default function MobileButtons() {
  const [open, setOpen] = useState(false);
  useScrollLock(open);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <>
      <div className={styles.mobileButtonWrapper}>
        <button
          type="button"
          className={styles.hamburgerButton({ open })}
          onClick={toggle}
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        />
      </div>
      {open && <MobileMenu open={open} close={close} />}
    </>
  );
}

function MobileMenu({ open, close }: MenuState) {
  const { theme, toggleTheme } = useTheme();
  const themeWord = theme === "dark" ? "Set Lightmode" : "Set Darkmode";

  return (
    <div
      id="mobile-menu"
      className={styles.mobileMenu({ open })}
      aria-hidden={!open}
    >
      <LoginButton close={close} />
      <SubscribeButton close={close} />
      <Link
        href={"https://github.com/suehwanBoo/blog"}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={close}
      >
        Github
      </Link>
      <button
        type="button"
        className={styles.link}
        onClick={() => {
          toggleTheme();
          close();
        }}
      >
        {themeWord}
      </button>
    </div>
  );
}

function LoginButton({ close }: CloseProps) {
  const { auth } = useAuthStore();
  const { open } = useOverlay();
  const { apply } = useToast();

  const logout = async () => {
    try {
      const { logoutHandler } = await import("@/utils/firebase/firebase");
      await logoutHandler();
      close();
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

  if (!auth)
    return (
      <button
        type="button"
        className={styles.link}
        onClick={() => {
          close();
          open(({ close }) => <AuthModal close={close} />, {
            closeOnBackdrop: false,
          });
        }}
      >
        Sign in
      </button>
    );

  return (
    <button
      type="button"
      className={styles.link}
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
}

function SubscribeButton({ close }: CloseProps) {
  const { open } = useOverlay();

  return (
    <button
      type="button"
      className={styles.link}
      onClick={() => {
        close();
        open(({ close }) => <SubscribeModal close={close} />);
      }}
    >
      Subscribe
    </button>
  );
}
