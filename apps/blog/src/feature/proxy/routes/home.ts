import type { NextRequest } from "next/server";
import { DEFAULT_ORDER, ORDER_QUERY_KEY } from "@/feature/post/constants";
import { isValidOrderValue } from "@/feature/post/utils/parseOrder";
import { redirectTo, rewriteTo } from "../utils";

export function handleHomeRoute(request: NextRequest) {
  const order =
    request.nextUrl.searchParams.get(ORDER_QUERY_KEY) ?? DEFAULT_ORDER;

  if (!isValidOrderValue(order)) {
    return redirectTo(request, "/");
  }

  return rewriteTo(request, `/${order}`);
}
