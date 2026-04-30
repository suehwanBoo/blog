"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { overlayStore } from "../store/overlay";
import { createPortal } from "react-dom";
import { modalControllerStyle as styles } from "./ModalController.css";
import type { OverlayId } from "../types";
import ModalLayer from "./ModalLayer";

export default function ModalController() {
  const overlays = useSyncExternalStore(
    overlayStore.subscribe,
    overlayStore.getSnapShot,
    overlayStore.getServerSnapshot,
  );
  const overlayList = [...overlays.values()];
  const topOverlay = overlayList.at(-1);

  useCloseTopOverlayByEsc(topOverlay?.id, topOverlay?.options.closeOnEsc);
  useBodyScrollLock(overlayList.length);
  useRestoreFocus(overlayList.length);

  const isTop = (idx: number) => overlayList.length - 1 === idx;
  const closeTop = (id: OverlayId, idx: number) => {
    if (!isTop(idx)) return;
    overlayStore.close(id);
  };

  if (overlays.size === 0 || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlayRoot}>
      {overlayList.map((overlay, index) => (
        <ModalLayer
          key={overlay.id}
          overlay={overlay}
          index={index}
          isTop={isTop(index)}
          closeTop={closeTop}
        />
      ))}
    </div>,
    document.body,
  );
}

function useCloseTopOverlayByEsc(
  topOverlayId?: OverlayId,
  closeOnEsc?: boolean,
) {
  useEffect(() => {
    if (!topOverlayId || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      overlayStore.close(topOverlayId);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [topOverlayId, closeOnEsc]);
}

function useBodyScrollLock(size: number) {
  useEffect(() => {
    if (!size) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [size]);
}

function useRestoreFocus(size: number) {
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (size === 1) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
    }

    if (size === 0) {
      lastFocusedElementRef.current?.focus();
      lastFocusedElementRef.current = null;
    }
  }, [size]);
}
