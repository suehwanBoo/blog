import { TAGS, type Tag } from "../constants";

export function isValidTag(query: string | null): query is Tag {
  return query !== null && TAGS.includes(query as Tag);
}

export function parseTag(query: string | null): Tag {
  if (isValidTag(query)) {
    return query;
  }
  return "all";
}
