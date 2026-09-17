# IRON FIT — M1 Web Parity Inventory

Status: M1.1 inventory candidate

## Canonical sources

- Web repository: `faabio3131/fm-tecnologia-web-platform`.
- Web integration baseline: `feat/site-dev001-foundation` @ `d0d5f6948ec719eb7756fc1c5d531197b2dac5e7`.
- Backend repository: `faabio3131/iron-fit-backend`.
- Backend certified baseline for this inventory: `main` @ `2d6db81138e80907e4c62e318abf4cb2c3e2552b` (AI0 G1-G7 certified).
- Mobile reference remains `faabio3131/iron-fit-app`; Web must not create divergent business semantics.

There is no second dedicated IRON FIT Web application in the accessible repositories. The existing FM Web platform already hosts the public IRON FIT surface and `/entrar`; therefore the authenticated IRON FIT Web surface will evolve in this repository rather than create a parallel frontend.

## Current Web state

The repository currently contains the FM public site, product landing pages including `/produtos/iron-fit`, legal/public surfaces and `/entrar`. The current `/entrar` surface is not yet the operational IRON FIT SaaS shell. No certified operational screens were found for dashboard, students, assessments, workouts, schedules, access, student finance, equipment, entitlements, Aggregator Hub, Creator Network or IRON Intelligence.

Classification used below:

- PUBLIC_ONLY: product/public page exists, but not the authenticated SaaS capability.
- MISSING_WEB: backend capability exists; operational Web surface does not yet exist.
- BACKEND_CANONICAL: business authority already exists server-side and must be consumed, never reimplemented.

## Parity matrix

| Domain | Backend canonical surface | Personas / authority | Current Web | Required target | Planned block |
|---|---|---|---|---|---|
| Authentication | `/auth/login`, `/auth/token/refresh`, `/auth/logout`, `/auth/me`, `/auth/me/tenants`, `/auth/me/active-tenant`, invitation acceptance | authenticated identity; tenant membership | `/entrar` public shell only | server-mediated login/session, tenant selection, refresh/logout | M2 |
| Dashboard | `/dashboard/owner`, `/dashboard/manager`, `/dashboard/reception`, `/dashboard/trainer` | OWNER, MANAGER, RECEPTION, TRAINER, SUPER_ADMIN according to endpoint | MISSING_WEB | persona-aware operational dashboard | M3 |
| Students | `/students` CRUD/queries | SUPER_ADMIN/OWNER/MANAGER; scoped reads for RECEPTION/TRAINER per backend | MISSING_WEB | list/search/create/edit/activate flows bound to canonical API | M3 |
| Assessments | `/assessments`, `/assessments/student/:studentId`, `/assessments/:id` | SUPER_ADMIN/OWNER/MANAGER/TRAINER | MISSING_WEB | create/history/view/edit according to backend RBAC | M3 |
| Workouts | `/workouts`, `/workouts/student/:studentId`, `/workouts/:id`, `/workouts/:id/status` | SUPER_ADMIN/OWNER/MANAGER/TRAINER | MISSING_WEB | deterministic workout editor + lifecycle/review | M3 |
| AI workout candidate | governed professional AI candidate surface; AI0 G6 | professional roles, `ai.workout_generation`, human approval | MISSING_WEB | candidate generation/review visibly distinct from human ACTIVE workout | M3/M4 boundary; M3 consumes G6 for workout review |
| Student AI advisory | `POST /me/ai/workout-insights`, `POST /me/ai/chat` | STUDENT only | mobile certified; Web absent | optional student Web advisory if/when product surface requires it | M4 |
| Schedules | `src/modules/schedules` canonical controller/service | backend RBAC/tenant rules | MISSING_WEB | slots/reservations/capacity/operation | M3 |
| Communication | `src/modules/communication` canonical module | backend RBAC/tenant rules | MISSING_WEB | operational communication surface using existing contracts | M3 when required by operation |
| Physical access | `src/modules/access` canonical module | device/tenant chain-of-trust remains backend authority | MISSING_WEB | administrative visibility/operations only; browser never authorizes physical access | M3 |
| Student finance | `src/modules/financial` canonical module | backend financial invariants/RBAC | MISSING_WEB | subscriptions/charges/payments/delinquency/history | M3 |
| Equipment | `src/modules/equipments`; EQ0-EQ5 | global catalog + tenant inventory rules | MISSING_WEB | catalog/search/tenant selection/candidate governance | M4 |
| Product entitlements | `src/modules/product-entitlements`; PE0-PE4 | IRON policy > plan > tenant config > user preference | MISSING_WEB | plan/version/tenant subscription/configuration UI | M4 |
| Aggregator Hub | `src/modules/aggregator`; AGG0-AGG9 | provider-neutral, tenant-scoped; external providers fail closed | MISSING_WEB | reception, operations, risk/settlement queues, analytics | M4 |
| Creator Network | `src/modules/creator-network`; CN0-CN9 | rights/content/media/commercial governance | MISSING_WEB | creator/rights/content/moderation/commercial/analytics consoles | M4 |
| Audit | backend AuditLog and domain audit trails | server-side evidence only | MISSING_WEB | read-only administrative views only where backend exposes safe APIs | M3/M4 as applicable |
| FM / SUPER_ADMIN administration | backend global governance endpoints by domain | SUPER_ADMIN | no IRON authenticated admin shell | authenticated global administration; no tenant authority invented in browser | M4 |

## Persona map

- SUPER_ADMIN/FM: global governance only where backend explicitly grants it.
- OWNER: tenant owner operations and owner dashboard.
- MANAGER: tenant management within canonical RBAC.
- RECEPTION: reception-scoped operational views/actions only.
- TRAINER/PROFESSIONAL: assessment/workout/student operations permitted by backend; AI candidate review/generation only if entitled.
- STUDENT: `/me/*`-style self-service/advisory only where Web surface is explicitly implemented.

## Gap conclusions

1. The public IRON FIT landing is not evidence of operational Web parity.
2. Authentication, session restoration and active tenant selection are the first blocking operational gaps.
3. All M3 Core operational domains are currently MISSING_WEB and must consume the certified backend instead of reimplementing rules.
4. Equipment, entitlements, Aggregator, Creator Network and the broader AI surface are intentionally deferred to M4.
5. SaaS billing/trial/provisioning are not student finance and remain M5/M6.
6. External Wellhub/TotalPass, media provider, fiscal and real AI provider status must not be represented as live without external homologation evidence.

## M1 exit evidence

M1 is complete only when this inventory and `IRON_FIT_M1_WEB_ARCHITECTURE_FREEZE.md` are versioned, governance tests pass, Web CI is green, the PR is clean/mergeable, promotion to the integration branch succeeds, post-merge CI is green, and the Master Order is reconciled/read back.
