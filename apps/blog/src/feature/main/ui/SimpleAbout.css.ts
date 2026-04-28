import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  borderLeft: `1px solid ${themeVars.color.active}`,
});

const section = style({
  display: "flex",
  flexDirection: "column",
  padding: "8px 0 8px 16px",
  gap: 8,
});

const subscribeSection = style({
  display: "flex",
  flexDirection: "column",
  padding: "8px 0 8px 16px",
  gap: 14,
});

const title = style({
  color: themeVars.color.title,
});

const highlight = style({
  color: themeVars.color.primary,
});

const description = style([
  typography.cap1r,
  {
    color: themeVars.color.subtitle,
  },
]);

const divider = style({
  width: "100%",
  margin: 16,
  height: 1,
  background: themeVars.color.active,
  border: "none",
});

const form = style({
  display: "flex",
  gap: 4,
});

const hint = style([
  typography.cap1r,
  {
    color: themeVars.color.subtitle,
  },
]);

export const simpleAboutStyles = {
  wrapper,
  title,
  highlight,
  section,
  description,
  divider,
  form,
  hint,
  subscribeSection,
};
