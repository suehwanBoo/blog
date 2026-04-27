import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import type { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      {children}
    </>
  );
}
