import { getFirebaseUserByRequest } from "@/utils/firebase/admin";
import { NextResponse, type NextRequest } from "next/server";
import { isLikedWithFirebase, toggleLikesWithFirebase } from "./service";

type SlugParameterType = { params: Promise<{ slug: string }> };

export async function POST(req: NextRequest, { params }: SlugParameterType) {
  const decoded = await getFirebaseUserByRequest(req);
  if (!decoded)
    return NextResponse.json(
      { ok: false, message: "not valid user" },
      { status: 403 },
    );

  const { slug } = await params;
  try {
    const liked = await toggleLikesWithFirebase(slug, decoded.uid);
    return NextResponse.json({
      ok: true,
      liked,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "firebase error";
    return NextResponse.json(
      { ok: false, message },
      { status: message === "article not found" ? 404 : 500 },
    );
  }
}

export async function GET(req: NextRequest, { params }: SlugParameterType) {
  const decoded = await getFirebaseUserByRequest(req);
  if (!decoded)
    return NextResponse.json(
      { ok: false, message: "not valid user" },
      { status: 403 },
    );

  const { slug } = await params;
  try {
    const liked = await isLikedWithFirebase(slug, decoded.uid);
    return NextResponse.json({ ok: true, liked });
  } catch {
    return NextResponse.json(
      { ok: false, message: "firebase error" },
      { status: 500 },
    );
  }
}
