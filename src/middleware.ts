import { NextResponse } from "next/server";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

function getLocale(req: Request) {
  const header = req.headers.get("accept-language") || "";
  const preferred = header.split(",")[0]?.split("-")[0];
  return locales.includes(preferred as Locale)
    ? (preferred as Locale)
    : defaultLocale;
}

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const hasValidLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (hasValidLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);

  // If first segment looks like a locale code (2-3 lowercase letters) but is
  // not a supported locale, strip it and redirect to the valid locale with
  // the remaining path (e.g. /fr/about → /es/about, /fr → /es).
  if (firstSegment && /^[a-z]{2,3}$/.test(firstSegment)) {
    const rest = segments.slice(1).join("/");
    const target = rest ? `/${locale}/${rest}` : `/${locale}`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
