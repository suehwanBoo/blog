import { themeVars, typography } from "@boo/ui";
import { globalStyle, style } from "@vanilla-extract/css";

const inputWrapper = style({
  width: "100%",
  display: "flex",
  alignItems: "stretch",
  gap: 6,
  "@media": {
    "(max-width: 1024px)": {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: themeVars.zIndex.sticky,
      marginTop: 0,
      padding: "10px 16px",
      borderTop: `1px solid ${themeVars.color.active}`,
      background: themeVars.color.background,
    },
  },
});

const TEXTAREA_MIN_HEIGHT = 48;
const TEXTAREA_MAX_HEIGHT = 62;

const textarea = style([
  typography.body1r,
  {
    width: "100%",
    height: TEXTAREA_MIN_HEIGHT,
    minHeight: TEXTAREA_MIN_HEIGHT,
    maxHeight: TEXTAREA_MAX_HEIGHT,
    padding: "14px",
    boxSizing: "border-box",
    lineHeight: "18px",
    resize: "none",
    overflowY: "auto",
    border: `1px solid ${themeVars.color.active}`,
    borderRadius: themeVars.radius.md,
    outline: "none",
    color: themeVars.color.title,
    background: themeVars.color.default,
    boxShadow: themeVars.shadow.sm,
    scrollbarWidth: "thin",
    scrollbarColor: `${themeVars.color.disabled} transparent`,
    verticalAlign: "top",

    selectors: {
      "&::placeholder": {
        font: "inherit",
        lineHeight: "inherit",
        color: themeVars.color.subtitle,
      },
    },
  },
]);

const submitButton = style([
  typography.body1b,
  {
    // flexShrink: 0,
    minWidth: 56,
    minHeight: 40,
    alignSelf: "stretch",
    padding: "0 14px",
    color: themeVars.color.default,
  },
]);

globalStyle(`${submitButton}.${submitButton}`, {
  height: "auto",
});

export const commentInputStyles = {
  inputWrapper,
  textarea,
  submitButton,
};
