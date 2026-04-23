import { buttonRecipe } from "./Button.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
type StrictButtonVariants = Required<ButtonVariants>;
type ButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role">;

export type ButtonProps = ButtonAttributes &
  StrictButtonVariants & {
    ariaLabel: string;
  } & PropsWithChildren;

export default function Button({
  size,
  state,
  ariaLabel,
  children,
  ...rest
}: ButtonProps) {
  const disabled = rest.disabled || state === "disabled";
  return (
    <button
      {...rest}
      role="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={clsx(buttonRecipe({ size, state }), rest.className)}
    >
      {children}
    </button>
  );
}
