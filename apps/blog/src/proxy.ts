import {
  DEFAULT_ORDER,
  DEFAULT_TAG,
  ORDER_QUERY_KEY,
  TAG_QUERY_KEY,
} from "@/feature/post/constants";
import { NextResponse, type NextRequest } from "next/server";
import { isValidTag } from "./feature/post/utils/parseTag";
import { isValidOrderValue } from "./feature/post/utils/parseOrder";

const HOME_URL = "/" as const;

const POST_URL = "/post" as const;

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const isRscRequest =
    request.headers.get("rsc") === "1" || url.searchParams.has("_rsc");

  if (isRscRequest) {
    return NextResponse.next();
  }

  if (url.pathname === HOME_URL) {
    const orderQuery = url.searchParams.get(ORDER_QUERY_KEY) ?? DEFAULT_ORDER;
    if (!isValidOrderValue(orderQuery)) {
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
    url.pathname = `/${orderQuery}`;
    url.search = "";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === POST_URL) {
    const tagQuery = url.searchParams.get(TAG_QUERY_KEY) ?? DEFAULT_TAG;
    const orderQuery = url.searchParams.get(ORDER_QUERY_KEY) ?? DEFAULT_ORDER;
    if (!isValidTag(tagQuery) || !isValidOrderValue(orderQuery)) {
      url.pathname = `/post`;
      url.search = "";
      return NextResponse.redirect(url);
    }
    url.pathname = `/post/${tagQuery}/${orderQuery}`;
    url.search = "";
    return NextResponse.rewrite(url);
  }
}
