import type { InputHTMLAttributes } from "react";
import { hiddenInputStyle, inputWrapperStyle } from "./common.css";
import { radioBoxRecipe, radioIconRecipe } from "./RadioButton.css";

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
  checked,
  disabled,
  ariaLabel,
  name,
  ...rest
}: RadioButtonProps) {
  return (
    <label className={inputWrapperStyle} htmlFor={id}>
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        className={hiddenInputStyle}
        {...rest}
      />
      <div className={radioBoxRecipe({ disabled })}>
        <span className={radioIconRecipe({ disabled, checked })} />
      </div>
    </label>
  );
}
