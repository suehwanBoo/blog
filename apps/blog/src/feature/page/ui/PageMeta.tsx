import Tags from "@/components/ui/Tags";
import { pageMetaStyles as styles } from "./PageMeta.css";

const MockMetaTag = ["Performance", "UI"];

export default function PageMeta() {
  return (
    <div className={styles.wrapper}>
      <Tags tags={MockMetaTag} />
      <div className={styles.buttonWrapper}>
        <LikeButton />
        <ShareButton />
      </div>
    </div>
  );
}

function LikeButton() {
  return (
    <button className={styles.button} type="button">
      <span>좋아요</span>
      <LikeIcon />
    </button>
  );
}

function ShareButton() {
  return (
    <button className={styles.button} type="button">
      <span>공유</span>
      <ShareIcon />
    </button>
  );
}

function LikeIcon() {
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
        d="M6.07323 11.6478C4.42749 10.4171 1.16699 7.6036 1.16699 5.07172C1.16699 3.39824 2.39506 2.04163 4.08366 2.04163C4.95866 2.04163 5.83366 2.33329 7.00033 3.49996C8.16699 2.33329 9.04199 2.04163 9.91699 2.04163C11.6056 2.04163 12.8337 3.39824 12.8337 5.07172C12.8337 7.6036 9.57316 10.4171 7.92742 11.6478C7.37362 12.0619 6.62703 12.0619 6.07323 11.6478Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
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
        d="M6.4743 1.75061C4.34572 1.75444 3.23107 1.80671 2.51874 2.51917C1.75 3.28802 1.75 4.52548 1.75 7.00036C1.75 9.4753 1.75 10.7128 2.51874 11.4816C3.28746 12.2505 4.52473 12.2505 6.99927 12.2505C9.47374 12.2505 10.711 12.2505 11.4798 11.4816C12.1921 10.7692 12.2443 9.65432 12.2482 7.52542"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9912 2.0399L6.44531 7.61803M11.9912 2.0399C11.7031 1.75138 9.76193 1.77827 9.35156 1.78411M11.9912 2.0399C12.2794 2.32843 12.2526 4.27209 12.2467 4.683"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
