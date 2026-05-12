import { style } from "@vanilla-extract/css";
import { themeVars, typography } from "@boo/ui";

const wrapper = style({
  width: "100vw",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
});

const button = style([
  typography.body1r,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    boxSizing: "border-box",
    padding: 0,
    gap: 15,
    cursor: "pointer",
    background: themeVars.color.default,
    border: `1px solid ${themeVars.color.disabled}`,
    borderRadius: 4,
    width: 240,
    height: 54,
    color: themeVars.color.title,
  },
]);

export const loginStyles = { wrapper, button };
