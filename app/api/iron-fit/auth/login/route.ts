import { NextResponse } from "next/server";
import type { IronFitLoginResponse } from "@/src/lib/iron-fit/auth-contract";
import { ironFitUpstream, publicError, safeUpstreamStatus } from "@/src/lib/iron-fit/server-api";
import { isSameOrigin, setIronFitSessionCookies } from "@/src/lib/iron-fit/session-cookies";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });

  let body: { email?: string; password?: string; gymId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitação inválida." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  const gymId = body.gymId?.trim();
  if (!email || !password || password.length > 256 || email.length > 254) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 400 });
  }

  try {
    const upstream = await ironFitUpstream<IronFitLoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, ...(gymId ? { gymId } : {}) }),
    });
    if (upstream.status !== 200 || !upstream.data) {
      const status = safeUpstreamStatus(upstream.status);
      return NextResponse.json({ error: publicError(status) }, { status });
    }

    if (upstream.data.requires_tenant_selection) {
      return NextResponse.json({
        requires_tenant_selection: true,
        tenants: upstream.data.tenants,
        user: upstream.data.user,
      });
    }

    const response = NextResponse.json({
      requires_tenant_selection: false,
      user: upstream.data.user,
    });
    setIronFitSessionCookies(response, upstream.data);
    return response;
  } catch {
    return NextResponse.json({ error: "Serviço temporariamente indisponível." }, { status: 503 });
  }
}
