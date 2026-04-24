import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeScript } from "./ThemeScript";
import { themeVars } from "@boo/ui";
import "../../styles/reset.css";

const Pretendard = localFont({
  src: [
    {
      path: "../../../../packages/font/assets/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../../../../packages/font/assets/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "not yet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.className} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body style={{ background: themeVars.color.background }}>{children}</body>
    </html>
  );
}
