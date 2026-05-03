import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export default function useAuthSubscription() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    let unsubscribe: VoidFunction | undefined;

    const subscribe = async () => {
      const { subscribeAuthHandler } =
        await import("@/utils/firebase/firebase");

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
      unsubscribe?.();
    };
  }, [login, logout]);
}
