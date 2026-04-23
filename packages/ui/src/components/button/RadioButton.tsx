import type { InputHTMLAttributes } from "react";
import { hiddenInputStyle, inputWrapperStyle } from "./common.css";
import { radioBoxRecipe, radioIconRecipe } from "./RadioButton.css";
import clsx from "clsx";

export type RadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  id: string;
  checked?: boolean;
  ariaLabel: string;
};

export default function RadioButton({
  id,
  checked = false,
  disabled = false,
  ariaLabel,
  name,
  ...rest
}: RadioButtonProps) {
  return (
    <label className={inputWrapperStyle} htmlFor={id}>
      <input
        {...rest}
        id={id}
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        className={clsx(hiddenInputStyle, rest.className)}
      />
      <div className={radioBoxRecipe({ disabled })}>
        <span className={radioIconRecipe({ disabled, checked })} />
      </div>
    </label>
  );
}
