import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

export const linkCardStyles = {
  root: style({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 148px",
    width: "100%",
    minHeight: 132,
    overflow: "hidden",
    border: `1px solid ${themeVars.color.disabled}`,
    borderRadius: themeVars.radius.md,
    background: themeVars.color.default,
    color: themeVars.color.title,
    textDecoration: "none",
    boxShadow: themeVars.shadow.sm,
    transition: `border-color ${themeVars.motion.durationFast} ${themeVars.motion.easingStandard}`,
    selectors: {
      "&:hover": {
        borderColor: themeVars.color.primary,
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
      },
    },
    "@media": {
      "(max-width: 640px)": {
        gridTemplateColumns: "1fr",
      },
    },
  }),
  content: style({
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: themeVars.space.sm,
    padding: themeVars.space.lg,
  }),
  siteName: style({
    overflow: "hidden",
    color: themeVars.color.primary,
    fontSize: 13,
    fontWeight: 600,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  title: style({
    display: "-webkit-box",
    margin: 0,
    overflow: "hidden",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.45,
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  }),
  description: style({
    display: "-webkit-box",
    margin: 0,
    overflow: "hidden",
    color: themeVars.color.subtitle,
    fontSize: 14,
    lineHeight: 1.5,
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  }),
  url: style({
    marginTop: "auto",
    overflow: "hidden",
    color: themeVars.color.subtitle,
    fontSize: 13,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  image: style({
    width: "100%",
    height: "100%",
    minHeight: 132,
    objectFit: "cover",
    background: themeVars.color.clicked,
    "@media": {
      "(max-width: 640px)": {
        aspectRatio: "16 / 9",
        minHeight: 0,
      },
    },
  }),
};
