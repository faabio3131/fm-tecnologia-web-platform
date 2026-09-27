import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  failClosedNFCoreCommercialOffer,
  parseNFCoreCommercialOffer,
} from "../src/lib/nfcore/commercial-offer-contract.ts";

const publishedApprovedOffer = {
  product_id: "nfcore",
  pricing: {
    status: "published",
    catalog: {
      configuration_id: "nfcore-commercial",
      version: 1,
      prices: [
        {
          price_id: "nfcore-monthly",
          currency: "BRL",
          cadence: "monthly",
          base_amount: "299.90",
          per_document_amount: "0",
          setup_amount: "0",
        },
      ],
      plans: [
        {
          plan_id: "nfcore-core",
          display_name: "NFCore",
          edition_id: "core",
          price_ids: ["nfcore-monthly"],
          trial_days: 0,
          tags: [],
        },
      ],
    },
  },
  release: {
    status: "commercial_approved",
    version: 1,
    public_message: "Oferta aprovada para preparação final.",
    commercially_approved: true,
  },
  checkout: { status: "unconfigured" },
  purchase_enabled: false,
  trial_enabled: false,
} as const;

test("fallback comercial NFCore é invariavelmente fail-closed", () => {
  const fallback = failClosedNFCoreCommercialOffer();
  assert.equal(fallback.release.status, "unavailable");
  assert.equal(fallback.release.commercially_approved, false);
  assert.equal(fallback.pricing.status, "unpriced");
  assert.equal(fallback.checkout.status, "unconfigured");
  assert.equal(fallback.purchase_enabled, false);
  assert.equal(fallback.trial_enabled, false);
});

test("contrato aceita somente projeção canônica coerente", () => {
  const parsed = parseNFCoreCommercialOffer(publishedApprovedOffer);
  assert.equal(parsed.pricing.catalog?.prices[0]?.base_amount, "299.90");
  assert.equal(parsed.release.status, "commercial_approved");
  assert.equal(parsed.purchase_enabled, false);
});

test("status comercial não pode fingir aprovação", () => {
  assert.throws(
    () =>
      parseNFCoreCommercialOffer({
        ...publishedApprovedOffer,
        release: {
          ...publishedApprovedOffer.release,
          status: "waitlist",
          commercially_approved: true,
        },
      }),
    /approval flag is inconsistent/,
  );
});

test("site recusa compra até existir contrato explícito de checkout", () => {
  assert.throws(
    () =>
      parseNFCoreCommercialOffer({
        ...publishedApprovedOffer,
        purchase_enabled: true,
      }),
    /purchase must remain disabled/,
  );
});

test("BFF usa variável server-side e não expõe endpoint NFCore ao navegador", async () => {
  const [server, route, component] = await Promise.all([
    readFile("src/lib/nfcore/server-commercial-offer.ts", "utf8"),
    readFile("app/api/nfcore/commercial-offer/route.ts", "utf8"),
    readFile("src/components/marketing/nfcore-commercial-status.tsx", "utf8"),
  ]);

  assert.match(server, /process\.env\.NFCORE_API_URL/);
  assert.doesNotMatch(server, /NEXT_PUBLIC_NFCORE_API_URL/);
  assert.match(server, /\/v1\/commercial\/offer/);
  assert.match(server, /cache: "no-store"/);
  assert.match(route, /failClosedNFCoreCommercialOffer/);
  assert.match(route, /status: 503/);
  assert.match(component, /\/api\/nfcore\/commercial-offer/);
  assert.doesNotMatch(component, /NFCORE_API_URL/);
});
