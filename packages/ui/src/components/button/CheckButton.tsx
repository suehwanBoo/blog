import type { InputHTMLAttributes } from "react";
import { checkbox, checkIconRecipe } from "./CheckButton.css";
import { hiddenInputStyle, inputWrapperStyle } from "./common.css";
import clsx from "clsx";

export type CheckButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  id: string;
  checked?: boolean;
  ariaLabel: string;
};

export default function CheckButton({
  id,
  ariaLabel,
  checked = false,
  disabled = false,
  ...rest
}: CheckButtonProps) {
  return (
    <label className={inputWrapperStyle} htmlFor={id}>
      <input
        {...rest}
        type="checkbox"
        className={clsx(hiddenInputStyle, rest.className)}
        aria-label={ariaLabel}
        disabled={disabled}
        checked={checked}
        id={id}
      />
      <div className={checkbox({ checked, disabled })} aria-hidden="true">
        <Check checked={checked} />
      </div>
    </label>
  );
}

function Check({ checked }: { checked: boolean }) {
  const className = checkIconRecipe({ checked });
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.75 4.25001L3.25 6.75001L8.75 0.750008"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
