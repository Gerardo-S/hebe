import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname === "/"
  ) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();
  const fetchSlug = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  if (fetchSlug.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
  const data = await fetchSlug.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}