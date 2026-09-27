# IRON FIT — M4 Differentiators Web Parity

## Baseline

- Web integration baseline: `feat/site-dev001-foundation @ eb9b6792b0ba1fabf0aa15afbc5cdd8bf9b25625`
- Backend canonical baseline: `faabio3131/iron-fit-backend main @ c9495334f2c3ac95bfb399e32140a2dfcb668b8d`
- Branch: `feat/iron-fit-m4-differentiators-web-parity`

## Objective

Expose the already-certified differentiator domains through the authenticated IRON FIT Web shell without recreating business engines in the browser.

## Canonical surfaces

### Equipment Intelligence / EQ

The Web consumes canonical `/equipments` and `/equipments/catalog` contracts. Tenant authority remains the authenticated backend identity. Browser `gymId` and `tenantId` are stripped by the BFF.

### Product Entitlements / PE

The Web reads `/product-entitlements/tenant/features` and allows only the tenant configuration operations already authorized by the backend. The UI never derives feature authority from commercial plan names.

### Aggregator Hub / AGG

The Web exposes operational summary and provider analytics from the canonical AGG services. Wellhub, TotalPass or any future provider are not declared live or homologated by the Web. External availability is represented only by backend-supported evidence and remains fail-closed when unavailable.

### Creator Network / CN

The Web consumes the canonical operations console. `SUPER_ADMIN` resolves the global scope; OWNER/MANAGER resolve the tenant scope. Rights, content lifecycle, attribution, storage abstraction and provider state remain backend concerns.

No storage/CDN provider is declared externally homologated by this block.

### IRON Intelligence / AI0

The Web exposes:

- student advisory/chat already certified by AI0 G5;
- workout candidate generation already certified by AI0 G6;
- the G7 safety/adversarial boundaries remain untouched.

A generated workout is a candidate for human review. The Web does not set `ACTIVE`, does not forge `approvedById`, and does not auto-approve.

## Security invariants

- Same-origin enforcement applies to every non-GET BFF request.
- Access tokens remain HttpOnly/server-side and are attached upstream only by the BFF.
- `gymId` and `tenantId` supplied by browser query/body are removed.
- The BFF is allowlisted; unknown backend paths remain inaccessible.
- RBAC shown in navigation is UX only; backend guards remain authoritative.
- No secret, provider credential, or external production claim is stored in this Web implementation.

## Permanent certification

`tests/iron-fit-m4-differentiators-parity.test.ts` protects:

- existence of all five M4 Web surfaces;
- exact differentiator exposure through the governed BFF;
- tenant-spoof protection;
- no client-side plan authority;
- no invented Aggregator homologation;
- Creator Network global/tenant scope separation;
- AI human-in-the-loop and no autoactivation;
- role-aware navigation while backend authority remains intact.

## External dependencies

This block does **not** certify external partner homologation. Specifically, no Wellhub/TotalPass partner environment, Creator media storage/CDN, or real AI provider is promoted to externally live status without independent evidence. Internal Web parity remains provider-neutral and fail-closed.

## Exit gate

M4 is only certified after branch CI, PR CI, clean mergeability, squash promotion to the Web integration line, post-merge CI and governance reconciliation are all green.
