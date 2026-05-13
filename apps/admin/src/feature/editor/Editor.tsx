import { useAuthStore } from "@/store/store";
import { editorStyles as styles } from "./Editor.css";
import AccesDenied from "@/AccesDenied";
import TiptapProvider from "./context/TiptapProvider";
import PostContent from "./ui/PostContent";
import PostTitle from "./ui/PostTitle";
import PostMenu from "./ui/PostMenu";

export default function Editor() {
  const { auth } = useAuthStore();
  if (!auth) return <AccesDenied />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.editor}>
        <TiptapProvider>
          <PostTitle />
          <PostMenu />
          <PostContent />
        </TiptapProvider>
      </div>
    </div>
  );
}
