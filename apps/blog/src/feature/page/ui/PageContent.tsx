import type { ArticleSubmitContent, ArticleSubmitMain } from "../type";
import { pageContentStyles as styles } from "./PageContent.css";
import { renderer, viewerRoot } from "@boo/editor";
import clsx from "clsx";
import "@boo/editor/styles.css";

type PageContentProps = ArticleSubmitContent &
  Pick<ArticleSubmitMain, "thumbnail">;

export default function PageContent({ content, thumbnail }: PageContentProps) {
  const hero = thumbnail.main.sources[0];
  return (
    <section className={clsx(styles.wrapper, viewerRoot)}>
      <img
        src={hero?.src}
        alt={thumbnail.main.alt}
        width={hero?.width}
        height={hero?.height}
      />
      {renderer(content)}
    </section>
  );
}
