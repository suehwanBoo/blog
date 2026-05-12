import { useAuthStore } from "@/store/store";
import { useEffect } from "react";
import { subscribeAuthHandler } from "../utils";
import { useToast } from "@boo/ui/client";

export default function useAuthSubscription() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const { apply } = useToast();

  useEffect(() => {
    let unsubscribe: VoidFunction | undefined;
    let cancelled = false;

    const subscribe = async () => {
      if (cancelled) return;

      unsubscribe = subscribeAuthHandler(async (user) => {
        if (!user) {
          logout();
          return;
        }
        const tokenResult = await user.getIdTokenResult();
        if (tokenResult.claims.role === "admin") login(user);
        else {
          apply({
            variant: "danger",
            description: "계정의 권한을 확인해주세요.",
          });
          logout();
        }
      });
    };

    subscribe();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [login, logout]);
}
