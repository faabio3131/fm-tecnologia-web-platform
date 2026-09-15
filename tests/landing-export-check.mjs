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
      "30 dias grátis",
      "Teste grátis por 30 dias",
    ],
    anchors: ["core", "estoque-inteligente", "financeiro", "rotina", "recursos", "planos", "teste", "duvidas"],
    trialState: true,
    emailSubject: true,
  },
  {
    slug: "iron-fit",
    name: "Iron Fit Core",
    expected: [
      "IRON FIT",
      "CORE",
      "Inteligência no centro. Evolução em movimento.",
      "Gestão, alunos, treinos, avaliações, agenda, acesso, equipamentos e financeiro conectados em uma única plataforma.",
      "Um Core. Toda a operação conectada.",
      "Core Vertical FM Tecnologia",
      "Dados · contexto · inteligência",
      "Aluno",
      "Treino",
      "Avaliação",
      "Equipamentos",
      "Agenda",
      "Acesso",
      "Financeiro",
      "Inteligência",
      "ironfitcore.com.br",
      "/iron-fit-core-approved-hero.webp",
      "/iron-fit-core-approved-symbol.webp",
    ],
    anchors: ["core"],
    trialState: false,
    emailSubject: false,
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

  if (page.trialState) {
    assert.ok(html.includes("Ativação online em preparação."), `${page.slug}: trial online state`);
  } else {
    assert.ok(!html.includes("30 dias grátis"), `${page.slug}: future commercial blocks must not leak into phase 1`);
  }

  assert.ok(html.includes("https://wa.me/5511978350851?text="), `${page.slug}: whatsapp`);
  if (page.emailSubject) {
    assert.ok(html.includes(`subject=${encodeURIComponent("Interesse em " + page.name)}`), `${page.slug}: email subject`);
  }
  assert.ok(!html.includes("interesse=trial"), `${page.slug}: trial must not be falsely enabled`);
  assert.ok(!html.includes("<video"), `${page.slug}: no fabricated video`);
}

console.log("Landing export smoke: Kordena + Iron Fit Core phase 1 passed");
