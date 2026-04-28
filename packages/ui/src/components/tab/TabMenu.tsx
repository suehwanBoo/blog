import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type HtmlHTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { tabRecipe, tabWrapper } from "./TabMenu.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";

type WrapperProps = Required<PropsWithChildren> &
  HtmlHTMLAttributes<HTMLDivElement>;

type ButtonRecipeProps = RecipeVariants<typeof tabRecipe>;

type ButtonProps = Required<PropsWithChildren> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> &
  ButtonRecipeProps & {
    asChild?: boolean;
  };

const MenuWrapper = ({ children, ...rest }: WrapperProps) => {
  return (
    <div {...rest} className={clsx(tabWrapper, rest.className)}>
      {children}
    </div>
  );
};

const Button = ({
  active,
  children,
  line,
  asChild = false,
  ...rest
}: ButtonProps) => {
  const className = clsx(tabRecipe({ active, line }), rest.className);

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error(
        "Button with asChild expects a single React element child.",
      );
    }
    return cloneElement(children as ReactElement<any>, {
      ...rest,
      className,
      role: "tab",
      "aria-selected": active,
      "aria-current": active ? "page" : undefined,
    });
  }
  return (
    <button {...rest} role="tab" aria-selected={active} className={className}>
      {children}
    </button>
  );
};

const TabMenu = Object.assign(MenuWrapper, {
  Button,
});

export default TabMenu;
