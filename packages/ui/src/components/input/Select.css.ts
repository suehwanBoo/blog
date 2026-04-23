import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";
import { typography } from "../../font/typography.css";

const wrapper = style([
  typography.body2r,
  {
    minWidth: 0,
    minHeight: 0,
    width: "fit-content",
    height: "fit-content",
    position: "relative",
    display: "inline-grid",
  },
]);

const commonStyle = {
  padding: "0 18px",
  background: themeVars.color.default,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "30px",
};

const sizer = style({
  ...commonStyle,
  gridArea: "1 / 1",
  visibility: "hidden",
  pointerEvents: "none",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  gap: "12px",
  border: `1px solid transparent`,
  borderRadius: 5,
});

const trigger = recipe({
  base: {
    ...commonStyle,
    gridArea: "1 / 1",
    border: `1px solid ${themeVars.color.disabled}`,
    borderRadius: 5,
    color: themeVars.color.title,
    gap: "12px",
    cursor: "pointer",
    padding: "0 18px",
  },
  variants: {
    open: {
      true: {
        background: themeVars.color.clicked,
      },
      false: {},
    },
    disabled: {
      true: {
        background: themeVars.color.disabled,
        color: themeVars.color.subtitle,
        cursor: "not-allowed",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        disabled: true,
        open: true,
      },
      style: {
        background: themeVars.color.disabled,
        color: themeVars.color.subtitle,
      },
    },
  ],
});

const buttonWrapper = style({
  all: "unset",
  position: "absolute",
  top: "calc(100% + 5px)",
  left: 0,
  width: "100%",
  background: themeVars.color.default,
  borderRadius: 5,
  border: `1px solid ${themeVars.color.disabled}`,
  overflow: "hidden",
  zIndex: 10,
});

const buttonLi = style({
  all: "unset",
});

const button = recipe({
  base: [
    {
      all: "unset",
      boxSizing: "border-box",
      width: "100%",
      appearance: "none",
      padding: "0 17px",
      textAlign: "left",
      cursor: "pointer",
      background: themeVars.color.default,
      minHeight: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      color: themeVars.color.subtitle,
      borderBottom: `1px solid ${themeVars.color.disabled}`,
      ":hover": {
        background: themeVars.color.active,
        color: themeVars.color.title,
      },
    },
  ],
  variants: {
    last: {
      false: {},
      true: {
        borderBottom: "none",
      },
    },
  },
});

export const icon = recipe({
  base: {
    transition: "transform 0.3s ease",
  },
  variants: {
    open: {
      true: {
        transform: "rotate(180deg)",
      },
      false: {
        transform: "rotate(0deg)",
      },
    },
  },
});

export const SelectStyles = {
  wrapper,
  sizer,
  trigger,
  buttonWrapper,
  buttonLi,
  button,
  icon,
};
