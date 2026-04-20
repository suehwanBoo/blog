import type { Metadata } from "next";
import localFont from "next/font/local";
import { getTheme } from "@/utils/server/getTheme";
import clsx from "clsx";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Theme = await getTheme();
  return (
    <html lang="ko" className={clsx([Pretendard.className, Theme.className])}>
      <body>{children}</body>
    </html>
  );
}
