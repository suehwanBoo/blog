import type { PropsWithChildren } from "react";
import { codeBlockWrapperStyles as styles } from "./CodeBlockWrapper.css";

export default function CodeBlockWrapper({ children }: PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      {/* some fucntion and design*/}
      {children}
    </div>
  );
}
