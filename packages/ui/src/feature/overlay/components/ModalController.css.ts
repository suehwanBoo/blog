import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const overlayRoot = style({
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
});

const overlayLayer = style({
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  pointerEvents: "auto",
});

const backdrop = recipe({
  base: {
    position: "absolute",
    inset: 0,
    border: "none",
    padding: 0,
    margin: 0,
    background: "rgba(0, 0, 0, 0.48)",
  },
  variants: {
    closeable: {
      true: {
        cursor: "pointer",
      },
      false: {
        cursor: "default",
      },
    },
  },
});
const modalPositioner = style({
  position: "relative",
  width: "min(calc(100vw - 32px), 480px)",
  maxHeight: "calc(100dvh - 32px)",
  overflow: "auto",
  borderRadius: 16,
});

export const modalControllerStyle = {
  overlayRoot,
  overlayLayer,
  backdrop,
  modalPositioner,
};
