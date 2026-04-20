"use client";

import { THEME_KEY, themeMap } from "@/constant";
import { Theme } from "@/types";
import { useEffect, useState } from "react";

export default function useTheme(initialTheme: Theme) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const prev = themeMap[theme === "dark" ? "light" : "dark"];
    const current = themeMap[theme];
    document.documentElement.classList.replace(prev, current);
    document.cookie = `${THEME_KEY}=${theme}; path=/; max-age=31536000`;
  }, [theme]);

  return [theme, setTheme] as const;
}
