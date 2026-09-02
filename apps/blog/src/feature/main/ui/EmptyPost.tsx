import { emptyStyles as styles } from "./EmptyPost.css";

export default function EmptyPost() {
  return (
    <div className={styles.fullScreen}>
      <p>게시글이 없습니다.</p>
    </div>
  );
}
