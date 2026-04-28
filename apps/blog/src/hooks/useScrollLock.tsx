"use client";

import { useEffect } from "react";

export default function useScrollLock(state: boolean) {
  useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);
}
