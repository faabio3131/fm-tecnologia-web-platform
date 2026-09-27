"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/src/config/site";
import {
  failClosedNFCoreCommercialOffer,
  parseNFCoreCommercialOffer,
  type NFCoreCommercialOffer,
  type NFCoreCommercialPrice,
  type NFCoreCommercialReleaseStatus,
} from "@/src/lib/nfcore/commercial-offer-contract";

type OfferLoadState =
  | { kind: "loading"; offer: NFCoreCommercialOffer }
  | { kind: "canonical"; offer: NFCoreCommercialOffer }
  | { kind: "fail_closed"; offer: NFCoreCommercialOffer };

const releaseLabels: Record<NFCoreCommercialReleaseStatus, string> = {
  unavailable: "Lançamento em preparação",
  internal_only: "Validação interna",
  waitlist: "Lista de interesse",
  ready_for_checkout_configuration: "Preparação de checkout",
  ready_for_commercial_review: "Revisão comercial",
  commercial_approved: "Liberação comercial aprovada",
};

const releaseCopy: Record<NFCoreCommercialReleaseStatus, string> = {
  unavailable:
    "A contratação online ainda não está liberada. A FM continua preparando os gates comerciais, operacionais e fiscais aplicáveis.",
  internal_only:
    "O produto permanece em validação interna e ainda não possui oferta pública para contratação.",
  waitlist:
    "A FM está registrando interesse enquanto conclui as condições necessárias para a abertura comercial.",
  ready_for_checkout_configuration:
    "A governança comercial está avançada, mas o checkout real ainda precisa ser configurado e validado.",
  ready_for_commercial_review:
    "A oferta está em revisão comercial final. Compra e trial permanecem bloqueados até liberação explícita.",
  commercial_approved:
    "A decisão comercial foi aprovada, mas contratação online e operação fiscal continuam sujeitas aos próprios gates.",
};

const cadenceLabels: Record<NFCoreCommercialPrice["cadence"], string> = {
  monthly: "mês",
  quarterly: "trimestre",
  semiannual: "semestre",
  annual: "ano",
  one_time: "pagamento único",
};

const failClosedOffer = failClosedNFCoreCommercialOffer();

function money(amount: string, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

function pricingRows(offer: NFCoreCommercialOffer) {
  const catalog = offer.pricing.catalog;
  if (
    !offer.release.commercially_approved ||
    offer.pricing.status !== "published" ||
    !catalog
  ) {
    return [];
  }

  const prices = new Map(catalog.prices.map((price) => [price.price_id, price]));
  return catalog.plans.flatMap((plan) =>
    plan.price_ids.flatMap((priceId) => {
      const price = prices.get(priceId);
      return price ? [{ plan, price }] : [];
    }),
  );
}

export function NFCoreCommercialStatus() {
  const [state, setState] = useState<OfferLoadState>({
    kind: "loading",
    offer: failClosedOffer,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/nfcore/commercial-offer", {
          cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        const offer = parseNFCoreCommercialOffer(await response.json());
        if (!controller.signal.aborted) {
          setState({
            kind: response.ok ? "canonical" : "fail_closed",
            offer,
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setState({ kind: "fail_closed", offer: failClosedOffer });
        }
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  const { offer } = state;
  const rows = pricingRows(offer);
  const sourceUnavailable = state.kind === "fail_closed";
  const loading = state.kind === "loading";
  const message = sourceUnavailable
    ? "A disponibilidade oficial não pôde ser confirmada agora. Por segurança, contratação e trial permanecem bloqueados."
    : offer.release.public_message || releaseCopy[offer.release.status];

  const whatsappMessage =
    "Olá! Quero conhecer o NFCore e entender disponibilidade, implantação e condições comerciais.";
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="nfcore-commercial" aria-live="polite">
      <div className="nfcore-commercial__header">
        <div>
          <p className="eyebrow">Disponibilidade oficial</p>
          <h2>
            {loading
              ? "Consultando o NFCore..."
              : sourceUnavailable
                ? "Oferta online indisponível"
                : releaseLabels[offer.release.status]}
          </h2>
          <p>{message}</p>
        </div>
        <span
          className={`nfcore-commercial__badge nfcore-commercial__badge--${
            offer.release.commercially_approved && !sourceUnavailable ? "review" : "blocked"
          }`}
        >
          {loading
            ? "VERIFICANDO"
            : sourceUnavailable
              ? "FAIL-CLOSED"
              : offer.release.status.toUpperCase()}
        </span>
      </div>

      <div className="nfcore-commercial__gates" aria-label="Gates comerciais NFCore">
        <div>
          <span>Pricing</span>
          <strong>
            {offer.pricing.status === "published" && !sourceUnavailable
              ? "Publicado no NFCore"
              : "Sem oferta pública confirmada"}
          </strong>
        </div>
        <div>
          <span>Checkout</span>
          <strong>Não configurado</strong>
        </div>
        <div>
          <span>Compra online</span>
          <strong>{offer.purchase_enabled ? "Habilitada" : "Bloqueada"}</strong>
        </div>
        <div>
          <span>Trial</span>
          <strong>{offer.trial_enabled ? "Habilitado" : "Bloqueado"}</strong>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="nfcore-commercial__pricing" aria-label="Planos comerciais publicados">
          {rows.map(({ plan, price }) => (
            <article key={`${plan.plan_id}:${price.price_id}`}>
              <span>{plan.display_name}</span>
              <strong>
                {money(price.base_amount, price.currency)}
                <small>/{cadenceLabels[price.cadence]}</small>
              </strong>
              {price.per_document_amount !== "0" && (
                <p>
                  + {money(price.per_document_amount, price.currency)} por documento
                </p>
              )}
              {price.setup_amount !== "0" && (
                <p>Setup: {money(price.setup_amount, price.currency)}</p>
              )}
              {plan.trial_days > 0 && <p>Trial configurado: {plan.trial_days} dias</p>}
            </article>
          ))}
        </div>
      )}

      <div className="nfcore-contact__actions">
        <a className="button button--primary" href={whatsapp}>
          Falar sobre o NFCore <span aria-hidden="true">↗</span>
        </a>
        <a
          className="button button--secondary"
          href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Interesse em NFCore")}`}
        >
          E-mail
        </a>
      </div>

      <p className="nfcore-commercial__footnote">
        O site apenas projeta o estado governado pelo NFCore. Preço publicado não libera
        compra, e liberação comercial não concede autoridade fiscal de produção.
      </p>
    </div>
  );
}
