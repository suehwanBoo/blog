import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";

export const switchRecipe = recipe({
  base: {
    all: "unset",
    cursor: "pointer",
    boxSizing: "border-box",
    padding: "2px",
    borderRadius: "9999px",
    width: 46,
    height: 24,
    background: themeVars.color.active,
    display: "inline-flex",
    alignItems: "center",
    overflow: "hidden",
  },
  variants: {
    checked: {
      false: {
        background: themeVars.color.active,
      },
      true: {
        background: themeVars.color.primary,
      },
    },

    disabled: {
      false: {
        cursor: "pointer",
      },
      true: {
        cursor: "not-allowed",
        background: themeVars.color.disabled,
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
      },
    },
  ],

  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

export const thumbRecipe = recipe({
  base: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease",
    transform: "translateX(0)",
    flexShrink: 0,
  },

  variants: {
    checked: {
      false: {
        transform: "translateX(0)",
      },
      true: {
        transform: "translateX(22px)",
      },
    },

    disabled: {
      false: {},
      true: {},
    },
  },

  defaultVariants: {
    checked: false,
    disabled: false,
  },
});
