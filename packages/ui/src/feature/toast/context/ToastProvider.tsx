import { useMemo, type PropsWithChildren } from "react";
import { ToastContext } from "./context";
import type { ToastController as ToastControllerType } from "../types";
import ToastController from "../components/ToastController";
import { toastStore } from "../store/toast";

export default function ToastProvider({ children }: PropsWithChildren) {
  const value = useMemo<ToastControllerType>(
    () => ({
      apply: toastStore.apply,
      close: toastStore.close,
      remove: toastStore.remove,
      removeAll: toastStore.removeAll,
    }),
    [],
  );
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastController />
    </ToastContext.Provider>
  );
}
