import { style } from "@vanilla-extract/css";

const wrapper = style({
  "@media": {
    "screen and (max-width: 830px)": {
      padding: "0 15px",
    },
  },
  margin: "0 auto",
  maxWidth: 800,
  width: "100%",
});

export const pageStyles = { wrapper };
