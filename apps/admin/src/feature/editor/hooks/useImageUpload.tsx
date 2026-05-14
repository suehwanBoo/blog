import { useToast } from "@boo/ui/client";
import {
  compressImage,
  getPresignedUrl,
  putImageToPresignedUrl,
  validateImage,
} from "../utils/image";
import { useAuthStore } from "@/store/store";

export default function useImageUpload() {
  const { apply } = useToast();
  const { auth } = useAuthStore();
  const uploadImage = async (
    f: File,
    MAX_WIDTH: number,
    MAX_HEIGHT: number,
  ) => {
    try {
      validateImage(f);
      if (!auth) throw new Error("업로드 권한이 없습니다.");
      const token = await auth.getIdToken();
      const { file, width, height } = await compressImage(
        f,
        MAX_WIDTH,
        MAX_HEIGHT,
      );
      const data = await getPresignedUrl(file, token);
      await putImageToPresignedUrl(file, data.uploadUrl);
      return {
        src: data.publicUrl,
        width,
        height,
        alt: file.name,
      };
    } catch (err) {
      if (err instanceof Error) {
        apply({
          description: err.message,
          variant: "danger",
        });
      }
    }
  };

  return uploadImage;
}
