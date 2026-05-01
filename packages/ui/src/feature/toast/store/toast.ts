import type { Toast, ToastId, ToastItem } from "../types";

type Listener = () => void;

let toasts = new Map<ToastId, ToastItem>();
const listeners = new Set<Listener>();

const EMPTY_TOAST = new Map<ToastId, ToastItem>();

function emit() {
  listeners.forEach((listener) => listener());
}

const MAX_TOAST_COUNT = 3;

export const toastStore = {
  getSnapshot() {
    return toasts;
  },

  getServerSnapshot() {
    return EMPTY_TOAST;
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  apply(info: Toast) {
    const id = crypto.randomUUID();
    toasts = new Map(toasts);

    if (toasts.size >= MAX_TOAST_COUNT) {
      const oldestId = toasts.keys().next().value as ToastId | undefined;

      if (oldestId) {
        toasts.delete(oldestId);
      }
    }

    const newItem: ToastItem = {
      id,
      createdAt: Date.now(),
      visible: true,
      variant: "default",
      duration: 3000,
      closable: true,
      ...info,
    };

    toasts.set(id, newItem);

    emit();
    return id;
  },

  close(id: ToastId) {
    const toast = toasts.get(id);
    if (!toast) return;

    toasts = new Map(toasts);
    toasts.set(id, { ...toast, visible: false });
    emit();
  },

  remove(id: ToastId) {
    toasts = new Map(toasts);
    toasts.delete(id);
    emit();
  },

  removeAll() {
    if (toasts.size === 0) return;
    toasts = new Map<ToastId, ToastItem>();
    emit();
  },
};
