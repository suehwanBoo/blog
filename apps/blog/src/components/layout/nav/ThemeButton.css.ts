import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const button = style({
  borderRadius: 8,
  width: 48,
  height: 48,
  cursor: "pointer",
  boxSizing: "border-box",
  margin: "0",
  padding: "0",
  border: `1px solid ${themeVars.color.active}`,
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: themeVars.color.primary,
});

export const themeButtonStyles = { button };
