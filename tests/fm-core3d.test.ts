import assert from "node:assert/strict";
import { existsSync, statSync, readFileSync } from "node:fs";
import test from "node:test";

const hero = readFileSync(new URL("../src/components/marketing/fm-premium-hero.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../src/components/layout/header.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../src/components/layout/footer.tsx", import.meta.url), "utf8");
const foundation = readFileSync(new URL("../app/fm-premium-foundation.css", import.meta.url), "utf8");
const approvedCss = readFileSync(new URL("../app/fm-premium-approved.css", import.meta.url), "utf8");
const chrome = readFileSync(new URL("../src/components/layout/site-chrome.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("approved Home Hero uses one fixed Gerente IA artwork with the correct central plaque", () => {
  assert.match(hero, /fm-core-gerente-ia\.png/);
  assert.doesNotMatch(hero, /FmCoreVisualCarousel/);
  assert.doesNotMatch(hero, /FmCore3D/);
});

test("Core identity is baked into the approved static artwork, with no HTML overlay", () => {
  assert.doesNotMatch(hero, /plaque-copy/);
  assert.doesNotMatch(hero, /fm-core-approved__caption/);
  assert.doesNotMatch(approvedCss, /plaque-copy/);
  assert.doesNotMatch(approvedCss, /fm-core-approved__caption/);
  assert.doesNotMatch(hero, /plaque-copy|fm-core-approved__caption/);
});

test("the three corrected PNG Core artworks are committed as real local assets", () => {
  for (const filename of ["fm-core-gerente-ia.png", "fm-core-core.png", "fm-core-kordena.png"]) {
    const asset = new URL("../public/brand/" + filename, import.meta.url);
    assert.equal(existsSync(asset), true, "Missing asset: " + filename);
    assert.ok(statSync(asset).size > 1_000_000, "Asset unexpectedly small: " + filename);
  }
});

test("Home Hero keeps the approved institutional capability plates", () => {
  for (const phrase of ["Atendimento", "Vendas", "Estoque", "Produção", "Financeiro", "Clientes"]) {
    assert.ok(hero.includes(phrase), "Missing capability plate: " + phrase);
  }
});

test("premium Home preserves the official FM lockup in header and footer", () => {
  assert.match(header, /<Logo \/>/);
  assert.match(footer, /<Logo \/>/);
  assert.doesNotMatch(header, /PremiumLogo/);
  assert.doesNotMatch(footer, /PremiumLogo/);
});

test("premium typography inherits the original FM Arial system", () => {
  assert.match(foundation, /--fm-font-sans: var\(--font-body, Arial, sans-serif\)/);
  assert.match(foundation, /--fm-font-display: var\(--font-display, Arial, sans-serif\)/);
  assert.match(approvedCss, /font-family: var\(--font-body, Arial, sans-serif\)/);
});

test("Premium footer styling remains scoped only to the Home route", () => {
  assert.match(chrome, /const premiumHome = pathname === "\/"/);
  assert.match(chrome, /<Footer premiumHome=\{premiumHome\} \/>/);
});

test("Premium Home remains scoped and uses the blue approved surface", () => {
  assert.match(home, /className="fm-premium-home"/);
  assert.match(approvedCss, /#3095f5/);
  assert.match(approvedCss, /#63c7ef/);
});

test("Hero preserves the approved FM commercial message and calls to action", () => {
  assert.match(hero, /Tecnologia que conecta/);
  assert.match(hero, /operação, dados e inteligência/);
  assert.match(hero, /Conhecer produtos/);
  assert.match(hero, /Falar com a FM/);
});


test("site-wide public premium theme is scoped away from operational Iron Fit app", () => {
  const siteChrome = readFileSync(new URL("../src/components/layout/site-chrome.tsx", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const premium = readFileSync(new URL("../app/fm-public-site-premium.css", import.meta.url), "utf8");
  assert.match(siteChrome, /pathname\.startsWith\("\/app\/iron-fit"\)/);
  assert.match(siteChrome, /className="fm-public-site"/);
  assert.match(layout, /fm-public-site-premium\.css/);
  assert.match(premium, /\.fm-public-site/);
  assert.match(premium, /#2f91ff/);
  assert.match(premium, /#67d6ff/);
});

test("Kordena uses the approved Central de Pedidos hero while preserving Core brand assets", () => {
  const landing = readFileSync(new URL("../src/components/marketing/product-landing.tsx", import.meta.url), "utf8");
  const story = readFileSync(new URL("../src/components/marketing/kordena-story.tsx", import.meta.url), "utf8");
  assert.match(landing, /kordena-central-pedidos-hero-1920\.webp/);
  assert.match(landing, /kordena-central-pedidos-hero-1280\.webp/);
  assert.match(landing, /Kordena Central de Pedidos coordenando a operação de um restaurante/);
  assert.ok(existsSync(new URL("../public/brand/fm-core-kordena.png", import.meta.url)));
  assert.match(story, /fm-core-core\.png/);
  assert.doesNotMatch(landing, /fm-core-gerente-ia\.webp/);
  assert.doesNotMatch(story, /fm-core-gerente-ia\.webp/);
});
