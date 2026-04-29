"use client";

import { useTheme } from "@/context/theme-context";

export default function Logo() {
  const { theme } = useTheme();

  const webp = theme === "light" ? "FullLogox2.webp" : "FullLogox2_dark.webp";
  const png = theme === "light" ? "FullLogox2.png" : "FullLogox2_dark.png";

  return (
    <picture style={{ display: "block", lineHeight: "0" }}>
      <source srcSet={webp} type="image/webp" />
      <img src={png} width={142} height={42} alt="full-logo" decoding="async" />
    </picture>
  );
}
