import { SearchInput } from "@boo/ui";
import { searchStyles as styles } from "./Search.css";

const Search = Object.assign(() => <></>, {
  Input: Input,
  Button: SearchButton,
});

export default Search;

function Input() {
  return (
    <SearchInput size="small" placeholder="검색" aria-label="all-search" />
  );
}

function SearchButton() {
  return (
    <button aria-label="all-search" className={styles.button}>
      <SearchIcon />
    </button>
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
