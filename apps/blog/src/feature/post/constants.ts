export const TAGS = [
  "all",
  "framework",
  "ui",
  "architecture",
  "performance",
  "troubleshooting",
  "ux",
  "infra",
] as const;

export const TAG_LABELS = {
  all: "ALL",
  framework: "Framework",
  ui: "UI",
  architecture: "Architecture",
  performance: "Performance",
  troubleshooting: "Trouble Shooting",
  ux: "UX",
  infra: "Infra",
} as const;

export const DEFAULT_TAG = "all";

export const TAG_QUERY_KEY = "tag";

export type Tag = keyof typeof TAG_LABELS;

export const ORDERS = [
  { label: "최신순", value: "recent" },
  { label: "조회순", value: "views" },
  { label: "인기순", value: "likes" },
] as const;

export type Order = (typeof ORDERS)[number];
export type OrderValue = Order["value"];

export const DEFAULT_ORDER = "recent";

export const ORDER_QUERY_KEY = "orderby";

export type ProxyPostType = [Tag, OrderValue];
