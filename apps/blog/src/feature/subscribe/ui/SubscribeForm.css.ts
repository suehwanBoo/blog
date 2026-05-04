import { themeVars, typography } from "@boo/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const form = style({
  display: "flex",
  minWidth: 0,
  width: "100%",
  flexDirection: "column",
  gap: 8,
});
const wrapper = style({
  display: "flex",
  height: "100%",
  gap: 6,
  minWidth: 0,
});

const input = style({
  minWidth: 0,
  maxWidth: 220,
  width: "100%",
  flex: 1,
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
  defaultVariants: {
    error: false,
  },
});

export const subscribeFormStyles = { form, wrapper, input, hint };
