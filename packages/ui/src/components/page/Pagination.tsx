import { useEffect, type HTMLAttributes } from "react";
import { PaginationStyle } from "./Pagination.css";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  errorTrigger?: ErrorTrigger | undefined;
};

type ErrorTrigger = (currentPage: number, totalPages: number) => void;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  errorTrigger,
  ...rest
}: PaginationProps & HTMLAttributes<HTMLDivElement>) {
  const goPrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const goNext = () =>
    currentPage < totalPages && onPageChange(currentPage + 1);
  useWatchPageForError({ currentPage, totalPages, errorTrigger });
  return (
    <div {...rest} className={clsx(PaginationStyle.wrapper, rest.className)}>
      <button
        aria-label="Previous page"
        type="button"
        disabled={currentPage === 1}
        className={PaginationStyle.button({
          direct: "left",
          disabled: currentPage === 1,
        })}
        onClick={goPrev}
      >
        <ArrowIcon />
      </button>
      <span
        className={PaginationStyle.page}
        aria-live="polite"
      >{`${currentPage} of ${totalPages}`}</span>
      <button
        aria-label="Next page"
        type="button"
        disabled={currentPage === totalPages}
        className={PaginationStyle.button({
          direct: "right",
          disabled: currentPage === totalPages,
        })}
        onClick={goNext}
      >
        <ArrowIcon />
      </button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.58301 10.0016H15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16695 15.0016C9.16695 15.0016 4.167 11.3192 4.16699 10.0016C4.16698 8.68401 9.16699 5.00165 9.16699 5.00165"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useWatchPageForError({
  currentPage,
  totalPages,
  errorTrigger,
}: Omit<PaginationProps, "onPageChange">) {
  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages)
      errorTrigger && errorTrigger(currentPage, totalPages);
  }, [currentPage, totalPages]);
}
