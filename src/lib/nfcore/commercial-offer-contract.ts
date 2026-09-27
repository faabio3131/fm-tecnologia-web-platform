export type NFCoreCommercialReleaseStatus =
  | "unavailable"
  | "internal_only"
  | "waitlist"
  | "ready_for_checkout_configuration"
  | "ready_for_commercial_review"
  | "commercial_approved";

export type NFCoreCheckoutStatus = "unconfigured";

export interface NFCoreCommercialPrice {
  price_id: string;
  currency: string;
  cadence: "monthly" | "quarterly" | "semiannual" | "annual" | "one_time";
  base_amount: string;
  per_document_amount: string;
  setup_amount: string;
}

export interface NFCoreCommercialPlan {
  plan_id: string;
  display_name: string;
  edition_id: string;
  price_ids: string[];
  trial_days: number;
  tags: string[];
}

export interface NFCoreCommercialCatalog {
  configuration_id: string;
  version: number;
  prices: NFCoreCommercialPrice[];
  plans: NFCoreCommercialPlan[];
}

export interface NFCoreCommercialOffer {
  product_id: "nfcore";
  pricing: {
    status: "unpriced" | "published";
    catalog: NFCoreCommercialCatalog | null;
  };
  release: {
    status: NFCoreCommercialReleaseStatus;
    version: number | null;
    public_message: string | null;
    commercially_approved: boolean;
  };
  checkout: {
    status: NFCoreCheckoutStatus;
  };
  purchase_enabled: boolean;
  trial_enabled: boolean;
}

const releaseStatuses = new Set<NFCoreCommercialReleaseStatus>([
  "unavailable",
  "internal_only",
  "waitlist",
  "ready_for_checkout_configuration",
  "ready_for_commercial_review",
  "commercial_approved",
]);

const checkoutStatuses = new Set<NFCoreCheckoutStatus>(["unconfigured"]);

const cadences = new Set<NFCoreCommercialPrice["cadence"]>([
  "monthly",
  "quarterly",
  "semiannual",
  "annual",
  "one_time",
]);

const decimalPattern = /^\d+(?:\.\d+)?$/;

function objectValue(value: unknown, field: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${field} must be an object`);
  }
  return value as Record<string, unknown>;
}

function stringValue(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} must be a non-empty string`);
  }
  return value;
}

function nullableString(value: unknown, field: string): string | null {
  if (value === null) return null;
  return stringValue(value, field);
}

function booleanValue(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`${field} must be boolean`);
  return value;
}

function versionValue(value: unknown, field: string): number {
  if (!Number.isInteger(value) || Number(value) < 1) {
    throw new Error(`${field} must be an integer >= 1`);
  }
  return Number(value);
}

function stringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be an array`);
  return value.map((item, index) => stringValue(item, `${field}[${index}]`));
}

function decimalValue(value: unknown, field: string): string {
  const normalized = stringValue(value, field);
  if (!decimalPattern.test(normalized)) {
    throw new Error(`${field} must be a non-negative decimal string`);
  }
  return normalized;
}

function parsePrice(value: unknown, index: number): NFCoreCommercialPrice {
  const price = objectValue(value, `pricing.catalog.prices[${index}]`);
  const cadence = stringValue(price.cadence, `pricing.catalog.prices[${index}].cadence`);
  if (!cadences.has(cadence as NFCoreCommercialPrice["cadence"])) {
    throw new Error("pricing catalog contains unsupported cadence");
  }
  const currency = stringValue(price.currency, `pricing.catalog.prices[${index}].currency`);
  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new Error("pricing catalog contains invalid currency");
  }
  return {
    price_id: stringValue(price.price_id, `pricing.catalog.prices[${index}].price_id`),
    currency,
    cadence: cadence as NFCoreCommercialPrice["cadence"],
    base_amount: decimalValue(price.base_amount, `pricing.catalog.prices[${index}].base_amount`),
    per_document_amount: decimalValue(
      price.per_document_amount,
      `pricing.catalog.prices[${index}].per_document_amount`,
    ),
    setup_amount: decimalValue(price.setup_amount, `pricing.catalog.prices[${index}].setup_amount`),
  };
}

function parsePlan(value: unknown, index: number): NFCoreCommercialPlan {
  const plan = objectValue(value, `pricing.catalog.plans[${index}]`);
  const trialDays = Number(plan.trial_days);
  if (!Number.isInteger(plan.trial_days) || trialDays < 0) {
    throw new Error("pricing catalog contains invalid trial_days");
  }
  return {
    plan_id: stringValue(plan.plan_id, `pricing.catalog.plans[${index}].plan_id`),
    display_name: stringValue(
      plan.display_name,
      `pricing.catalog.plans[${index}].display_name`,
    ),
    edition_id: stringValue(plan.edition_id, `pricing.catalog.plans[${index}].edition_id`),
    price_ids: stringArray(plan.price_ids, `pricing.catalog.plans[${index}].price_ids`),
    trial_days: trialDays,
    tags: stringArray(plan.tags, `pricing.catalog.plans[${index}].tags`),
  };
}

function parseCatalog(value: unknown): NFCoreCommercialCatalog {
  const catalog = objectValue(value, "pricing.catalog");
  if (!Array.isArray(catalog.prices) || !Array.isArray(catalog.plans)) {
    throw new Error("pricing catalog prices and plans must be arrays");
  }
  return {
    configuration_id: stringValue(catalog.configuration_id, "pricing.catalog.configuration_id"),
    version: versionValue(catalog.version, "pricing.catalog.version"),
    prices: catalog.prices.map(parsePrice),
    plans: catalog.plans.map(parsePlan),
  };
}

export function failClosedNFCoreCommercialOffer(): NFCoreCommercialOffer {
  return {
    product_id: "nfcore",
    pricing: {
      status: "unpriced",
      catalog: null,
    },
    release: {
      status: "unavailable",
      version: null,
      public_message: null,
      commercially_approved: false,
    },
    checkout: {
      status: "unconfigured",
    },
    purchase_enabled: false,
    trial_enabled: false,
  };
}

export function parseNFCoreCommercialOffer(value: unknown): NFCoreCommercialOffer {
  const root = objectValue(value, "offer");
  if (root.product_id !== "nfcore") throw new Error("offer product_id must be nfcore");

  const pricing = objectValue(root.pricing, "pricing");
  const pricingStatus = pricing.status;
  if (pricingStatus !== "unpriced" && pricingStatus !== "published") {
    throw new Error("pricing status is unsupported");
  }
  const catalog =
    pricingStatus === "published"
      ? parseCatalog(pricing.catalog)
      : pricing.catalog === null
        ? null
        : (() => {
            throw new Error("unpriced offer must not contain a catalog");
          })();

  const release = objectValue(root.release, "release");
  const releaseStatus = stringValue(release.status, "release.status");
  if (!releaseStatuses.has(releaseStatus as NFCoreCommercialReleaseStatus)) {
    throw new Error("release status is unsupported");
  }
  const releaseVersion =
    release.version === null ? null : versionValue(release.version, "release.version");
  const commerciallyApproved = booleanValue(
    release.commercially_approved,
    "release.commercially_approved",
  );
  if (commerciallyApproved !== (releaseStatus === "commercial_approved")) {
    throw new Error("release approval flag is inconsistent with release status");
  }

  const checkout = objectValue(root.checkout, "checkout");
  const checkoutStatus = stringValue(checkout.status, "checkout.status");
  if (!checkoutStatuses.has(checkoutStatus as NFCoreCheckoutStatus)) {
    throw new Error("checkout status is unsupported");
  }

  const purchaseEnabled = booleanValue(root.purchase_enabled, "purchase_enabled");
  const trialEnabled = booleanValue(root.trial_enabled, "trial_enabled");
  if (purchaseEnabled) {
    throw new Error("purchase must remain disabled until a checkout contract is implemented");
  }

  return {
    product_id: "nfcore",
    pricing: {
      status: pricingStatus,
      catalog,
    },
    release: {
      status: releaseStatus as NFCoreCommercialReleaseStatus,
      version: releaseVersion,
      public_message: nullableString(release.public_message, "release.public_message"),
      commercially_approved: commerciallyApproved,
    },
    checkout: {
      status: checkoutStatus as NFCoreCheckoutStatus,
    },
    purchase_enabled: purchaseEnabled,
    trial_enabled: trialEnabled,
  };
}
