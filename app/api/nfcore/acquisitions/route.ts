import { NextRequest, NextResponse } from "next/server";
import { beginNFCoreAcquisition } from "@/src/lib/nfcore/server-commercial-acquisition";

export const dynamic = "force-dynamic";

const tokenPattern = /^[a-z0-9][a-z0-9._-]{0,127}$/;
const requestIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface AcquisitionBody {
  plan_id: string;
  price_id: string;
  buyer_email: string;
  legal_name: string;
  request_id: string;
}

function objectValue(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function parseBody(value: unknown): AcquisitionBody | null {
  const body = objectValue(value);
  if (!body) return null;

  const expected = new Set([
    "plan_id",
    "price_id",
    "buyer_email",
    "legal_name",
    "request_id",
  ]);
  if (
    Object.keys(body).length !== expected.size ||
    Object.keys(body).some((key) => !expected.has(key))
  ) {
    return null;
  }

  const planId = typeof body.plan_id === "string" ? body.plan_id.trim().toLowerCase() : "";
  const priceId =
    typeof body.price_id === "string" ? body.price_id.trim().toLowerCase() : "";
  const buyerEmail =
    typeof body.buyer_email === "string" ? body.buyer_email.trim().toLowerCase() : "";
  const legalName =
    typeof body.legal_name === "string" ? body.legal_name.trim() : "";
  const requestId =
    typeof body.request_id === "string" ? body.request_id.trim() : "";

  if (
    !tokenPattern.test(planId) ||
    !tokenPattern.test(priceId) ||
    !buyerEmail ||
    buyerEmail.length > 320 ||
    buyerEmail.split("@").length !== 2 ||
    buyerEmail.startsWith("@") ||
    buyerEmail.endsWith("@") ||
    !legalName ||
    legalName.length > 256 ||
    !requestIdPattern.test(requestId)
  ) {
    return null;
  }

  return {
    plan_id: planId,
    price_id: priceId,
    buyer_email: buyerEmail,
    legal_name: legalName,
    request_id: requestId,
  };
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json(
      { detail: "Solicitação de contratação inválida." },
      { status: 403, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  let value: unknown;
  try {
    value = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "Dados de contratação inválidos." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  const body = parseBody(value);
  if (!body) {
    return NextResponse.json(
      { detail: "Dados de contratação inválidos." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  try {
    const started = await beginNFCoreAcquisition(
      {
        plan_id: body.plan_id,
        price_id: body.price_id,
        buyer_email: body.buyer_email,
        legal_name: body.legal_name,
      },
      `site-fm:${body.request_id}`,
    );

    return NextResponse.json(
      {
        provider: started.provider,
        checkout_url: started.checkout_url,
        expires_at: started.expires_at,
        replay: started.replay,
      },
      {
        status: started.replay ? 200 : 201,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  } catch {
    return NextResponse.json(
      {
        detail:
          "A contratação online não pôde ser iniciada com segurança agora. Tente novamente ou fale com a FM Tecnologia.",
      },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
