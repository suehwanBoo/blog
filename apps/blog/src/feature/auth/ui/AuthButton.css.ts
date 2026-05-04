import { themeVars, typography } from "@boo/ui";
import { keyframes, style } from "@vanilla-extract/css";

const wrapper = style({
  minWidth: "0 !important",
  width: `min(calc(100vw - 32px), 320px) !important`,
});

const authBody = style({
  display: "flex",
  flexDirection: "column",
  gap: 50,
  paddingBottom: `0 !important`,
});

const authDescription = style({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 21,
});

const welcome = style([
  typography.body1r,
  {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    color: themeVars.color.title,
  },
]);

const buttonGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const button = style([
  typography.body1r,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    boxSizing: "border-box",
    padding: 0,
    gap: 15,
    cursor: "pointer",
    background: themeVars.color.default,
    border: `1px solid ${themeVars.color.disabled}`,
    borderRadius: 4,
    width: "100%",
    height: 54,
    color: themeVars.color.title,
  },
]);

const loading = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.3)",
});

const spin = keyframes({
  from: {
    transform: `rotate(0deg)`,
  },
  to: {
    transform: `rotate(360deg)`,
  },
});

const spinner = style({
  width: 40,
  height: 40,
  border: `4px solid #e5e7eb`,
  borderTopColor: "#3b82f6",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`, // ✅ 수정
});

const logout = style({
  margin: 0,
  padding: 0,
  lineHeight: 0,
  background: "transparent",
  border: 0,
  cursor: "pointer",
  color: themeVars.color.title,
});

export const authButtonStyles = {
  authBody,
  authDescription,
  welcome,
  buttonGroup,
  button,
  wrapper,
  loading,
  spinner,
  logout,
};
