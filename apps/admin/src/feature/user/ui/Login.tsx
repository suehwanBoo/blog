import type { ButtonHTMLAttributes } from "react";
import { AUTH_GROUP, type AuthGroup } from "../constant";
import { loginStyles as styles } from "./Login.css";
import useFirebaseLogin from "../hooks/useFirebaseLogin";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginButtons />
    </div>
  );
}

function LoginButtons() {
  const { login } = useFirebaseLogin();

  return (
    <>
      <SocialButton {...AUTH_GROUP.google} onClick={() => login("google")} />
      <SocialButton {...AUTH_GROUP.github} onClick={() => login("github")} />
    </>
  );
}

function SocialButton({
  icon,
  label,
  ...rest
}: AuthGroup & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={styles.button} type="button">
      <>{icon()}</>
      <span>{label} 계정으로 로그인</span>
    </button>
  );
}
