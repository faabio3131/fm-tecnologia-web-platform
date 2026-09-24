import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../src/components/marketing/fm-core-3d.tsx", import.meta.url), "utf8");
const hero = readFileSync(new URL("../src/components/marketing/fm-premium-hero.tsx", import.meta.url), "utf8");

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
