import { themeVars } from "@boo/ui";
import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  background: themeVars.color.background,
});

const editor = style({
  width: 800,
  height: "auto",
  margin: "50px auto",
  background: themeVars.color.default,
  borderRadius: 10,
});

export const editorStyles = { editor };
