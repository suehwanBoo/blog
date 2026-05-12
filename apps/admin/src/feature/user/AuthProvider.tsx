import type { PropsWithChildren } from "react";
import useAuthSubscription from "./hooks/useAuthSubscription";

export default function AuthProvider({ children }: PropsWithChildren) {
  useAuthSubscription();
  return <>{children}</>;
}
