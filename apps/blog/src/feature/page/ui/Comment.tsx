import { commentStyles as styles } from "./Comment.css";

export default function Comment() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <span className={styles.writer}>developer</span>
        <span>5시간 전</span>
      </div>
      <p>
        Some Comments and Likes Some Comments and LikesSome Comments and
        LikesSome Comments and LikesSome Comments and LikesSome Comments and
        LikesSome Comments and LikesSome Comments and LikesSome Comments and
        LikesSome Comments and LikesSome Comments and LikesSome Comments and
        LikesSome Comments and LikesSome Comments and LikesSome Comments and
        LikesSome Comments and LikesSome Comments and Likes
      </p>
    </div>
  );
}
