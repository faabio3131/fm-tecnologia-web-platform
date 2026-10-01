import test from "node:test"; import assert from "node:assert/strict"; import { access } from "node:fs/promises"; import { products } from "../src/catalog/products.ts";
const staticRoutes=["app/page.tsx","app/produtos/page.tsx","app/solucoes/page.tsx","app/precos/page.tsx","app/recursos/page.tsx","app/empresa/page.tsx","app/contato/page.tsx","app/entrar/page.tsx","app/teste-gratis/[slug]/page.tsx"];
test("rotas públicas essenciais possuem implementação",async()=>{await Promise.all(staticRoutes.map(path=>access(path)))});
test("cada slug oficial é gerado pelo template de produto",async()=>{await access("app/produtos/[slug]/page.tsx");assert.equal(products.filter(product=>product.slug).length,7)});

test("trial público não reutiliza a rota exclusiva de login do Iron Fit",async()=>{const source=await import("node:fs/promises").then(({readFile})=>readFile("src/components/marketing/product-landing.tsx","utf8"));assert.equal(source.includes('href="/entrar"'),false)});
