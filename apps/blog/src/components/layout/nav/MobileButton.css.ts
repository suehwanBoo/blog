import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const mobileButtonWrapper = style({
  "@media": {
    "screen and (min-width: 1024px)": {
      display: "none",
    },
  },
});

const mobileMenu = recipe({
  base: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    marginTop: 81,
    height: "calc(100vh - 81px)",
    background: themeVars.color.background,
    display: "flex",
    flexDirection: "column",
    padding: 16,
    gap: 32,
    opacity: 0,
    pointerEvents: "none",
    transform: "translateY(-12px)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  },

  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateY(0)",
      },
      false: {},
    },
  },

  defaultVariants: {
    open: false,
  },
});

const hamburgerButton = recipe({
  base: {
    width: 40,
    height: 40,
    border: 0,
    background: "transparent",
    cursor: "pointer",
    position: "relative",
    padding: 0,

    selectors: {
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 24,
        height: 2,
        background: themeVars.color.subtitle,
        borderRadius: 999,
        transformOrigin: "center",
        transition: "transform 200ms ease, box-shadow 200ms ease",
      },

      "&::before": {
        transform: "translate(-50%, -50%) translateY(-5px)",
        boxShadow: `0 5px 0 ${themeVars.color.subtitle}`,
      },

      "&::after": {
        transform: "translate(-50%, -50%) translateY(5px)",
      },
    },
  },

  variants: {
    open: {
      true: {
        selectors: {
          "&::before": {
            transform: "translate(-50%, -50%) rotate(45deg)",
            boxShadow: "0 0 0 transparent",
          },

          "&::after": {
            transform: "translate(-50%, -50%) rotate(-45deg)",
          },
        },
      },

      false: {},
    },
  },

  defaultVariants: {
    open: false,
  },
});

const link = style({
  color: themeVars.color.subtitle,
  fontSize: 20,
  textDecoration: "none",
  cursor: "pointer",
  border: 0,
  background: "transparent",
  font: "inherit",
  width: "fit-content",
  padding: 0,
});

export const mobileButtonStyles = {
  mobileButtonWrapper,
  mobileMenu,
  hamburgerButton,
  link,
};
