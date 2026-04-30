import { Modal } from "@boo/ui";
import { AUTH_GROUP, type AuthGroup } from "../../constant";
import { authButtonStyles as styles } from "./AuthButton.css";
import { useState, type ButtonHTMLAttributes } from "react";
import { getLogin, type LoginKey } from "@/utils/firebase/firebase";
import {
  AUTH_ERROR_HANDLER,
  isAuthErrorCode,
  isFirebaseError,
} from "../../utils";

export default function AuthModal({ close }: { close: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const loginWith = async (key: LoginKey) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await getLogin(key)();
      close();
    } catch (err) {
      if (isFirebaseError(err) && isAuthErrorCode(err.code)) {
        AUTH_ERROR_HANDLER[err.code]();
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal ariaLabel="auth modal" className={styles.wrapper}>
      <Modal.Header title="로그인" closeHandler={close} />
      <Modal.Body className={styles.authBody}>
        <div className={styles.authDescription}>
          <img
            src={"../../../../icon1.png"}
            alt="app-logo"
            width={36}
            height={36}
          />
          <div className={styles.welcome}>
            <p>환영합니다.</p>
            <p>소셜 계정으로 간편하게 로그인하세요.</p>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <SocialButton
            {...AUTH_GROUP.google}
            onClick={() => loginWith("google")}
          />
          <SocialButton
            {...AUTH_GROUP.github}
            onClick={() => loginWith("github")}
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
