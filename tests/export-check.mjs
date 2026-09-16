import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { products } from "../src/catalog/products.ts";

// Execute after npm run build. Validate the deployable artifact, not only source files.
const origin = "https://fmtecnologiaia.com.br";
const routes = ["", "/produtos", "/solucoes", "/precos", "/recursos", "/empresa", "/contato", "/entrar", ...products.map(p => `/produtos/${p.slug}`)];
for (const route of routes) {
  const html = await readFile(`out/${route ? route.slice(1) : "index"}.html`, "utf8");
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `canonical missing: ${route}`);
  assert.equal(new URL(canonical).href, new URL(route || "/", origin).href, `canonical: ${route}`);
  assert.ok(!html.includes("https://fmtecnologia.ai"), `old domain: ${route}`);
  for (const match of html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)/g)) {
    await access(`out${decodeURIComponent(match[1])}`);
  }
}
const home = await readFile("out/index.html", "utf8");
assert.ok(home.includes("IA para melhorar hoje e"), "home: new FM slogan must be present");
assert.ok(home.includes("evoluir o amanhã."), "home: new FM slogan ending must be present");
assert.ok(home.includes("Tecnologia inteligente para transformar operações, decisões e resultados."), "home: approved supporting positioning must be present");
assert.ok(home.includes("FM Tecnologia — IA para melhorar hoje e evoluir o amanhã"), "home: metadata title must use new FM slogan");
assert.ok(!home.includes("Soluções reais para <em>um grande amanhã."), "home: superseded FM hero slogan must be absent");
assert.ok(!home.includes("Tecnologia inteligente para empresas que querem ir além."), "home: superseded supporting positioning must be absent");
assert.ok(!home.includes("Tecnologia para <em>construir o próximo."), "home: older superseded hero copy must be absent");
assert.ok(!home.includes("FM Tecnologia — Soluções reais para um grande amanhã"), "home: superseded metadata title must be absent");
assert.ok(!home.includes("FM Tecnologia — Tecnologia para construir o próximo"), "home: older superseded metadata title must be absent");
assert.ok(home.includes("Kordena, Iron Fit Core e NFCore."), "home: principal product trio must be present");
assert.ok(home.includes("NFCore"), "home: NFCore must be present");
assert.ok(!home.includes("FM NFCORE"), "home: deprecated NFCore naming must be absent");

const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const route of routes) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `sitemap: ${route}`);
assert.ok((await readFile("out/robots.txt", "utf8")).includes(`Sitemap: ${origin}/sitemap.xml`));
await access("out/404.html");
console.log(`PASS: ${routes.length} páginas, canonicals, assets locais, slogan oficial, portfólio, sitemap, robots e 404 exportados.`);
