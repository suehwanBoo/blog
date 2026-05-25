import z from "zod";

const imgSchema = z.object({
  src: z.string().min(1, {
    error: "이미지 src 필드가 누락되었습니다.",
  }),
  width: z
    .number({
      error: "이미지의 width 필드가 누락되었습니다.",
    })
    .min(1, {
      error: "이미지의 width는 1보다 커야합니다.",
    }),
  height: z
    .number({
      error: "이미지의 height 필드가 누락되었습니다.",
    })
    .min(1, {
      error: "이미지의 height은 1보다 커야합니다.",
    }),
});

const altSchema = z.string().min(1, {
  error: "썸네일의 alt 태그가 비어있습니다.",
});

const subThumbnailSchema = z.object({
  alt: altSchema,
  source: imgSchema,
});

const mainThumbnailSchema = z.object({
  alt: altSchema,
  sources: z.array(imgSchema).min(1, {
    error: "썸네일 이미지의 원본 필드가 비어있습니다.",
  }),
});

const tagSchema = z.enum(
  [
    "framework",
    "ui",
    "architecture",
    "performance",
    "troubleshooting",
    "ux",
    "infra",
  ],
  {
    error: "알맞는 태그를 입력해주세요.",
  },
);

const contentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(z.any()),
});

export const ARTICLE_CONSTRAINTS = {
  TITLE_MAX_LENGTH: 100,
  SUMMARY_MAX_LENGTH: 300,
} as const;

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, {
      error: "제목을 입력해주세요.",
    })
    .max(ARTICLE_CONSTRAINTS.TITLE_MAX_LENGTH, {
      error: "제목은 100자 이하입니다.",
    }),
  summary: z
    .string()
    .min(1, {
      error: "글의 요약 필드가 누락되었습니다.",
    })
    .max(ARTICLE_CONSTRAINTS.SUMMARY_MAX_LENGTH, {
      error: "요약은 300자 이하입니다.",
    }),
  thumbnail: z.object(
    {
      main: mainThumbnailSchema,
      sub: subThumbnailSchema,
    },
    {
      error: "썸네일 이미지의 포맷을 확인해주세요.",
    },
  ),
  tags: z
    .array(tagSchema)
    .min(1, {
      error: "태그를 1개 이상 입력해주세요.",
    })
    .refine((tags) => new Set(tags).size === tags.length, {
      error: "중복된 태그는 사용할 수 없습니다.",
    }),
  content: contentSchema.refine(hasText, {
    error: "본문을 입력해주세요.",
  }),
});

export type ArticleType = z.infer<typeof articleSchema>;

function hasText(node: unknown) {
  if (!node || typeof node !== "object") return false;
  if (
    "text" in node &&
    typeof node.text === "string" &&
    node.text.trim().length > 0
  )
    return true;

  if ("content" in node && Array.isArray(node.content))
    return node.content.some(hasText);

  return false;
}
