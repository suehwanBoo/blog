import { gridItem } from "@/app/(main)/layout.css";
import { typography } from "@boo/ui";
import clsx from "clsx";
import { popularStyle as styles } from "./PopularPost.css";
import View from "@/components/ui/View";
import Like from "@/components/ui/Like";

const mockCardList: (CardProps & { id: number })[] = [
  {
    id: 1,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.jpg",
      width: 1000,
      height: 668,
    },
  },
  {
    id: 2,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.jpg",
      width: 1000,
      height: 668,
    },
  },
  {
    id: 3,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.jpg",
      width: 1000,
      height: 668,
    },
  },
];

export default function PopularPost() {
  return (
    <section className={clsx(gridItem({ desktop: 6 }), styles.section)}>
      <h3 className={styles.title}>Popular Post</h3>
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
  meta: {
    views: number;
    likes: number;
  };
};

function Card({ thumbnail, title, date, meta }: CardProps) {
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
