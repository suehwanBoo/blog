import Header from "@/components/layout/Header";
import TopMenu from "@/components/layout/nav/TopMenu";
import type { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <TopMenu />
      </Header>
      <main>{children}</main>
    </>
  );
}
