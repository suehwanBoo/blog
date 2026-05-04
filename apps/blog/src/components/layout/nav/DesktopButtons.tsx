"use client";

import { navStyle as styles } from "./Navbar.css";
import ThemeButton from "./ThemeButton";
import { useAuthStore } from "@/store/store";
import Search from "./Search";
import UserButton from "./UserButton";
import Subscribe from "@/feature/subscribe/ui/Subscribe";

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
      <UserButton.Signin />
    </>
  );
}

function UserButtons() {
  return (
    <div className={styles.userButtonWrapper}>
      <ThemeButton.User />
      <Search.Button />
      <Subscribe.User />
      <UserButton.Logout />
    </div>
  );
}
