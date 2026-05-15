import { useRef } from "react";
import useTiptap from "../hooks/useTiptap";
import { getOpenGraphMetadata } from "../utils/openGraph";
import { buttonStyles as styles } from "./Button.css";
import { useToast } from "@boo/ui/client";
import { useAuthStore } from "@/store/store";

export default function OgLink() {
  const linkId = useRef(0);
  const { apply } = useToast();
  const { auth } = useAuthStore();
  const editor = useTiptap();
  const getOgLink = async () => {
    try {
      const link = prompt("링크 입력");
      if (!link) return;
      const token = await auth?.getIdToken();
      if (!token) throw new Error("Invalid User");
      const metadata = await getOpenGraphMetadata(link, token);
      if (!metadata) throw new Error("Invalid link");
      editor?.commands.insertComponent({
        id: `og-${linkId.current}`,
        componentName: "og-link",
        props: { metadata, mode: "editor" },
      });
      linkId.current += 1;
    } catch {
      apply({
        title: "링크 삽입 오류",
        description: "올바른 링크인지 확인해주세요.",
        variant: "danger",
      });
    }
  };
  return (
    <button
      className={styles.button()}
      aria-label="insert-og-link"
      onClick={getOgLink}
    >
      <LinkIcon />
    </button>
  );
}

function LinkIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M19.4395 7.92261C19.8436 7.92275 20.2438 8.00224 20.6172 8.15698C20.9906 8.31179 21.3304 8.53901 21.6162 8.82495C21.9019 9.11083 22.1286 9.45056 22.2832 9.82397C22.4377 10.1974 22.5167 10.5976 22.5166 11.0017C22.5165 11.4058 22.4369 11.8061 22.2822 12.1794C22.1276 12.5525 21.9008 12.8919 21.6152 13.1775L21.6025 13.1902H21.6016L14.1172 20.3953C14.033 20.4762 13.9339 20.5402 13.8252 20.5828C13.7163 20.6254 13.5994 20.6456 13.4824 20.6433C13.3657 20.641 13.2506 20.6158 13.1436 20.5691C13.0365 20.5223 12.9394 20.455 12.8584 20.3708C12.7773 20.2866 12.7136 20.1868 12.6709 20.0779C12.6283 19.9691 12.6072 19.8529 12.6094 19.7361C12.6116 19.6192 12.6368 19.5034 12.6836 19.3962C12.7305 19.2891 12.7985 19.1922 12.8828 19.1111L20.3604 11.9138C20.6028 11.6698 20.7384 11.3389 20.7373 10.9949C20.7362 10.651 20.5994 10.3213 20.3555 10.0789C20.2347 9.95887 20.091 9.86425 19.9336 9.79956C19.776 9.73487 19.6069 9.70138 19.4365 9.7019C19.1354 9.70288 18.8455 9.80878 18.6152 9.99878L18.5205 10.0847L10.8525 17.7302C10.3163 18.2667 10.0145 18.9942 10.0146 19.7527C10.0148 20.128 10.0888 20.4997 10.2324 20.8464C10.3762 21.1932 10.5871 21.5087 10.8525 21.7742C11.1182 22.0397 11.4343 22.2506 11.7812 22.3943C12.1281 22.5378 12.4997 22.6121 12.875 22.6121C13.6334 22.6119 14.3613 22.3105 14.8975 21.7742L21.3086 15.3679C21.3914 15.2851 21.4894 15.2184 21.5977 15.1736C21.7059 15.1288 21.8223 15.1062 21.9395 15.1062C22.0564 15.1062 22.1722 15.1289 22.2803 15.1736C22.3885 15.2184 22.4875 15.2851 22.5703 15.3679C22.653 15.4507 22.7189 15.5489 22.7637 15.657C22.8085 15.7652 22.8311 15.8817 22.8311 15.9988C22.831 16.1157 22.8084 16.2315 22.7637 16.3396C22.7204 16.444 22.6569 16.5389 22.5781 16.6199L22.5762 16.6208L22.5674 16.6296L16.1562 23.0359C15.2857 23.9061 14.1049 24.3954 12.874 24.3953C11.6431 24.395 10.4621 23.9055 9.5918 23.0349C8.72174 22.1644 8.23318 20.9835 8.2334 19.7527C8.2337 18.5219 8.72326 17.3416 9.59375 16.4714L17.2617 8.82397C17.8392 8.2468 18.623 7.92239 19.4395 7.92261Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.09375"
      />
    </svg>
  );
}
