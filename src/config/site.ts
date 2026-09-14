export const siteConfig = {
  name: "FM Tecnologia",
  description: "Tecnologia, inteligência e automação para transformar operações e criar novos caminhos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fmtecnologia.ai",
  catalogRoute: {
    path: "/produtos",
    status: "candidate_pending_executive_decision",
    alternative: "/marketplace",
  },
  navigation: [
    { label: "Produtos", href: "/produtos" },
    { label: "Soluções", href: "/solucoes" },
    { label: "Preços", href: "/precos" },
    { label: "Recursos", href: "/recursos" },
    { label: "Empresa", href: "/empresa" },
  ],
} as const;
