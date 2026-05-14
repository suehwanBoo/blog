import { NextResponse } from "next/server";

export const corsHeaders = {
  // 추후 admin 배포시 url 추가
  "Access-Control-Allow-Origin":
    process.env.ADMIN_ORIGIN ?? "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders,
      ...init?.headers,
    },
  });
}
