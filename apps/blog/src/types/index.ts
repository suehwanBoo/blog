import { themeMap } from "@/constant";

// theme
export type Theme = keyof typeof themeMap;

export type ValueOf<T> = T[keyof T];
