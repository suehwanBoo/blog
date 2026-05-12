import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const title = style([
  typography.h1,
  {
    width: "100%",
    padding: 24,
    border: "none",
    borderBottom: `1px solid ${themeVars.color.clicked}`,
    resize: "none",
    outline: "none",
    verticalAlign: "text-bottom",
    background: "transparent",
    color: themeVars.color.title,
  },
]);

export const postTitleStyles = {
  title,
};
