import type { InputHTMLAttributes } from "react";
import Input from "./Input";
import { SearchInputStyle } from "./SearchInput.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";

type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> &
  Required<RecipeVariants<typeof SearchInputStyle.input>>;

export default function SearchInput({
  size,
  className,
  disabled,
  ...rest
}: SearchInputProps) {
  return (
    <div className={SearchInputStyle.wrapper}>
      <Input
        {...rest}
        type="search"
        role="searchbox"
        disabled={disabled}
        aria-label={rest["aria-label"] ?? "search"}
        className={clsx(SearchInputStyle.input({ size }), className)}
      />
      <button
        aria-label="search"
        type="submit"
        className={SearchInputStyle.button({ disabled })}
        disabled={disabled}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M17 17L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
