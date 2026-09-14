import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pages = [
  {
    slug: "kordena",
    name: "Kordena",
    expected: [
      "Comandar a operação de ponta a ponta",
      "Antecipar perdas e proteger a margem",
      "Gerir o resultado financeiro em tempo real",
      "Vender mais e fortalecer o relacionamento",
      "Atender, entregar e decidir com inteligência",
      "Gerente IA Core",
      "O cérebro que conecta toda a sua operação",
      "Produto parado também é dinheiro parado",
      "Faturamento não é lucro",
      "Menos tarefas manuais",
      "iFood",
      "Keeta",
      "99Food",
      "Google Maps",
      "campanhas orgânicas",
    ],
    anchors: ["core", "estoque-inteligente", "financeiro", "rotina", "recursos", "planos", "teste", "duvidas"],
  },
  {
    slug: "iron-fit",
    name: "Iron Fit",
    expected: ["Organizar os alunos", "Consultar o treino", "Acompanhar agenda e entrada"],
    anchors: ["rotina", "recursos", "planos", "teste", "duvidas"],
  },
];

for (const page of pages) {
  const html = await readFile(`out/produtos/${page.slug}.html`, "utf8").catch(() => readFile(`out/produtos/${page.slug}/index.html`, "utf8"));
  assert.equal((html.match(/<main[ >]/g) || []).length, 1);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);

  for (const expected of page.expected) assert.ok(html.includes(expected), `${page.slug}: ${expected}`);
  for (const anchor of page.anchors) {
    assert.ok(html.includes(`id="${anchor}"`), `${page.slug}: id=${anchor}`);
    assert.ok(html.includes(`href="#${anchor}"`), `${page.slug}: href=#${anchor}`);
  }

  assert.ok(html.includes("Teste grátis em preparação."), `${page.slug}: trial preparation state`);
  assert.ok(html.includes("Ativação online em preparação."), `${page.slug}: trial online state`);
  assert.ok(html.includes("https://wa.me/5511978350851?text="), `${page.slug}: whatsapp`);
  assert.ok(html.includes(`subject=${encodeURIComponent("Interesse em " + page.name)}`), `${page.slug}: email subject`);
  assert.ok(!html.includes("interesse=trial"), `${page.slug}: trial must not be falsely enabled`);
  assert.ok(!html.includes("<video"), `${page.slug}: no fabricated video`);
}

console.log("Landing export smoke: 2 product routes passed");
