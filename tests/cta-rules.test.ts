import test from "node:test";
import assert from "node:assert/strict";
import { getProduct, products } from "../src/catalog/products.ts";
import { canStartTrial, getProductActions, getTrialEntryHref } from "../src/catalog/commerce.ts";

test("nenhum trial operacional é liberado sem evidência de release", () => {
  assert.deepEqual(products.filter(canStartTrial), []);
});

test("política de trial aprovada não implica CTA transacional", () => {
  const policyApproved = products.filter((product) => product.trialPolicyStatus === "approved_partial_contract");
  assert.deepEqual(policyApproved.map((product) => product.slug), ["kordena", "iron-fit"]);
  assert.equal(policyApproved.every((product) => !getProductActions(product).trial), true);
});

test("produtos em desenvolvimento nunca oferecem trial", () => {
  for (const product of products.filter((item) => item.lifecycle === "in_development")) {
    assert.equal(getProductActions(product).trial, false);
  }
});

test("Super Core Extreme não oferece contratação", () => {
  const product = products.find((item) => item.slug === "super-core-extreme")!;
  assert.deepEqual(getProductActions(product), { trial: false, specialist: false });
});


test("cada produto possui rota de entrada de trial própria pelo slug", () => {
  assert.deepEqual(
    products.map((product) => getTrialEntryHref(product)),
    products.map((product) => `/teste-gratis/${product.slug}`),
  );
});

test("release de trial exige URL de ativação do próprio produto", () => {
  const kordena = getProduct("kordena")!;
  const released = {
    ...kordena,
    commercialAvailability: "available" as const,
    trialReleaseStatus: "released" as const,
    trialActivationUrl: "https://kordena.example/signup",
  };
  assert.equal(canStartTrial(released), true);
  assert.equal(getTrialEntryHref(released), "/teste-gratis/kordena");
  assert.equal(canStartTrial({ ...released, trialActivationUrl: undefined }), false);
});
