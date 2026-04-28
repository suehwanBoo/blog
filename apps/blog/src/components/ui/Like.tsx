import { typography } from "@boo/ui";
import { likeWrapper } from "./Like.css";

type LikeProps = {
  likes: number;
};

export default function Like({ likes }: LikeProps) {
  return (
    <div className={likeWrapper}>
      <LikeIcon />
      <span className={typography.cap1r}>{likes}</span>
    </div>
  );
}

function LikeIcon() {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65624 10.3562C4.0105 9.12548 0.75 6.31198 0.75 3.78009C0.75 2.10662 1.97807 0.75 3.66667 0.75C4.54167 0.75 5.41667 1.04167 6.58333 2.20833C7.75 1.04167 8.625 0.75 9.5 0.75C11.1886 0.75 12.4167 2.10662 12.4167 3.78009C12.4167 6.31198 9.15617 9.12548 7.51043 10.3562C6.95663 10.7703 6.21004 10.7703 5.65624 10.3562Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
