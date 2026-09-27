import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(path: string) { return readFile(path, "utf8"); }

const pages = [
  "app/app/iron-fit/dashboard/page.tsx",
  "app/app/iron-fit/alunos/page.tsx",
  "app/app/iron-fit/avaliacoes/page.tsx",
  "app/app/iron-fit/treinos/page.tsx",
  "app/app/iron-fit/agenda/page.tsx",
  "app/app/iron-fit/comunicacao/page.tsx",
  "app/app/iron-fit/acessos/page.tsx",
  "app/app/iron-fit/financeiro/page.tsx",
];

test("M3 exposes all Core operational surfaces", async () => {
  for (const path of pages) assert.ok((await source(path)).length > 100, `${path} must be implemented`);
});

test("M3 BFF is allowlisted, strips client gymId and keeps bearer server-side", async () => {
  const proxy = await source("app/api/iron-fit/core/[...path]/route.ts");
  assert.match(proxy, /const routes:/);
  assert.match(proxy, /query\.delete\("gymId"\)/);
  assert.match(proxy, /delete body\.gymId/);
  assert.match(proxy, /IRON_FIT_ACCESS_COOKIE/);
  assert.match(proxy, /bearer\(accessToken\)/);
  assert.match(proxy, /isSameOrigin/);
  assert.equal(proxy.includes("NEXT_PUBLIC_IRON_FIT_API"), false);
});

test("M3 workout activation remains an explicit human action", async () => {
  const workouts = await source("app/app/iron-fit/treinos/page.tsx");
  assert.match(workouts, /Revisão humana de status/);
  assert.match(workouts, /createdByAI/);
  assert.match(workouts, /approvedById/);
  assert.match(workouts, /A IA não usa esta transição/);
  assert.equal(workouts.includes("useEffect(() => corePatch"), false);
});

test("M3 physical access Web displays facts but never performs scan or physical authorization", async () => {
  const access = await source("app/app/iron-fit/acessos/page.tsx");
  const proxy = await source("app/api/iron-fit/core/[...path]/route.ts");
  assert.match(access, /access\/events/);
  assert.match(access, /nunca decide liberação física/);
  assert.equal(proxy.includes("access\\/scan"), false);
  assert.equal(access.includes("access/scan"), false);
});

test("M3 finance explicitly remains student finance, not SaaS billing", async () => {
  const finance = await source("app/app/iron-fit/financeiro/page.tsx");
  assert.match(finance, /não é o billing SaaS/);
  assert.match(finance, /financial\/charges/);
});

test("M3 role-aware navigation is UX only while Core endpoints remain protected", async () => {
  const shell = await source("app/app/iron-fit/session-shell.tsx");
  const proxy = await source("app/api/iron-fit/core/[...path]/route.ts");
  assert.match(shell, /hasAnyRole/);
  assert.match(shell, /\/app\/iron-fit\/dashboard/);
  assert.match(shell, /\/app\/iron-fit\/alunos/);
  assert.match(shell, /\/app\/iron-fit\/treinos/);
  assert.match(proxy, /Sessão expirada/);
});
