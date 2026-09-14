export type ProductLifecycle =
  | "research_and_development"
  | "in_development"
  | "beta"
  | "available";

export type ProductLifecycleStatus = ProductLifecycle | "pending_evidence";
export type ProductPriority = "primary" | "standard";
export type EvidenceStatus = "pending_evidence";
export type CommercialAvailability = "pending_evidence" | "unavailable" | "available";
export type TrialPolicyStatus = "approved_partial_contract" | "not_available";
export type TrialReleaseStatus = "pending_evidence" | "unavailable" | "released";
export type PricingStatus = "approved" | "not_for_public_offer";

export interface Pricing {
  monthly: number;
  annual: number;
  enterprise: true;
}

export interface TrialPolicy {
  days: number;
  cardRequired: false;
  constraint?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  group: "Produtos Principais" | "O que estamos construindo" | "Tecnologia & P&D";
  priority: ProductPriority;
  lifecycle: ProductLifecycleStatus;
  websiteVisibility: "public";
  technicalReadiness: EvidenceStatus;
  certificationStatus: EvidenceStatus;
  commercialAvailability: CommercialAvailability;
  trialPolicyStatus: TrialPolicyStatus;
  trialReleaseStatus: TrialReleaseStatus;
  pricingStatus: PricingStatus;
  productionHomologationStatus: EvidenceStatus;
  publicLabel: string;
  shortDescription: string;
  positioning: string;
  pricing?: Pricing;
  trialPolicy?: TrialPolicy;
  cta: { specialist: boolean };
  featured: boolean;
  seo: { title: string; description: string };
}
