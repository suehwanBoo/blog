import { themeVars } from "@boo/ui";
import { recipe } from "@vanilla-extract/recipes";

const button = recipe({
  base: {
    background: "transparent",
    lineHeight: 0,
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    outline: "none",
    border: "none",
    cursor: "pointer",
  },
  variants: {
    active: {
      true: {
        color: themeVars.color.primary,
      },
      false: {
        color: themeVars.color.subtitle,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const buttonStyles = { button };
