import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const button = style({
  padding: 0,
  margin: 0,
  lineHeight: 0,
  background: "transparent",
  border: 0,
  color: themeVars.color.title,
  cursor: "pointer",
});

export const searchStyles = { button };
