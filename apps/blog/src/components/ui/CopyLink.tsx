import { copyLinkStyle } from "./CopyLink.css";

export default function CopyLink() {
  return (
    <button className={copyLinkStyle} aria-label="copy link">
      <CopyLinkIcon />
    </button>
  );
}

function CopyLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9.249 2.50098C6.20817 2.50645 4.61582 2.58112 3.59819 3.59891C2.5 4.69727 2.5 6.46507 2.5 10.0006C2.5 13.5362 2.5 15.3041 3.59819 16.4024C4.69638 17.5008 6.4639 17.5008 9.99895 17.5008C13.5339 17.5008 15.3014 17.5008 16.3997 16.4024C17.4172 15.3846 17.4919 13.792 17.4974 10.7507"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1301 2.91415L9.20735 10.8829M17.1301 2.91415C16.7185 2.50197 13.9454 2.54039 13.3591 2.54873M17.1301 2.91415C17.5418 3.32633 17.5034 6.10299 17.4951 6.68999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
