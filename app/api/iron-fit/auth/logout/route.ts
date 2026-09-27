import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ironFitUpstream } from "@/src/lib/iron-fit/server-api";
import {
  clearIronFitSessionCookies,
  IRON_FIT_REFRESH_COOKIE,
  isSameOrigin,
} from "@/src/lib/iron-fit/session-cookies";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  const store = await cookies();
  const refreshToken = store.get(IRON_FIT_REFRESH_COOKIE)?.value;

  if (refreshToken) {
    try {
      await ironFitUpstream("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Clearing the browser session remains safe even if the backend is temporarily unavailable.
    }
  }

  const response = NextResponse.json({ revoked: true });
  clearIronFitSessionCookies(response);
  return response;
}
