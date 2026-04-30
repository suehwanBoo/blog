import { useEffect, useRef } from "react";
import type { OverlayId, OverlayItem } from "../types";
import { modalControllerStyle as styles } from "./ModalController.css";

type ModalLayerProps = {
  overlay: OverlayItem;
  index: number;
  isTop: boolean;
  closeTop: (id: OverlayId, idx: number) => void;
};

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function ModalLayer({
  overlay,
  index,
  isTop,
  closeTop,
}: ModalLayerProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useInitialFocus(modalRef, isTop);
  return (
    <div
      className={styles.overlayLayer}
      style={{ zIndex: 1000 + index }}
      aria-hidden={!isTop}
      inert={!isTop}
    >
      <button
        className={styles.backdrop({
          closeable: overlay.options.closeOnBackdrop,
        })}
        type="button"
        aria-label="close modal"
        onClick={() => {
          if (!overlay.options.closeOnBackdrop) return;
          closeTop(overlay.id, index);
        }}
      />

      <div
        ref={modalRef}
        className={styles.modalPositioner}
        role="dialog"
        aria-modal={isTop}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (!isTop) return;
          trapFocus(event, modalRef.current);
        }}
        tabIndex={-1}
      >
        {overlay.render()}
      </div>
    </div>
  );
}

function useInitialFocus(
  modalRef: React.RefObject<HTMLElement | null>,
  isTop: boolean,
) {
  useEffect(() => {
    if (!isTop) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElement =
      modalElement.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

    requestAnimationFrame(() => {
      focusableElement?.focus() ?? modalElement.focus();
    });
  }, [isTop, modalRef]);
}

function trapFocus(
  event: React.KeyboardEvent<HTMLElement>,
  modalElement: HTMLElement | null,
) {
  if (event.key !== "Tab") return;
  if (!modalElement) return;

  const focusableElements =
    modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

  if (focusableElements.length === 0) {
    event.preventDefault();
    modalElement.focus();
    return;
  }

  const firstElement = focusableElements[0]!;
  const lastElement = focusableElements[focusableElements.length - 1]!;

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}
