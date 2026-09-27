# NFCore Cakto Checkout Projection — Site FM Certification

**Status:** CERTIFICATION CANDIDATE — implementation complete; exact PR HEAD must pass both site workflows.
**Date:** 2026-09-27
**Repository:** `faabio3131/fm-tecnologia-web-platform`
**Base main:** `f863930cbcf00cc3dfa8f489311274e62e655901`
**Branch:** `feat/site-nfcore-cakto-checkout-contract`

## Upstream authority

Canonical NFCore main:

`08294a0d86ee865bd5aa6eb9868885ae121d55c1`

CL-10 — Governed Cakto Checkout Authority was merged through PR #64 and the post-merge `FM NFCORE V1 CI` #432 completed with **SUCCESS** on that exact SHA.

The site remains a projection only. It does not own pricing, commercial release, checkout configuration, Cakto bindings or fiscal production authority.

## Objective

Evolve the existing server-side Site FM ↔ NFCore commercial-offer contract to consume the CL-10 checkout projection without creating a second checkout authority and without trusting an upstream purchase flag in isolation.

## Contract and fail-closed validation

The site accepts checkout states:

- `unconfigured`;
- `partial`;
- `configured`.

The public checkout projection must identify provider `cakto`, processing state and plan/price items.

A purchase-enabled response is accepted only when all of the following are coherent:

1. release is explicitly `commercial_approved`;
2. pricing is `published`;
3. checkout is `configured`;
4. Cakto processing is `configured`;
5. checkout items match the published NFCore plan/price pairs;
6. every purchase item has a non-null checkout URL;
7. the URL is HTTPS on the canonical host `pay.cakto.com.br`.

Any invalid, incomplete, contradictory or unavailable upstream payload fails closed through the existing same-origin BFF.

When purchase is disabled, checkout URLs must remain hidden.

## UI behavior

The approved NFCore premium landing is preserved.

The availability block now projects the real checkout state and only renders `Contratar NFCore` for a specific plan/price pair when the canonical parsed NFCore offer authorizes purchase and supplies the validated Cakto URL for that exact pair.

Pricing may remain visible under its existing commercial-release rules even while checkout is blocked.

The generic contact channels remain available independently from checkout.

## Security boundaries

- `NFCORE_API_URL` remains server-side only.
- No Cakto API secret, webhook secret, token or credential enters browser code.
- No Cakto checkout URL is hardcoded in the component.
- Arbitrary redirect hosts are rejected.
- The site cannot create `commercial_approved`.
- The site cannot create `purchase_enabled`.
- Checkout/billing does not grant fiscal production authority.

## Tests added/updated

The contract tests now cover:

- fail-closed fallback shape;
- coherent non-purchasable offer;
- coherent purchasable Cakto offer;
- rejection of non-canonical checkout host;
- rejection of purchase without Cakto processing readiness;
- rejection of checkout URL exposure while purchase is blocked;
- browser isolation from `NFCORE_API_URL`;
- CTA dependence on parsed canonical checkout data.

## Not performed

This block does not perform:

- Cloudflare deploy;
- DNS changes;
- real NFCore runtime URL configuration;
- real Cakto product/offer configuration;
- real Cakto credentials/webhook secret;
- payment;
- billing activation;
- fiscal activation;
- homologation;
- production cutover;
- Go-Live.

Final certification requires **Site validation** and **Cloudflare Worker validation** to pass on the exact PR HEAD.
