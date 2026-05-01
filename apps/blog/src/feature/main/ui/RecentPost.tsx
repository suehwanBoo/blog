import { typography } from "@boo/ui";
import { recentPostStyles as styles } from "./RecentPost.css";
import clsx from "clsx";
import { skeleton } from "@/components/ui/skeleton.css";
import Tags from "@/components/ui/Tags";
import testImage from "@/assets/test_img.webp";
import testMobileImage from "@/assets/test_img_m.webp";
import { gridItem } from "@/styles/layout.css";

const mockRecentCard: CardProps = {
  date: "17 Jan 2022",
  title: "Migrating to Linear 101",
  thumbnail: {
    desktop: {
      src: testImage.src,
      width: testImage.width,
      height: testImage.height,
    },
    mobile: {
      src: testMobileImage.src,
      width: testMobileImage.width,
      height: testMobileImage.height,
    },
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

type ImageSource = {
  src: string;
  width: number;
  height: number;
};

type CardProps = {
  thumbnail: {
    desktop: ImageSource;
    mobile: ImageSource;
  };
  title: string;
  date: string;
  tags: string[];
};

function RecentCard({ thumbnail, title, date, tags }: CardProps) {
  const { desktop, mobile } = thumbnail;

  return (
    <article className={clsx(styles.cardWrapper, skeleton({ loading: false }))}>
      <picture className={styles.thumbnailPicture}>
        <source media="(min-width: 500px)" srcSet={desktop.src} />
        <img
          src={mobile.src}
          alt="thumbnail"
          className={styles.thumbnail}
          width={desktop.width}
          height={desktop.height}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>
      <div className={styles.cardContent}>
        <Tags tags={tags} style={{ color: "#a9c5ff" }} />
        <h4 className={clsx(typography.sub1b, styles.cardTitle)}>{title}</h4>
        <p className={typography.cap1r}>{date}</p>
      </div>
    </article>
  );
}
