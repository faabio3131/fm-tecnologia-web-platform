import { parseNFCoreCommercialOffer, type NFCoreCommercialOffer } from "./commercial-offer-contract";

const DEFAULT_TIMEOUT_MS = 2500;

function nfcoreApiBaseUrl(): string {
  const raw = process.env.NFCORE_API_URL?.trim();
  if (!raw) throw new Error("NFCORE_API_URL is not configured");

  const url = new URL(raw);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("NFCORE_API_URL must use http(s)");
  }
  return url.href.replace(/\/$/, "");
}

export async function fetchNFCoreCommercialOffer(): Promise<NFCoreCommercialOffer> {
  const response = await fetch(`${nfcoreApiBaseUrl()}/v1/commercial/offer`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`NFCore commercial offer unavailable: HTTP ${response.status}`);
  }

  return parseNFCoreCommercialOffer(await response.json());
}
