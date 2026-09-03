import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const fullScreen = style([
  typography.body1r,
  {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: themeVars.color.subtitle,
    height: "313px",
  },
]);

export const emptyStyles = { fullScreen };
