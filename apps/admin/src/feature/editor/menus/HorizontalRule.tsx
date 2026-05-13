import useTiptap from "../hooks/useTiptap";
import { buttonStyles as styles } from "./Button.css";

export default function HorizontalRule() {
  const editor = useTiptap();
  const setHorizontal = () => editor?.chain().focus().setHorizontalRule().run();
  return (
    <button
      className={styles.button()}
      aria-label="set horizontal-rule"
      onClick={setHorizontal}
    >
      <HorizontalIcon />
    </button>
  );
}

function HorizontalIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 11V21H26V11H6ZM7.25 12.25H9.125V16.625H10.375V12.25H11.625V14.75H12.875V12.25H14.125V16.625H15.375V12.25H16.625V14.75H17.875V12.25H19.125V16.625H20.375V12.25H21.625V14.75H22.875V12.25H24.75V19.75H7.25V12.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
