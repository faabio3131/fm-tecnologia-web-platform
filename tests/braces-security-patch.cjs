/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS dependency test */
const assert = require('node:assert/strict');
const braces = require('braces');
const micromatch = require('micromatch');

const deepBraces = '{'.repeat(500) + 'a' + '}'.repeat(500);
const deepParens = '('.repeat(500) + 'a' + ')'.repeat(500);
for (const pattern of [deepBraces, deepParens]) {
  for (const operation of [braces, braces.parse, braces.compile, braces.expand, braces.stringify]) {
    assert.throws(() => operation(pattern), RangeError);
  }
}
assert.deepEqual(braces('{a,b}'), ['(a|b)']);
assert.deepEqual(braces('{a,b}', { expand: true }), ['a', 'b']);
assert.equal(braces.stringify('a/{b,c}'), 'a/{b,c}');
assert.deepEqual(braces('a/{b,c}'), ['a/(b|c)']);
assert.equal(micromatch.isMatch('file.ts', '*.ts'), true);
assert.equal(micromatch.isMatch('file.js', '*.ts'), false);
assert.equal(typeof micromatch.isMatch('file.ts', deepBraces), 'boolean');
console.log('BRACES PATCH PROBE PASS');
