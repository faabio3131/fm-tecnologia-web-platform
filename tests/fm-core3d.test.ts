import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../src/components/marketing/fm-core-3d.tsx", import.meta.url), "utf8");
const hero = readFileSync(new URL("../src/components/marketing/fm-premium-hero.tsx", import.meta.url), "utf8");
const chrome = readFileSync(new URL("../src/components/layout/site-chrome.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../src/components/layout/footer.tsx", import.meta.url), "utf8");
const logo = readFileSync(new URL("../src/components/layout/logo.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const premiumCss = readFileSync(new URL("../app/fm-premium-hero.css", import.meta.url), "utf8");

test("FM Home Core uses genuine WebGL2 rendering instead of a rotating flat image", () => {
  assert.match(source, /getContext\("webgl2"/);
  assert.match(source, /gl\.enable\(gl\.DEPTH_TEST\)/);
  assert.match(source, /gl\.drawElements\(gl\.TRIANGLES/);
  assert.match(source, /createHexPrism/);
  assert.match(source, /createTorus/);
  assert.doesNotMatch(source, /<img\b/i);
  assert.doesNotMatch(source, /next\/image/i);
});

test("FM Home Core implements the six institutional states", () => {
  for (const phrase of [
    "FM TECNOLOGIA",
    "Tecnologia que conecta",
    "DADOS",
    "Informação que orienta decisões",
    "AUTOMAÇÃO",
    "Processos mais inteligentes",
    "INTELIGÊNCIA",
    "Contexto que aprende e evolui",
    "OPERAÇÃO",
    "Controle para crescer com clareza",
    "FM CORE",
    "Dados, automação e inteligência em sintonia",
  ]) {
    assert.ok(source.includes(phrase), "Missing Core state phrase: " + phrase);
  }
});

test("FM Home Core includes volumetric brain geometry, independent orbit rings and reduced-motion handling", () => {
  assert.match(source, /brainGeometry/);
  assert.match(source, /gl\.LINES/);
  assert.match(source, /gl\.POINTS/);
  assert.match(source, /const ringCount/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /reducedMotionRef/);
});

test("Premium Hero integrates the real 3D Core component", () => {
  assert.match(hero, /import \{ FmCore3D \}/);
  assert.match(hero, /<FmCore3D \/>/);
  assert.doesNotMatch(hero, /fm-core-device/);
  assert.doesNotMatch(hero, /fm-brain-svg/);
});


test("FM Home Core reconstructs the approved layered silhouette instead of the rejected spherical appliance", () => {
  assert.match(source, /createArcBand/);
  assert.match(source, /shellOuter/);
  assert.match(source, /shellInner/);
  assert.match(source, /armorMain/);
  assert.match(source, /const crystal =/);
  assert.match(source, /ringWide/);
  assert.match(source, /ringEnergy/);
  assert.match(source, /const orbitLines/);
  assert.doesNotMatch(source, /const bodyModel = multiply\(groupRotation, scaling\(1\.72/);
});

test("Premium footer styling is scoped only to the Home route", () => {
  assert.match(chrome, /const premiumHome = pathname === "\/"/);
  assert.match(chrome, /<Footer premiumHome=\{premiumHome\} \/>/);
  assert.match(footer, /premiumHome \? " site-footer--premium-home" : ""/);
});


test("Premium Home uses a scoped blue FM lockup and dark premium content surface", () => {
  assert.match(logo, /export function PremiumLogo/);
  assert.match(home, /className="fm-premium-home"/);
  assert.match(hero, /Tecnologia que conecta operação/);
});

test("Core fidelity pass uses horizontal ribbon rings and layered polygon plaque", () => {
  assert.match(source, /createHorizontalArcBand/);
  assert.match(source, /createPolygonPlate/);
  assert.match(source, /frameOuter/);
  assert.match(source, /frameMid/);
  assert.match(source, /brainNodes = tier === "desktop" \? 220/);
});


test("V6 reconstruction preserves dimensional Core, Home-only scope, and responsive treatment", () => {
  assert.ok(hero.includes("fm-core-visual__telemetry"));
  assert.ok(hero.includes('aria-hidden="true"'));
  assert.ok(premiumCss.includes("FM PREMIUM HOME — REFERENCE RECONSTRUCTION V6"));
  assert.ok(premiumCss.includes(".fm-core-visual__telemetry{display:none}"));
  assert.ok(premiumCss.includes("@media(prefers-reduced-motion:reduce)"));
  assert.ok(source.includes("createPolygonPlate(gl, 8, 1.34, 1.03, .085)"));
  assert.ok(source.includes("const orbitBase = translation(0, 2.75, 0)"));
  assert.ok(source.includes("const xTilts = [.20, -.30, .16, -.22, .34]"));
});
