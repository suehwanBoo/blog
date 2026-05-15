import { EditorContent } from "@tiptap/react";
import useTiptap from "../hooks/useTiptap";
import { postContentStyles as styles } from "./PostContent.css";
import clsx from "clsx";
import { editorRoot } from "@boo/editor";

export default function PostContent() {
  const editor = useTiptap();
  return (
    <EditorContent
      editor={editor}
      className={clsx(styles.wrapper, editorRoot)}
    />
  );
}
