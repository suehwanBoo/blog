import { pageTitleStyles as styles } from "./PageTitle.css";
import Comment from "@/components/ui/Comment";
import Like from "@/components/ui/Like";
import { typography } from "@boo/ui";
import type { ArticleDetailType } from "../type";
import { makeDateString } from "@/utils/article/date";

type PageTitleProps = Pick<
  ArticleDetailType,
  "title" | "likeCount" | "commentCount"
> & { createdAt: string };

export default function PageTitle({
  title,
  createdAt,
  likeCount,
  commentCount,
}: PageTitleProps) {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.metaWrapper}>
        <p className={typography.cap1r}>{makeDateString(createdAt)}</p>
        {/* <View views={200} /> */}
        <Comment comments={commentCount} />
        <Like likes={likeCount} />
      </div>
    </header>
  );
}
