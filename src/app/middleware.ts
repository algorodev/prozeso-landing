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

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (!hasLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
