import { useEditorActiveStyle } from "../hooks/useEditorActiveStyle";
import useTiptap from "../hooks/useTiptap";
import { buttonStyles as styles } from "./Button.css";

export default function Italic() {
  const editor = useTiptap();
  const isActive = useEditorActiveStyle("italic");

  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  return (
    <button
      className={styles.button({ active: isActive })}
      onClick={toggleItalic}
      aria-label="toggle italic"
    >
      <ItalicIcon />
    </button>
  );
}

function ItalicIcon() {
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
        d="M14.75 9.48438H21C21.2362 9.48438 21.4629 9.57809 21.6299 9.74512C21.7969 9.91214 21.8906 10.1388 21.8906 10.375C21.8906 10.6112 21.7969 10.8379 21.6299 11.0049C21.4629 11.1719 21.2362 11.2656 21 11.2656H18.5166L15.3604 20.7344H17.25C17.4862 20.7344 17.7129 20.8281 17.8799 20.9951C18.0469 21.1621 18.1406 21.3888 18.1406 21.625C18.1406 21.8612 18.0469 22.0879 17.8799 22.2549C17.7129 22.4219 17.4862 22.5156 17.25 22.5156H11C10.7638 22.5156 10.5371 22.4219 10.3701 22.2549C10.2031 22.0879 10.1094 21.8612 10.1094 21.625C10.1094 21.3888 10.2031 21.1621 10.3701 20.9951C10.5371 20.8281 10.7638 20.7344 11 20.7344H13.4834L16.6396 11.2656H14.75C14.5138 11.2656 14.2871 11.1719 14.1201 11.0049C13.9531 10.8379 13.8594 10.6112 13.8594 10.375L13.8633 10.2871C13.8835 10.0832 13.9739 9.89131 14.1201 9.74512C14.2871 9.57809 14.5138 9.48438 14.75 9.48438Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.09375"
      />
    </svg>
  );
}
