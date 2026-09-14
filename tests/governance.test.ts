import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { siteConfig } from "../src/config/site.ts";
import { brandImplementationStatus } from "../src/config/brand.ts";

test("domínio oficial alimenta canonical, sitemap e robots", async () => {
  assert.equal(siteConfig.url, "https://fmtecnologiaia.com.br");
  const files = await Promise.all([
    readFile("src/lib/seo/metadata.ts", "utf8"),
    readFile("app/sitemap.ts", "utf8"),
    readFile("app/robots.ts", "utf8"),
  ]);
  assert.equal(files.every((content) => content.includes("siteConfig.url")), true);
  assert.equal(files.some((content) => content.includes("fmtecnologia.com.br")), false);
});

test("rota de catálogo permanece candidata até decisão executiva", () => {
  assert.equal(siteConfig.catalogRoute.path, "/produtos");
  assert.equal(siteConfig.catalogRoute.alternative, "/marketplace");
  assert.equal(siteConfig.catalogRoute.status, "candidate_pending_executive_decision");
});

test("visual atual não é promovido a identidade oficial", () => {
  assert.equal(brandImplementationStatus.repositoryAssets, "pending_evidence");
  assert.equal(brandImplementationStatus.currentVisualLayer, "provisional_not_approved_as_official_identity");
});
