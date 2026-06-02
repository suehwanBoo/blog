import { useFormContext } from "react-hook-form";
import { postTitleStyles as styles } from "./PostTitle.css";
import { ARTICLE_CONSTRAINTS, type ArticleFormType } from "../schema/article";

export default function PostTitle() {
  const { register } = useFormContext<ArticleFormType>();
  return (
    <textarea
      className={styles.title}
      rows={1}
      placeholder="제목을 입력해주세요."
      maxLength={ARTICLE_CONSTRAINTS.TITLE_MAX_LENGTH}
      {...register("title")}
    />
  );
}
