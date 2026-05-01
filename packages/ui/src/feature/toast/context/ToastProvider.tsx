import { useMemo, type PropsWithChildren } from "react";
import { ToastContext } from "./context";
import type { Toast, ToastController as ToastControllerType } from "../types";
import ToastController from "../components/ToastController";
import { toastStore } from "../store/toast";

export default function ToastProvider({
  children,
  exitAnimationMs,
  enterAnimationMs,
  maxCount,
}: PropsWithChildren & {
  exitAnimationMs?: number;
  enterAnimationMs?: number;
  maxCount?: number;
}) {
  const value = useMemo<ToastControllerType>(
    () => ({
      apply: (toast: Toast) =>
        toastStore.apply(toast, { maxCount: maxCount ?? 3 }),
      close: toastStore.close,
      remove: toastStore.remove,
      removeAll: toastStore.removeAll,
      exitAnimationMs: exitAnimationMs ?? 300,
      enterAnimationMs: enterAnimationMs ?? 300,
    }),
    [exitAnimationMs, enterAnimationMs, maxCount],
  );
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastController />
    </ToastContext.Provider>
  );
}
