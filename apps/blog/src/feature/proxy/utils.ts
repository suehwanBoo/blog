import { NextResponse, type NextRequest } from "next/server";

export function isRscRequest(request: NextRequest) {
  const url = request.nextUrl;

  return request.headers.get("rsc") === "1" || url.searchParams.has("_rsc");
}

export function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();

  url.pathname = pathname;
  url.search = "";

  return NextResponse.redirect(url);
}

export function rewriteTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();

  url.pathname = pathname;
  url.search = "";

  return NextResponse.rewrite(url);
}
