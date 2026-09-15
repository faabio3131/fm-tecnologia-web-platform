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
    sectionAnchors: ["core", "estoque-inteligente", "financeiro", "rotina", "recursos", "planos", "teste", "duvidas"],
    navAnchors: ["core", "estoque-inteligente", "financeiro", "rotina", "recursos", "planos", "teste", "duvidas"],
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
      "IRON INTELLIGENCE",
      "O profissional continua no controle.",
      "Aggregator Hub",
      "Segurança, confiança e governança",
      "Demonstração do produto",
      "Demonstração em preparação",
      "Tour do produto",
      "Dashboard da academia",
      "Gestão de alunos",
      "Treinos e avaliações",
      "Equipamentos",
      "Financeiro",
      "App do aluno",
      "Screenshot real em preparação",
      "Uma plataforma para evoluir junto com a academia.",
      "269",
      "2.690",
      "Enterprise",
      "Sob consulta",
      "Teste ainda não disponível para ativação.",
      "Dúvidas frequentes",
      "O Iron Fit Core é apenas um aplicativo para alunos?",
      "O aluno possui aplicativo próprio?",
      "O sistema possui gestão financeira?",
      "O Iron Fit utiliza inteligência artificial?",
      "O Iron Fit já está integrado ao Wellhub, TotalPass e ClassPass?",
      "Como funciona a segurança dos dados?",
      "Sua academia conectada para evoluir.",
      "Falar com a FM",
      "Ver planos",
      "ironfitcore.com.br",
      "/iron-fit-core-official-lockup.webp",
    ],
    sectionAnchors: ["core", "gestao", "app", "treinos", "equipamentos", "agenda-acesso", "financeiro", "inteligencia", "ecossistema", "seguranca", "demo", "tour", "planos", "duvidas", "contato"],
    navAnchors: ["core", "gestao", "app", "treinos", "inteligencia", "seguranca", "demo", "planos", "duvidas"],
    trialState: false,
    emailSubject: false,
  },
];

for (const page of pages) {
  const html = await readFile(`out/produtos/${page.slug}.html`, "utf8").catch(() => readFile(`out/produtos/${page.slug}/index.html`, "utf8"));
  assert.equal((html.match(/<main[ >]/g) || []).length, 1);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  for (const expected of page.expected) assert.ok(html.includes(expected), `${page.slug}: ${expected}`);
  for (const anchor of page.sectionAnchors) assert.ok(html.includes(`id="${anchor}"`), `${page.slug}: id=${anchor}`);
  for (const anchor of page.navAnchors) assert.ok(html.includes(`href="#${anchor}"`), `${page.slug}: href=#${anchor}`);
  if (page.trialState) assert.ok(html.includes("Ativação online em preparação."), `${page.slug}: trial online state`);
  else assert.ok(!html.includes("30 dias grátis"), `${page.slug}: inactive trial must not be presented as active`);
  assert.ok(html.includes("https://wa.me/5511978350851?text="), `${page.slug}: whatsapp`);
  if (page.emailSubject) assert.ok(html.includes(`subject=${encodeURIComponent("Interesse em " + page.name)}`), `${page.slug}: email subject`);
  assert.ok(!html.includes("interesse=trial"), `${page.slug}: trial must not be falsely enabled`);
  assert.ok(!html.includes("<video"), `${page.slug}: no fabricated video`);
  if (page.slug === "iron-fit") {
    assert.ok(html.includes('href="#planos"'), "iron-fit: final CTA must link back to plans");
    assert.ok(!html.includes("<iframe"), "iron-fit: no generic iframe without an approved source");
    assert.ok(!html.includes("/iron-fit-core-approved-symbol.webp"), "iron-fit: broken legacy symbol reference removed");
    assert.ok(!html.includes("/iron-fit-core-approved-hero.webp"), "iron-fit: broken legacy hero reference removed");
    for (const prohibited of ["ISO 27001", "SOC 2", "LGPD certificada", "integração homologada", "parceiro oficial", "99,9%"])
      assert.ok(!html.includes(prohibited), `iron-fit: prohibited unsupported claim: ${prohibited}`);
  }
}

const ironFitAsset = await readFile("out/iron-fit-core-official-lockup.webp");
assert.equal(ironFitAsset.subarray(0, 4).toString("ascii"), "RIFF", "iron-fit: official lockup must be a valid RIFF WebP");
assert.equal(ironFitAsset.subarray(8, 12).toString("ascii"), "WEBP", "iron-fit: official lockup must be a valid WebP asset");

console.log("Landing export smoke: Kordena + Iron Fit Core conversion structure passed");
