"use client";

import lightLogoPng from "@/assets/FullLogox2.png";
import lightLogoWebp from "@/assets/FullLogox2.webp";
import darkLogoPng from "@/assets/FullLogox2_dark.png";
import darkLogoWebp from "@/assets/FullLogox2_dark.webp";
import { useTheme } from "@/context/theme-context";

export default function Logo() {
  const { theme } = useTheme();

  const webp = theme === "light" ? lightLogoWebp : darkLogoWebp;
  const png = theme === "light" ? lightLogoPng : darkLogoPng;

  return (
    <picture style={{ display: "block", lineHeight: "0" }}>
      <source srcSet={webp.src} type="image/webp" />
      <img
        src={png.src}
        width={142}
        height={42}
        alt="full-logo"
        decoding="async"
      />
    </picture>
  );
}
