import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const logout = style({
  margin: 0,
  padding: 0,
  lineHeight: 0,
  background: "transparent",
  border: 0,
  cursor: "pointer",
  color: themeVars.color.title,
});

export const userButtonStyle = { logout };
