import { typography } from "@boo/ui";
import { viewWrapper } from "./View.css";

type ViewProps = {
  views: number;
};

export default function View({ views }: ViewProps) {
  return (
    <div className={viewWrapper}>
      <ViewIcon />
      <span className={typography.cap1r}>{views}</span>
    </div>
  );
}

function ViewIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1.75 7.58325C3.85 2.91659 10.15 2.91659 12.25 7.58325"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 9.9165C6.77019 9.9165 6.54262 9.87124 6.3303 9.78329C6.11798 9.69535 5.92507 9.56644 5.76256 9.40394C5.60006 9.24144 5.47116 9.04852 5.38321 8.8362C5.29526 8.62388 5.25 8.39632 5.25 8.1665C5.25 7.93669 5.29526 7.70913 5.38321 7.49681C5.47116 7.28449 5.60006 7.09157 5.76256 6.92907C5.92507 6.76656 6.11798 6.63766 6.3303 6.54971C6.54262 6.46177 6.77019 6.4165 7 6.4165C7.46413 6.4165 7.90925 6.60088 8.23744 6.92907C8.56563 7.25726 8.75 7.70238 8.75 8.1665C8.75 8.63063 8.56563 9.07575 8.23744 9.40394C7.90925 9.73213 7.46413 9.9165 7 9.9165Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
