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
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const route of routes) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `sitemap: ${route}`);
assert.ok((await readFile("out/robots.txt", "utf8")).includes(`Sitemap: ${origin}/sitemap.xml`));
await access("out/404.html");
console.log(`PASS: ${routes.length} páginas, canonicals, assets locais, sitemap, robots e 404 exportados.`);
