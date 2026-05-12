import { useRef, type MouseEvent, type PointerEvent } from "react";

const DRAG_THRESHOLD = 6;

export default function useToolbarDrag() {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const isPointerDown = useRef(false);
  const shouldPreventClick = useRef(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isPointerDown.current = true;
    startX.current = e.clientX;
    scrollLeft.current = ref.current.scrollLeft;
    isDragging.current = false;
    shouldPreventClick.current = false;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (!isPointerDown.current) return;

    const dx = e.clientX - startX.current;

    if (Math.abs(dx) > DRAG_THRESHOLD) {
      isDragging.current = true;
      shouldPreventClick.current = true;

      if (!ref.current.hasPointerCapture(e.pointerId)) {
        ref.current.setPointerCapture(e.pointerId);
      }
    }

    if (isDragging.current) {
      ref.current.scrollLeft = scrollLeft.current - dx;
    }
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (ref.current?.hasPointerCapture(e.pointerId)) {
      ref.current.releasePointerCapture(e.pointerId);
    }

    requestAnimationFrame(() => {
      isPointerDown.current = false;
      isDragging.current = false;
    });
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (!shouldPreventClick.current) return;

    e.preventDefault();
    e.stopPropagation();
    shouldPreventClick.current = false;
  };

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
  };
}
