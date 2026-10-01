function normalizeTrialUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export const trialActivationUrls = {
  kordena: normalizeTrialUrl(process.env.NEXT_PUBLIC_KORDENA_TRIAL_URL),
  "iron-fit": normalizeTrialUrl(process.env.NEXT_PUBLIC_IRON_FIT_TRIAL_URL),
  nfcore: normalizeTrialUrl(process.env.NEXT_PUBLIC_NFCORE_TRIAL_URL),
  command: normalizeTrialUrl(process.env.NEXT_PUBLIC_COMMAND_TRIAL_URL),
  "vendedor-ia": normalizeTrialUrl(process.env.NEXT_PUBLIC_VENDEDOR_IA_TRIAL_URL),
  campaia: normalizeTrialUrl(process.env.NEXT_PUBLIC_CAMPAIA_TRIAL_URL),
  "super-core-extreme": normalizeTrialUrl(process.env.NEXT_PUBLIC_SUPER_CORE_EXTREME_TRIAL_URL),
  "erp-core": normalizeTrialUrl(process.env.NEXT_PUBLIC_ERP_CORE_TRIAL_URL),
} as const;
