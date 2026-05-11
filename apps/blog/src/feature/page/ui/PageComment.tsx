import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { pageCommentStyles as styles } from "./PageComment.css";

export default function PageComment() {
  return (
    <aside className={styles.wrapper}>
      <h2 className={styles.title}>
        <span>댓글</span>
        <span>13</span>
      </h2>
      <CommentInput />
      <Comment />
    </aside>
  );
}
