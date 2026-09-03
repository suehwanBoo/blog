import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const container = style([
  typography.cap1r,
  {
    width: "100%",
    padding: `70px 0`,
    background: themeVars.color.background,
    color: themeVars.color.title,
    borderTop: `1px solid ${themeVars.color.active}`,
    display: "flex",
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 240,
  },
]);

const title = style([typography.sub1b, {}]);

const shortCut = style({
  color: themeVars.color.primary,
  width: 118,
  display: "flex",
  justifyContent: "space-between",
});

const desc = style([
  typography.cap2r,
  {
    color: themeVars.color.subtitle,
  },
]);

const buttonAni = {
  transition: "0.3s ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
};

const link = style({
  textDecoration: "none",
  color: "inherit",
  ...buttonAni,
});

const copyEmail = style({
  margin: 0,
  padding: 0,
  background: "none",
  border: 0,
  color: "inherit",
  font: "inherit",
  fontSize: "inherit",
  cursor: "pointer",
  ...buttonAni,
});

export const footerStyles = {
  container,
  title,
  desc,
  shortCut,
  link,
  copyEmail,
};
