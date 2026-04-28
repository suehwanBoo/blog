import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const topWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `18px 24px`,
  borderBottom: `1px solid ${themeVars.color.active}`,
});

const buttonWrapper = style({
  display: "none",
  "@media": {
    "screen and (min-width: 1024px)": {
      display: "flex",
      height: "100%",
      alignItems: "center",
      gap: 8,
    },
  },
});

const bottomWrapper = style({
  display: "flex",
  justifyContent: "center",
  paddingTop: 5,
  width: "100%",
});

export const navStyle = {
  topWrapper,
  buttonWrapper,
  bottomWrapper,
};
