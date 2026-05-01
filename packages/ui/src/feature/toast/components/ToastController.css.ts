import { style } from "@vanilla-extract/css";

export const toastControllerStyle = style({
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 10000,

  display: "flex",
  flexDirection: "column",
  gap: 12,

  width: "min(360px, calc(100vw - 32px))",

  pointerEvents: "none",

  "@media": {
    "screen and (max-width: 480px)": {
      right: "auto",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
});
