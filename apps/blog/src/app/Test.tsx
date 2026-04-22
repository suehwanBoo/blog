"use client";

import { useTheme } from "@/context/theme-context";

export default function Test() {
  const { mounted, theme, toggleTheme } = useTheme();

  if (!mounted) return <button>로딩중</button>;

  return <button onClick={toggleTheme}>{theme} 전환</button>;
}
