import { NextResponse } from "next/server";
import {
  failClosedNFCoreCommercialOffer,
} from "@/src/lib/nfcore/commercial-offer-contract";
import { fetchNFCoreCommercialOffer } from "@/src/lib/nfcore/server-commercial-offer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const offer = await fetchNFCoreCommercialOffer();
    return NextResponse.json(offer, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(failClosedNFCoreCommercialOffer(), {
      status: 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
