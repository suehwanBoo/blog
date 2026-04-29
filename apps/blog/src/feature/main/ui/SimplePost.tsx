"use client";

import { gridItem } from "@/app/(main)/layout.css";
import { simplePostStyles as styles } from "./SimplePost.css";
import { Select } from "@boo/ui/client";
import { useState } from "react";
import clsx from "clsx";
import { typography } from "@boo/ui";
import View from "@/components/ui/View";
import Like from "@/components/ui/Like";

const OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "조회순", value: "views" },
  { label: "인기순", value: "likes" },
] as const;

type Option = (typeof OPTIONS)[number];

export default function SimplePost() {
  const [value, setValue] = useState<Option>(OPTIONS[0]);
  return (
    <section className={clsx(gridItem({ desktop: 8 }), styles.wrapper)}>
      <h3 className={styles.srOnly}>Posts</h3>
      <div className={styles.select}>
        <Select
          ariaLabel="post category"
          onChange={setValue}
          options={OPTIONS}
          render={({ label }) => label}
          value={value}
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

function Card({ date, meta, thumbnail, title, content }: CardProps) {
  return (
    <article className={clsx(styles.card, styles.divider)}>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <h4 className={styles.cardTitle}>{title}</h4>
          <p className={styles.cardDescription}>{content}</p>
          <p className={typography.body1r}>{date}</p>
        </div>
        <div className={styles.cardMetaBox}>
          <div className={styles.cardMeta}>
            <View views={meta.views} />
            <Like likes={meta.likes} />
          </div>
          <button className={styles.copyLink} aria-label="copy link">
            <CopyLink />
          </button>
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

function CopyLink() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9.249 2.50098C6.20817 2.50645 4.61582 2.58112 3.59819 3.59891C2.5 4.69727 2.5 6.46507 2.5 10.0006C2.5 13.5362 2.5 15.3041 3.59819 16.4024C4.69638 17.5008 6.4639 17.5008 9.99895 17.5008C13.5339 17.5008 15.3014 17.5008 16.3997 16.4024C17.4172 15.3846 17.4919 13.792 17.4974 10.7507"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1301 2.91415L9.20735 10.8829M17.1301 2.91415C16.7185 2.50197 13.9454 2.54039 13.3591 2.54873M17.1301 2.91415C17.5418 3.32633 17.5034 6.10299 17.4951 6.68999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
    content:
      "some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content some content ",
  },
];
