import { NextRequest, NextResponse } from "next/server";
import { IRON_FIT_ACCESS_COOKIE } from "@/src/lib/iron-fit/session-cookies";

export function middleware(request: NextRequest) {
  if (request.cookies.has(IRON_FIT_ACCESS_COOKIE)) return NextResponse.next();
  const login = new URL("/entrar", request.url);
  login.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/app/iron-fit/:path*"],
};
