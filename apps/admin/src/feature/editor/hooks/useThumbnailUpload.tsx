import { useAuthStore } from "@/store/store";
import { uploadThumbnailVariants } from "../utils/thumbnail";
import type { ArticleFormType } from "../schema/article";

export default function useThumbnailUpload() {
  const { auth } = useAuthStore();

  const upload = async (datas: ArticleFormType["thumbnail"] | null) => {
    if (!auth) throw new Error("업로드 권한이 없습니다.");
    if (!datas || datas.length !== 4)
      throw new Error("이미지 형식이 잘못되었습니다.");
    const token = await auth.getIdToken();
    const data = await uploadThumbnailVariants(datas, token);
    if (data.length < 4) {
      throw new Error("썸네일 이미지 생성에 실패했습니다.");
    }
    return data;
  };

  return upload;
}
