export const siteConfig = {
  name: "FM Tecnologia",
  description: "Tecnologia, inteligência e automação para transformar operações e criar novos caminhos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fmtecnologia.com.br",
  navigation: [
    { label: "Produtos", href: "/produtos" }, { label: "Soluções", href: "/solucoes" },
    { label: "Preços", href: "/precos" }, { label: "Recursos", href: "/recursos" },
    { label: "Empresa", href: "/empresa" }
  ]
} as const;
