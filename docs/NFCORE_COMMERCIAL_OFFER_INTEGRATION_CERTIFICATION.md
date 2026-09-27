# NFCore Commercial Offer Integration — Site FM Certification

**Status:** CERTIFICATION CANDIDATE — functional HEAD green; exact final documentary HEAD must pass both site workflows.
**Date:** 2026-09-27
**Repository:** `faabio3131/fm-tecnologia-web-platform`
**Base main:** `2dc20eb12bb3cd57d24dc5a36af4521bbdbcb7ef`
**PR:** #20
**Branch:** `feat/site-nfcore-commercial-offer-authority`

## Objective

Connect the FM Tecnologia commercial site to the canonical NFCore commercial authority without creating a second pricing table, second release authority, browser-side upstream dependency or false sale activation.

Canonical upstream contract:

`GET {NFCORE_API_URL}/v1/commercial/offer`

## Architecture

`Browser -> /api/nfcore/commercial-offer -> NFCORE_API_URL/v1/commercial/offer`

`NFCORE_API_URL` is server-side runtime configuration only.

The browser never receives the upstream base URL and does not call NFCore directly.

## Fail-closed rules

Any missing server configuration, timeout, HTTP failure or invalid payload produces a blocked public state.

Fallback:

- release: `unavailable`;
- pricing: `unpriced`;
- checkout: `unconfigured`;
- `purchase_enabled=false`;
- `trial_enabled=false`.

The site additionally rejects any payload that attempts to enable purchase before an explicit checkout contract is implemented.

## Authority boundaries preserved

- NFCore remains the pricing authority.
- NFCore remains the commercial release authority.
- The site is only a projection.
- Published pricing never implies sale authorization.
- `commercial_approved` never implies checkout readiness.
- Commercial release never grants fiscal production authority.
- No NFCore price is hardcoded in the site.
- No Cakto credential, fiscal credential, secret or production token is introduced.

## Premium UX

The approved NFCore Infrastructure Mission Control landing remains the same product surface.

The availability section now projects:

- official release state;
- pricing publication state;
- checkout state;
- purchase/trial blocking;
- canonical public message when available;
- governed pricing only when the release contract permits public commercial presentation.

When NFCore cannot be confirmed, the interface visibly enters a `FAIL-CLOSED` state rather than inventing readiness.

## Functional evidence

Functional HEAD:
`af96915928c1a0e0a9c1ffdcd3c53c7b47ed630f`

Site Validation #517 / run `36351711203`: **SUCCESS**

- npm audit: PASS
- lint: PASS
- typecheck: PASS
- tests: **57 passed / 0 failed**
- Next production build: PASS
- production runtime smoke: PASS
- 15-page export/canonical/assets/sitemap/robots/404 runtime verification: PASS
- existing Kordena + Iron Fit landing runtime smoke: PASS

Cloudflare Worker Validation #91 / run `36351711206`: **SUCCESS**

- npm ci: PASS
- OpenNext Cloudflare Worker build: PASS
- Worker artifact verification: PASS

## Not performed

This block does not perform:

- Cloudflare deploy;
- DNS changes;
- real NFCore environment configuration;
- real pricing publication;
- checkout activation;
- Cakto production configuration;
- billing activation;
- fiscal activation;
- homologation;
- production cutover;
- Go-Live.

The real `NFCORE_API_URL` remains an external runtime configuration dependency and must only be supplied when an authorized NFCore environment exists.

Final integration certification requires both workflows to pass again on the exact documentary HEAD. The exact SHA/runs are recorded in the PR checkpoint to avoid self-referential documentation churn.
