import { useContext } from "react";
import { ToastContext } from "../context/context";

export default function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must used in ToastProvider");
  return ctx;
}
