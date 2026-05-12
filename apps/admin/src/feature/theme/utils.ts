import { darkTheme, lightTheme } from "@boo/ui";
import { THEME_KEY, type Theme } from "./types";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove(lightTheme, darkTheme);
  root.classList.add(theme === "dark" ? darkTheme : lightTheme);
  root.dataset.theme = theme;

  localStorage.setItem(THEME_KEY, theme);
}

export function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const fromDataset = document.documentElement.dataset.theme;
  if (fromDataset === "dark" || fromDataset === "light") {
    return fromDataset;
  }

  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
