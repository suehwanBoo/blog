import type { NextRequest } from "next/server";
import {
  DEFAULT_ORDER,
  DEFAULT_TAG,
  ORDER_QUERY_KEY,
  TAG_QUERY_KEY,
} from "@/feature/post/constants";
import { isValidOrderValue } from "@/feature/post/utils/parseOrder";
import { isValidTag } from "@/feature/post/utils/parseTag";
import { redirectTo, rewriteTo } from "../utils";

export function handlePostRoute(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get(TAG_QUERY_KEY) ?? DEFAULT_TAG;
  const order =
    request.nextUrl.searchParams.get(ORDER_QUERY_KEY) ?? DEFAULT_ORDER;

  if (!isValidTag(tag) || !isValidOrderValue(order)) {
    return redirectTo(request, "/post");
  }

  return rewriteTo(request, `/post/${tag}/${order}`);
}
