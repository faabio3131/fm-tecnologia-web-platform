import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { IronFitSessionUser } from "@/src/lib/iron-fit/auth-contract";
import { bearer, ironFitUpstream, publicError, safeUpstreamStatus } from "@/src/lib/iron-fit/server-api";
import { IRON_FIT_ACCESS_COOKIE } from "@/src/lib/iron-fit/session-cookies";

export async function GET() {
  const store = await cookies();
  const accessToken = store.get(IRON_FIT_ACCESS_COOKIE)?.value;
  if (!accessToken) return NextResponse.json({ error: "Sessão expirada." }, { status: 401 });

  try {
    const upstream = await ironFitUpstream<IronFitSessionUser>("/auth/me", {
      headers: bearer(accessToken),
    });
    if (upstream.status !== 200 || !upstream.data) {
      const status = safeUpstreamStatus(upstream.status);
      return NextResponse.json({ error: publicError(status) }, { status });
    }
    return NextResponse.json({ user: upstream.data });
  } catch {
    return NextResponse.json({ error: "Serviço temporariamente indisponível." }, { status: 503 });
  }
}
