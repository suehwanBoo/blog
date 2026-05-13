import clsx from "clsx";
import type { LinkCardProps } from "../types";
import { linkCardStyles as styles } from "./LinkCard.css";

function getHostName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ metadata, className }: LinkCardProps) {
  const siteName = metadata.siteName || getHostName(metadata.url);
  const title = metadata.title || metadata.url;

  return (
    <a
      className={clsx(styles.root, className)}
      href={metadata.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.content}>
        {siteName ? <span className={styles.siteName}>{siteName}</span> : null}
        <p className={styles.title}>{title}</p>
        {metadata.description ? (
          <p className={styles.description}>{metadata.description}</p>
        ) : null}
        <span className={styles.url}>{metadata.url}</span>
      </div>
      {metadata.image ? (
        <img
          className={styles.image}
          src={metadata.image}
          alt=""
          loading="lazy"
        />
      ) : null}
    </a>
  );
}
