import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/nav/Navbar";
import { commonLayout } from "@/styles/layout.css";
import type { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <main className={commonLayout}>{children}</main>
    </>
  );
}
