import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../../theme/theme.css";

const wrapper = style({
  width: "fit-content",
  height: "fit-content",
  minWidth: "0",
  position: "relative",
  minHeight: "0",
  margin: 0,
  padding: 0,
  border: 0,
});

const iconWidth = createVar();
const iconHeight = createVar();

const input = recipe({
  base: {
    vars: {
      [iconWidth]: "24px",
      [iconHeight]: "24px",
    },
    minHeight: iconHeight,
    "::-webkit-search-cancel-button": {
      display: "none",
    },
    "::-webkit-search-results-button": {
      display: "none",
    },
  },
  variants: {
    size: {
      large: {
        padding: `20px  calc(20px + ${iconWidth} + 10px) 20px 20px`,
      },
      small: {
        padding: `12px  calc(20px + ${iconWidth} + 10px) 12px 20px`,
      },
    },
  },
});

const button = recipe({
  base: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "20px",
    color: themeVars.color.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "fit-content",
    padding: 0,
    border: 0,
    background: "none",
    lineHeight: 0,
  },
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
      },
      false: {},
    },
  },
});

export const SearchInputStyle = {
  wrapper,
  input,
  button,
};
