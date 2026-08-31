import type { JSONContent } from "@tiptap/core";
import { renderJSONContentToReactElement } from "@tiptap/static-renderer/json/react";
import type { ReactNode } from "react";
import { createElement, Fragment } from "react";
import { createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import LinkCard from "./ui/LinkCard";
import type { OpenGraphMetadata } from "./types";

type TiptapMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
};

type RendererNodeProps = {
  node: TiptapNode;
  children?: ReactNode | ReactNode[];
};

type RendererMarkProps = {
  mark: TiptapMark;
  children?: ReactNode | ReactNode[];
};

type HighlightNode =
  | { type: "text"; value: string }
  | {
      type: "element";
      tagName: string;
      properties?: { className?: string[] };
      children: HighlightNode[];
    };

const lowlight = createLowlight();

lowlight.register("ts", typescript);
lowlight.register("typescript", typescript);
lowlight.register("tsx", typescript);
lowlight.register("javascript", javascript);
lowlight.register("js", javascript);
lowlight.register("jsx", javascript);
lowlight.register("css", css);
lowlight.register("html", html);

const textAlignments = new Set(["left", "center", "right", "justify"]);

const render = renderJSONContentToReactElement<TiptapMark, TiptapNode>({
  nodeMapping: {
    doc: ({ children }: RendererNodeProps) =>
      createElement(Fragment, null, children),
    paragraph: ({ node, children }: RendererNodeProps) =>
      createElement("p", getTextAlignStyle(node.attrs), children),
    heading: ({ node, children }: RendererNodeProps) =>
      createElement(`h${getHeadingLevel(node.attrs)}`, getTextAlignStyle(node.attrs), children),
    blockquote: ({ children }: RendererNodeProps) =>
      createElement("blockquote", null, children),
    bulletList: ({ children }: RendererNodeProps) =>
      createElement("ul", null, children),
    orderedList: ({ node, children }: RendererNodeProps) =>
      createElement("ol", getOrderedListAttributes(node.attrs), children),
    listItem: ({ children }: RendererNodeProps) =>
      createElement("li", null, children),
    hardBreak: () => createElement("br"),
    horizontalRule: () => createElement("hr"),
    text: ({ node }: RendererNodeProps) => node.text ?? "",
    codeBlock: ({ node }: RendererNodeProps) => renderCodeBlock(node),
    customComponent_block: ({ node }: RendererNodeProps) =>
      renderCustomComponent(node),
    customComponent_blockDraggable: ({ node }: RendererNodeProps) =>
      renderCustomComponent(node),
    customComponent_inline: ({ node }: RendererNodeProps) =>
      renderCustomComponent(node),
    customComponent_inlineDraggable: ({ node }: RendererNodeProps) =>
      renderCustomComponent(node),
  },
  markMapping: {
    bold: ({ children }: RendererMarkProps) =>
      createElement("strong", null, children),
    italic: ({ children }: RendererMarkProps) => createElement("em", null, children),
    strike: ({ children }: RendererMarkProps) => createElement("s", null, children),
    underline: ({ children }: RendererMarkProps) => createElement("u", null, children),
    code: ({ children }: RendererMarkProps) => createElement("code", null, children),
    highlight: ({ children }: RendererMarkProps) =>
      createElement("mark", null, children),
    link: ({ mark, children }: RendererMarkProps) => {
      const href = getSafeUrl(mark.attrs?.href);

      return href
        ? createElement(
            "a",
            {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            children,
          )
        : createElement(Fragment, null, children);
    },
  },
  unhandledNode: () => null,
  unhandledMark: ({ children }: RendererMarkProps) =>
    createElement(Fragment, null, children),
});

/** Firebase에 저장된 Tiptap JSON을 SSR 가능한 React 노드로 변환합니다. */
export function renderer(content: JSONContent): ReactNode {
  if (content.type !== "doc") return null;

  return render({ content: content as TiptapNode });
}

export const renderTiptapContent = renderer;

function getTextAlignStyle(attrs: Record<string, unknown> | undefined) {
  const textAlign = attrs?.textAlign;

  return typeof textAlign === "string" && textAlignments.has(textAlign)
    ? { style: { textAlign } }
    : undefined;
}

function getHeadingLevel(attrs: Record<string, unknown> | undefined) {
  const level = attrs?.level;

  return typeof level === "number" && level >= 1 && level <= 6 ? level : 1;
}

function getOrderedListAttributes(attrs: Record<string, unknown> | undefined) {
  const start = attrs?.start;

  return typeof start === "number" && Number.isInteger(start) && start > 1
    ? { start }
    : undefined;
}

function renderCodeBlock(node: TiptapNode) {
  const language = getCodeLanguage(node.attrs?.language);
  const code = getTextContent(node);
  const highlightedCode = language
    ? renderHighlightedCode(lowlight.highlight(language, code).children as HighlightNode[])
    : code;

  return createElement(
    "pre",
    null,
    createElement(
      "code",
      language ? { className: `language-${language}` } : undefined,
      highlightedCode,
    ),
  );
}

function renderHighlightedCode(nodes: HighlightNode[]): ReactNode[] {
  return nodes.map((node, index) => {
    if (node.type === "text") return node.value;

    return createElement(
      node.tagName,
      {
        key: index,
        className: node.properties?.className?.join(" "),
      },
      renderHighlightedCode(node.children),
    );
  });
}

function renderCustomComponent(node: TiptapNode): ReactNode {
  const componentName = node.attrs?.componentName;
  const props = node.attrs?.props;

  if (componentName === "og-link") {
    const metadata = getOpenGraphMetadata(props);

    return metadata
      ? createElement(LinkCard, { metadata, mode: "view" })
      : null;
  }

  if (componentName === "img") {
    const image = getImageAttributes(props);

    return image ? createElement("img", image) : null;
  }

  return null;
}

function getTextContent(node: TiptapNode): string {
  if (node.text) return node.text;

  return node.content?.map(getTextContent).join("") ?? "";
}

function getCodeLanguage(value: unknown): string | undefined {
  return typeof value === "string" && lowlight.registered(value)
    ? value
    : undefined;
}

function getOpenGraphMetadata(value: unknown): OpenGraphMetadata | null {
  if (!isRecord(value)) return null;

  const url = getSafeUrl(value.url);
  const image = getSafeUrl(value.image);
  if (!url) return null;

  return {
    url,
    ...(typeof value.title === "string" ? { title: value.title } : {}),
    ...(typeof value.description === "string"
      ? { description: value.description }
      : {}),
    ...(image ? { image } : {}),
    ...(typeof value.siteName === "string" ? { siteName: value.siteName } : {}),
  };
}

function getImageAttributes(value: unknown) {
  if (!isRecord(value)) return null;

  const src = getSafeUrl(value.src);
  if (!src) return null;

  return {
    src,
    alt: typeof value.alt === "string" ? value.alt : "",
    ...(isPositiveNumber(value.width) ? { width: value.width } : {}),
    ...(isPositiveNumber(value.height) ? { height: value.height } : {}),
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}

function getSafeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
