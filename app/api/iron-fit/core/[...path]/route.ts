import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { bearer, ironFitUpstream, publicError, safeUpstreamStatus } from "@/src/lib/iron-fit/server-api";
import { IRON_FIT_ACCESS_COOKIE, isSameOrigin } from "@/src/lib/iron-fit/session-cookies";

const routes: Array<{ method: string; pattern: RegExp }> = [
  { method: "GET", pattern: /^dashboard\/(summary|revenue|attendance|overdue|birthdays)$/ },
  { method: "GET", pattern: /^students(?:\/[0-9a-f-]+)?$/i },
  { method: "POST", pattern: /^students$/ },
  { method: "PATCH", pattern: /^students\/[0-9a-f-]+\/consents$/i },
  { method: "GET", pattern: /^students\/[0-9a-f-]+\/assessments$/i },
  { method: "POST", pattern: /^students\/[0-9a-f-]+\/assessments$/i },
  { method: "GET", pattern: /^assessments\/[0-9a-f-]+$/i },
  { method: "GET", pattern: /^workouts(?:\/[0-9a-f-]+)?$/i },
  { method: "POST", pattern: /^workouts$/ },
  { method: "PATCH", pattern: /^workouts\/[0-9a-f-]+\/status$/i },
  { method: "GET", pattern: /^students\/[0-9a-f-]+\/workouts$/i },
  { method: "GET", pattern: /^schedule-slots$/ },
  { method: "POST", pattern: /^schedule-slots$/ },
  { method: "POST", pattern: /^schedules$/ },
  { method: "PATCH", pattern: /^schedules\/[0-9a-f-]+\/check-in$/i },
  { method: "GET", pattern: /^communication\/(templates|messages|automations)$/ },
  { method: "POST", pattern: /^communication\/(templates|messages|automations)$/ },
  { method: "GET", pattern: /^financial\/(accounts|charges)$/ },
  { method: "POST", pattern: /^financial\/(accounts|subscriptions|charges)$/ },
  { method: "PATCH", pattern: /^financial\/charges\/[0-9a-f-]+\/pay$/i },
  { method: "GET", pattern: /^access\/events$/ },
  { method: "POST", pattern: /^access\/credentials$/ },
];

function permitted(method: string, path: string) {
  return routes.some((route) => route.method === method && route.pattern.test(path));
}

function cleanQuery(request: NextRequest) {
  const query = new URLSearchParams(request.nextUrl.searchParams);
  query.delete("gymId");
  const value = query.toString();
  return value ? `?${value}` : "";
}

async function cleanBody(request: NextRequest) {
  if (request.method === "GET" || request.method === "HEAD") return undefined;
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;
  const body = (await request.json()) as Record<string, unknown>;
  if (body && typeof body === "object") delete body.gymId;
  return JSON.stringify(body);
}

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  if (request.method !== "GET" && !isSameOrigin(request)) {
    return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  }
  const { path: parts } = await context.params;
  const path = parts.join("/");
  if (!permitted(request.method, path)) {
    return NextResponse.json({ error: "Operação não exposta pela superfície Web." }, { status: 404 });
  }

  const store = await cookies();
  const accessToken = store.get(IRON_FIT_ACCESS_COOKIE)?.value;
  if (!accessToken) return NextResponse.json({ error: "Sessão expirada." }, { status: 401 });

  try {
    const upstream = await ironFitUpstream<unknown>(`/${path}${cleanQuery(request)}`, {
      method: request.method,
      headers: bearer(accessToken),
      body: await cleanBody(request),
    });
    if (upstream.status < 200 || upstream.status >= 300) {
      const status = safeUpstreamStatus(upstream.status);
      return NextResponse.json({ error: publicError(status) }, { status });
    }
    return NextResponse.json(upstream.data ?? {});
  } catch {
    return NextResponse.json({ error: "Serviço temporariamente indisponível." }, { status: 503 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
