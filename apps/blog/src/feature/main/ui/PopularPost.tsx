import { typography } from "@boo/ui";
import clsx from "clsx";
import { popularStyle as styles } from "./PopularPost.css";
import Like from "@/components/ui/Like";
import Tags from "@/components/ui/Tags";
import CopyLink from "@/components/ui/CopyLink";
import { gridItem } from "@/styles/layout.css";
import ClickableCardOverlay from "@/components/layout/ClickableCardOverlay";
import type { ArticleMainAttr } from "@/feature/page/type";
import { makeDateString } from "@/utils/article/date";
import Comment from "@/components/ui/Comment";

type PopularPostProps = {
  posts: ArticleMainAttr[] | undefined;
};

export default function PopularPost({ posts }: PopularPostProps) {
  if (!posts) return null;
  return (
    <section
      className={clsx(gridItem({ desktop: 6 }), styles.section)}
      aria-labelledby="popular-post-title"
    >
      <h3 id="popular-post-title" className={styles.title}>
        Popular Post
      </h3>
      <div className={styles.content}>
        {posts.map((post) => (
          <ClickableCardOverlay
            href={`page/${post.id}`}
            label={`link to ${post.title}`}
            key={post.id}
            divider={true}
          >
            <Card
              content={post.summary}
              title={post.title}
              id={post.id}
              date={makeDateString(post.createdAt)}
              thumbnail={{
                src: post.thumbnail.sub.source.src,
                width: post.thumbnail.sub.source.width,
                height: post.thumbnail.sub.source.height,
              }}
              tags={post.tags}
              meta={{ likes: post.likeCount, comments: post.commentCount }}
            />
          </ClickableCardOverlay>
        ))}
      </div>
    </section>
  );
}

type CardProps = {
  id: string;
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
    comments: number;
    likes: number;
  };
};

function Card({ thumbnail, title, date, meta, tags, content }: CardProps) {
  return (
    <article className={styles.cardWrapper}>
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
            <Like likes={meta.likes} />
            <Comment comments={meta.comments} />
          </div>
          <CopyLink />
        </div>
      </div>
    </article>
  );
}
