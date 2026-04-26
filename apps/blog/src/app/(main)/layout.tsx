import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { darkTheme, lightTheme } from "@boo/ui";
import { themeVars } from "@boo/ui";
import type { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  console.log(themeVars.color.active);
  console.log(lightTheme);
  console.log(darkTheme);
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <div style={{ height: "200vh" }}></div>
      {children}
    </>
  );
}
