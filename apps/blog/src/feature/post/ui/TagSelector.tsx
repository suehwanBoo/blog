"use client";

import { gridItem } from "@/app/(main)/layout.css";
import { tagSelectorStyles as styles } from "./TagSelector.css";
import clsx from "clsx";
import { TAG_LABELS, TAGS, type Tag } from "../constants";
import useClientSelectedTag from "../hooks/useClientSelectedTag";

type TagSelectorProps = {
  initialTagState: Tag;
};

export default function TagSelector({ initialTagState }: TagSelectorProps) {
  const { tagState, setSelectedTag } = useClientSelectedTag(initialTagState);

  return (
    <aside
      className={clsx(gridItem({ desktop: 12 }), styles.wrapper)}
      aria-labelledby="trending-tags-title"
    >
      <h3 id="trending-tags-title" className={styles.title}>
        Trending Tags
      </h3>
      <nav aria-label="Trending tags">
        <ul className={styles.tagBox}>
          {TAGS.map((tag) => {
            const isActive = tag === tagState;
            return (
              <li key={tag}>
                <button
                  type="button"
                  className={styles.tagButton({ active: isActive })}
                  aria-pressed={isActive}
                  onClick={() => setSelectedTag(tag)}
                >
                  {TAG_LABELS[tag]}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
