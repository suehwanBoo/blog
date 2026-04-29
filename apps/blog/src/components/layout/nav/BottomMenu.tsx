"use client";

import { TabMenu } from "@boo/ui";
import Link from "next/link";
import { navStyle as styles } from "./Navbar.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menus = [
  { href: "/", label: "Home", exact: true },
  { href: "/post", label: "Post" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
export default function BottomMenu() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TabMenu className={styles.bottomWrapper} role="tablist">
      {menus.map(({ label, href, exact }) => {
        const active = mounted && isActive(pathname, href, exact);

        return (
          <TabMenu.Button key={href} active={active} line={false} asChild>
            <Link href={href}>{label}</Link>
          </TabMenu.Button>
        );
      })}
    </TabMenu>
  );
}
