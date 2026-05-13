import { createContext } from "react";
import { Editor } from "@tiptap/react";

type TiptapContextValue = {
  editor: Editor | null;
};

export const TiptapContext = createContext<TiptapContextValue | null>(null);
