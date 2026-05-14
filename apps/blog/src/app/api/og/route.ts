import { corsHeaders, json } from "@/lib/server/cors";
import { hasAdminToken } from "@/utils/firebase/admin";
import { NextResponse, type NextRequest } from "next/server";
import og from "open-graph-scraper";

const allowedHosts = new Set([
  "github.com",
  "www.github.com",
  "naver.com",
  "www.naver.com",
  "developer.mozilla.org",
  "www.youtube.com",
  "youtu.be",
  "vercel.com",
  "fe-boo.com",
]);

function isAllowedHost(hostname: string) {
  return allowedHosts.has(hostname.toLowerCase());
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return json({ ok: false, message: "url is required" }, { status: 400 });
  }

  const hasAdmin = await hasAdminToken(req);

  if (!hasAdmin)
    return json({ ok: false, message: "Invalid User" }, { status: 401 });

  try {
    const targetUrl = new URL(url);

    if (targetUrl.protocol !== "https:") {
      return json(
        { ok: false, message: "Invalid URL protocol" },
        { status: 400 },
      );
    }

    if (!isAllowedHost(targetUrl.hostname)) {
      return json(
        { ok: false, message: "URL host is not allowed" },
        { status: 400 },
      );
    }

    const result = await og({ url: targetUrl.toString(), timeout: 1500 });

    if (result.error) {
      return json({ ok: false, message: result.error }, { status: 400 });
    }

    return json({
      ok: true,
      data: {
        url: result.result.ogUrl,
        title: result.result.ogTitle,
        description: result.result.ogDescription,
        image: result.result.ogImage?.[0]?.url,
        siteName: result.result.ogSiteName,
      },
    });
  } catch {
    return json({ ok: false, message: "Invalid URL" }, { status: 400 });
  }
}
