import { useToast } from "@boo/ui/client";
import { useCallback, useRef, useState } from "react";
import { AUTH_ERROR_HANDLER, isAuthErrorCode, isFirebaseError } from "../utils";

export default function useFirebaseLogin(close: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const isLoggingInRef = useRef(false);
  const { apply } = useToast();

  const login = useCallback(
    async (key: "github" | "google") => {
      if (isLoggingInRef.current) return;

      isLoggingInRef.current = true;
      setIsLoading(true);

      try {
        const { getLogin } = await import("@/utils/firebase/firebase");

        await getLogin(key)();

        close();

        apply({
          description: "로그인 성공",
          variant: "success",
          closable: true,
        });
      } catch (err) {
        const description =
          isFirebaseError(err) && isAuthErrorCode(err.code)
            ? AUTH_ERROR_HANDLER[err.code]
            : "알 수 없는 오류가 발생하였습니다.";

        apply({
          title: "로그인 실패",
          description,
          variant: "danger",
        });
      } finally {
        isLoggingInRef.current = false;
        setIsLoading(false);
      }
    },
    [close, apply],
  );

  return { login, isLoading };
}
