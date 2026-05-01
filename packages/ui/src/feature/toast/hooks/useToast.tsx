import { useContext } from "react";
import { ToastContext } from "../context/context";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must used in ToastProvider");
  return {
    apply: ctx.apply,
    close: ctx.close,
    remove: ctx.remove,
    removeAll: ctx.removeAll,
  };
}

export function useInternalToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must used in ToastProvider");
  return ctx;
}
