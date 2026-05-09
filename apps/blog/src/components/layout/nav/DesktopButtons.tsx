"use client";

import { navStyle as styles } from "./Navbar.css";
import ThemeButton from "./ThemeButton";
import { useAuthStore } from "@/store/store";
import Subscribe from "@/feature/subscribe/ui/Subscribe";
import AuthButton from "@/feature/auth/ui/AuthButton";
import Search from "@/feature/search/ui/Search";

export default function DesktopButtons() {
  const { auth } = useAuthStore();
  return (
    <div className={styles.buttonWrapper}>
      {auth ? <UserButtons /> : <AnonyUserButtons />}
    </div>
  );
}

function AnonyUserButtons() {
  return (
    <>
      <ThemeButton.Anonymous />
      <Search.Input />
      <Subscribe.Anonymous />
      <AuthButton.Signin />
    </>
  );
}

function UserButtons() {
  return (
    <div className={styles.userButtonWrapper}>
      <ThemeButton.User />
      <Search.Button />
      <Subscribe.User />
      <AuthButton.Logout />
    </div>
  );
}
