import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";
import { typography } from "../../font/typography.css";
import { keyframes, style } from "@vanilla-extract/css";

export const inputRecipe = recipe({
  base: [
    typography.body1r,
    {
      background: themeVars.color.default,
      border: `1px solid ${themeVars.color.active}`,
      padding: 10,
      borderRadius: 8,
      color: themeVars.color.title,
      transition: "0.15s ease",
      caretColor: themeVars.color.subtitle,
      ":focus": {
        border: `1px solid ${themeVars.color.primary}`,
        outline: "none",
      },
      "::placeholder": {
        color: themeVars.color.subtitle,
      },
    },
  ],

  variants: {
    disabled: {
      true: {
        background: themeVars.color.clicked,
        border: `1px solid ${themeVars.color.disabled}`,
        color: themeVars.color.disabled,
        "::placeholder": {
          color: themeVars.color.disabled,
        },
        cursor: "not-allowed",
      },
      false: {},
    },
  },
});

const blink = keyframes({
  from: {
    opacity: 0,
  },
  to: { opacity: 1 },
});

export const preventMobileAction = style({
  animation: `${blink} 0.01s`,
});
