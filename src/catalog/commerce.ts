import type { Product } from "./types.ts";
export const approvedCtaLabels = { trial: "Começar teste grátis", specialist: "Falar com um especialista" } as const;
export function canStartTrial(product: Product): boolean { return product.commercialStatus === "trial-disponivel" && product.cta.trial && Boolean(product.trial); }
export function getProductActions(product: Product) { return { trial: canStartTrial(product), specialist: product.commercialStatus !== "nao-comercial" && product.cta.specialist }; }
export function formatBRL(value: number): string { return new Intl.NumberFormat("pt-BR", { style:"currency", currency:"BRL", maximumFractionDigits:0 }).format(value); }
