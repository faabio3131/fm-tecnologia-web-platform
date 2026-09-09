import test from "node:test"; import assert from "node:assert/strict"; import { products } from "../src/catalog/products.ts"; import { getProductActions } from "../src/catalog/commerce.ts";
test("trial fica disponível somente para Kordena e Iron Fit",()=>{assert.deepEqual(products.filter(p=>getProductActions(p).trial).map(p=>p.slug),["kordena","iron-fit"])});
test("produtos em desenvolvimento nunca oferecem trial",()=>{for(const p of products.filter(p=>p.lifecycle==="desenvolvimento"))assert.equal(getProductActions(p).trial,false)});
test("Super Core Extreme não oferece contratação",()=>{const p=products.find(p=>p.slug==="super-core-extreme")!;assert.deepEqual(getProductActions(p),{trial:false,specialist:false})});
