import type { PresignedResponse } from "../type";

const VALID_IMAGE_TYPE = new Set([
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/png",
]);

const endpoint = import.meta.env.VITE_PRESIGNED_ENDPOINT!;

export const validateImage = (f: File) => {
  const typeCheck = VALID_IMAGE_TYPE.has(f.type);
  if (!typeCheck) throw new Error("허용되지 않은 파일 형식입니다.");
};

export const compressImage = async (
  f: File,
  MAX_WIDTH: number,
  MAX_HEIGHT: number,
) => {
  const url = await convertFileToDataURL(f);
  const image = await loadToImage(url);
  const { blob, width, height } = await compressImageBlob(
    image,
    MAX_WIDTH,
    MAX_HEIGHT,
  );
  const webp = makeBlobToFileWebp(blob, f);
  return { file: webp, width: width, height: height };
};

export const getPresignedUrl = async (file: File, token: string) => {
  const body = JSON.stringify({
    contentType: file.type,
    contentSize: file.size,
  });
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  }).catch(() => {
    throw new Error("네트워크 오류가 발생하였습니다.");
  });
  if (!res.ok) throw new Error("이미지 업로드 URL 발급에 실패하였습니다.");
  const imgData = (await res.json()) as PresignedResponse;
  return imgData;
};

export const putImageToPresignedUrl = async (file: File, url: string) => {
  const data = await fetch(url, {
    method: "PUT",
    body: file,
  });
  if (!data.ok) throw new Error("이미지를 저장소에 올리는데 실패하였습니다.");
};

export const convertFileToDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const url = fr.result;
      if (!url || typeof url !== "string") {
        reject(new Error("허용되지 않은 URL 형식입니다."));
        return;
      }
      resolve(url);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

export const loadToImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = () => rej(new Error("이미지를 읽어오는데 실패하였습니다."));
    image.src = url;
  });
const compressImageBlob = (
  image: HTMLImageElement,
  MAX_WIDTH: number,
  MAX_HEIGHT: number,
): Promise<{ blob: Blob; width: number; height: number }> =>
  new Promise((res, rej) => {
    const DEFAULT_TYPE = "image/webp";
    const DEFAULT_QUALITY = 0.8;
    const canvas = document.createElement("canvas");
    const ratio = Math.min(
      MAX_WIDTH / image.width,
      MAX_HEIGHT / image.height,
      1,
    );
    const newWidth = image.width * ratio;
    const newHeight = image.height * ratio;
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      rej(new Error("이미지를 읽어오는데 실패하였습니다."));
      return;
    }
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          rej(new Error("잘못된 형식의 이미지입니다."));
          return;
        }
        res({ blob: blob, width: newWidth, height: newHeight });
      },
      DEFAULT_TYPE,
      DEFAULT_QUALITY,
    );
  });

const makeBlobToFileWebp = (blob: Blob, file: File) => {
  return new File([blob], `${file.name.split(".")[0]}.webp`, {
    type: "image/webp",
  });
};
