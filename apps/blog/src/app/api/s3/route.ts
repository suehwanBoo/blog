import { NextResponse, type NextRequest } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { corsHeaders, json } from "@/lib/server/cors";
import { hasAdminToken } from "@/utils/firebase/admin";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  const { contentType, contentSize } = await req.json();

  const hasAdmin = await hasAdminToken(req);
  if (!hasAdmin)
    return json({ ok: false, message: "Invalid User" }, { status: 401 });

  if (!ALLOWED_TYPES.has(contentType)) {
    return json(
      { ok: false, message: "Unsupported image type" },
      { status: 400 },
    );
  }

  if (
    typeof contentSize !== "number" ||
    contentSize <= 0 ||
    contentSize > MAX_IMAGE_SIZE
  ) {
    return json({ ok: false, message: "Image too large" }, { status: 400 });
  }

  const ext = contentType.split("/")[1];
  const key = `images/${crypto.randomUUID()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_IMAGE_BUCKET!,
    Key: key,
    ContentType: contentType,
    ContentLength: contentSize,
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 30,
  });

  const publicUrl = `${process.env.PUBLIC_ASSET_ORIGIN}/${key}`;

  return json({
    ok: true,
    uploadUrl,
    key,
    publicUrl,
  });
}
