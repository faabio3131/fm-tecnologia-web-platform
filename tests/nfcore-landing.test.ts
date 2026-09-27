import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

test("NFCore public route uses its dedicated premium landing", async () => {
  const productPage = await readFile("src/components/marketing/product-page.tsx", "utf8");
  assert.match(productPage, /product\.slug === "nfcore"/);
  assert.match(productPage, /<NFCoreLanding \/>/);
  await access("src/components/marketing/nfcore-landing.tsx");
  await access("app/nfcore.css");
  await access("public/brand/fm-nfcore-mark.svg");
});

test("NFCore landing preserves commercial and fiscal readiness boundaries", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /Produto Principal · Em desenvolvimento/);
  assert.match(landing, /Produção fiscal real depende de homologação, credenciais e autorização/);
  assert.doesNotMatch(landing, /PRODUCTION_APPROVED|100% homologado|produção liberada/i);
});


test("NFCore uses the director-approved cognitive brand asset", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  await access("public/brand/nfcore-brand-approved.webp");
  assert.match(landing, /nfcore-brand-approved\.webp/);
});
