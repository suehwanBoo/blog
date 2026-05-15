import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapContext } from "./context";
import { useMemo, type PropsWithChildren } from "react";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import {
  createRegistry,
  CustomComponentKit,
  defineComponent,
} from "@tiptap-block-kit/react";
import { LinkCard, type LinkCardProps } from "@boo/editor";
import { createLowlight } from "lowlight";
import ts from "highlight.js/lib/languages/typescript";
import js from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";

const OgLink = defineComponent({
  name: "og-link",
  component: (props: LinkCardProps) => <LinkCard {...props} mode="editor" />,
});

const registry = createRegistry([OgLink]);

const lowlight = createLowlight();

lowlight.register("ts", ts);
lowlight.register("typescript", ts);
lowlight.register("tsx", ts);

lowlight.register("javascript", js);
lowlight.register("js", js);
lowlight.register("jsx", js);

lowlight.register("css", css);
lowlight.register("html", html);

export default function TiptapProvider({ children }: PropsWithChildren) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: false }),
      CustomComponentKit.configure({
        registry,
      }),
      CodeBlockLowlight.configure({
        lowlight,
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
