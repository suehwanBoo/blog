import { useEditorState } from "@tiptap/react";
import useTiptap from "./useTiptap";

export function useEditorActiveStyle(
  type: string,
  options?: Record<string, unknown>,
) {
  const editor = useTiptap();
  const state = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      return {
        isActive: editor.isActive(type, options),
      };
    },
  });

  return !!state?.isActive;
}
