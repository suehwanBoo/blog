import { themeVars } from "@boo/theme";
import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
  background: themeVars.color.primary,
  fontFamily: themeVars.font.fontFamily,
});
