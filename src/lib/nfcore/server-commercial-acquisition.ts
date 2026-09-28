import { createHmac } from "node:crypto";

const DEFAULT_TIMEOUT_MS = 5000;
const ACQUISITION_PATH = "/v1/commercial/acquisitions";
const providerPattern = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const acquisitionPattern = /^acq-[a-z0-9][a-z0-9._-]{0,127}$/;

export interface NFCoreAcquisitionInput {
  plan_id: string;
  price_id: string;
  buyer_email: string;
  legal_name: string;
}

export interface NFCoreAcquisitionStart {
  acquisition_reference: string;
  provider: string;
  checkout_url: string;
  expires_at: string;
  replay: boolean;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function nfcoreApiBaseUrl(): string {
  const raw = requiredEnv("NFCORE_API_URL");
  const url = new URL(raw);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("NFCORE_API_URL must use http(s)");
  }
  return url.href.replace(/\/$/, "");
}

function signingSecret(): Buffer {
  const encoded = requiredEnv("NFCORE_SITE_ACQUISITION_SECRET_B64");
  const secret = Buffer.from(encoded, "base64");
  if (secret.length < 32) {
    throw new Error("NFCORE_SITE_ACQUISITION_SECRET_B64 must decode to at least 32 bytes");
  }
  return secret;
}

function signingKeyId(): string {
  const keyId = requiredEnv("NFCORE_SITE_ACQUISITION_KEY_ID");
  if (!providerPattern.test(keyId)) {
    throw new Error("NFCORE_SITE_ACQUISITION_KEY_ID is invalid");
  }
  return keyId;
}

function signatureHeader(body: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const digest = createHmac("sha256", signingSecret())
    .update(`${timestamp}.`)
    .update(body)
    .digest("hex");
  return `t=${timestamp},kid=${signingKeyId()},v1=${digest}`;
}

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
  return value.trim();
}

function safeCheckoutUrl(value: unknown): string {
  const raw = stringValue(value, "checkout_url");
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    !url.hostname ||
    url.username ||
    url.password
  ) {
    throw new Error("checkout_url must be absolute HTTPS without credentials");
  }
  return url.href;
}

function parseAcquisitionStart(value: unknown): NFCoreAcquisitionStart {
  const root = objectValue(value, "acquisition");
  const acquisitionReference = stringValue(
    root.acquisition_reference,
    "acquisition_reference",
  );
  if (!acquisitionPattern.test(acquisitionReference)) {
    throw new Error("acquisition_reference is invalid");
  }
  const provider = stringValue(root.provider, "provider").toLowerCase();
  if (!providerPattern.test(provider)) {
    throw new Error("provider is invalid");
  }
  const expiresAt = stringValue(root.expires_at, "expires_at");
  if (Number.isNaN(Date.parse(expiresAt))) {
    throw new Error("expires_at is invalid");
  }
  if (typeof root.replay !== "boolean") {
    throw new Error("replay must be boolean");
  }
  return {
    acquisition_reference: acquisitionReference,
    provider,
    checkout_url: safeCheckoutUrl(root.checkout_url),
    expires_at: expiresAt,
    replay: root.replay,
  };
}

export async function beginNFCoreAcquisition(
  input: NFCoreAcquisitionInput,
  idempotencyKey: string,
): Promise<NFCoreAcquisitionStart> {
  const normalizedKey = idempotencyKey.trim();
  if (normalizedKey.length < 16 || normalizedKey.length > 256) {
    throw new Error("idempotency key is invalid");
  }

  const body = JSON.stringify(input);
  const response = await fetch(`${nfcoreApiBaseUrl()}${ACQUISITION_PATH}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Idempotency-Key": normalizedKey,
      "X-NFCore-Signature": signatureHeader(body),
    },
    body,
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`NFCore acquisition unavailable: HTTP ${response.status}`);
  }
  return parseAcquisitionStart(await response.json());
}
