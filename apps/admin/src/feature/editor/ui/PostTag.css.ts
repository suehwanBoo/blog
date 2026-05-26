import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const tagWrapper = style({
  paddingTop: 16,
  display: "flex",
  maxWidth: 300,
  gap: 6,
  flexWrap: "wrap",
});

const tags = style([
  typography.body2b,
  {
    color: themeVars.color.primary,
    padding: 8,
    borderRadius: 50,
    border: `1px solid ${themeVars.color.title}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
]);

const cancel = style({
  color: themeVars.color.title,
  cursor: "pointer",
  padding: 0,
  margin: 0,
  background: "transparent",
  border: 0,
  lineHeight: 0,
});

export const PostTagStyles = { tagWrapper, tags, cancel };
