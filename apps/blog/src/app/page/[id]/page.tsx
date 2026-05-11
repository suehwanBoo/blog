import PageTitle from "@/feature/page/ui/PageTitle";
import { pageStyles as styles } from "./page.css";
import PageContent from "@/feature/page/ui/PageContent";
import PageMeta from "@/feature/page/ui/PageMeta";
import PageComment from "@/feature/page/ui/PageComment";
import SimplePost from "@/feature/main/ui/SimplePost";

export default function Page() {
  // need some fetch
  return (
    <section className={styles.wrapper}>
      <PageTitle />
      <PageContent />
      <PageMeta />
      <PageComment />
      <SimplePost initialOrderValue="recent" />
    </section>
  );
}
