import type { ButtonHTMLAttributes } from "react";
import { thumbRecipe, switchRecipe } from "./SwitchButton.css";
import clsx from "clsx";

export interface SwitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
  checked?: boolean;
}

export default function SwitchButton({
  ariaLabel,
  checked = false,
  type = "button",
  disabled = false,
  ...props
}: SwitchButtonProps) {
  const switchClassName = switchRecipe({ checked, disabled });
  const thumbClassName = thumbRecipe({ checked, disabled });

  return (
    <button
      {...props}
      role="switch"
      aria-label={ariaLabel}
      aria-checked={checked}
      className={clsx(switchClassName, props.className)}
      disabled={disabled}
      type={type}
    >
      <div className={thumbClassName} />
    </button>
  );
}
