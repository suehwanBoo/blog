import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapContext } from "./context";
import type { PropsWithChildren } from "react";

export default function TiptapProvider({ children }: PropsWithChildren) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  return (
    <TiptapContext.Provider value={editor}>{children}</TiptapContext.Provider>
  );
}
