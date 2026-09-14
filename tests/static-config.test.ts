import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import config from "../next.config.ts";

test("build gera exportação estática para Pages", () => {
  assert.equal(config.output, "export");
});

test("metadata routes são geradas durante o build", async () => {
  for (const path of ["app/robots.ts", "app/sitemap.ts"]) {
    assert.match(await readFile(path, "utf8"), /export const dynamic = "force-static"/);
  }
});
