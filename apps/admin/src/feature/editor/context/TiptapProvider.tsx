import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapContext } from "./context";
import { useMemo, type PropsWithChildren } from "react";

export default function TiptapProvider({ children }: PropsWithChildren) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const value = useMemo(
    () => ({
      editor: editor,
    }),
    [editor],
  );
  return (
    <TiptapContext.Provider value={value}>{children}</TiptapContext.Provider>
  );
}
