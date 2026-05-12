import { globalStyle, style } from "@vanilla-extract/css";

const wrapper = style({});

globalStyle(`${wrapper} > .tiptap`, {
  padding: 24,
  minHeight: 400,
  outline: "none",
});

export const postContentStyles = { wrapper };
