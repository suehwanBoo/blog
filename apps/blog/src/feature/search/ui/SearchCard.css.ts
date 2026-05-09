import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  padding: "8px 0",
  borderBottom: `1px solid ${themeVars.color.active}`,
  width: "100%",
  gap: 12,
  cursor: "pointer",
});

const thumbnail = style({
  width: 73,
  height: 58,
  borderRadius: 4,
  background: "gray",
  flexShrink: 0,
});

const content = style({
  display: "flex",
  gap: 4,
  flexShrink: 1,
  flexDirection: "column",
  minWidth: 0,
});

const title = style([
  typography.body2b,
  {
    color: themeVars.color.title,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
]);
const date = style([
  typography.cap2r,
  {
    color: themeVars.color.subtitle,
  },
]);

export const searchCardStyles = { wrapper, thumbnail, content, title, date };
