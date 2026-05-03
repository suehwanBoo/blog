"use client";

import { Button } from "@boo/ui";
import { navStyle as styles } from "./Navbar.css";
import ThemeButton from "./ThemeButton";
import AuthButton from "@/feature/auth/ui/AuthButton";
import { useAuthStore } from "@/store/store";
import Search from "./Search";

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
      <Button size="large" ariaLabel="subscribe" state="active">
        Subscribe
      </Button>
      <AuthButton />
    </>
  );
}

function UserButtons() {
  return (
    <div className={styles.userButtonWrapper}>
      <ThemeButton.User />
      <Search.Button />
      <MailBox />
      <User />
    </div>
  );
}

function MailBox() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.5 9H8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 8V4C17.5 2.89543 18.3954 2 19.5 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 18L12.5 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.5 5.15889C16.5351 5 15.2591 5 13.375 5H10.625C7.70671 5 6.24757 5 5.14302 5.59039C4.27088 6.05656 3.55656 6.77088 3.09039 7.64302C2.5 8.74757 2.5 10.2067 2.5 13.125C2.5 14.876 2.5 15.7515 2.85424 16.4142C3.13394 16.9375 3.56253 17.3661 4.08581 17.6458C4.74854 18 5.62403 18 7.375 18H16.625C18.376 18 19.2515 18 19.9142 17.6458C20.4375 17.3661 20.8661 16.9375 21.1458 16.4142C21.5 15.7515 21.5 14.876 21.5 13.125C21.5 10.2067 21.5 8.74757 20.9096 7.64302C20.7356 7.31755 20.5271 7.01406 20.2887 6.73725"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.5006 18V11C12.5006 10.071 12.5006 9.60649 12.439 9.21782C12.1002 7.07836 10.4222 5.40041 8.28276 5.06155C8.2009 5.04859 8.11566 5.03835 8.02344 5.03027"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function User() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
