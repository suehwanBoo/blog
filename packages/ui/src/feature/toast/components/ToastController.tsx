import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { toastControllerStyle } from "./ToastController.css";
import ToastMessage from "./ToastMessage";
import { toastStore } from "../store/toast";

export default function ToastController() {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot,
  );
  const toastList = [...toasts.values()];
  if (toasts.size === 0 || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="region"
      aria-label="Notifications"
      className={toastControllerStyle}
    >
      {toastList.map((toast) => (
        <ToastMessage
          key={toast.id}
          toast={toast}
          onClose={toastStore.close}
          onRemove={toastStore.remove}
        />
      ))}
    </div>,
    document.body,
  );
}
