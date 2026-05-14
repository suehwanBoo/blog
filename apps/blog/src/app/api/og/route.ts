import { NextResponse, type NextRequest } from "next/server";
import og from "open-graph-scraper";

const corsHeaders = {
  // 추후 admin 배포시 url 추가
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders,
      ...init?.headers,
    },
  });
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

  try {
    const targetUrl = new URL(url);

    if (!["http:", "https:"].includes(targetUrl.protocol)) {
      return json(
        { ok: false, message: "Invalid URL protocol" },
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
