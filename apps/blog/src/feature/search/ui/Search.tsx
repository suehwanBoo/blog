import { SearchInput } from "@boo/ui";
import { searchStyles as styles } from "./Search.css";
import { Tooltip, useOverlay } from "@boo/ui/client";
import SearchOverlay from "@/feature/search/ui/SearchOverlay";
import { useRef, type SubmitEvent } from "react";

const Search = Object.assign(() => <></>, {
  Input: Input,
  Button: SearchButton,
});

export default Search;

function Input() {
  const { open } = useOverlay();
  const ref = useRef<HTMLInputElement | null>(null);

  const submitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    open(({ close }) => (
      <SearchOverlay close={close} initValue={ref.current?.value || ""} />
    ));
  };

  return (
    <form onSubmit={submitHandler}>
      <SearchInput
        size="small"
        placeholder="검색"
        aria-label="all-search"
        ref={ref}
      />
    </form>
  );
}

function SearchButton() {
  const { open } = useOverlay();
  return (
    <Tooltip content="검색" placement="bottom">
      <button
        aria-label="all-search"
        className={styles.button}
        onClick={() => open(({ close }) => <SearchOverlay close={close} />)}
      >
        <SearchIcon />
      </button>
    </Tooltip>
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
      aria-hidden
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
