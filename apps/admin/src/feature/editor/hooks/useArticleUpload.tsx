import { useAuthStore } from "@/store/store";
import { postArticle } from "../utils/post";
import type { ArticleSubmitType } from "@boo/firebase/schema/article";

export default function useArticleUpload() {
  const { auth } = useAuthStore();

  const upload = async (data: ArticleSubmitType) => {
    if (!auth) throw new Error("업로드 권한이 없습니다.");
    const token = await auth.getIdToken();
    const article = JSON.stringify(data);
    const res = await postArticle(article, token);
    console.log(res);
  };

  return upload;
}
