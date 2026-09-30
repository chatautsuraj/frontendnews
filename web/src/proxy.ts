import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/locale";

/** Auth pages are not part of this public news frontend. */
const REMOVED_AUTH_SEGMENTS = new Set([
  "login",
  "signup",
  "sign-up",
  "sign-in",
  "signin",
  "register",
  "account",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  const second = parts[1];

  // /login, /register, etc. → locale home
  if (first && REMOVED_AUTH_SEGMENTS.has(first.toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // /en/login, /ne/register, etc. → that locale's home
  if (first && isLocale(first) && second && REMOVED_AUTH_SEGMENTS.has(second.toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/${first}`;
    return NextResponse.redirect(url);
  }

  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
