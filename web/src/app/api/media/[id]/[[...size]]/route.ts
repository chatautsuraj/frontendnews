import { NextRequest, NextResponse } from "next/server";

const API_BASE = (
  process.env.NEWS_API_BASE_URL ?? "https://newsportalapi.ekaartech.com/v1"
).replace(/\/$/, "");
const TENANT_HOST = process.env.NEWS_TENANT_HOST ?? "thenagarik.com";
const PORTAL_KEY = process.env.NEWS_PORTAL_KEY ?? "";

type RouteContext = {
  params: Promise<{ id: string; size?: string[] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  if (!PORTAL_KEY) {
    return NextResponse.json(
      { message: "NEWS_PORTAL_KEY is not configured" },
      { status: 500 },
    );
  }

  const { id, size: sizeParts } = await context.params;
  const sizeFromPath = sizeParts?.[0];
  const size =
    sizeFromPath === "thumb" || sizeFromPath === "full"
      ? sizeFromPath
      : (request.nextUrl.searchParams.get("size") ?? "full");

  const upstream = `${API_BASE}/public/media/${encodeURIComponent(id)}?size=${encodeURIComponent(size)}`;

  const res = await fetch(upstream, {
    headers: {
      "X-Forwarded-Host": TENANT_HOST,
      "X-Portal-Key": PORTAL_KEY,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to load media", upstream, status: res.status },
      { status: res.status },
    );
  }

  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=300",
    },
  });
}
