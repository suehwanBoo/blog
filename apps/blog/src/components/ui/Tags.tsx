import type { HTMLAttributes } from "react";
import { tagStyle } from "./Tag.css";
import clsx from "clsx";

const SPACE = "\u00A0";

const REPEAT_COUNT = 3;

export default function Tags({
  tags,
  className,
  ...rest
}: { tags: string[] } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...rest} className={clsx(tagStyle, className)}>
      {tags.map((tag) => `#${tag}`).join(SPACE.repeat(REPEAT_COUNT))}
    </p>
  );
}
