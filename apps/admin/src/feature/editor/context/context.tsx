import { createContext } from "react";
import { Editor } from "@tiptap/react";

export const TiptapContext = createContext<Editor | null>(null);
