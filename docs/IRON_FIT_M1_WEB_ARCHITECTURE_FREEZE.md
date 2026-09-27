# IRON FIT — M1 Web Architecture Freeze

Status: architecture freeze candidate for M2/M3.

## 1. Repository and deployment boundary

The canonical IRON FIT Web implementation will live in `faabio3131/fm-tecnologia-web-platform`. No parallel IRON FIT frontend repository or second authentication nucleus is authorized by M1.

The existing public FM site and authenticated product surface remain one Next.js application/repository, with a strict route and security boundary between public acquisition pages and authenticated product pages.

M1 does not merge unrelated public-site work into `main`. M1/M2/M3 are executed as controlled stacked work over the existing Web integration line until the parent public-site PR is itself eligible for promotion.

## 2. Frozen technology baseline

- Next.js `15.5.25`.
- React / React DOM `19.1.1`.
- TypeScript `5.9.2`.
- ESLint `9.34.0` + `eslint-config-next 15.5.25`.
- Node CI/runtime baseline: Node 24 in current Web workflow.
- npm deterministic install via `npm ci`.
- App Router is the routing authority.

Changing these foundations during M2/M3 requires an explicit compatibility reason and full regression; framework upgrades are not an opportunistic part of the migration.

## 3. Route topology

Public routes remain public, including `/`, `/produtos/*`, legal pages and commercial content.

`/entrar` is the single public entry to authenticated FM products. The authenticated IRON FIT shell is frozen under:

`/app/iron-fit/*`

This namespace avoids collision with public product landing routes and provides one place for authenticated layout, route guards and product navigation.

Planned M2 shell routes:

- `/app/iron-fit` — role-aware home/dashboard redirect.
- `/app/iron-fit/selecionar-academia` — active tenant selection when required.
- protected children under the authenticated shell.

M3 functional routes will be children of the same namespace (dashboard, alunos, avaliações, treinos, agenda, acesso and financeiro). M4 differentiators remain under the same shell when implemented.

## 4. Authentication and session boundary

The certified backend `/auth/*` domain remains the canonical identity/session source during this migration. The Web layer must not implement its own user/password store or parallel role/tenant database.

Frozen browser security model:

1. Browser submits credentials to a same-origin Next.js server route/handler.
2. The Next.js server calls the canonical backend.
3. Backend access/refresh tokens are stored only in `Secure`, `HttpOnly`, `SameSite` cookies suitable for the deployment topology; tokens are not stored in localStorage/sessionStorage or exposed to client JavaScript.
4. Browser requests to protected backend capabilities are mediated by the same-origin server/BFF boundary so Authorization material is attached server-side.
5. Logout invalidates the backend refresh session and clears Web cookies.
6. Session restore resolves canonical `/auth/me` state; expired/invalid sessions fail closed back to `/entrar`.

M2 may refine cookie scope/CSRF mechanics according to the final production domain topology, but it may not weaken the HttpOnly/server-mediated invariant.

## 5. Tenant authority

Tenant authority is server-derived.

Canonical endpoints:

- `GET /auth/me/tenants` lists memberships available to the authenticated identity.
- `PUT /auth/me/active-tenant` changes active tenant through the backend's canonical rules.
- `GET /auth/me` returns canonical identity/session state.

The browser may display a selected tenant and submit a requested membership to the canonical active-tenant endpoint, but arbitrary `gymId`/`tenantId` fields in page state, query strings, forms or hidden inputs are never business authority.

The Web BFF must not add a client-supplied tenant header/body value to override the authenticated backend scope.

## 6. RBAC and authorization

Frontend role checks are UX only. They may hide navigation and prevent obviously invalid transitions, but every business operation relies on backend guards/RBAC/ownership/tenant enforcement.

Frozen personas:

- SUPER_ADMIN/FM
- OWNER
- MANAGER
- RECEPTION
- TRAINER/PROFESSIONAL
- STUDENT when the route is a certified self-service surface

Deep-linking directly to a hidden route must still fail through server/session/backend authorization.

## 7. API/BFF contract

The Web application consumes the certified backend; it does not duplicate calculations, lifecycle engines or persistence.

Rules:

- one server-side API client boundary for backend HTTP calls;
- typed request/response adapters at the Web boundary;
- normalized `401` -> authentication recovery/logout path;
- normalized `403` -> forbidden UX without privilege escalation;
- `404/409/422/429/5xx` produce bounded, non-sensitive user errors;
- no raw stack traces or backend secret material reach the browser;
- request/correlation identifiers may be surfaced to support without exposing payload secrets;
- no fictional fallback data may masquerade as live backend results.

## 8. Entitlements and product configuration

The browser must never implement `if (plan === ...)` as authority.

PE0-PE4 remain canonical. Web surfaces consume resolved feature/limit/policy information from backend contracts. Lower layers may only restrict, never expand, higher-level IRON policy or plan authority.

## 9. Domain authority map

- Auth/session/tenant: backend Auth.
- Dashboard KPIs: backend Dashboard.
- Students: backend Students.
- Assessments: backend Assessments.
- Workouts/lifecycle: backend Workouts.
- AI candidate: AI0 G6 + Workouts human lifecycle.
- Schedules: backend Schedules.
- Physical access: backend Access; browser never authorizes the door/catraca.
- Student financial domain: backend Financial.
- Equipment compatibility/inventory: EQ0-EQ5.
- Product configuration/entitlements: PE0-PE4.
- Aggregators: AGG0-AGG9.
- Creator/media/rights: CN0-CN9.
- AI policy/context/provenance: AI0 G1-G7.

## 10. UI architecture

M2 must establish reusable authenticated primitives before M3:

- authenticated root layout;
- sidebar/topbar/navigation model filtered by persona/entitlement for UX;
- loading/skeleton, empty, forbidden and error states;
- reusable form and validation primitives;
- tables, filters and pagination primitives;
- keyboard-visible focus and semantic navigation;
- responsive desktop/tablet/mobile behavior;
- reuse of the FM public design tokens/brand system without coupling business rules to visual components.

No screen is considered complete if it is only a mock disconnected from the canonical API.

## 11. Observability

Web requests must carry/generate a correlation identifier compatible with backend observability. Client telemetry must avoid credentials, tokens, health payloads, raw financial/fiscal data and other sensitive contents. Server-side error logging must be sanitized.

## 12. Security baseline

M2 certification must prove at minimum:

- no secrets or backend tokens in client bundle;
- HttpOnly session model;
- no localStorage/sessionStorage token persistence;
- protected route behavior for unauthenticated and forbidden users;
- tenant spoofing attempts do not become authority;
- dependency/security audit is part of CI;
- security headers/CSP are evaluated at the Next server/deployment layer;
- sensitive errors remain server-side and sanitized;
- CSRF protection is applied to state-changing same-origin BFF requests where cookie authentication makes it applicable.

## 13. Testing strategy

Permanent Web pipeline must include:

1. deterministic `npm ci`;
2. dependency/security audit applicable to the repository;
3. lint;
4. TypeScript typecheck;
5. Node unit/governance tests;
6. production build;
7. static/export validations already present where applicable;
8. M2 authenticated-route/session/tenant tests;
9. M3 role/tenant Core E2E scenarios.

Tests may use deterministic contract fakes at the Web boundary when an external runtime is not available in CI, but must not mock away the authorization/tenant/session behavior being certified.

## 14. Architecture prohibitions

M2/M3 may not:

- create a second user/password database;
- create a second tenant authority;
- persist access/refresh tokens in browser storage;
- trust hidden form/query gym IDs as authority;
- duplicate workout status, schedule capacity, finance, access, entitlement, equipment, Aggregator, Creator or AI engines;
- calculate critical financial truth in browser JavaScript;
- authorize physical access from the Web client;
- introduce real provider secrets in repository or bundle;
- advertise external integrations as live without homologation evidence.

## 15. M2/M3 execution order after M1

M2: authentication/session/tenant -> authenticated shell/design system -> frontend/BFF security -> permanent Web CI certification.

M3: dashboard -> students -> assessments -> workouts + G6 review -> schedules/operation -> access administration -> student finance -> cross-role/cross-tenant E2E.

Only after M3 certification may M4 differentiators be treated as the next parity block.

## 16. Freeze rule

This document is the M1 architecture contract for M2/M3. If implementation reveals a genuine blocker, the change must be documented and reviewed as an explicit architecture amendment; implementation must not silently diverge from these boundaries.
