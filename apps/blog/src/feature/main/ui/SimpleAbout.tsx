import { gridItem } from "@/app/(main)/layout.css";
import { simpleAboutStyles as styles } from "./SimpleAbout.css";
import { Button, Input, typography } from "@boo/ui";
import clsx from "clsx";

export default function SimpleAbout() {
  return (
    <aside className={clsx(gridItem({ desktop: 4 }), styles.wrapper)}>
      <Description />
      <div className={styles.divider} />
      <Subscribe />
    </aside>
  );
}

type TitleProps = {
  title: string;
};

function Description() {
  return (
    <div className={styles.section}>
      <DecorateTitle title="About FE-BOO" />
      <p className={styles.description}>
        프론트엔드 개발 과정과 결과물을 큐레이션하고 기록하는 기술 블로그입니다.
        <br />
        <br />
        프로젝트 구현, 코드 아키텍처, 성능 최적화 등 실전 경험을 바탕으로 한
        콘텐츠를 중심으로 구성되어 있습니다.
        <br />
        <br />
        빠르게 변화하는 프론트엔드 기술 흐름 속에서 의미 있는 정보와 인사이트를
        선별해 공유하며, 개발자들이 서로 배우고 성장할 수 있는 지식 공유의
        공간을 지향합니다.
      </p>
    </div>
  );
}

function Subscribe() {
  return (
    <div className={styles.subscribeSection}>
      <DecorateTitle title="Join Our Newsletter" />
      <form className={styles.form}>
        <Input
          placeholder="email"
          aria-label="email"
          className={styles.input}
        />
        <Button
          type="submit"
          ariaLabel="email submit"
          size="large"
          state="active"
          className=""
        >
          Submit
        </Button>
      </form>
      <p className={styles.hint}>*You can unsubscribe anytime</p>
    </div>
  );
}

function DecorateTitle({ title }: TitleProps) {
  return (
    <h3 className={clsx(typography.sub2b, styles.title)}>
      <span className={styles.highlight}>｢</span>
      {title}
      <span className={styles.highlight}>｣</span>
    </h3>
  );
}
