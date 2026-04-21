import { darkTheme, lightTheme } from "@boo/theme";

// theme
export const THEME_KEY = "theme";

export const themeMap = {
  light: lightTheme,
  dark: darkTheme,
} as const;
