import { style } from "@vanilla-extract/css";
import { themeVars } from "../../theme/theme.css";
import { recipe } from "@vanilla-extract/recipes";
import { typography } from "../../font/typography.css";

const wrapper = style({
  display: "inline-flex",
  padding: "12px 16px",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: `1px solid ${themeVars.color.disabled}`,
  minWidth: "267px",
});

const button = recipe({
  base: {
    all: "unset",
    cursor: "pointer",
    width: 36,
    height: 36,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: themeVars.color.default,
    border: `1px solid ${themeVars.color.disabled}`,
    color: themeVars.color.subtitle,
  },
  variants: {
    direct: {
      left: {
        transform: "rotate(0deg)",
      },
      right: {
        transform: "rotate(180deg)",
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
      },
      false: {
        cursor: "pointer",
      },
    },
  },
});

const page = style([
  typography.body2r,
  {
    color: themeVars.color.subtitle,
  },
]);

export const PaginationStyle = {
  wrapper,
  button,
  page,
};
