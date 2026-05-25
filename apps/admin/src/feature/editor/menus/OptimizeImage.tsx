import { useRef } from "react";
import { buttonStyles as styles } from "./Button.css";
import useImageUpload from "../hooks/useImageUpload";
import useTiptap from "../hooks/useTiptap";
import useIncrementId from "@/hooks/useIncrementId";

export default function OptimizeImage() {
  const imgId = useIncrementId();
  const editor = useTiptap();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadImage = useImageUpload();
  const imageHandler = () => {
    inputRef.current?.click();
  };
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const data = await uploadImage(file, 1200, 800);
      if (data) {
        editor?.commands.insertRawComponent({
          componentName: "img",
          component: (props: {
            src: string;
            alt: string;
            width: number;
            height: number;
          }) => <img {...props} loading="lazy" decoding="async" />,
          id: `img-${imgId.current}`,
          props: { ...data },
        });
      }
    } finally {
      e.target.value = "";
    }
  };
  return (
    <>
      <button
        aria-label="insert-image"
        className={styles.button()}
        onClick={imageHandler}
      >
        <ImageIcon />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={onChangeImage}
      />
    </>
  );
}

function ImageIcon() {
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
        d="M9.75 8.23438H22.25C22.652 8.23438 23.0371 8.39448 23.3213 8.67871C23.6055 8.96295 23.7656 9.34803 23.7656 9.75V22.25C23.7656 22.652 23.6055 23.0371 23.3213 23.3213C23.0371 23.6055 22.652 23.7656 22.25 23.7656H9.75C9.34803 23.7656 8.96295 23.6055 8.67871 23.3213C8.39448 23.0371 8.23438 22.652 8.23438 22.25V9.75C8.23438 9.34803 8.39448 8.96295 8.67871 8.67871C8.96295 8.39448 9.34803 8.23438 9.75 8.23438ZM10.0156 22.0283L10.0957 21.9492L18.3662 13.6787C18.6504 13.3946 19.0356 13.2344 19.4375 13.2344C19.8394 13.2344 20.2246 13.3946 20.5088 13.6787L21.9043 15.0742L21.9844 15.1533V10.0156H10.0156V22.0283ZM12.9199 12.0996C13.1969 11.9849 13.5019 11.9552 13.7959 12.0137C14.0898 12.0722 14.3594 12.2168 14.5713 12.4287C14.7832 12.6406 14.9278 12.9102 14.9863 13.2041C15.0448 13.4981 15.0151 13.8031 14.9004 14.0801C14.7857 14.357 14.591 14.5932 14.3418 14.7598C14.0926 14.9263 13.7998 15.0156 13.5 15.0156C13.098 15.0156 12.7129 14.8555 12.4287 14.5713C12.1445 14.2871 11.9844 13.902 11.9844 13.5C11.9844 13.2002 12.0737 12.9074 12.2402 12.6582C12.4068 12.409 12.643 12.2143 12.9199 12.0996ZM21.9844 17.6729L19.4375 15.126L12.5791 21.9844H21.9844V17.6729Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.09375"
      />
    </svg>
  );
}
