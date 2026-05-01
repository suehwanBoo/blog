import { useMemo, type PropsWithChildren } from "react";
import { ToastContext } from "./context";
import type { Toast, ToastController as ToastControllerType } from "../types";
import ToastController from "../components/ToastController";
import { toastStore } from "../store/toast";

export default function ToastProvider({
  children,
  maxCount,
}: PropsWithChildren & {
  maxCount?: number;
}) {
  const value = useMemo<ToastControllerType>(
    () => ({
      apply: (toast: Toast) =>
        toastStore.apply(toast, { maxCount: maxCount ?? 3 }),
      close: toastStore.close,
      remove: toastStore.remove,
      removeAll: toastStore.removeAll,
    }),
    [maxCount],
  );
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastController />
    </ToastContext.Provider>
  );
}
