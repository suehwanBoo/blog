"use client";

import { TabMenu } from "@boo/ui";
import Link from "next/link";
import { navStyle as styles } from "./Navbar.css";
import { usePathname } from "next/navigation";

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

  return (
    <TabMenu className={styles.bottomWrapper} role="tablist">
      {menus.map(({ label, href, exact }) => (
        <TabMenu.Button
          key={href}
          active={isActive(pathname, href, exact)}
          line={false}
          asChild
        >
          <Link href={href}>{label}</Link>
        </TabMenu.Button>
      ))}
    </TabMenu>
  );
}
