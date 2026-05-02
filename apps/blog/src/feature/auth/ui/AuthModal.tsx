import { Modal } from "@boo/ui";
import { authButtonStyles as styles } from "./AuthButton.css";
import { type ButtonHTMLAttributes } from "react";
import appLogo from "@/assets/icon-72x60.png";
import { AUTH_GROUP, type AuthGroup } from "../constant";
import useFirebaseLogin from "../hooks/useFirebaseLogin";

export default function AuthModal({ close }: { close: () => void }) {
  const { isLoading, login } = useFirebaseLogin(close);
  return (
    <Modal ariaLabel="auth modal" className={styles.wrapper}>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <Modal.Header title="로그인" closeHandler={close} />
      <Modal.Body className={styles.authBody}>
        <div className={styles.authDescription}>
          <img src={appLogo.src} alt="app-logo" width={36} height={30} />
          <div className={styles.welcome}>
            <p>환영합니다.</p>
            <p>소셜 계정으로 간편하게 로그인하세요.</p>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <SocialButton
            {...AUTH_GROUP.google}
            onClick={() => login("google")}
          />
          <SocialButton
            {...AUTH_GROUP.github}
            onClick={() => login("github")}
          />
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
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
