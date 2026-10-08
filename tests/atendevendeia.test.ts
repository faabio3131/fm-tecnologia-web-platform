import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { products } from "../src/catalog/products.ts";
import content from "../src/catalog/product-landings.json" with { type: "json" };

const product = products.find(p => p.slug === "atendevendeia");

test("AtendeVendeIA ocupa o espaço do antigo Vendedor IA", () => {
  assert.ok(product);
  assert.equal(product.id, "prod_vendedor_ia");
  assert.equal(product.name, "AtendeVendeIA");
  assert.ok(!products.some(p => p.slug === "vendedor-ia"));
  assert.ok(Object.prototype.hasOwnProperty.call(content, "atendevendeia"));
  assert.ok(existsSync(new URL("../public/brand/atendevendeia-mark.svg", import.meta.url)));
});

test("AtendeVendeIA não promete disponibilidade, preço nem teste", () => {
  assert.ok(product);
  assert.equal(product.commercialAvailability, "unavailable");
  assert.equal(product.trialPolicy, undefined);
  assert.equal(product.pricing, undefined);
  assert.match(product.publicLabel, /Em breve/);
});
