import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";
import { typography } from "../../font/typography.css";

export const buttonRecipe = recipe({
  base: {
    display: "inline-flex",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    color: themeVars.color.title,
    borderRadius: 8,
    cursor: "pointer",
  },
  variants: {
    size: {
      large: [
        typography.body1b,
        {
          padding: "0 15px",
          height: 48,
        },
      ],
      medium: [
        typography.body2r,
        {
          padding: "0 12px",
          height: 36,
        },
      ],
      small: [
        typography.cap1r,
        {
          padding: "0 15px",
          height: 30,
        },
      ],
    },
    state: {
      default: {
        background: themeVars.color.default,
        border: `1px solid ${themeVars.color.clicked}`,
      },
      active: {
        background: themeVars.color.primary,
        border: `1px solid ${themeVars.color.primary}`,
      },
      clicked: {
        background: themeVars.color.active,
        border: `1px solid ${themeVars.color.active}`,
      },
      disabled: {
        background: themeVars.color.disabled,
        border: `1px solid ${themeVars.color.disabled}`,
        color: themeVars.color.subtitle,
        cursor: "not-allowed",
      },
    },
  },
});
