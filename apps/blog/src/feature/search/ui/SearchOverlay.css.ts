import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const MOBILE_PADDING_X = 20;
const MOBILE_PADDING_Y = 15;
const DESKTOP_WIDTH = 600;
const DESKTOP_CONTENT_HEIGHT = 500;
const BREAKPOINT = "screen and (min-width: 700px)";

const wrapper = style({
  width: "100vw",
  padding: `${MOBILE_PADDING_Y}px ${MOBILE_PADDING_X}px`,
  background: themeVars.color.default,
  border: `1px solid ${themeVars.color.clicked}`,

  "@media": {
    [BREAKPOINT]: {
      width: DESKTOP_WIDTH,
      borderRadius: 8,
    },
  },
});

const header = style({
  paddingBottom: 21,
});

const titleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 15,
  color: themeVars.color.title,
});

const closeButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  margin: 0,
  border: 0,
  color: "inherit",
  background: "transparent",
  cursor: "pointer",
});

const searchInput = style({
  width: "100%",
});

const content = style({
  height: `calc(100dvh - ${MOBILE_PADDING_Y * 2}px - 108px)`,
  overflowY: "auto",

  "@media": {
    [BREAKPOINT]: {
      height: DESKTOP_CONTENT_HEIGHT,
    },
  },
});

const contentTitle = style([
  typography.cap1b,
  {
    color: themeVars.color.subtitle,
  },
]);

export const searchOverlayStyles = {
  wrapper,
  header,
  titleRow,
  closeButton,
  searchInput,
  content,
  contentTitle,
};
