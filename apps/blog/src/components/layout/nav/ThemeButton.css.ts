import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const anonyButton = style({
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

const userButton = style({
  cursor: "pointer",
  margin: 0,
  padding: 0,
  background: "transparent",
  color: themeVars.color.title,
  border: 0,
  lineHeight: 0,
});

export const themeButtonStyles = { anonyButton, userButton };
