import View from "@/components/ui/View";
import { pageTitleStyles as styles } from "./PageTitle.css";
import Comment from "@/components/ui/Comment";
import Like from "@/components/ui/Like";
import { typography } from "@boo/ui";

export default function PageTitle() {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>Some Title</h1>
      <div className={styles.metaWrapper}>
        <p className={typography.cap1r}>17 Jan 2022</p>
        <View views={200} />
        <Comment comments={13} />
        <Like likes={150} />
      </div>
    </header>
  );
}
