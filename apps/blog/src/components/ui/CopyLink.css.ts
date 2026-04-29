import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

export const copyLinkStyle = style({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  background: "transparent",
  border: "none",
  color: themeVars.color.subtitle,
  cursor: "pointer",
  transition: "opacity 0.2s ease, transform 0.15s ease",

  selectors: {
    "&:hover": {
      opacity: 0.7,
      transform: "scale(1.05)",
      color: themeVars.color.primary,
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
});
