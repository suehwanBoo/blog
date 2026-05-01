type ToastVariant = "default" | "success" | "danger" | "warning";

export type ToastId = string;

export type ToastItem = Toast & {
  id: ToastId;
  createdAt: number;
  visible: boolean;
};

export type Toast = {
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  closable?: boolean;
};

export type ToastController = {
  apply: (info: Toast) => ToastId;
  close: (id: ToastId) => void;
  remove: (id: ToastId) => void;
  removeAll: () => void;
  enterAnimationMs: number;
  exitAnimationMs: number;
};
