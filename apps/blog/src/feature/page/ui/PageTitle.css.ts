import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  borderBottom: `1px solid ${themeVars.color.active}`,
  padding: "30px 0 12px 0",
});

const title = style([
  typography.h1,
  {
    color: themeVars.color.title,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
]);

const metaWrapper = style({
  color: themeVars.color.subtitle,
  display: "flex",
  gap: 8,
});

export const pageTitleStyles = { wrapper, title, metaWrapper };
