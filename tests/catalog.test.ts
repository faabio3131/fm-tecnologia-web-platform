import test from "node:test";
import assert from "node:assert/strict";
import { products, getProduct } from "../src/catalog/products.ts";

test("catálogo contém exatamente os sete produtos oficiais com slugs candidatos únicos", () => {
  assert.equal(products.length, 7);
  assert.equal(new Set(products.map((product) => product.slug)).size, 7);
  assert.deepEqual(products.map((product) => product.name), ["Kordena", "Iron Fit Core", "NFCore", "Vendedor IA", "CampaIA", "Super Core Extreme", "ERP Core"]);
});

test("Kordena e Iron Fit Core preservam prioridade sem lifecycle ou disponibilidade inferidos", () => {
  for (const slug of ["kordena", "iron-fit"]) {
    const product = getProduct(slug)!;
    assert.equal(product.priority, "primary");
    assert.equal(product.lifecycle, "pending_evidence");
    assert.equal(product.commercialAvailability, "pending_evidence");
    assert.equal(product.certificationStatus, "pending_evidence");
    assert.equal(product.productionHomologationStatus, "pending_evidence");
  }
});

test("NFCore ocupa a terceira posição principal sem publicar oferta ou homologação", () => {
  const product = getProduct("nfcore")!;
  assert.equal(product.name, "NFCore");
  assert.equal(product.priority, "primary");
  assert.equal(product.lifecycle, "in_development");
  assert.equal(product.commercialAvailability, "unavailable");
  assert.equal(product.trialReleaseStatus, "unavailable");
  assert.equal(product.pricingStatus, "not_for_public_offer");
  assert.equal(product.productionHomologationStatus, "pending_evidence");
});

test("produtos principais com preços aprovados preservam valores", () => {
  assert.deepEqual(getProduct("kordena")?.pricing, { monthly: 299, annual: 2990, enterprise: true });
  assert.deepEqual(getProduct("iron-fit")?.pricing, { monthly: 269, annual: 2690, enterprise: true });
});

test("demais produtos em desenvolvimento e P&D não publicam oferta", () => {
  for (const product of products.filter((item) => item.priority !== "primary")) {
    assert.equal(product.commercialAvailability, "unavailable");
    assert.equal(product.trialReleaseStatus, "unavailable");
    assert.equal(product.pricingStatus, "not_for_public_offer");
  }
});
