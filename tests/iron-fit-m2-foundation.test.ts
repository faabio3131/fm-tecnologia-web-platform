import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path: string) => readFile(path, "utf8");

test("M2 uses server runtime and production security headers", async () => {
  const config = await read("next.config.ts");
  assert.ok(!config.includes('output: "export"'));
  for (const protection of ["Content-Security-Policy", "frame-ancestors 'none'", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
    assert.ok(config.includes(protection), protection);
  }
});

test("M2 keeps auth tokens out of browser JavaScript storage", async () => {
  const files = await Promise.all([
    read("app/entrar/login-form.tsx"),
    read("app/app/iron-fit/session-shell.tsx"),
    read("src/lib/iron-fit/session-cookies.ts"),
  ]);
  const client = `${files[0]}\n${files[1]}`;
  assert.ok(!client.includes("localStorage"));
  assert.ok(!client.includes("sessionStorage"));
  assert.ok(!client.includes("access_token"));
  assert.ok(!client.includes("refresh_token"));
  assert.match(files[2], /httpOnly:\s*true/);
  assert.match(files[2], /sameSite:\s*"lax"/);
  assert.match(files[2], /secure:\s*process\.env\.NODE_ENV\s*===\s*"production"/);
});

test("M2 BFF is the only browser auth boundary", async () => {
  const login = await read("app/api/iron-fit/auth/login/route.ts");
  const refresh = await read("app/api/iron-fit/auth/refresh/route.ts");
  const logout = await read("app/api/iron-fit/auth/logout/route.ts");
  const session = await read("app/api/iron-fit/auth/session/route.ts");
  const upstream = await read("src/lib/iron-fit/server-api.ts");
  assert.ok(upstream.includes("process.env.IRON_FIT_API_URL"));
  assert.ok(!upstream.includes("NEXT_PUBLIC_"));
  assert.ok(login.includes('"/auth/login"'));
  assert.ok(refresh.includes('"/auth/refresh"'));
  assert.ok(logout.includes('"/auth/logout"'));
  assert.ok(session.includes('"/auth/me"'));
  assert.ok(login.includes("requires_tenant_selection"));
  assert.ok(login.includes("setIronFitSessionCookies"));
  assert.ok(refresh.includes("setIronFitSessionCookies"));
  assert.ok(logout.includes("clearIronFitSessionCookies"));
});

test("M2 protects the operational namespace without moving authority to middleware", async () => {
  const middleware = await read("middleware.ts");
  const shell = await read("app/app/iron-fit/session-shell.tsx");
  assert.ok(middleware.includes('/app/iron-fit/:path*'));
  assert.ok(middleware.includes("IRON_FIT_ACCESS_COOKIE"));
  assert.ok(shell.includes('/api/iron-fit/auth/session'));
  assert.ok(shell.includes('/api/iron-fit/auth/refresh'));
  assert.ok(shell.includes('/api/iron-fit/auth/logout'));
});

test("M2 does not pre-implement M3 business modules", async () => {
  const home = await read("app/app/iron-fit/page.tsx");
  assert.ok(home.includes("M2 em certificação"));
  for (const prohibited of ["/students", "/assessments", "/workouts", "/schedules", "/financial", "/access"]) {
    assert.ok(!home.includes(prohibited), prohibited);
  }
});
