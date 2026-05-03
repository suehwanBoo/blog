import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export default function useAuthSubscription() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    let unsubscribe: VoidFunction | undefined;
    let cancelled = false;

    const subscribe = async () => {
      const { subscribeAuthHandler } =
        await import("@/utils/firebase/firebase");

      if (cancelled) return;

      unsubscribe = subscribeAuthHandler((user) => {
        if (!user) {
          logout();
          return;
        }
        login(user);
      });
    };

    subscribe();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [login, logout]);
}
