import { typography } from "@boo/ui";
import { recentPostStyles as styles } from "./RecentPost.css";
import clsx from "clsx";
import { skeleton } from "@/components/ui/skeleton.css";
import Tags from "@/components/ui/Tags";
import testImage from "@/assets/test_img.webp";
import testMobileImage from "@/assets/test_img_m.webp";
import { gridItem } from "@/styles/layout.css";
import ClickableCardOverlay from "@/components/layout/ClickableCardOverlay";
import type { ArticleMainAttr, CardProps } from "@/feature/page/type";
import { makeCardProps } from "../utils/post";

const mockRecentCard: CardProps = {
  id: "mock",
  date: "17 Jan 2022",
  title: "Server API Error",
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

type RecentPostProps = {
  post: ArticleMainAttr | undefined;
};

export default async function RecentPost({ post }: RecentPostProps) {
  const cardPost = makeCardProps(post) || mockRecentCard;

  return (
    <section
      className={clsx(gridItem({ desktop: 6 }), styles.section)}
      aria-labelledby="latest-post-title"
    >
      <h3 id="latest-post-title" className={styles.title}>
        Latest Post
      </h3>
      <ClickableCardOverlay
        href={`page/${cardPost.id}`}
        label={`link to ${cardPost.title}`}
      >
        <RecentCard {...cardPost} />
      </ClickableCardOverlay>
    </section>
  );
}

function RecentCard({ thumbnail, title, date, tags }: CardProps) {
  const { desktop, mobile } = thumbnail;

  return (
    <article className={clsx(styles.cardWrapper, skeleton({ loading: false }))}>
      <img
        src={mobile.src}
        srcSet={`${mobile.src} ${mobile.width}w, ${desktop.src} ${desktop.width}w`}
        sizes="(max-width: 550px) 215px, 424px"
        alt="thumbnail"
        className={styles.thumbnail}
        width={desktop.width}
        height={desktop.height}
        fetchPriority="high"
        loading="eager"
        decoding="sync"
      />
      <div className={styles.cardContent}>
        <Tags tags={tags} style={{ color: "#a9c5ff" }} />
        <h4 className={clsx(typography.sub1b, styles.cardTitle)}>{title}</h4>
        <p className={typography.cap1r}>{date}</p>
      </div>
    </article>
  );
}
