import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style([
  typography.cap1r,
  {
    padding: "12px 0",
    borderBottom: `1px solid ${themeVars.color.active}`,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    color: themeVars.color.subtitle,
  },
]);

const meta = style({
  display: "flex",
  gap: 12,
});

const writer = style([
  typography.cap1b,
  {
    color: themeVars.color.title,
  },
]);

export const commentStyles = { wrapper, meta, writer };
