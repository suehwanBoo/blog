import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const srOnly = style({
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
});

const select = style({
  display: "flex",
  justifyContent: "flex-end",
});

const card = style({
  display: "flex",
  gap: 17,
  color: themeVars.color.subtitle,
  paddingTop: 16,
  selectors: {
    "&:first-of-type": {
      paddingTop: 8,
    },
  },
});

const divider = style({
  selectors: {
    "& + &": {
      borderTop: `1px solid ${themeVars.color.active}`,
    },
  },
});

const thumbnailBox = style({
  width: 151,
  height: 114,
  borderRadius: 4,
  overflow: "hidden",
});

const thumbnail = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const cardContent = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
  flex: 1,
});

const cardBody = style({
  minWidth: 0,
});

const cardTitle = style([
  typography.sub1b,
  {
    color: themeVars.color.title,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
]);

const cardDescription = style([
  typography.body2r,
  {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    height: "3em", // 1.5 * 2줄
  },
]);

const cardMetaBox = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

const cardMeta = style({
  display: "flex",
  gap: 12,
  alignItems: "center",
});

const copyLink = style({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  background: "transparent",
  border: "none",
  color: themeVars.color.primary,
  cursor: "pointer",
  transition: "opacity 0.2s ease, transform 0.15s ease",

  selectors: {
    "&:hover": {
      opacity: 0.7,
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
});

export const simplePostStyles = {
  wrapper,
  srOnly,
  select,
  card,
  thumbnail,
  thumbnailBox,
  cardContent,
  cardBody,
  cardTitle,
  cardDescription,
  cardMetaBox,
  cardMeta,
  copyLink,
  divider,
};
