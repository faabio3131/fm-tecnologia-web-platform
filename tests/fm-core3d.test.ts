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

test("approved Home Hero uses the approved Core artwork instead of the rejected procedural WebGL reconstruction", () => {
  assert.match(hero, /fm-core-approved\.webp/);
  assert.doesNotMatch(hero, /FmCore3D/);
  assert.match(hero, /GERENTE IA/);
  assert.match(hero, /CORE · inteligência cognitiva/);
});

test("approved Core artwork is committed as a real local asset", () => {
  const asset = new URL("../public/brand/fm-core-approved.webp", import.meta.url);
  assert.equal(existsSync(asset), true);
  assert.ok(statSync(asset).size > 300_000);
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
