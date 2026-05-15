import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  width: "100%",
  minHeight: "100dvh",
  background: themeVars.color.background,
  padding: "50px 0",
});

const editor = style({
  width: 800,
  height: "auto",
  margin: "0 auto",
  background: themeVars.color.default,
  borderRadius: 10,
});

export const editorStyles = { wrapper, editor };
