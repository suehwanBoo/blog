import {
  getPresignedUrl,
  putImageToPresignedUrl,
  validateImage,
} from "./image";

const THUMBNAIL_RATIO = 3 / 2;
const THUMBNAIL_MIN_WIDTH = 1200;
const THUMBNAIL_MIN_HEIGHT = 800;

const SIZES = [
  { width: 1200, height: 800 },
  { width: 960, height: 640 },
  { width: 480, height: 320 },
  { width: 320, height: 213 },
] as const;

type ImageMeta = {
  width: number;
  height: number;
};

export type BlobImageMeta = { blob: Blob } & ImageMeta;

export type UploadedImage = {
  src: string;
  width: number;
  height: number;
};

export type BlobImageTuple = [
  BlobImageMeta,
  BlobImageMeta,
  BlobImageMeta,
  BlobImageMeta,
];

export type UploadImageTuple = [
  UploadedImage,
  UploadedImage,
  UploadedImage,
  UploadedImage,
];

export const uploadThumbnailVariants = async (
  blobs: BlobImageTuple,
  token: string,
): Promise<UploadImageTuple> => {
  const uploaded = (await Promise.all(
    blobs.map(async ({ blob, width, height }) => {
      const file = createThumbnailFile(blob, width, height);

      const presigned = await getPresignedUrl(file, token);

      await putImageToPresignedUrl(file, presigned.uploadUrl);

      return {
        src: presigned.publicUrl,
        width,
        height,
      };
    }),
  )) as [UploadedImage, UploadedImage, UploadedImage, UploadedImage];

  return uploaded;
};

export const makeThumbnailBlob = async (f: File) => {
  validateImage(f);
  const bitmap = await createImageBitmap(f);
  if (!canMakeThumbanil(bitmap.width, bitmap.height))
    throw new Error("이미지 사이즈가 적절하지 않습니다.");
  const blobs = (await Promise.all(
    SIZES.map((size) => getThumbnailBlob(bitmap, size.width, size.height)),
  )) as BlobImageTuple;
  return blobs;
};

const createThumbnailFile = (blob: Blob, width: number, height: number) => {
  return new File([blob], `thumbnail-${width}x${height}.webp`, {
    type: "image/webp",
  });
};

const canMakeThumbanil = (w: number, h: number) => {
  const cropW = Math.min(w, h * THUMBNAIL_RATIO);
  const cropH = cropW / THUMBNAIL_RATIO;

  return cropW >= THUMBNAIL_MIN_WIDTH && cropH >= THUMBNAIL_MIN_HEIGHT;
};

const getThumbnailBlob = async (
  bitmap: ImageBitmap,
  targetWidth: number,
  targetHeight: number,
) => {
  const crop = getCropRect(bitmap.width, bitmap.height);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context 생성 실패");

  ctx.drawImage(
    bitmap,
    crop.sx,
    crop.sy,
    crop.sWidth,
    crop.sHeight,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  return new Promise<BlobImageMeta>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error("이미지 변환 실패"));
      else resolve({ blob: blob, width: targetWidth, height: targetHeight });
    }, "image/webp");
  });
};

const getCropRect = (
  width: number,
  height: number,
  ratio = THUMBNAIL_RATIO,
) => {
  const imageRatio = width / height;

  if (imageRatio > ratio) {
    const cropWidth = height * ratio;

    return {
      sx: (width - cropWidth) / 2,
      sy: 0,
      sWidth: cropWidth,
      sHeight: height,
    };
  }

  const cropHeight = width / ratio;

  return {
    sx: 0,
    sy: (height - cropHeight) / 2,
    sWidth: width,
    sHeight: cropHeight,
  };
};
