import { Button, SearchInput } from "@boo/ui";
import { navStyle } from "./Navbar.css";

export default function Navbar() {
  return (
    <nav className={navStyle.navWrapper}>
      <picture style={{ display: "block", lineHeight: "0" }}>
        <source srcSet="FullLogox2.webp" type="image/webp" />
        <img
          src={"FullLogox2.png"}
          width={140}
          height={"auto"}
          alt="full-logo"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className={navStyle.buttonWrapper}>
        <SearchInput size="small" placeholder="검색" aria-label="all-search" />
        <Button size="large" ariaLabel="subscribe" state="active">
          Subscribe
        </Button>
        <Button size="large" ariaLabel="Sign in" state="default">
          Sign in
        </Button>
      </div>
    </nav>
  );
}
