import { useEditorActiveStyle } from "../hooks/useEditorActiveStyle";
import useTiptap from "../hooks/useTiptap";
import { buttonStyles as styles } from "./Button.css";

export default function UnderLine() {
  const editor = useTiptap();
  const isActive = useEditorActiveStyle("underline");
  const toggleUnderLine = () => editor?.chain().focus().toggleUnderline().run();
  return (
    <button
      className={styles.button({ active: isActive })}
      onClick={toggleUnderLine}
      aria-label="toggle underline"
    >
      <UnderLineIcon />
    </button>
  );
}

function UnderLineIcon() {
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
        d="M11 22.6094H21C21.2362 22.6094 21.4629 22.7031 21.6299 22.8701C21.7969 23.0371 21.8906 23.2638 21.8906 23.5C21.8906 23.7362 21.7969 23.9629 21.6299 24.1299C21.4629 24.2969 21.2362 24.3906 21 24.3906H11C10.7638 24.3906 10.5371 24.2969 10.3701 24.1299C10.2031 23.9629 10.1094 23.7362 10.1094 23.5C10.1094 23.2638 10.2031 23.0371 10.3701 22.8701C10.5371 22.7031 10.7638 22.6094 11 22.6094ZM20.375 9.48438C20.6112 9.48438 20.8379 9.57809 21.0049 9.74512C21.1719 9.91214 21.2656 10.1388 21.2656 10.375V16L21.2588 16.2607C21.193 17.5618 20.6472 18.7961 19.7217 19.7217C18.7345 20.7089 17.3961 21.2642 16 21.2656L15.7393 21.2588C14.4382 21.193 13.2039 20.6472 12.2783 19.7217C11.2911 18.7345 10.7358 17.3961 10.7344 16V10.375C10.7344 10.1388 10.8281 9.91214 10.9951 9.74512C11.1621 9.57809 11.3888 9.48438 11.625 9.48438C11.8612 9.48438 12.0879 9.57809 12.2549 9.74512C12.4219 9.91214 12.5156 10.1388 12.5156 10.375V16C12.5156 16.9241 12.8827 17.8104 13.5361 18.4639C14.1896 19.1173 15.0759 19.4844 16 19.4844C16.9241 19.4844 17.8104 19.1173 18.4639 18.4639C19.1173 17.8104 19.4844 16.9241 19.4844 16V10.375C19.4844 10.1388 19.5781 9.91214 19.7451 9.74512C19.9121 9.57809 20.1388 9.48438 20.375 9.48438Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.09375"
      />
    </svg>
  );
}
