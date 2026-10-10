/* eslint-disable @typescript-eslint/no-require-imports -- Node audit gate */
'use strict';
const { spawnSync, execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const assert = require('node:assert/strict');
const advisory = 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm';
const allowed = new Set(['braces', 'micromatch', 'fast-glob', '@next/eslint-plugin-next', 'eslint-config-next', 'find-yarn-workspace-root', 'patch-package']);
const run = args => spawnSync('npm', args, { encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 8 * 1024 * 1024 });
try {
  const patch = readFileSync(resolve('patches/braces+3.0.3.patch'), 'utf8');
  assert.match(patch, /Brace nesting depth exceeds safe limit/);
  assert.match(patch, /Pattern nesting depth exceeds safe limit/);
  assert.equal(require('braces/package.json').version, '3.0.3');
  execFileSync(process.execPath, [resolve('tests/braces-security-patch.cjs')], { stdio: 'inherit' });
  const prod = run(['audit', '--omit=dev', '--audit-level=high', '--json']);
  assert.equal(prod.status, 0, 'Production audit must pass');
  const full = run(['audit', '--json']);
  assert.ok(full.status === 0 || full.status === 1, 'npm audit failed to execute');
  const report = JSON.parse(full.stdout);
  assert.ok(report.vulnerabilities && typeof report.vulnerabilities === 'object');
  const findings = Object.entries(report.vulnerabilities);
  for (const [name, entry] of findings) {
    assert.ok(allowed.has(name), `Unexpected vulnerability: ${name}`);
    assert.ok(entry.nodes?.length > 0 && entry.nodes.every(n => n.startsWith('node_modules/')), `Unexpected path: ${name}`);
    assert.ok(entry.via?.length > 0, `Missing advisory chain: ${name}`);
    for (const via of entry.via) {
      if (typeof via === 'string') assert.ok(allowed.has(via), `Unexpected chain: ${name} via ${via}`);
      else assert.ok(name === 'braces' && via.url === advisory && via.source === 1240992, `Unexpected advisory: ${name}`);
    }
  }
  assert.ok(findings.some(([name]) => name === 'braces'), 'Remove obsolete exception: braces finding absent');
  console.log(`SECURITY GATE PASS: production clean, ${findings.length} known dev-only advisory-chain findings; patch tests passed.`);
} catch (error) { console.error('SECURITY GATE FAIL:', error.message); process.exitCode = 1; }
