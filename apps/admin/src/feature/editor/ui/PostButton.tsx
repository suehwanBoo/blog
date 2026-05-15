import { Button } from "@boo/ui";
import useTiptap from "../hooks/useTiptap";
import { postButtonStyles as styles } from "./PostButton.css";

export default function PostButton() {
  const editor = useTiptap();
  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => console.log(editor?.getJSON())}
        ariaLabel="post-complete"
        size="large"
        state="active"
      >
        작성 완료
      </Button>
    </div>
  );
}
