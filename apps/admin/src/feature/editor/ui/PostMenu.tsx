import { postMenuStyles as styles } from "./PostMenu.css";
import useToolbarDrag from "../hooks/useToolbarDrag";
import type { PropsWithChildren } from "react";

export default function PostMenu() {
  const {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
  } = useToolbarDrag();

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
    >
      <Divider></Divider>
      <Divider></Divider>
    </div>
  );
}

function Divider({ children }: PropsWithChildren) {
  return <div className={styles.divider}>{children}</div>;
}
