import { darkTheme, lightTheme } from "@boo/ui";

// theme
export const THEME_KEY = "theme";

export const themeMap = {
  light: lightTheme,
  dark: darkTheme,
} as const;
