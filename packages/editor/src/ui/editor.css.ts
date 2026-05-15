import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@boo/ui";

export const editorRoot = style({
  color: themeVars.color.title,
  wordBreak: "keep-all",
  overflowWrap: "break-word",
});

export const viewerRoot = style({
  color: themeVars.color.title,
  wordBreak: "keep-all",
  overflowWrap: "break-word",
});

const editorContent = `${editorRoot} > .tiptap`;
const viewContent = viewerRoot;

const block = (selector: string) =>
  `${editorContent} > ${selector}, ${viewContent} > ${selector}`;

const inline = (selector: string) =>
  `${editorContent} ${selector}, ${viewContent} ${selector}`;

globalStyle(editorContent, {
  minHeight: 400,
  outline: "none",
});

globalStyle(block(":first-child"), {
  marginTop: 0,
});

globalStyle(block(":last-child"), {
  marginBottom: 0,
});

globalStyle(block("p"), {
  margin: 0,
  color: themeVars.color.title,
  fontSize: 15,
  lineHeight: "140%",
});

globalStyle(block("h2"), {
  margin: "36px 0 14px",
  paddingBottom: 8,
  borderBottom: `1px solid ${themeVars.color.disabled}`,
  color: themeVars.color.title,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.45,
});

globalStyle(block("h3"), {
  margin: "28px 0 10px",
  color: themeVars.color.title,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.5,
});

globalStyle(block("h4"), {
  margin: "22px 0 8px",
  color: themeVars.color.title,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.55,
});

globalStyle(inline("strong"), {
  fontWeight: 700,
});

globalStyle(inline("em"), {
  fontStyle: "italic",
});

globalStyle(inline("u"), {
  textUnderlineOffset: "3px",
  textDecorationThickness: "1px",
});

globalStyle(inline("s"), {
  color: themeVars.color.title,
  textDecorationColor: themeVars.color.title,
});

globalStyle(inline("mark"), {
  borderRadius: 3,
  background: "rgba(248, 191, 0, 0.18)",
  color: "inherit",
  padding: "0 0.14em",
});

globalStyle(block("blockquote"), {
  margin: "18px 0",
  borderLeft: `3px solid ${themeVars.color.primary}`,
  color: themeVars.color.title,
  padding: `1px 0 1px ${themeVars.space.md}`,
});

globalStyle(`${editorContent} blockquote p, ${viewContent} blockquote p`, {
  margin: 0,
  color: "inherit",
});

globalStyle(block("ul"), {
  margin: "10px 0 14px",
  paddingLeft: "1.45em",
  listStyleType: "disc",
});

globalStyle(block("ol"), {
  margin: "10px 0 14px",
  paddingLeft: "1.45em",
  listStyleType: "decimal",
});

globalStyle(inline("li"), {
  margin: "4px 0",
  paddingLeft: 2,
  lineHeight: 1.7,
});

globalStyle(inline("li ul, li ol"), {
  margin: "4px 0",
});

globalStyle(inline("li::marker"), {
  color: themeVars.color.subtitle,
  fontWeight: 700,
});

globalStyle(inline("li > p"), {
  margin: 0,
});

globalStyle(block("hr"), {
  height: 1,
  margin: "28px 0",
  border: 0,
  background: themeVars.color.disabled,
});

globalStyle(block("img"), {
  display: "block",
  maxWidth: "100%",
  height: "auto",
  margin: "20px auto",
  borderRadius: themeVars.radius.md,
});

globalStyle(block("pre"), {
  margin: "18px 0",
  overflowX: "auto",
  whiteSpace: "pre",
  border: `1px solid ${themeVars.color.clicked}`,
  borderRadius: themeVars.radius.md,
  background: themeVars.color.default,
  color: themeVars.color.title,
  padding: `${themeVars.space.md} ${themeVars.space.lg}`,
});

globalStyle(inline("pre, code"), {
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
});

globalStyle(inline("pre code"), {
  display: "block",
  minWidth: "max-content",
  color: "inherit",
  fontSize: 14,
  lineHeight: 1.75,
  tabSize: 2,
});

globalStyle(inline("code:not(pre code)"), {
  borderRadius: themeVars.radius.sm,
  background: "rgba(127, 127, 127, 0.12)",
  color: "inherit",
  padding: "0.12em 0.32em",
  fontSize: "0.92em",
});

globalStyle(inline(".hljs-comment"), {
  color: themeVars.color.subtitle,
});

globalStyle(inline(".hljs-keyword"), {
  color: "#b85c38",
});

globalStyle(inline(".hljs-string"), {
  color: "#2f7d5c",
});

globalStyle(inline(".hljs-number"), {
  color: "#9a6a1f",
});

globalStyle(
  inline(".hljs-title, .hljs-title.function_, .hljs-property, .hljs-attr"),
  {
    color: "#7a5f9a",
  },
);

globalStyle(inline(".hljs-literal, .hljs-built_in, .hljs-type"), {
  color: "#8a5a44",
});

globalStyle(block('[data-type="component"]'), {
  margin: "20px 0",
});

globalStyle(`${editorRoot} .ProseMirror-selectednode`, {
  outline: `2px solid ${themeVars.color.disabled}`,
  outlineOffset: 3,
});

globalStyle(`${editorRoot} ::selection, ${viewerRoot} ::selection`, {
  background: "rgba(127, 127, 127, 0.2)",
  color: themeVars.color.title,
});
