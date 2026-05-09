import { SearchInput, typography } from "@boo/ui";
import { searchOverlayStyles as styles } from "./SearchOverlay.css";
import SearchCard from "./SearchCard";

type SearchOverlayProps = {
  close: () => void;
  initValue?: string;
};

export default function SearchOverlay({
  close,
  initValue,
}: SearchOverlayProps) {
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      className={styles.wrapper}
    >
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h3 id="search-title" className={typography.sub1b}>
            검색
          </h3>

          <button
            type="button"
            onClick={close}
            aria-label="검색창 닫기"
            className={styles.closeButton}
          >
            <CloseIcon />
          </button>
        </div>

        <SearchInput
          size="small"
          placeholder="검색어를 입력하세요."
          defaultValue={initValue}
          className={styles.searchInput}
        />
      </header>

      <main className={styles.content}>
        <p className={styles.contentTitle}>추천 게시물</p>
        <SearchCard />
      </main>
    </section>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5891 4.41083C15.9145 4.73626 15.9145 5.2639 15.5891 5.58934L5.58909 15.5893C5.26366 15.9148 4.73602 15.9148 4.41058 15.5893C4.08514 15.2639 4.08514 14.7363 4.41058 14.4108L14.4106 4.41083C14.736 4.08539 15.2637 4.08539 15.5891 4.41083Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41058 4.41083C4.73602 4.08539 5.26366 4.08539 5.58909 4.41083L15.5891 14.4108C15.9145 14.7363 15.9145 15.2639 15.5891 15.5893C15.2637 15.9148 14.736 15.9148 14.4106 15.5893L4.41058 5.58934C4.08514 5.2639 4.08514 4.73626 4.41058 4.41083Z"
        fill="currentColor"
      />
    </svg>
  );
}
