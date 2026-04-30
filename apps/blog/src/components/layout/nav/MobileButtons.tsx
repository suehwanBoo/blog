"use client";

import { useState } from "react";
import { mobileButtonStyles as styles } from "./MobileButton.css";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import useScrollLock from "@/hooks/useScrollLock";
import { useOverlay } from "@boo/ui/client";
import AuthModal from "@/feature/auth/components/ui/AuthModal";

type MenuState = {
  open: boolean;
  close: () => void;
};

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
  const overlays = useOverlay();
  const themeWord = theme === "dark" ? "Set Lightmode" : "Set Darkmode";

  return (
    <div
      id="mobile-menu"
      className={styles.mobileMenu({ open })}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={styles.link}
        onClick={() => {
          close();
          overlays.open((overlay) => <AuthModal close={overlay.close} />, {
            closeOnBackdrop: false,
          });
        }}
      >
        Sign in
      </button>
      <Link href={"/subscribe"} className={styles.link} onClick={close}>
        Subscribe
      </Link>
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
