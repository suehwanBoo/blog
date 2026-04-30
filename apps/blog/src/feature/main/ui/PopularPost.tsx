import { gridItem } from "@/app/(main)/layout.css";
import { typography } from "@boo/ui";
import clsx from "clsx";
import { popularStyle as styles } from "./PopularPost.css";
import View from "@/components/ui/View";
import Like from "@/components/ui/Like";
import Tags from "@/components/ui/Tags";
import CopyLink from "@/components/ui/CopyLink";
import testImage from "@/assets/test_img.webp";

const mockCardList: (CardProps & { id: number })[] = [
  {
    id: 1,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: testImage.src,
      width: testImage.width,
      height: testImage.height,
    },
    content:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Performance", "UI"],
  },
  {
    id: 2,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: testImage.src,
      width: testImage.width,
      height: testImage.height,
    },
    content: "some content",
    tags: ["Performance", "UI"],
  },
];

export default function PopularPost() {
  return (
    <section
      className={clsx(gridItem({ desktop: 6 }), styles.section)}
      aria-labelledby="popular-post-title"
    >
      <h3 id="popular-post-title" className={styles.title}>
        Popular Post
      </h3>
      <div>
        {mockCardList.map((card) => (
          <Card {...card} key={card.id} />
        ))}
      </div>
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
  content: string;
  tags: Array<string>;
  meta: {
    views: number;
    likes: number;
  };
};

function Card({ thumbnail, title, date, meta, tags, content }: CardProps) {
  return (
    <article className={clsx(styles.cardWrapper, styles.divider)}>
      <div className={styles.thumbnailBox}>
        <img
          src={thumbnail.src}
          alt="thumbnail"
          className={styles.thumbnail}
          width={thumbnail.width}
          height={thumbnail.height}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <Tags tags={tags} />
          <h4 className={clsx(typography.sub1b, styles.cardTitle)}>{title}</h4>
          <p className={styles.cardDescription}>{content}</p>
          <p className={styles.cardDate}>{date}</p>
        </div>
        <div className={styles.cardMetaBox}>
          <div className={styles.cardMeta}>
            <View views={meta.views} />
            <Like likes={meta.likes} />
          </div>
          <CopyLink />
        </div>
      </div>
    </article>
  );
}
