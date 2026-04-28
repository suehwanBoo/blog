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
  position: "relative",
  borderRadius: 8,
  height: 373,
});

const cardContent = style({
  display: "flex",
  flexDirection: "column",
  padding: "12px 16px",
  background: `rgba(0,0,0,0.5)`,
  backdropFilter: "blur(5px)",
  width: "100%",
  height: "93px",
  bottom: "0",
  position: "absolute",
  justifyContent: "space-between",
  color: "#fff",
  minWidth: 0,
});

const cardMeta = style({
  display: "flex",
  gap: 12,
});

const thumbnail = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const cardTitle = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const recentPostStyles = {
  section,
  cardWrapper,
  cardContent,
  cardMeta,
  thumbnail,
  cardTitle,
  title,
};
