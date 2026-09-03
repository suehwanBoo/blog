"use client";

import { Tooltip, useToast } from "@boo/ui/client";
import { footerStyles as styles } from "./Footer.css";
import { copyToClipboard } from "@/utils/copyToClipboard";

const EMAIL = "rndjdieo119@naver.com";

export default function Footer() {
  const { apply } = useToast();

  const onSuccess = () =>
    apply({ variant: "success", description: "클립보드 복사 성공" });
  const onFail = () =>
    apply({ variant: "danger", description: "클립보드 복사 실패" });

  return (
    <footer className={styles.container}>
      <h4 className={styles.title}>FEBOO</h4>
      <span>
        Frontend Engineering Notes Architecture · Performance · UI ·
        Troubleshooting
      </span>
      <div className={styles.shortCut}>
        <a
          className={styles.link}
          href="https://github.com/suehwanBoo/blog"
          target="_blank"
        >
          GitHub
        </a>
        <Tooltip content="클립보드 복사">
          <button
            onClick={() =>
              copyToClipboard({
                text: EMAIL,
                onSuccess: onSuccess,
                onFail: onFail,
              })
            }
            className={styles.copyEmail}
          >
            Email
          </button>
        </Tooltip>
      </div>
      <span className={styles.desc}>
        © 2026 FE-BOO. All rights reserved. Built with Next.js
      </span>
    </footer>
  );
}
