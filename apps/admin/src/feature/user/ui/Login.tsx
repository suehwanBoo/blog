import type { ButtonHTMLAttributes } from "react";
import { AUTH_GROUP, type AuthGroup } from "../constant";
import { loginStyles as styles } from "./Login.css";
import useFirebaseLogin from "../hooks/useFirebaseLogin";
import { useNavigate } from "react-router";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginButtons />
    </div>
  );
}

function LoginButtons() {
  const { login } = useFirebaseLogin();
  const navigate = useNavigate();
  const loginHandler = async (platform: "google" | "github") => {
    await login(platform);
    navigate("/editor");
  };
  return (
    <>
      <SocialButton
        {...AUTH_GROUP.google}
        onClick={() => loginHandler("google")}
      />
      <SocialButton
        {...AUTH_GROUP.github}
        onClick={() => loginHandler("github")}
      />
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
