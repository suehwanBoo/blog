import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const fullScreen = style([
  typography.body1r,
  {
    width: "100%",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: themeVars.color.subtitle,
  },
]);

export const emptyStyles = { fullScreen };
