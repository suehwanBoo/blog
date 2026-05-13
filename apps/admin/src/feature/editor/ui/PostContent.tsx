import { EditorContent } from "@tiptap/react";
import useTiptap from "../hooks/useTiptap";
import { postContentStyles as styles } from "./PostContent.css";

export default function PostContent() {
  const editor = useTiptap();
  return <EditorContent editor={editor} className={styles.wrapper} />;
}
