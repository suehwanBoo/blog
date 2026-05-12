import { useAuthStore } from "@/store/store";
import { editorStyles as styles } from "./Editor.css";
import AccesDenied from "@/AccesDenied";

export default function Editor() {
  const { auth } = useAuthStore();
  if (!auth) return <AccesDenied />;
  return <div className={styles.wrapper}>editor</div>;
}
