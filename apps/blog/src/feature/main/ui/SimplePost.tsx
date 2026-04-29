"use client";

import { gridItem } from "@/app/(main)/layout.css";
import { simplePostStyles as styles } from "./SimplePost.css";
import { Select } from "@boo/ui/client";
import clsx from "clsx";
import View from "@/components/ui/View";
import Like from "@/components/ui/Like";
import CopyLink from "@/components/ui/CopyLink";
import Tags from "@/components/ui/Tags";
import useClientOrder from "../hooks/useClientOrder";
import { ORDERS, type OrderValue } from "@/feature/post/constants";

export default function SimplePost({
  initialOrderValue,
}: {
  initialOrderValue: OrderValue;
}) {
  const { orderState, setSelectedOrder } = useClientOrder(initialOrderValue);
  return (
    <section
      className={clsx(gridItem({ desktop: 8 }), styles.wrapper)}
      aria-labelledby="posts-title"
    >
      <h3 id="posts-title" className={styles.srOnly}>
        Posts
      </h3>
      <div className={styles.select}>
        <Select
          ariaLabel="post category"
          onChange={(order) => setSelectedOrder(order)}
          options={ORDERS}
          render={({ label }) => label}
          value={orderState}
        />
      </div>
      <CardList />
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
  tags: string[];
  meta: {
    views: number;
    likes: number;
  };
};

function CardList() {
  return (
    <>
      {mockCardList.map((card) => (
        <Card {...card} key={card.id} />
      ))}
    </>
  );
}

function Card({ date, meta, thumbnail, title, content, tags }: CardProps) {
  return (
    <article className={clsx(styles.card, styles.divider)}>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <Tags tags={tags} />
          <h4 className={styles.cardTitle}>{title}</h4>
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
      <div className={styles.thumbnailBox}>
        <img
          src={thumbnail.src}
          alt="thumbnail"
          width={thumbnail.width}
          height={thumbnail.height}
          className={styles.thumbnail}
        />
      </div>
    </article>
  );
}

const mockCardList: (CardProps & { id: number })[] = [
  {
    id: 1,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    content: "short content",
    tags: ["Performacne", "UI"],
  },
  {
    id: 2,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    content:
      "some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content ",
    tags: ["Performacne", "UI"],
  },
  {
    id: 3,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    content: "short content",
    tags: ["Performacne", "UI"],
  },
  {
    id: 4,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    content:
      "some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content ",
    tags: ["Performacne", "UI"],
  },
  {
    id: 5,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    tags: ["Performacne", "UI"],
    content: "short content",
  },
  {
    id: 6,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    tags: ["Performacne", "UI"],
    content:
      "some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content ",
  },
  {
    id: 7,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    tags: ["Performacne", "UI"],
    content: "short content",
  },
  {
    id: 8,
    date: "17 Jan 2022",
    title: "Build your API",
    meta: { likes: 100, views: 200 },
    thumbnail: {
      src: "test_img.webp",
      width: 1000,
      height: 668,
    },
    tags: ["Performacne", "UI"],
    content:
      "some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content ",
  },
];
