import { style } from "@vanilla-extract/css";

const navWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const buttonWrapper = style({
  display: "flex",
  height: "100%",
  alignItems: "center",
  gap: 8,
});

export const navStyle = {
  navWrapper,
  buttonWrapper,
};
