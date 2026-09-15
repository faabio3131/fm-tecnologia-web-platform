import test from "node:test";
import assert from "node:assert/strict";
import { products, getProduct } from "../src/catalog/products.ts";

test("catálogo contém exatamente os seis produtos oficiais com slugs candidatos únicos", () => {
  assert.equal(products.length, 6);
  assert.equal(new Set(products.map((product) => product.slug)).size, 6);
  assert.deepEqual(products.map((product) => product.name), ["Kordena", "Iron Fit Core", "Vendedor IA", "CampaIA", "Super Core Extreme", "ERP Core"]);
});

test("Kordena e Iron Fit Core são prioritários sem lifecycle ou disponibilidade inferidos", () => {
  for (const product of products.filter((item) => item.priority === "primary")) {
    assert.equal(product.lifecycle, "pending_evidence");
    assert.equal(product.commercialAvailability, "pending_evidence");
    assert.equal(product.certificationStatus, "pending_evidence");
    assert.equal(product.productionHomologationStatus, "pending_evidence");
  }
});

test("produtos principais preservam preços aprovados", () => {
  assert.deepEqual(getProduct("kordena")?.pricing, { monthly: 299, annual: 2990, enterprise: true });
  assert.deepEqual(getProduct("iron-fit")?.pricing, { monthly: 269, annual: 2690, enterprise: true });
});

test("produtos em desenvolvimento e P&D não publicam oferta", () => {
  for (const product of products.filter((item) => item.priority !== "primary")) {
    assert.equal(product.commercialAvailability, "unavailable");
    assert.equal(product.trialReleaseStatus, "unavailable");
    assert.equal(product.pricingStatus, "not_for_public_offer");
  }
});
