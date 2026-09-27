import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function text(path: string) {
  return readFile(path, 'utf8');
}

test('M1 parity inventory fixes canonical repositories and all required domains', async () => {
  const inventory = await text('docs/IRON_FIT_M1_WEB_PARITY_INVENTORY.md');

  assert.match(inventory, /faabio3131\/fm-tecnologia-web-platform/);
  assert.match(inventory, /faabio3131\/iron-fit-backend/);
  assert.match(inventory, /2d6db81138e80907e4c62e318abf4cb2c3e2552b/);

  for (const domain of [
    'Authentication',
    'Dashboard',
    'Students',
    'Assessments',
    'Workouts',
    'Schedules',
    'Physical access',
    'Student finance',
    'Equipment',
    'Product entitlements',
    'Aggregator Hub',
    'Creator Network',
    'Audit',
  ]) {
    assert.ok(inventory.includes(domain), `missing M1 domain: ${domain}`);
  }

  assert.match(inventory, /MISSING_WEB/);
  assert.match(inventory, /M2/);
  assert.match(inventory, /M3/);
  assert.match(inventory, /M4/);
});

test('M1 freeze makes backend authoritative and forbids parallel auth/tenant engines', async () => {
  const freeze = await text('docs/IRON_FIT_M1_WEB_ARCHITECTURE_FREEZE.md');

  assert.match(freeze, /\/app\/iron-fit\/\*/);
  assert.match(freeze, /Secure.*HttpOnly.*SameSite/s);
  assert.match(freeze, /not stored in localStorage\/sessionStorage/);
  assert.match(freeze, /GET \/auth\/me\/tenants/);
  assert.match(freeze, /PUT \/auth\/me\/active-tenant/);
  assert.match(freeze, /Frontend role checks are UX only/);
  assert.match(freeze, /browser never authorizes the door\/catraca/);
  assert.match(freeze, /if \(plan === \.\.\.\)/);
  assert.match(freeze, /second user\/password database/);
  assert.match(freeze, /second tenant authority/);
  assert.match(freeze, /CSRF protection/);
});

test('M1 freeze pins the current framework and permanent quality pipeline', async () => {
  const freeze = await text('docs/IRON_FIT_M1_WEB_ARCHITECTURE_FREEZE.md');
  const pkg = JSON.parse(await text('package.json')) as { dependencies: Record<string, string>; devDependencies: Record<string, string>; scripts: Record<string, string> };

  assert.equal(pkg.dependencies.next, '15.5.25');
  assert.equal(pkg.dependencies.react, '19.1.1');
  assert.equal(pkg.devDependencies.typescript, '5.9.2');
  assert.equal(pkg.scripts.test, 'node --experimental-strip-types --test tests/*.test.ts');

  for (const gate of ['npm ci', 'dependency/security audit', 'lint', 'TypeScript typecheck', 'production build']) {
    assert.ok(freeze.includes(gate), `missing frozen quality gate: ${gate}`);
  }
});
