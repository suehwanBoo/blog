import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/nav/Navbar";
import type { PropsWithChildren } from "react";
import { homeLayout } from "./layout.css";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <main className={homeLayout}>{children}</main>
    </>
  );
}
