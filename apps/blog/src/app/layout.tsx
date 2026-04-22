import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeScript } from "./ThemeScript";
import { themeVars } from "@boo/theme";

const Pretendard = localFont({
  src: "../../../../packages/font/assets/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
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
