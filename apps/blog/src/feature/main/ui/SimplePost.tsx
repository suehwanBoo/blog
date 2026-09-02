"use client";

import { simplePostStyles as styles } from "./SimplePost.css";
import { Select } from "@boo/ui/client";
import clsx from "clsx";
import Like from "@/components/ui/Like";
import CopyLink from "@/components/ui/CopyLink";
import Tags from "@/components/ui/Tags";
import useClientOrder from "../hooks/useClientOrder";
import { ORDERS, type OrderValue, type Tag } from "@/feature/post/constants";
import { gridItem } from "@/styles/layout.css";
import ClickableCardOverlay from "@/components/layout/ClickableCardOverlay";
import useFetchPost from "../hooks/useFetchPost";
import { makeDateString } from "@/utils/article/date";
import Comment from "@/components/ui/Comment";
import EmptyPost from "./EmptyPost";
import { skeleton } from "@/components/ui/skeleton.css";
import { forwardRef, useCallback, useMemo } from "react";
import { useIntersectionObserver } from "@boo/hooks";

export default function SimplePost({
  initialOrderValue,
  tag = "all",
  mode = "preview",
}: {
  initialOrderValue: OrderValue;
  tag?: Tag;
  mode?: "preview" | "infinite";
}) {
  const { orderState, setSelectedOrder } = useClientOrder(initialOrderValue);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchPost(
    orderState.value,
    tag,
  );

  const observerOptions = useMemo(
    () => ({
      threshold: 0.3,
    }),
    [],
  );

  const handleFetchNextPage = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref } = useIntersectionObserver({
    callback: handleFetchNextPage,
    options: observerOptions,
  });

  const posts = data?.pages.flatMap((page) => page.posts);

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
      {posts?.map((post) => (
        <ClickableCardOverlay
          href={`/page/${post.id}`}
          label={`link to ${post.title}`}
          divider
          key={post.id}
        >
          <Card
            title={post.title}
            content={post.summary}
            date={makeDateString(post.createdAt)}
            tags={post.tags}
            meta={{
              likes: post.likeCount,
              comments: post.commentCount,
            }}
            thumbnail={post.thumbnail.sub.source}
          />
        </ClickableCardOverlay>
      ))}
      {mode === "infinite" && hasNextPage && <SkeletonCard ref={ref} />}
      {posts?.length === 0 && <EmptyPost />}
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
    comments: number;
    likes: number;
  };
};

function Card({ date, meta, thumbnail, title, content, tags }: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <Tags tags={tags} />
          <h4 className={styles.cardTitle}>{title}</h4>
          <p className={styles.cardDescription}>{content}</p>
          <p className={styles.cardDate}>{date}</p>
        </div>
        <div className={styles.cardMetaBox}>
          <div className={styles.cardMeta}>
            <Like likes={meta.likes} />
            <Comment comments={meta.comments} />
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

const SkeletonCard = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={styles.loadingCard} ref={ref}>
      <div className={styles.cardContent}>
        <div className={styles.loadingBody}>
          <h4
            className={clsx(styles.loadingTitle, skeleton({ loading: true }))}
          ></h4>
          <p
            className={clsx(styles.loadingDesc, skeleton({ loading: true }))}
          ></p>
          <p className={styles.cardDate}></p>
        </div>
        <div className={styles.cardMetaBox}>
          <div
            className={clsx(styles.loadingMeta, skeleton({ loading: true }))}
          ></div>
        </div>
      </div>
      <div
        className={clsx(styles.thumbnailBox, skeleton({ loading: true }))}
      ></div>
    </div>
  );
});

SkeletonCard.displayName = "SkeletonCard";
