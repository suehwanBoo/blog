import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  width: "100%",
  minHeight: "100dvh",
  background: themeVars.color.background,
});

const editor = style({
  width: 800,
  height: "auto",
  margin: "50px auto",
  background: themeVars.color.default,
  borderRadius: 10,
});

export const editorStyles = { wrapper, editor };
