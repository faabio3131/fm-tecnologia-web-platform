import assert from "node:assert/strict";
import { products } from "../src/catalog/products.ts";

const base = process.env.SITE_URL || "http://127.0.0.1:3100";
const origin = "https://fmtecnologiaia.com.br";
const routes = ["", "/produtos", "/solucoes", "/precos", "/recursos", "/empresa", "/contato", "/entrar", ...products.map(p => `/produtos/${p.slug}`)];

async function text(path) {
  const response = await fetch(`${base}${path || "/"}`);
  assert.equal(response.status, 200, `HTTP ${response.status}: ${path || "/"}`);
  return response.text();
}

for (const route of routes) {
  const html = await text(route);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `canonical missing: ${route}`);
  assert.equal(new URL(canonical).href, new URL(route || "/", origin).href, `canonical: ${route}`);
  assert.ok(!html.includes("https://fmtecnologia.ai"), `old domain: ${route}`);
  for (const match of html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)/g)) {
    const asset = await fetch(`${base}${decodeURIComponent(match[1])}`);
    assert.ok(asset.ok, `asset missing: ${match[1]}`);
  }
}

const home = await text("");
assert.ok(home.includes("IA para melhorar hoje e"), "home: new FM slogan must be present");
assert.ok(home.includes("evoluir o amanhã."), "home: new FM slogan ending must be present");
assert.ok(home.includes("Tecnologia inteligente para transformar operações, decisões e resultados."), "home: approved supporting positioning must be present");
assert.ok(home.includes("FM Tecnologia — IA para melhorar hoje e evoluir o amanhã"), "home: metadata title must use new FM slogan");
assert.ok(!home.includes("Soluções reais para <em>um grande amanhã."), "home: superseded FM hero slogan must be absent");
assert.ok(!home.includes("Tecnologia inteligente para empresas que querem ir além."), "home: superseded supporting positioning must be absent");
assert.ok(!home.includes("Tecnologia para <em>construir o próximo."), "home: older superseded hero copy must be absent");
assert.ok(!home.includes("FM Tecnologia — Soluções reais para um grande amanhã"), "home: superseded metadata title must be absent");
assert.ok(!home.includes("FM Tecnologia — Tecnologia para construir o próximo"), "home: older superseded metadata title must be absent");
assert.ok(home.includes("Soluções inteligentes para cada frente da operação."), "home: approved product section positioning must be present");
for (const productName of ["Kordena", "Iron Fit Core", "NFCore"]) {
  assert.ok(home.includes(productName), `home: principal product must be present: ${productName}`);
}
assert.ok(!home.includes("FM NFCORE"), "home: deprecated NFCore naming must be absent");

const sitemap = await text("/sitemap.xml");
for (const route of routes) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `sitemap: ${route}`);
assert.ok((await text("/robots.txt")).includes(`Sitemap: ${origin}/sitemap.xml`));
const missing = await fetch(`${base}/__iron_fit_expected_404__`);
assert.equal(missing.status, 404, "custom 404 response");
console.log(`PASS: ${routes.length} páginas, canonicals, assets, slogan, portfólio, sitemap, robots e 404 no runtime de produção.`);
