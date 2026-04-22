import { themeVars } from "@boo/theme";
import { recipe } from "@vanilla-extract/recipes";

export const radioBoxRecipe = recipe({
  base: {
    border: `2px solid ${themeVars.color.primary}`,
    borderRadius: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    boxSizing: "border-box",
    background: themeVars.color.default,
    transition:
      "background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
    flexShrink: 0,
    cursor: "pointer",
  },

  variants: {
    disabled: {
      false: {
        borderColor: themeVars.color.primary,
      },
      true: {
        borderColor: themeVars.color.disabled,
        opacity: 0.7,
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

export const radioIconRecipe = recipe({
  base: {
    width: 12,
    height: 12,
    transform: "scale(0.8)",
    transition: "0.15s ease",
    flexShrink: 0,
    borderRadius: "100%",
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
        backgroundColor: themeVars.color.primary,
      },
    },
    disabled: {
      false: {},
      true: {
        backgroundColor: themeVars.color.disabled,
        opacity: 0.7,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        checked: false,
        disabled: true,
      },
      style: {
        opacity: 0,
      },
    },
  ],

  defaultVariants: {
    checked: false,
    disabled: false,
  },
});
