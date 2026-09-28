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
  checkout: {
    status: "unconfigured",
    provider: null,
    processing_status: "unconfigured",
    items: [],
  },
  purchase_enabled: false,
  trial_enabled: false,
} as const;

const purchasableOffer = {
  ...publishedApprovedOffer,
  checkout: {
    status: "configured",
    provider: "hotmart",
    processing_status: "configured",
    items: [
      {
        plan_id: "nfcore-core",
        price_id: "nfcore-monthly",
        provider: "hotmart",
        checkout_url: "https://pay.hotmart.com/example?src=nfcore",
      },
    ],
  },
  purchase_enabled: true,
} as const;

test("fallback comercial NFCore é invariavelmente fail-closed", () => {
  const fallback = failClosedNFCoreCommercialOffer();
  assert.equal(fallback.release.status, "unavailable");
  assert.equal(fallback.release.commercially_approved, false);
  assert.equal(fallback.pricing.status, "unpriced");
  assert.equal(fallback.checkout.status, "unconfigured");
  assert.equal(fallback.checkout.provider, null);
  assert.equal(fallback.checkout.processing_status, "unconfigured");
  assert.deepEqual(fallback.checkout.items, []);
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

test("contrato aceita compra com provider externo não-Cakto quando os gates estão coerentes", () => {
  const parsed = parseNFCoreCommercialOffer(purchasableOffer);
  assert.equal(parsed.purchase_enabled, true);
  assert.equal(parsed.checkout.status, "configured");
  assert.equal(parsed.checkout.processing_status, "configured");
  assert.equal(
    parsed.checkout.items[0]?.checkout_url,
    "https://pay.hotmart.com/example?src=nfcore",
  );
});

test("site rejeita checkout sem HTTPS mesmo para provider válido", () => {
  assert.throws(
    () =>
      parseNFCoreCommercialOffer({
        ...purchasableOffer,
        checkout: {
          ...purchasableOffer.checkout,
          items: [
            {
              ...purchasableOffer.checkout.items[0],
              checkout_url: "http://pay.hotmart.com/example",
            },
          ],
        },
      }),
    /absolute HTTPS URL/,
  );
});

test("site rejeita compra habilitada sem processamento do provider configurado", () => {
  assert.throws(
    () =>
      parseNFCoreCommercialOffer({
        ...purchasableOffer,
        checkout: {
          ...purchasableOffer.checkout,
          processing_status: "unconfigured",
          items: [
            {
              ...purchasableOffer.checkout.items[0],
              checkout_url: null,
            },
          ],
        },
      }),
    /purchase-enabled offer is inconsistent/,
  );
});

test("site rejeita URL exposta quando compra continua bloqueada", () => {
  assert.throws(
    () =>
      parseNFCoreCommercialOffer({
        ...purchasableOffer,
        purchase_enabled: false,
      }),
    /checkout URLs must stay hidden/,
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
  assert.match(component, /offer\.purchase_enabled/);
  assert.match(component, /checkoutAvailable/);
  assert.match(component, /\/produtos\/nfcore\/contratar\?plan=/);
  assert.doesNotMatch(component, /href=\{checkoutUrl\}/);
  assert.doesNotMatch(component, /NFCORE_API_URL/);
  assert.doesNotMatch(component, /pay\.cakto\.com\.br/);
});
