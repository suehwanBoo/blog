import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  position: "relative",
});

const divider = style({
  selectors: {
    "& + &": {
      borderTop: `1px solid ${themeVars.color.active}`,
    },
  },
});

const link = style({
  position: "absolute",
  inset: 0,
  cursor: "pointer",
  borderRadius: "inherit",
  width: "100%",
  height: "100%",
});

export const clickableCardOverlayStyles = { wrapper, link, divider };
