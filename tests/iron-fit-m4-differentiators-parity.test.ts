import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(path: string) { return readFile(path, "utf8"); }

const pages = [
  "app/app/iron-fit/equipamentos/page.tsx",
  "app/app/iron-fit/recursos/page.tsx",
  "app/app/iron-fit/agregadores/page.tsx",
  "app/app/iron-fit/criadores/page.tsx",
  "app/app/iron-fit/inteligencia/page.tsx",
];

test("M4 exposes all five differentiator Web surfaces", async () => {
  for (const path of pages) assert.ok((await source(path)).length > 200, `${path} must be implemented`);
});

test("M4 BFF remains allowlisted and strips browser tenant authority", async () => {
  const proxy = await source("app/api/iron-fit/core/[...path]/route.ts");
  assert.match(proxy, /equipments\\\/catalog/);
  assert.match(proxy, /product-entitlements\\\/tenant/);
  assert.match(proxy, /aggregator\\\/operations/);
  assert.match(proxy, /creator-network\\\/operations/);
  assert.match(proxy, /ai\\\/workout-candidates/);
  assert.match(proxy, /query\.delete\("gymId"\)/);
  assert.match(proxy, /query\.delete\("tenantId"\)/);
  assert.match(proxy, /delete body\.gymId/);
  assert.match(proxy, /delete body\.tenantId/);
  assert.match(proxy, /isSameOrigin/);
  assert.match(proxy, /export const PUT = proxy/);
  assert.match(proxy, /export const DELETE = proxy/);
  assert.equal(proxy.includes("NEXT_PUBLIC_IRON_FIT_API"), false);
});

test("M4 Product Entitlements never derives authority from a client-side plan name", async () => {
  const resources = await source("app/app/iron-fit/recursos/page.tsx");
  const all = resources + await source("app/app/iron-fit/session-shell.tsx");
  assert.match(resources, /product-entitlements\/tenant\/features/);
  assert.match(resources, /Product Entitlement Engine/);
  assert.equal(/plan\s*===/.test(all), false);
  assert.equal(/plan\s*==/.test(all), false);
});

test("M4 Equipment Intelligence remains Core-controlled and tenant-safe", async () => {
  const equipment = await source("app/app/iron-fit/equipamentos/page.tsx");
  assert.match(equipment, /equipments\/catalog/);
  assert.match(equipment, /tenant é derivado da sessão autenticada/);
  assert.equal(equipment.includes("gymId:"), false);
});

test("M4 Aggregator never claims external provider homologation in the Web surface", async () => {
  const aggregator = await source("app/app/iron-fit/agregadores/page.tsx");
  assert.match(aggregator, /não declara homologação externa/);
  assert.match(aggregator, /aggregator\/intelligence\/providers/);
  assert.equal(/Wellhub.*homologad[oa]/i.test(aggregator), false);
  assert.equal(/TotalPass.*homologad[oa]/i.test(aggregator), false);
});

test("M4 Creator Network preserves backend scope and external media governance", async () => {
  const creators = await source("app/app/iron-fit/criadores/page.tsx");
  assert.match(creators, /user\.isSuperAdmin \? "global" : "tenant"/);
  assert.match(creators, /Storage\/CDN externo não é apresentado como homologado/);
  assert.equal(creators.includes("gymId"), false);
});

test("M4 AI exposes certified advisory/candidate paths without auto approval or activation", async () => {
  const ai = await source("app/app/iron-fit/inteligencia/page.tsx");
  const proxy = await source("app/api/iron-fit/core/[...path]/route.ts");
  assert.match(ai, /ai\/workout-candidates/);
  assert.match(ai, /me\/ai\/chat/);
  assert.match(ai, /me\/ai\/workout-insights/);
  assert.match(ai, /Nenhuma ativação automática/);
  assert.match(ai, /revisão humana/);
  assert.equal(/approvedById\s*:/.test(ai), false);
  assert.equal(/status\s*:\s*["']ACTIVE["']/.test(ai), false);
  assert.equal(proxy.includes("access\\/scan"), false);
});

test("M4 navigation is role-aware UX while backend remains final authority", async () => {
  const shell = await source("app/app/iron-fit/session-shell.tsx");
  assert.match(shell, /\/app\/iron-fit\/equipamentos/);
  assert.match(shell, /\/app\/iron-fit\/recursos/);
  assert.match(shell, /\/app\/iron-fit\/agregadores/);
  assert.match(shell, /\/app\/iron-fit\/criadores/);
  assert.match(shell, /\/app\/iron-fit\/inteligencia/);
  assert.match(shell, /hasAnyRole/);
});
