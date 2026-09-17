import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import config from "../next.config.ts";

test("build usa runtime Next server para suportar BFF e cookies HttpOnly", () => {
  assert.notEqual(config.output, "export");
  assert.equal(config.reactStrictMode, true);
  assert.equal(config.poweredByHeader, false);
  assert.equal(typeof config.headers, "function");
});

test("metadata públicas continuam estáticas e independentes do BFF", async () => {
  for (const path of ["app/robots.ts", "app/sitemap.ts"]) {
    assert.match(await readFile(path, "utf8"), /export const dynamic = "force-static"/);
  }
});
