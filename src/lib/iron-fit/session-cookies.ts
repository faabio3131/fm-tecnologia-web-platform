import type { NextResponse } from "next/server";

export const IRON_FIT_ACCESS_COOKIE = "iron_fit_access";
export const IRON_FIT_REFRESH_COOKIE = "iron_fit_refresh";
const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export function setIronFitSessionCookies(
  response: NextResponse,
  tokens: { access_token: string; refresh_token: string },
) {
  response.cookies.set(IRON_FIT_ACCESS_COOKIE, tokens.access_token, baseCookieOptions());
  response.cookies.set(IRON_FIT_REFRESH_COOKIE, tokens.refresh_token, {
    ...baseCookieOptions(),
    maxAge: THIRTY_DAYS_SECONDS,
  });
}

export function clearIronFitSessionCookies(response: NextResponse) {
  response.cookies.set(IRON_FIT_ACCESS_COOKIE, "", { ...baseCookieOptions(), maxAge: 0 });
  response.cookies.set(IRON_FIT_REFRESH_COOKIE, "", { ...baseCookieOptions(), maxAge: 0 });
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}
