import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  width: "100vw",
  minHeight: "100dvh",
  background: themeVars.color.background,
});

export const editorStyles = { wrapper };
