export const siteConfig = {
  name: "FM Tecnologia",
  whatsapp: { number: "5511978350851", label: "(11) 97835-0851" },
  contactEmail: "fmtecnologia.comercial@gmail.com",
  description: "Tecnologia inteligente para empresas que querem ir além.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fmtecnologiaia.com.br",
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
