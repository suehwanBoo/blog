"use client";

import { THEME_KEY } from "@/constant";
import { Theme } from "@/types";
import { darkTheme, lightTheme } from "@boo/theme";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove(lightTheme, darkTheme);
  root.classList.add(theme === "dark" ? darkTheme : lightTheme);
  root.dataset.theme = theme;

  localStorage.setItem(THEME_KEY, theme);
}

function getInitialTheme(): Theme {
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

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      mounted,
      setTheme,
      toggleTheme,
    }),
    [theme, mounted, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must used in ThemeProvider");
  return ctx;
}
