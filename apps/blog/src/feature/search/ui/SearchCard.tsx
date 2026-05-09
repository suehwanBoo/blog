import Tags from "@/components/ui/Tags";
import { searchCardStyles as styles } from "./SearchCard.css";

export default function SearchCard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail}></div>
      <div className={styles.content}>
        <Tags tags={["Performance", "UI"]} />
        <p className={styles.title}>Bill Walsh leadership lessons</p>
        <p className={styles.date}>17 Jan 2022</p>
      </div>
    </div>
  );
}
