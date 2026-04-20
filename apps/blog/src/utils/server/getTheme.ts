import { THEME_KEY, themeMap } from "@/constant";
import { cookies } from "next/headers";
import { Theme } from "@/types";

export const getTheme = async () => {
  const raw = (await cookies()).get(THEME_KEY)?.value;

  if (raw && raw in themeMap) {
    return { className: themeMap[raw as Theme], theme: raw as Theme };
  }

  return { className: themeMap.light, theme: "light" as Theme };
};
