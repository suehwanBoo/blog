"use client";

import { useCallback, useRef, useState } from "react";
import { getLoginHandler, isAuthErrorCode, isFirebaseError } from "../utils";
import { AUTH_ERROR_MESSAGE } from "../constant";
import { useToast } from "@boo/ui/client";
import { useNavigate } from "react-router";

export default function useFirebaseLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const isLoggingInRef = useRef(false);
  const { apply } = useToast();
  const navigate = useNavigate();

  const login = useCallback(
    async (key: "github" | "google") => {
      if (isLoggingInRef.current) return;

      isLoggingInRef.current = true;
      setIsLoading(true);

      try {
        const loginFn = await getLoginHandler(key);
        await loginFn();
        apply({
          description: "로그인 성공",
          variant: "success",
          closable: true,
        });
        navigate("/editor");
      } catch (err) {
        const description =
          isFirebaseError(err) && isAuthErrorCode(err.code)
            ? AUTH_ERROR_MESSAGE[err.code]
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
    [apply],
  );

  return { login, isLoading };
}
