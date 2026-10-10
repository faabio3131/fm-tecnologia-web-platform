# Controlled security exception — braces GHSA-vfj7-8cjw-p6xm

Status: **candidate for CI validation; not a claim of upstream remediation**. Review date: 2026-10-10. Expiry/review due: 2026-11-10. Owner: FM Tecnologia engineering / human release authority.

## Scope and evidence

- npm registry reports the high-severity stack-exhaustion advisory on `braces@3.0.3`; upstream patched version is not available at the time of review.
- `braces` is pulled by development tooling, including `eslint-config-next` and `patch-package`; production-only `npm audit --omit=dev --audit-level=high` returned zero findings.
- `patches/braces+3.0.3.patch` enforces a bounded parser nesting depth of 128 for brace and parenthesis nodes. It is applied automatically by `postinstall` using `patch-package@8.0.1`.
- Security regression `tests/braces-security-patch.cjs` covers direct braces parse/compile/expand/stringify and normal glob behavior; deep patterns are rejected in direct braces calls. This is a mitigation, not proof of complete resistance across all consumers.
- The full npm audit still reports seven related high-severity dependency-chain entries because it identifies the published package version rather than inspecting the applied patch.

## Exception policy

CI `scripts/security-audit-gate.cjs` must **fail closed** if: (1) production dependency audit has any high-or-higher finding; (2) patch file or direct security regression is missing or fails; (3) npm audit is unreadable; (4) any new vulnerable package appears; or (5) any advisory outside the exact GHSA-vfj7-8cjw-p6xm chain appears. Only the currently observed development-tooling chain is temporarily tolerated.

This exception does not authorize ignoring security advisories, downgrading framework versions, deploying untested code, or merging before required GitHub CI checks pass. Revisit by 2026-11-10 and remove this exception when upstream ships a compatible fixed version. Changes to dependencies require re-review.

## Certification status

Local `npm ci` applied the patch successfully; security regression passed; ESLint 0 errors (2 existing warnings); TypeScript passed; 68/68 tests passed; Next.js build passed. The custom scoped gate passed locally on 2026-10-10. GitHub Actions certification and production smoke must still pass before merge.
