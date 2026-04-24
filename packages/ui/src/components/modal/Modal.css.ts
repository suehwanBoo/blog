import { keyframes, style } from "@vanilla-extract/css";
import { themeVars } from "../../theme/theme.css";
import { typography } from "../../font/typography.css";

const modalIn = keyframes({
  from: {
    opacity: 0,
    transform: "scale(0.96)",
  },
  to: {
    opacity: 1,
    transform: "scale(1)",
  },
});

const wrapper = style({
  minWidth: 320,
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  boxShadow: `0 4 10 rgba(0,0,0,0,1)`,
  animation: `${modalIn} 0.2s ease-out`,
});

const header = style([
  typography.sub1b,
  {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "8px 8px 0 0",
    display: "flex",
    justifyContent: "space-between",
    border: `1px solid ${themeVars.color.clicked}`,
    borderBottom: "none",
    color: themeVars.color.title,
    background: themeVars.color.default,
  },
]);

const title = style([
  typography.sub1b,
  {
    margin: 0,
    padding: 0,
  },
]);

const button = style({
  all: "unset",
  cursor: "pointer",
});

const body = style({
  width: "100%",
  padding: "0 20px 12px 20px",
  border: `1px solid ${themeVars.color.clicked}`,
  borderTop: "none",
  borderBottom: "none",
  background: themeVars.color.default,
  color: themeVars.color.title,
});

const footer = style({
  display: "flex",
  width: "100%",
  borderRadius: `0 0 8px 8px`,
  padding: "15px 20px",
  border: `1px solid ${themeVars.color.clicked}`,
  borderTop: "none",
  background: themeVars.color.default,
  gap: 8,
  justifyContent: "flex-end",
});

export const ModalStyle = {
  wrapper,
  header,
  title,
  body,
  footer,
  button,
};
