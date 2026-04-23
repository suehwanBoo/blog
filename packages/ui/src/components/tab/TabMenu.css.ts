import { recipe } from "@vanilla-extract/recipes";
import { typography } from "../../font/typography.css";
import { themeVars } from "../../theme/theme.css";
import { style } from "@vanilla-extract/css";

export const tabWrapper = style({
  display: "inline-flex",
});

export const tabRecipe = recipe({
  base: [
    typography.body2b,
    {
      all: "unset",
      background: "inherit",
      padding: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  ],
  variants: {
    active: {
      true: {
        color: themeVars.color.primary,
        borderBottom: `2px solid ${themeVars.color.primary}`,
      },
      false: {
        color: themeVars.color.title,
        borderBottom: `1px solid ${themeVars.color.disabled}`,
      },
    },
    line: {
      true: {
        borderBottom: `1px solid ${themeVars.color.disabled}`,
      },
      false: {
        borderBottom: `1px solid transparent`,
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        line: false,
        active: false,
      },
      style: {
        borderBottom: `1px solid transparent`,
      },
    },
    {
      variants: {
        line: false,
        active: true,
      },
      style: {
        borderBottom: `2px solid ${themeVars.color.primary}`,
      },
    },
    {
      variants: {
        line: true,
        active: true,
      },
      style: {
        borderBottom: `2px solid ${themeVars.color.primary}`,
      },
    },
  ],

  defaultVariants: {
    active: false,
    line: true,
  },
});
