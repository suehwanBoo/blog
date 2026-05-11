import { typography } from "@boo/ui";
import { commenrWrapper } from "./Comment.css";

type CommentProps = {
  comments: number;
};

export default function Comment({ comments }: CommentProps) {
  return (
    <div className={commenrWrapper}>
      <CommentIcon />
      <span className={typography.cap1r}>{comments}</span>
    </div>
  );
}

function CommentIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g clipPath="url(#clip0_216_2502)">
        <path
          d="M8.26651 12.1862C10.7066 12.024 12.6503 10.0528 12.8102 7.57805C12.8415 7.09377 12.8415 6.59225 12.8102 6.10796C12.6503 3.63326 10.7066 1.66203 8.26651 1.49983C7.43405 1.4445 6.56491 1.44461 5.73414 1.49983C3.29405 1.66203 1.3504 3.63326 1.19047 6.10796C1.15917 6.59225 1.15917 7.09377 1.19047 7.57805C1.24871 8.47937 1.64733 9.31389 2.1166 10.0186C2.38908 10.5119 2.20926 11.1276 1.92545 11.6654C1.72081 12.0532 1.6185 12.2471 1.70065 12.3872C1.7828 12.5272 1.96631 12.5317 2.33332 12.5406C3.05913 12.5583 3.54856 12.3526 3.93705 12.0661C4.15739 11.9036 4.26756 11.8224 4.3435 11.813C4.41943 11.8037 4.56886 11.8652 4.86766 11.9883C5.13623 12.0989 5.44806 12.1672 5.73414 12.1862C6.56491 12.2414 7.43405 12.2415 8.26651 12.1862Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M6.99771 7H7.00294M9.32843 7H9.33366M4.66699 7H4.67223"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_216_2502">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
