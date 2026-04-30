import { Button, SearchInput } from "@boo/ui";
import { navStyle as styles } from "./Navbar.css";
import ThemeButton from "./ThemeButton";
import AuthButton from "@/feature/auth/components/ui/AuthButton";

export default function DesktopButtons() {
  return (
    <div className={styles.buttonWrapper}>
      <ThemeButton />
      <SearchInput size="small" placeholder="검색" aria-label="all-search" />
      <Button size="large" ariaLabel="subscribe" state="active">
        Subscribe
      </Button>
      <AuthButton />
    </div>
  );
}
