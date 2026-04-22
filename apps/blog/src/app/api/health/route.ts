import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { ok: true, timeStamp: new Date().toISOString() },
    { status: 200 },
  );
}
