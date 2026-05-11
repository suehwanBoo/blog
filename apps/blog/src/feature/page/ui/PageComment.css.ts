import { themeVars, typography } from "@boo/ui";
import { globalStyle, style } from "@vanilla-extract/css";

const wrapper = style({
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  "@media": {
    "(max-width: 767px)": {
      paddingBottom: 92,
    },
  },
});

const title = style([
  typography.sub1b,
  {
    color: themeVars.color.title,
    display: "flex",
    gap: 4,
  },
]);

globalStyle(`${title} > :nth-child(2)`, {
  color: themeVars.color.primary,
});

export const pageCommentStyles = {
  wrapper,
  title,
};
