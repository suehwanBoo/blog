import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const section = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const title = style([
  typography.h1,
  {
    color: themeVars.color.title,
  },
]);

const cardWrapper = style({
  width: "100%",
  display: "flex",
  maxHeight: 130,
  alignItems: "center",
  gap: 16,
});

const divider = style({
  selectors: {
    "&:first-child": {
      paddingBottom: 8,
    },

    "&:last-child": {
      paddingTop: 8,
    },

    "&:not(:first-child):not(:last-child)": {
      paddingTop: 8,
      paddingBottom: 8,
    },

    "& + &": {
      borderTop: `1px solid ${themeVars.color.active}`,
    },
  },
});

const thumbnailBox = style({
  height: 114,
  width: 152,
  background: "gray",
  borderRadius: 4,
  overflow: "hidden",
});

const cardContent = style({
  display: "flex",
  minHeight: 74,
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: 0,
});

const cardBody = style({
  color: themeVars.color.subtitle,
});

const cardTitle = style({
  color: themeVars.color.title,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const cardMeta = style({
  display: "flex",
  gap: 12,
  color: themeVars.color.subtitle,
});

const thumbnail = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const popularStyle = {
  section,
  title,
  cardWrapper,
  divider,
  thumbnailBox,
  cardContent,
  cardBody,
  cardMeta,
  cardTitle,
  thumbnail,
};
