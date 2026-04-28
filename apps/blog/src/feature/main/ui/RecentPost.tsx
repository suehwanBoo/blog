import { gridItem } from "@/app/(main)/layout.css";
import { typography } from "@boo/ui";
import { recentPostStyles as styles } from "./RecentPost.css";
import clsx from "clsx";
import { skeleton } from "@/components/ui/skeleton.css";
import View from "@/components/ui/View";
import Like from "@/components/ui/Like";

const mockRecentCard: CardProps = {
  date: "17 Jan 2022",
  title: "Migrating to Linear 101",
  meta: { likes: 100, views: 200 },
  thumbnail: {
    src: "test_img.jpg",
    width: 1000,
    height: 668,
  },
};

export default function RecentPost() {
  return (
    <section className={clsx(gridItem({ desktop: 6 }), styles.section)}>
      <h3 className={styles.title}>Latest Post</h3>
      <RecentCard {...mockRecentCard} />
    </section>
  );
}

type CardProps = {
  thumbnail: {
    src: string;
    width?: number;
    height?: number;
  };
  title: string;
  date: string;
  meta: {
    views: number;
    likes: number;
  };
};

function RecentCard({ thumbnail, title, date, meta }: CardProps) {
  return (
    <article className={clsx(styles.cardWrapper, skeleton({ loading: false }))}>
      <img
        src={thumbnail.src}
        alt="thumbnail"
        className={styles.thumbnail}
        width={thumbnail.width}
        height={thumbnail.height}
        fetchPriority="high"
      />
      <div className={styles.cardContent}>
        <div>
          <h4 className={clsx(typography.sub1b, styles.cardTitle)}>{title}</h4>
          <p className={typography.body1r}>{date}</p>
        </div>
        <div className={styles.cardMeta}>
          <View views={meta.views} />
          <Like likes={meta.likes} />
        </div>
      </div>
    </article>
  );
}
