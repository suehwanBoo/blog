import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  padding: "20px 0",
  borderBottom: `1px solid ${themeVars.color.active}`,
  color: themeVars.color.title,
});

export const pageContentStyles = {
  wrapper,
};
