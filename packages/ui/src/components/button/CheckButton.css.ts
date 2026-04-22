import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";

export const checkbox = recipe({
  base: {
    width: "20px",
    height: "20px",
    borderRadius: themeVars.radius.md,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: `2px solid ${themeVars.color.primary}`,
    background: themeVars.color.default,
    transition:
      "background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
    flexShrink: 0,
    cursor: "pointer",
  },

  variants: {
    checked: {
      false: {
        background: themeVars.color.default,
        borderColor: themeVars.color.primary,
      },
      true: {
        background: themeVars.color.primary,
        borderColor: themeVars.color.primary,
      },
    },

    disabled: {
      false: {},
      true: {
        background: themeVars.color.disabled,
        borderColor: themeVars.color.disabled,
        opacity: 0.7,
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        checked: true,
        disabled: true,
      },
      style: {
        background: themeVars.color.disabled,
        borderColor: themeVars.color.disabled,
      },
    },
  ],

  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

export const checkIconRecipe = recipe({
  base: {
    opacity: 0,
    transform: "scale(0.8)",
    transition: "opacity 0.15s ease, transform 0.15s ease",
    flexShrink: 0,
    color: themeVars.color.default,
  },

  variants: {
    checked: {
      false: {
        opacity: 0,
        transform: "scale(0.8)",
      },
      true: {
        opacity: 1,
        transform: "scale(1)",
      },
    },
  },

  defaultVariants: {
    checked: false,
  },
});
