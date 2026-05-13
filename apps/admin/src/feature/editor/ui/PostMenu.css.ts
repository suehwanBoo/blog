import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  borderBottom: `1px solid ${themeVars.color.clicked}`,
  height: 48,
  overflowX: "auto",
  width: "100%",
  cursor: "grab",
  scrollbarWidth: "none",
  display: "flex",
});

const divider = style({
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: 8,
  gap: 8,
  selectors: {
    "& + &": {
      borderLeft: `1px solid ${themeVars.color.clicked}`,
    },
  },
});

export const postMenuStyles = { wrapper, divider };
