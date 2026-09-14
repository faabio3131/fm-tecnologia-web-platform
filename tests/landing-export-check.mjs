import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pages = [
  { slug: "kordena", name: "Kordena", expected: ["Comandar a operação de ponta a ponta", "Antecipar perdas e proteger a margem", "Gerir o resultado financeiro em tempo real", "Vender mais e fortalecer o relacionamento", "Atender, entregar e decidir com inteligência", "iFood", "Keeta", "99Food", "Google Maps", "campanhas orgânicas", "Core inteligente"] },
  { slug: "iron-fit", name: "Iron Fit", expected: ["Organizar os alunos", "Consultar o treino", "Acompanhar agenda e entrada"] },
];
for (const page of pages) {
  const html = await readFile(`out/produtos/${page.slug}.html`, "utf8").catch(() => readFile(`out/produtos/${page.slug}/index.html`, "utf8"));
  assert.equal((html.match(/<main[ >]/g) || []).length, 1);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  for (const expected of page.expected) assert.ok(html.includes(expected), expected);
  for (const anchor of ["rotina", "recursos", "planos", "duvidas"]) {
    assert.ok(html.includes(`id="${anchor}"`), anchor);
    assert.ok(html.includes(`href="#${anchor}"`), anchor);
  }
  assert.ok(html.includes("Teste ainda não disponível para ativação."));
  assert.ok(html.includes("https://wa.me/5511978350851?text="));
  assert.ok(html.includes(`subject=${encodeURIComponent("Interesse em " + page.name)}`));
  assert.ok(!html.includes("interesse=trial"), "trial must not be enabled");
  assert.ok(!html.includes("<video"), "no fabricated video placeholder");
}
console.log("Landing export smoke: 2 product routes passed");
