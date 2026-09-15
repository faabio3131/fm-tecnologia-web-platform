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
      "Um Core. Toda a operação conectada.",
      "Da recepção à gestão. Tudo conectado.",
      "A academia acompanha. O aluno evolui.",
      "Avaliação, prescrição, treino e evolução no mesmo fluxo.",
      "O treino também entende a estrutura da academia.",
      "Da reserva à presença, dentro do mesmo contexto.",
      "A operação acontece. O financeiro acompanha.",
      "Catálogo mestre",
      "Check-in",
      "Mensalidades",
      "ironfitcore.com.br",
      "/iron-fit-core-official-lockup.webp",
    ],
    anchors: ["core", "gestao", "app", "treinos", "equipamentos", "agenda-acesso", "financeiro"],
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
  if (page.trialState) assert.ok(html.includes("Ativação online em preparação."), `${page.slug}: trial online state`);
  else assert.ok(!html.includes("30 dias grátis"), `${page.slug}: future commercial blocks must not leak before phase 7`);
  assert.ok(html.includes("https://wa.me/5511978350851?text="), `${page.slug}: whatsapp`);
  if (page.emailSubject) assert.ok(html.includes(`subject=${encodeURIComponent("Interesse em " + page.name)}`), `${page.slug}: email subject`);
  assert.ok(!html.includes("interesse=trial"), `${page.slug}: trial must not be falsely enabled`);
  assert.ok(!html.includes("<video"), `${page.slug}: no fabricated video`);
  if (page.slug === "iron-fit") {
    assert.ok(!html.includes("/iron-fit-core-approved-symbol.webp"), "iron-fit: broken legacy symbol reference removed");
    assert.ok(!html.includes("/iron-fit-core-approved-hero.webp"), "iron-fit: broken legacy hero reference removed");
  }
}

const ironFitAsset = await readFile("out/iron-fit-core-official-lockup.webp");
assert.equal(ironFitAsset.subarray(0, 4).toString("ascii"), "RIFF", "iron-fit: official lockup must be a valid RIFF WebP");
assert.equal(ironFitAsset.subarray(8, 12).toString("ascii"), "WEBP", "iron-fit: official lockup must be a valid WebP asset");

console.log("Landing export smoke: Kordena + Iron Fit Core through phase 4 passed");
