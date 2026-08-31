import { pageTitleStyles as styles } from "./PageTitle.css";
import Comment from "@/components/ui/Comment";
import Like from "@/components/ui/Like";
import { typography } from "@boo/ui";
import type { ArticleDetailType } from "../type";

type PageTitleProps = Pick<
  ArticleDetailType,
  "title" | "likeCount" | "commentCount"
> & { createdAt: string };

const monthStr: { [key: string]: string } = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "July",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export default function PageTitle({
  title,
  createdAt,
  likeCount,
  commentCount,
}: PageTitleProps) {
  const date = [
    createdAt.substring(0, 4),
    createdAt.substring(5, 7),
    createdAt.substring(8, 10),
  ] as [string, string, string];
  const dateString = `${date[2]} ${monthStr[date[1]]} ${date[0]}`;
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.metaWrapper}>
        <p className={typography.cap1r}>{dateString}</p>
        {/* <View views={200} /> */}
        <Comment comments={commentCount} />
        <Like likes={likeCount} />
      </div>
    </header>
  );
}
