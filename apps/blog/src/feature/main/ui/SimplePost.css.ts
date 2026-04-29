import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
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
  padding: "12px 0",
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
  height: 137,
  borderRadius: 4,
  overflow: "hidden",
  flexShrink: 0,
});

const thumbnail = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const cardContent = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: 1,
  height: "100%",
  justifyContent: "space-between",
});

const cardBody = style({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
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
  },
]);

const cardDate = style([
  typography.cap1r,
  {
    paddingTop: 6,
    color: themeVars.color.subtitle,
  },
]);

const cardMetaBox = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  borderTop: `1px solid ${themeVars.color.clicked}`,
  paddingTop: 4,
});

const cardMeta = style({
  display: "flex",
  gap: 12,
  alignItems: "center",
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
  cardDate,
  cardMeta,
  divider,
};
