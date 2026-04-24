import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";
import { inputRecipe } from "./input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  ({ disabled, className, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        disabled={disabled}
        className={clsx(inputRecipe({ disabled }), className)}
      />
    );
  },
);

export default Input;
