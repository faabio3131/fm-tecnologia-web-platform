# NFCore Provider-Neutral Checkout Contract — Site FM Certification

**Status:** CERTIFICATION CANDIDATE — implementation green on code HEAD; exact documentary HEAD must pass both Site workflows.
**Date:** 2026-09-27
**Repository:** `faabio3131/fm-tecnologia-web-platform`
**Base main:** `34ca03515b3addf2c71497548445feba0b47dcf4`
**PR:** #22
**Branch:** `fix/site-nfcore-provider-neutral-checkout`

## Objective

Correct the provider lock-in introduced by Site PR #21 while preserving the existing server-side BFF and fail-closed commercial authority model.

The Site remains a projection only. NFCore continues to own pricing, commercial release and purchase authorization.

## Corrected contract

The Site no longer requires:

- `provider="cakto"`;
- host `pay.cakto.com.br`;
- Cakto-specific checkout semantics.

The checkout projection accepts a governed provider identifier and validates checkout URLs generically as absolute HTTPS URLs without embedded credentials.

The fail-closed fallback contains no selected provider.

Provider/items, plan/price pairs, checkout status, processing status and `purchase_enabled` must remain coherent.

## Evidence

Code HEAD `878983f3289f75eee2901121f30f7eb3a240e58c` passed:

- Site Validation #529 / run `36359210226`: **SUCCESS**;
- Cloudflare Worker Validation #103 / run `36359210235`: **SUCCESS**.

The contract tests use a synthetic non-Cakto provider to prove that the Site is not tied to one external sales channel. This does not claim a real Hotmart/Kax integration.

## Preserved boundaries

- `NFCORE_API_URL` remains server-side only;
- browser code does not own pricing or release authority;
- arbitrary non-HTTPS checkout URLs are rejected;
- credentials embedded in checkout URLs are rejected;
- purchase CTA appears only from a coherent NFCore response;
- provider-specific credentials/secrets never enter the Site contract;
- fiscal production authority remains separate.

## Not performed

No Cloudflare deploy, DNS change, external provider configuration, credentials, billing activation, fiscal activation, homologation or Go-Live is performed by this correction.

The exact final documentary HEAD must pass both Site workflows before promotion.
