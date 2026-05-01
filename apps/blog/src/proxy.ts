import { type NextRequest } from "next/server";
import { isRscRequest } from "@/feature/proxy/utils";
import { handleHomeRoute } from "@/feature/proxy/routes/home";
import { handlePostRoute } from "@/feature/proxy/routes/post";

export function proxy(request: NextRequest) {
  if (isRscRequest(request)) {
    return;
  }

  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    return handleHomeRoute(request);
  }

  if (pathname === "/post") {
    return handlePostRoute(request);
  }
}
