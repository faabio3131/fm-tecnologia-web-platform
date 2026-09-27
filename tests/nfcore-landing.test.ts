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


test("NFCore Hero keeps symmetric 7x7 capability columns, no orbit, and the approved Core Fiscal signature", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /nfcore-domain-column--left/);
  assert.match(landing, /nfcore-domain-column--right/);
  assert.match(landing, />Emissão<\/span>/);
  assert.match(landing, />Documentos<\/span>/);
  assert.match(landing, />Regras Fiscais<\/span>/);
  assert.match(landing, />Reconciliação<\/span>/);
  assert.match(landing, />Readiness<\/span>/);
  assert.match(landing, />Cancelamento<\/span>/);
  assert.match(landing, />Inutilização<\/span>/);
  assert.match(landing, />Providers<\/span>/);
  assert.match(landing, />Integrações<\/span>/);
  assert.match(landing, />Webhooks<\/span>/);
  assert.match(landing, />Auditoria<\/span>/);
  assert.match(landing, />Governança<\/span>/);
  assert.match(landing, />Certificados<\/span>/);
  assert.match(landing, />Control Plane<\/span>/);
  assert.doesNotMatch(landing, /nfcore-orbit/);
  assert.match(landing, /nfcore-core-brand-lockup/);
  assert.match(landing, /nfcore-core-brand-wordmark__nf">NF/);
  assert.match(landing, /nfcore-core-brand-wordmark__core">CORE/);
  assert.match(landing, /nfcore-core-slogan">Infraestrutura fiscal inteligente/);
  assert.match(landing, /nfcore-core-caption">Core Fiscal/);
  assert.doesNotMatch(landing, /nfcore-core-brand-plaque/);
});

test("NFCore landing exposes its real functional depth without inventing production readiness", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /NF-e, NFC-e e NFS-e/);
  assert.match(landing, /Cancelamento e inutilização/);
  assert.match(landing, /Contingência/);
  assert.match(landing, /Capability & Readiness/);
  assert.match(landing, /Bridge e API versionada/);
  assert.match(landing, /Integrações multiproduto/);
  assert.match(landing, /Onboarding governado/);
  assert.match(landing, /Planos, entitlements e uso/);
  assert.match(landing, /Pricing, liberação e checkout/);
  assert.match(landing, /Dependências externas \/ humanas antes do Go-Live/);
  assert.match(landing, /documento × operação × UF\/município × provider × ambiente/);
  assert.doesNotMatch(landing, /100% homologado|produção liberada|todas as jurisdições homologadas/i);
});


test("NFCore Hero CSS contains no legacy orbit/radar selectors and preserves responsive 7x7 geometry", async () => {
  const css = await readFile("app/nfcore.css", "utf8");
  assert.doesNotMatch(css, /\.nfcore-orbit/);
  assert.match(css, /repeat\(7,27px\)/);
  assert.match(css, /nth-child\(7\)/);
  assert.match(css, /grid-template-columns:\s*78px minmax\(0,1fr\) 78px/);
});
