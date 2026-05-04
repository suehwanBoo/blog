import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";
import { typography } from "../../font/typography.css";
import { style } from "@vanilla-extract/css";

const offset = "0.5rem";
const arrowSize = "0.5rem";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
});

export const tooltipRecipe = recipe({
  base: [
    typography.cap1r,
    {
      position: "absolute",
      zIndex: themeVars.zIndex.dropdown,
      width: "max-content",
      maxWidth: "15rem",
      padding: `${themeVars.space.sm} ${themeVars.space.md}`,
      borderRadius: themeVars.radius.sm,
      background: "#2e1f20",
      color: "#fff",
      boxShadow: themeVars.shadow.md,
      pointerEvents: "none",
      textAlign: "center",
      wordBreak: "break-word",
      opacity: 0,
      visibility: "hidden",
      transition: `${themeVars.motion.durationFast} ${themeVars.motion.easingStandard}`,
    },
  ],
  variants: {
    placement: {
      top: {
        bottom: `calc(100% + ${offset})`,
        left: "50%",
        transform: "translate(-50%, 0.25rem)",
      },
      right: {
        top: "50%",
        left: `calc(100% + ${offset})`,
        transform: "translate(-0.25rem, -50%)",
      },
      bottom: {
        top: `calc(100% + ${offset})`,
        left: "50%",
        transform: "translate(-50%, -0.25rem)",
      },
      left: {
        top: "50%",
        right: `calc(100% + ${offset})`,
        transform: "translate(0.25rem, -50%)",
      },
    },
    open: {
      true: {
        opacity: 1,
        visibility: "visible",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { placement: "top", open: true },
      style: {
        transform: "translate(-50%, 0)",
      },
    },
    {
      variants: { placement: "right", open: true },
      style: {
        transform: "translate(0, -50%)",
      },
    },
    {
      variants: { placement: "bottom", open: true },
      style: {
        transform: "translate(-50%, 0)",
      },
    },
    {
      variants: { placement: "left", open: true },
      style: {
        transform: "translate(0, -50%)",
      },
    },
  ],
});

export const arrowRecipe = recipe({
  base: {
    position: "absolute",
    width: arrowSize,
    height: arrowSize,
    background: "#2e1f20",
    transform: "rotate(45deg)",
  },
  variants: {
    placement: {
      top: {
        bottom: "-0.25rem",
        left: "50%",
        marginLeft: "-0.25rem",
      },
      right: {
        left: "-0.25rem",
        top: "50%",
        marginTop: "-0.25rem",
      },
      bottom: {
        top: "-0.25rem",
        left: "50%",
        marginLeft: "-0.25rem",
      },
      left: {
        right: "-0.25rem",
        top: "50%",
        marginTop: "-0.25rem",
      },
    },
  },
});
