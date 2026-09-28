import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import { beginNFCoreAcquisition } from "../src/lib/nfcore/server-commercial-acquisition.ts";

test("cliente S2S assina exatamente o corpo enviado ao NFCore", async () => {
  const originalFetch = globalThis.fetch;
  const originalApiUrl = process.env.NFCORE_API_URL;
  const originalKeyId = process.env.NFCORE_SITE_ACQUISITION_KEY_ID;
  const originalSecret = process.env.NFCORE_SITE_ACQUISITION_SECRET_B64;

  const secret = Buffer.alloc(32, 7);
  process.env.NFCORE_API_URL = "https://nfcore.example";
  process.env.NFCORE_SITE_ACQUISITION_KEY_ID = "site-fm-v1";
  process.env.NFCORE_SITE_ACQUISITION_SECRET_B64 = secret.toString("base64");

  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), "https://nfcore.example/v1/commercial/acquisitions");
    assert.equal(init?.method, "POST");
    assert.equal(init?.cache, "no-store");

    const headers = new Headers(init?.headers);
    assert.equal(headers.get("Idempotency-Key"), "site-fm:01234567-89ab-4cde-8fab-0123456789ab");
    const signature = headers.get("X-NFCore-Signature");
    assert.ok(signature);

    const match = /^t=(\d+),kid=site-fm-v1,v1=([0-9a-f]{64})$/.exec(signature);
    assert.ok(match);
    const body = String(init?.body);
    const expected = createHmac("sha256", secret)
      .update(`${match[1]}.`)
      .update(body)
      .digest("hex");
    assert.equal(match[2], expected);

    return new Response(
      JSON.stringify({
        acquisition_reference: "acq-0123456789abcdef0123456789abcdef",
        provider: "synthetic",
        checkout_url:
          "https://payments.example/checkout?acquisition_reference=acq-0123456789abcdef0123456789abcdef",
        expires_at: "2026-09-28T14:30:00+00:00",
        replay: false,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  };

  try {
    const started = await beginNFCoreAcquisition(
      {
        plan_id: "growth",
        price_id: "growth-monthly",
        buyer_email: "owner@example.com",
        legal_name: "ACME Tecnologia LTDA",
      },
      "site-fm:01234567-89ab-4cde-8fab-0123456789ab",
    );

    assert.equal(started.provider, "synthetic");
    assert.equal(
      started.acquisition_reference,
      "acq-0123456789abcdef0123456789abcdef",
    );
    assert.match(started.checkout_url, /^https:\/\/payments\.example\//);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiUrl === undefined) delete process.env.NFCORE_API_URL;
    else process.env.NFCORE_API_URL = originalApiUrl;
    if (originalKeyId === undefined) delete process.env.NFCORE_SITE_ACQUISITION_KEY_ID;
    else process.env.NFCORE_SITE_ACQUISITION_KEY_ID = originalKeyId;
    if (originalSecret === undefined) delete process.env.NFCORE_SITE_ACQUISITION_SECRET_B64;
    else process.env.NFCORE_SITE_ACQUISITION_SECRET_B64 = originalSecret;
  }
});

test("first-party purchase não expõe segredo nem usa link direto do provider no CTA", async () => {
  const [server, route, status, form, page] = await Promise.all([
    readFile("src/lib/nfcore/server-commercial-acquisition.ts", "utf8"),
    readFile("app/api/nfcore/acquisitions/route.ts", "utf8"),
    readFile("src/components/marketing/nfcore-commercial-status.tsx", "utf8"),
    readFile("src/components/marketing/nfcore-purchase-form.tsx", "utf8"),
    readFile("app/produtos/nfcore/contratar/page.tsx", "utf8"),
  ]);

  assert.match(server, /NFCORE_SITE_ACQUISITION_SECRET_B64/);
  assert.match(server, /NFCORE_SITE_ACQUISITION_KEY_ID/);
  assert.doesNotMatch(server, /NEXT_PUBLIC_/);
  assert.match(server, /X-NFCore-Signature/);
  assert.match(server, /\/v1\/commercial\/acquisitions/);

  assert.match(route, /sameOrigin/);
  assert.match(route, /site-fm:/);
  assert.doesNotMatch(route, /acquisition_reference:/);
  assert.match(route, /Cache-Control/);

  assert.match(status, /\/produtos\/nfcore\/contratar\?plan=/);
  assert.doesNotMatch(status, /href=\{checkoutUrl\}/);

  assert.match(form, /\/api\/nfcore\/acquisitions/);
  assert.match(form, /crypto\.randomUUID\(\)/);
  assert.doesNotMatch(form, /NFCORE_SITE_ACQUISITION_SECRET_B64/);
  assert.match(page, /current\.purchase_enabled/);
  assert.match(page, /fetchNFCoreCommercialOffer/);
});
