import { themeVars } from "@boo/ui";
import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 0",
  borderBottom: `1px solid ${themeVars.color.active}`,
  alignItems: "center",
});

const buttonWrapper = style({
  display: "flex",
  gap: 12,
  flexShrink: 0,
});

const button = style({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  gap: 6,
  margin: 0,
  border: `1px solid ${themeVars.color.active}`,
  borderRadius: 50,
  backgroundColor: "transparent",
  color: themeVars.color.title,
  cursor: "pointer",
});

export const pageMetaStyles = { wrapper, button, buttonWrapper };
