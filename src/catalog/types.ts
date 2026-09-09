export type ProductLifecycle = "principal" | "desenvolvimento" | "pesquisa";
export type CommercialStatus = "trial-disponivel" | "em-breve" | "nao-comercial";
export interface Pricing { monthly: number; annual: number; enterprise: true }
export interface Trial { days: number; cardRequired: false; constraint?: string }
export interface Product {
  id: string; name: string; slug: string; group: "Produtos principais" | "Em desenvolvimento" | "Tecnologia & P&D";
  lifecycle: ProductLifecycle; publicLabel: string; shortDescription: string; positioning: string;
  pricing?: Pricing; trial?: Trial; cta: { trial: boolean; specialist: boolean }; featured: boolean;
  commercialStatus: CommercialStatus; seo: { title: string; description: string };
}
