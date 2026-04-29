import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const wrapper = style({
  display: "flex",
  gap: 12,
  flexDirection: "column",
  paddingBottom: 20,
  borderBottom: `1px solid ${themeVars.color.active}`,
});

const title = style([
  typography.sub2b,
  {
    color: themeVars.color.primary,
  },
]);

const tagBox = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 0,
  margin: 0,
  listStyle: "none",
});

const tagButton = recipe({
  base: [
    typography.body2r,
    {
      margin: 0,
      background: themeVars.color.default,
      border: `1px solid ${themeVars.color.active}`,
      boxShadow: `4px 4px 4px rgba(0, 0, 0, 0.02)`,
      color: themeVars.color.subtitle,
      padding: "4px 12px",
      borderRadius: 30,
      cursor: "pointer",

      transition: "all 0.15s ease",

      selectors: {
        "&:hover": {
          boxShadow: "4px 4px 4px rgba(0,0,0,0.05)",
        },
      },
    },
  ],
  variants: {
    active: {
      true: {
        border: `1px solid ${themeVars.color.primary}`,
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const tagSelectorStyles = { wrapper, title, tagBox, tagButton };
