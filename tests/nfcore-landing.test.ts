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
  assert.match(landing, /Arquitetura integrável/);
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


test("NFCore Core Fiscal mission block keeps the approved four-pillar composition", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  const coreStageMatch = landing.match(/<div className="nfcore-core-stage">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  assert.ok(coreStageMatch, "Core Fiscal stage must exist");
  const coreStage = coreStageMatch[1];

  for (const label of ["Contexto", "Operação", "Regras", "Evidência"]) {
    assert.match(coreStage, new RegExp(">" + label + "<"));
  }

  assert.doesNotMatch(coreStage, />Reconciliação<|>Integrações<|>Readiness<|>Providers</);
  assert.match(coreStage, /documentos · eventos · estados/);
  assert.match(coreStage, /logs · reconciliação · auditoria/);
  assert.match(coreStage, /nfcore-core-center--approved/);
  assert.match(coreStage, /nfcore-core-brand-wordmark__nf">NF/);
  assert.match(coreStage, /nfcore-core-brand-wordmark__core">CORE/);
  assert.match(coreStage, /nfcore-core-slogan">Infraestrutura fiscal inteligente/);
  assert.match(coreStage, /nfcore-core-caption">Core Fiscal/);
});

test("NFCore Core Fiscal CSS locks the approved 2 + center + 2 geometry and luminous slogan frame", async () => {
  const css = await readFile("app/nfcore.css", "utf8");
  const approvedBlock = css.slice(css.lastIndexOf("APPROVED Core Fiscal visual restored"));
  assert.match(approvedBlock, /grid-template-columns:\s*minmax\(190px,220px\)\s+minmax\(360px,400px\)\s+minmax\(190px,220px\)/);
  assert.match(approvedBlock, /grid-template-rows:\s*repeat\(2,minmax\(96px,1fr\)\)/);
  assert.match(approvedBlock, /nfcore-core-brand-wordmark__nf/);
  assert.match(approvedBlock, /nfcore-core-brand-wordmark__core/);
  assert.match(approvedBlock, /nfcore-core-slogan::before/);
  assert.match(approvedBlock, /nfcore-core-slogan::after/);
});


test("NFCore wordmarks use the shared FM display typography", async () => {
  const css = await readFile("app/nfcore.css", "utf8");
  assert.match(css, /\.nfcore-wordmark__nf,[\s\S]*font-family:\s*var\(--font-display\)/);
  assert.match(css, /\.nfcore-core-brand-wordmark__core[\s\S]*font-family:\s*var\(--font-display\)/);
  const finalTypographyBlock = css.slice(css.lastIndexOf("NFCore typography normalization"));
  assert.doesNotMatch(finalTypographyBlock, /Arial Black|Arial Narrow/);
  assert.match(finalTypographyBlock, /font-style:\s*normal/);
  assert.match(finalTypographyBlock, /transform:\s*none/);
});


test("NFCore public positioning keeps the cognitive Core and hides internal product architecture", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /Core cognitivo interpreta contexto/);
  assert.match(landing, /Core cognitivo pensa e coordena/);
  assert.match(landing, /execução fiscal crítica permanece determinística/);
  assert.match(landing, /SaaS · ERP · Plataformas/);
  assert.match(landing, /autoridade fiscal independente e conectável/);
  assert.doesNotMatch(landing, /Kordena|Iron Fit|CampaIA|Vendedor IA|Produtos FM/);
});

test("NFCore commercial checkout stays provider-neutral in public positioning", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /checkout provider-neutral/);
  assert.match(landing, /provider comercial selecionado/);
  assert.doesNotMatch(landing, /Checkout Cakto|bindings Cakto|evento real da Cakto|Credenciais.*Cakto/i);
});

test("NFCore landing describes fiscal engineering depth and portal-capability boundaries", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  for (const capability of [
    "Lifecycle fiscal",
    "Numeração e sequência",
    "Assinatura e validação",
    "Resiliência operacional",
    "Operação e incidentes",
  ]) {
    assert.match(landing, new RegExp(capability));
  }
  assert.match(landing, /capabilities abaixo pertencem ao Core\/API/);
  assert.match(landing, /emitir, consultar, cancelar, inutilizar e reconciliar são operações diretas governadas/);
  assert.match(landing, /contingência e archive reference permanecem capacidades da infraestrutura/);
});

test("NFCore readiness lists external commercial, communication, legal and fiscal dependencies", async () => {
  const landing = await readFile("src/components/marketing/nfcore-landing.tsx", "utf8");
  assert.match(landing, /Planos, preços e promoções reais aprovados/);
  assert.match(landing, /Provider comercial selecionado/);
  assert.match(landing, /Provider real de e-mail\/SMS/);
  assert.match(landing, /Revisão jurídica\/LGPD operacional/);
  assert.match(landing, /Homologação por documento × operação × jurisdição × provider/);
});
