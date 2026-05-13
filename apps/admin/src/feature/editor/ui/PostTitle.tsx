import { postTitleStyles as styles } from "./PostTitle.css";

export default function PostTitle() {
  return (
    <textarea
      className={styles.title}
      rows={1}
      maxLength={50}
      placeholder="제목을 입력해주세요."
    />
  );
}
