import type { Product } from "./types.ts";

export const approvedCtaLabels = {
  trial: "Começar teste grátis",
  specialist: "Falar com um especialista",
  plans: "Conhecer planos",
} as const;

export function canStartTrial(product: Product): boolean {
  return (
    product.commercialAvailability === "available" &&
    product.trialPolicyStatus === "approved_partial_contract" &&
    product.trialReleaseStatus === "released" &&
    Boolean(product.trialPolicy)
  );
}

export function getProductActions(product: Product) {
  return {
    trial: canStartTrial(product),
    specialist: product.cta.specialist,
  };
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
