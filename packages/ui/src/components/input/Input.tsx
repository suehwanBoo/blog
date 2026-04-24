import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { inputRecipe } from "./input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ disabled, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      disabled={disabled}
      className={clsx(inputRecipe({ disabled }), className)}
    />
  );
}
