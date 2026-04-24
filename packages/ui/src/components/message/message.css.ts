import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";
import { keyframes, style } from "@vanilla-extract/css";
import { typography } from "../../font/typography.css";

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(-8px) scale(0.98)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
});

const wrapper = recipe({
  base: {
    display: "flex",
    minWidth: 320,
    maxWidth: 480,
    padding: 20,
    gap: 20,
    color: themeVars.color.default,
    borderRadius: 8,
    animation: `${fadeIn} 0.3s ease-out`,
  },
  variants: {
    state: {
      default: {
        background: themeVars.color.alertDefault,
      },
      success: {
        background: themeVars.color.alertSuccess,
      },
      danger: {
        background: themeVars.color.alertDagner,
      },
      warning: {
        background: themeVars.color.alertWarning,
      },
    },
  },
});

const contentWrapper = style([
  typography.body2r,
  {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: `1 1 auto`,
  },
]);

const title = style([
  typography.sub2b,
  {
    margin: 0,
  },
]);

const content = style({
  margin: 0,
});

const cancel = style({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  width: "fit-content",
  height: "fit-content",
  cursor: "pointer",
  padding: 0,
  border: 0,
  background: "none",
  lineHeight: 0,
  color: themeVars.color.default,
});

export const MessageStyle = {
  wrapper,
  contentWrapper,
  title,
  cancel,
  content,
};
