import Link from "next/link";
import { NFCorePurchaseForm } from "@/src/components/marketing/nfcore-purchase-form";
import {
  failClosedNFCoreCommercialOffer,
  type NFCoreCommercialOffer,
  type NFCoreCommercialPrice,
} from "@/src/lib/nfcore/commercial-offer-contract";
import { fetchNFCoreCommercialOffer } from "@/src/lib/nfcore/server-commercial-offer";
import { createMetadata } from "@/src/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata = createMetadata(
  "Contratar NFCore",
  "Inicie uma contratação governada do NFCore pela FM Tecnologia.",
  "/produtos/nfcore/contratar",
);

function money(price: NFCoreCommercialPrice): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 2,
  }).format(Number(price.base_amount));
}

async function offer(): Promise<NFCoreCommercialOffer> {
  try {
    return await fetchNFCoreCommercialOffer();
  } catch {
    return failClosedNFCoreCommercialOffer();
  }
}

export default async function NFCorePurchasePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; price?: string }>;
}) {
  const [{ plan, price }, current] = await Promise.all([searchParams, offer()]);
  const catalog = current.pricing.catalog;
  const selectedItem =
    current.purchase_enabled && plan && price
      ? current.checkout.items.find(
          (item) => item.plan_id === plan && item.price_id === price,
        )
      : undefined;
  const selectedPlan = catalog?.plans.find(
    (candidate) => candidate.plan_id === selectedItem?.plan_id,
  );
  const selectedPrice = catalog?.prices.find(
    (candidate) => candidate.price_id === selectedItem?.price_id,
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Link className="back-link" href="/produtos/nfcore">
            ← Voltar ao NFCore
          </Link>
          <p className="eyebrow">Jornada first-party</p>
          <h1>Contratação governada pela FM Tecnologia.</h1>
          <p className="lead">
            O Site FM inicia a aquisição no NFCore antes de qualquer redirecionamento
            para pagamento. O provedor externo continua sendo apenas a borda de checkout.
          </p>
        </div>
      </section>

      {selectedItem && selectedPlan && selectedPrice ? (
        <NFCorePurchaseForm
          planId={selectedPlan.plan_id}
          priceId={selectedPrice.price_id}
          planName={selectedPlan.display_name}
          priceLabel={money(selectedPrice) + " · " + selectedPrice.cadence}
        />
      ) : (
        <section className="section">
          <div className="container form-shell">
            <article className="product-card product-card--principal">
              <p className="eyebrow">Compra online bloqueada</p>
              <h2>A contratação não está disponível para esta seleção.</h2>
              <p className="muted">
                O Site FM opera em modo fail-closed. Um plano só pode avançar quando o
                NFCore confirmar release, pricing, checkout, processamento, persistência,
                fulfillment, provisioning e entrega de ativação.
              </p>
              <div className="actions">
                <Link className="button button--primary" href="/produtos/nfcore">
                  Voltar ao NFCore <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}
    </main>
  );
}