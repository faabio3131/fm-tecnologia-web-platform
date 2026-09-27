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

test("NFCore uses the final high-resolution approved brand pair", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  await access("public/brand/nfcore-brand-hero-final.png");
  await access("public/brand/nfcore-emblem-final.png");
  assert.match(landing, /nfcore-brand-hero-final\.png/);
  assert.match(landing, /nfcore-emblem-final\.png/);
});


test("NFCore Hero keeps symmetric domain columns and Core Fiscal branded plaque", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /nfcore-domain-column--left/);
  assert.match(landing, /nfcore-domain-column--right/);
  assert.match(landing, />Regras<\/span>/);
  assert.match(landing, />Gateways<\/span>/);
  assert.match(landing, />Auditoria<\/span>/);
  assert.match(landing, />Documentos<\/span>/);
  assert.match(landing, />Reconciliação<\/span>/);
  assert.match(landing, />Governança<\/span>/);
  assert.match(landing, /nfcore-core-brand-plaque/);
  assert.match(landing, /nfcore-core-brand-plaque__nf">NF/);
  assert.match(landing, /nfcore-core-brand-plaque__core">CORE/);
  assert.match(landing, /nfcore-core-caption">Core Fiscal/);
});
