import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { IronFitRefreshSuccess } from "@/src/lib/iron-fit/auth-contract";
import { ironFitUpstream, publicError, safeUpstreamStatus } from "@/src/lib/iron-fit/server-api";
import {
  clearIronFitSessionCookies,
  IRON_FIT_REFRESH_COOKIE,
  isSameOrigin,
  setIronFitSessionCookies,
} from "@/src/lib/iron-fit/session-cookies";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  const store = await cookies();
  const refreshToken = store.get(IRON_FIT_REFRESH_COOKIE)?.value;
  if (!refreshToken) return NextResponse.json({ error: "Sessão expirada." }, { status: 401 });

  try {
    const upstream = await ironFitUpstream<IronFitRefreshSuccess>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
    if (upstream.status !== 200 || !upstream.data) {
      const status = safeUpstreamStatus(upstream.status);
      const response = NextResponse.json({ error: publicError(status) }, { status });
      if (status === 401) clearIronFitSessionCookies(response);
      return response;
    }

    const response = NextResponse.json({ refreshed: true });
    setIronFitSessionCookies(response, upstream.data);
    return response;
  } catch {
    return NextResponse.json({ error: "Serviço temporariamente indisponível." }, { status: 503 });
  }
}
