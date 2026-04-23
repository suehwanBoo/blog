import type {
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
  PropsWithChildren,
} from "react";
import { tabRecipe, tabWrapper } from "./TabMenu.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";

type WrapperProps = Required<PropsWithChildren> &
  HtmlHTMLAttributes<HTMLDivElement>;

type ButtonRecipeProps = Required<RecipeVariants<typeof tabRecipe>>;

type ButtonProps = Required<PropsWithChildren> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> &
  ButtonRecipeProps;

const MenuWrapper = ({ children, ...rest }: WrapperProps) => {
  return (
    <div {...rest} className={clsx(tabWrapper, rest.className)}>
      {children}
    </div>
  );
};

const Button = ({ active, children, line, ...rest }: ButtonProps) => {
  const className = tabRecipe({ active, line });
  return (
    <button
      {...rest}
      role="tab"
      aria-selected={active}
      className={clsx(className, rest.className)}
    >
      {children}
    </button>
  );
};

const TabMenu = Object.assign(MenuWrapper, {
  Button,
});

export default TabMenu;
