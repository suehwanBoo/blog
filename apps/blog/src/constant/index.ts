import { darkTheme, lightTheme } from "../../../../packages/theme/src";

// theme
export const THEME_KEY = "theme";

export const themeMap = {
  light: lightTheme,
  dark: darkTheme,
} as const;
