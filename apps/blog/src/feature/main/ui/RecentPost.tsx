import { gridItem } from "@/app/(main)/layout.css";
import { typography } from "@boo/ui";
import { recentPostStyles as styles } from "./RecentPost.css";
import clsx from "clsx";
import { skeleton } from "@/components/ui/skeleton.css";
import Tags from "@/components/ui/Tags";

const mockRecentCard: CardProps = {
  date: "17 Jan 2022",
  title: "Migrating to Linear 101",
  thumbnail: {
    src: "test_img.webp",
    width: 1000,
    height: 668,
  },
  tags: ["Performance", "UI"],
};

export default function RecentPost() {
  return (
    <section
      className={clsx(gridItem({ desktop: 6 }), styles.section)}
      aria-labelledby="latest-post-title"
    >
      <h3 id="latest-post-title" className={styles.title}>
        Latest Post
      </h3>
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
  tags: string[];
};

function RecentCard({ thumbnail, title, date, tags }: CardProps) {
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
        <Tags tags={tags} style={{ color: "#a9c5ff" }} />
        <h4 className={clsx(typography.sub1b, styles.cardTitle)}>{title}</h4>
        <p className={typography.cap1r}>{date}</p>
      </div>
    </article>
  );
}
