import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapContext } from "./context";
import { useMemo, type PropsWithChildren } from "react";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import {
  createRegistry,
  CustomComponentKit,
  defineComponent,
} from "@tiptap-block-kit/react";
import { LinkCard } from "@boo/editor";

const OgLink = defineComponent({
  name: "og-link",
  component: LinkCard,
});

const registry = createRegistry([OgLink]);

export default function TiptapProvider({ children }: PropsWithChildren) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: false }),
      CustomComponentKit.configure({
        registry,
      }),
    ],
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
