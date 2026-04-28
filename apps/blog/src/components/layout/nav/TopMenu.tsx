import { Button, SearchInput } from "@boo/ui";
import { navStyle as styles } from "./Navbar.css";
import ThemeButton from "./ThemeButton";
import { ThemeProvider } from "@/context/theme-context";
import Logo from "./Logo";

export default function TopMenu() {
  return (
    <ThemeProvider>
      <div className={styles.topWrapper}>
        <Logo />
        <div className={styles.buttonWrapper}>
          <ThemeButton />
          <SearchInput
            size="small"
            placeholder="검색"
            aria-label="all-search"
          />
          <Button size="large" ariaLabel="subscribe" state="active">
            Subscribe
          </Button>
          <Button size="large" ariaLabel="Sign in" state="default">
            Sign in
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
