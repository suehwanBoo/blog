import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  minWidth: "0 !important",
  width: `min(calc(100vw - 32px), 320px) !important`,
});

const authBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 50,
  paddingBottom: `0 !important`,
});

const authDescription = style({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 21,
});

const welcome = style([
  typography.body1r,
  {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    color: themeVars.color.title,
  },
]);

const buttonGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
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
    width: "100%",
    height: 54,
    color: themeVars.color.title,
  },
]);

export const authButtonStyles = {
  authBody,
  authDescription,
  welcome,
  buttonGroup,
  button,
  wrapper,
};
