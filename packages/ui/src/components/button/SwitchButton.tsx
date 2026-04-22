import type { ButtonHTMLAttributes } from "react";
import { thumbRecipe, switchRecipe } from "./SwitchButton.css";

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
      role="switch"
      aria-label={ariaLabel}
      aria-checked={checked}
      className={switchClassName}
      disabled={disabled}
      type={type}
      {...props}
    >
      <div className={thumbClassName} />
    </button>
  );
}
