import { themeVars } from "@boo/ui";
import { recipe } from "@vanilla-extract/recipes";

export const headerRecipe = recipe({
  base: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    width: "100%",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    borderBottom: `1px solid ${themeVars.color.active}`,
    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.1)",
    background: themeVars.color.background,
  },
  variants: {
    show: {
      true: {
        transform: "translateY(0)",
        opacity: 1,
      },
      false: {
        transform: "translateY(-100%)",
        opacity: 0,
      },
    },
  },
});
