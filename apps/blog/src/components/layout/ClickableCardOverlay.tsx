import type { PropsWithChildren } from "react";
import Link, { type LinkProps } from "next/link";
import { clickableCardOverlayStyles as styles } from "./ClickableCardOverlay.css";
import clsx from "clsx";

interface Props extends LinkProps {
  label: string;
  divider?: boolean;
}

export default function ClickableCardOverlay({
  children,
  label,
  divider = false,
  ...rest
}: PropsWithChildren<Props>) {
  const wrapper = divider
    ? clsx(styles.wrapper, styles.divider)
    : styles.wrapper;
  return (
    <div className={wrapper}>
      {children}

      <Link {...rest} aria-label={label} className={styles.link} />
    </div>
  );
}
