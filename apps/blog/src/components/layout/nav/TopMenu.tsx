import { navStyle as styles } from "./Navbar.css";
import { ThemeProvider } from "@/context/theme-context";
import Logo from "./Logo";
import DesktopButtons from "./DesktopButtons";
import MobileButtons from "./MobileButtons";

export default function TopMenu() {
  return (
    <div className={styles.topWrapper}>
      <ThemeProvider>
        <Logo />
        <DesktopButtons />
        <MobileButtons />
      </ThemeProvider>
    </div>
  );
}
