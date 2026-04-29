import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

export const tagStyle = style([
  typography.cap1r,
  {
    display: "flex",
    gap: 10,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    minWidth: 0, // 🔥 중요
    color: themeVars.color.primary,
  },
]);
