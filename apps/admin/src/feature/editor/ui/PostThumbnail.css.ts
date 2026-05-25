import { themeVars } from "@boo/ui";
import { keyframes, style } from "@vanilla-extract/css";

const preview = style({
  aspectRatio: `3 / 2`,
  maxWidth: 278,
  maxHeight: 185,
  border: `1px dashed ${themeVars.color.primary}`,
  borderRadius: 5,
  cursor: "pointer",
  position: "relative",
});

const spin = keyframes({
  from: {
    transform: "translate(-50%, -50%) rotate(0deg)",
  },
  to: {
    transform: "translate(-50%, -50%) rotate(360deg)",
  },
});

export const loading = style({
  position: "absolute",

  top: 0,
  left: 0,

  width: "100%",
  height: "100%",

  background: "rgba(0,0,0,0.7)",

  zIndex: 9999,

  selectors: {
    "&::after": {
      content: "",

      position: "absolute",

      top: "50%",
      left: "50%",

      width: "36px",
      height: "36px",

      borderRadius: "50%",

      border: "4px solid rgba(255,255,255,0.3)",
      borderTopColor: "#ffffff",

      animation: `${spin} 0.8s linear infinite`,
    },
  },
});

export const imageAddButton = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: "48px",
  height: "48px",

  borderRadius: "12px",

  cursor: "pointer",

  transition: "background-color 0.2s ease, border-color 0.2s ease",

  selectors: {
    "&::before, &::after": {
      content: "",
      position: "absolute",
      top: "50%",
      left: "50%",
      background: themeVars.color.primary,
      borderRadius: "999px",
      transform: "translate(-50%, -50%)",
    },

    "&::before": {
      width: "20px",
      height: "2px",
    },

    "&::after": {
      width: "2px",
      height: "20px",
    },
  },
});

export const postThumbnailStyles = { preview, imageAddButton, loading };
