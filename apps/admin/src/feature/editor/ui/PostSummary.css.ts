import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

const form = style({
  display: "flex",
  gap: 8,
});

const hint = recipe({
  base: [typography.cap1r],
  variants: {
    error: {
      true: {
        color: themeVars.color.alertDagner,
      },
      false: {
        color: themeVars.color.subtitle,
      },
    },
  },
});

export const postSummaryStyles = { wrapper, form, hint };
