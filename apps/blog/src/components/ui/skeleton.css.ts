import { themeVars } from "@boo/ui";
import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const shimmerAnimation = keyframes({
  from: {
    transform: `translateX(-100%)`,
  },
  to: {
    transform: `translateX(100%)`,
  },
});

export const skeleton = recipe({
  base: {
    position: "relative",
    overflow: "hidden",
  },
  variants: {
    loading: {
      true: {
        background: themeVars.color.disabled,

        selectors: {
          "&::after": {
            content: "",
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            animation: `${shimmerAnimation} 1.5s infinite`,
          },
        },
      },
      false: {
        selectors: {
          "&::after": {
            content: "none",
          },
        },
      },
    },
  },
});
