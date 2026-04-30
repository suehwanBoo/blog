"use client";

import { Button } from "@boo/ui";
import { useOverlay } from "@boo/ui/client";
import AuthModal from "./AuthModal";

export default function AuthButton() {
  const overlay = useOverlay();
  return (
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
  );
}
