import { corsHeaders, json } from "@/lib/server/cors";
import { hasAdminToken, postArticle } from "@/utils/firebase/admin";
import { NextResponse, type NextRequest } from "next/server";
import { articleSubmitSchema } from "@boo/firebase/schema/article";
import { findPostByOption } from "@/feature/main/api/server";
import type { OrderValue, Tag } from "@/feature/post/constants";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  const hasAdmin = await hasAdminToken(req);
  if (!hasAdmin)
    return json({ ok: false, message: "Invalid User" }, { status: 401 });
  try {
    const article = await req.json();
    const data = await articleSubmitSchema.parseAsync(article);
    const id = await postArticle(data);
    return json({ ok: true, id });
  } catch (err) {
    if (err instanceof Error)
      return json({ ok: false, message: err.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const cursor = searchParams.get("cursor") ?? undefined;
  const tag = searchParams.get("tag") ?? "all";
  const order = searchParams.get("order") ?? "recent";
  const limit = Number(searchParams.get("limit") ?? 5);

  const result = await findPostByOption(
    limit,
    order as OrderValue,
    tag as Tag,
    cursor,
  );

  return Response.json(result);
}
