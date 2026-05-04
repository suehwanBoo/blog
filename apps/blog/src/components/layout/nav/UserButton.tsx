import AuthButton from "@/feature/auth/ui/AuthButton";
import { Tooltip } from "@boo/ui/client";
import { userButtonStyle as styles } from "./UserButton.css";

const UserButton = Object.assign(() => <></>, {
  Signin,
  Logout,
});

export default UserButton;

function Signin() {
  return (
    <Tooltip content="로그인" placement="bottom">
      <AuthButton />
    </Tooltip>
  );
}

function Logout() {
  return (
    <Tooltip content="로그아웃" placement="bottom">
      <button aria-label="log out" className={styles.logout}>
        <User />
      </button>
    </Tooltip>
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
