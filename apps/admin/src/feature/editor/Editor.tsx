import { useAuthStore } from "@/store/store";
import { editorStyles as styles } from "./Editor.css";
import AccesDenied from "@/AccesDenied";
import TiptapProvider from "./context/TiptapProvider";
import PostContent from "./ui/PostContent";
import PostTitle from "./ui/PostTitle";
import PostMenu from "./ui/PostMenu";
import PostButton from "./ui/PostButton";

export default function Editor() {
  const { auth } = useAuthStore();
  if (!auth) return <AccesDenied />;
  return (
    <div className={styles.wrapper}>
      <TiptapProvider>
        <PostButton />
        <div className={styles.editor}>
          <PostTitle />
          <PostMenu />
          <PostContent />
        </div>
      </TiptapProvider>
    </div>
  );
}
