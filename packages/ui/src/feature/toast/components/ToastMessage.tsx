import { useEffect } from "react";
import Message from "../../../components/message/Message";
import type { ToastItem } from "../types";
import { useInternalToast } from "../hooks/useToast";

type ToastMessageProps = {
  toast: ToastItem;
  onClose: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function ToastMessage({
  onClose,
  onRemove,
  toast,
}: ToastMessageProps) {
  const { enterAnimationMs, exitAnimationMs } = useInternalToast();
  useToastTimeout(toast.id, toast.visible, toast.duration, onClose);
  useToastExitFallback(toast.id, toast.visible, exitAnimationMs, onRemove);

  return (
    <Message
      title={toast.title}
      content={toast.description}
      state={toast.variant ?? "default"}
      icon
      visible={toast.visible}
      onCancel={toast.closable ? () => onClose(toast.id) : undefined}
      onExitComplete={() => onRemove(toast.id)}
      enterAnimationMs={enterAnimationMs}
      exitAnimationMs={exitAnimationMs}
    />
  );
}

function useToastTimeout(
  id: string,
  visible: boolean,
  duration: number | undefined,
  onClose: (id: string) => void,
) {
  useEffect(() => {
    if (!visible) return;
    if (!duration) return;

    const timer = window.setTimeout(() => {
      onClose(id);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [id, visible, duration, onClose]);
}

function useToastExitFallback(
  id: string,
  visible: boolean,
  exitAnimationMs: number,
  onRemove: (id: string) => void,
) {
  useEffect(() => {
    if (visible) return;

    const timer = window.setTimeout(() => {
      onRemove(id);
    }, exitAnimationMs);

    return () => window.clearTimeout(timer);
  }, [id, visible, onRemove, exitAnimationMs]);
}
