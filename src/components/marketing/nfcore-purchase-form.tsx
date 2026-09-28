"use client";

import { FormEvent, useRef, useState } from "react";

interface Props {
  planId: string;
  priceId: string;
  planName: string;
  priceLabel: string;
}

function safeCheckoutUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !url.hostname ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

export function NFCorePurchaseForm({
  planId,
  priceId,
  planName,
  priceLabel,
}: Props) {
  const requestIdRef = useRef<string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    const buyerEmail = String(form.get("buyer_email") ?? "").trim();
    const legalName = String(form.get("legal_name") ?? "").trim();

    if (!requestIdRef.current) {
      requestIdRef.current = crypto.randomUUID();
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/nfcore/acquisitions", {
        method: "POST",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,
          price_id: priceId,
          buyer_email: buyerEmail,
          legal_name: legalName,
          request_id: requestIdRef.current,
        }),
      });

      const payload = (await response.json()) as Record<string, unknown>;
      const checkoutUrl = safeCheckoutUrl(payload.checkout_url);
      if (!response.ok || !checkoutUrl) {
        throw new Error("acquisition unavailable");
      }

      window.location.assign(checkoutUrl);
    } catch {
      setError(
        "Não foi possível iniciar a contratação online com segurança agora. Tente novamente ou fale com a FM Tecnologia.",
      );
      setPending(false);
    }
  }

  return (
    <section className="section">
      <div className="container form-shell">
        <article className="product-card product-card--principal">
          <p className="eyebrow">Contratação NFCore</p>
          <h1>{planName}</h1>
          <p className="lead">{priceLabel}</p>
          <p className="muted">
            Seus dados serão enviados ao NFCore pela infraestrutura segura da FM
            Tecnologia. O navegador não confirma pagamento, não cria tenant e não
            concede permissões.
          </p>

          <form onSubmit={submit}>
            <input type="hidden" name="plan_id" value={planId} />
            <input type="hidden" name="price_id" value={priceId} />

            <label htmlFor="nfcore-legal-name">Razão social ou nome do negócio</label>
            <input
              id="nfcore-legal-name"
              name="legal_name"
              type="text"
              required
              minLength={2}
              maxLength={256}
              autoComplete="organization"
            />

            <label htmlFor="nfcore-buyer-email">E-mail do proprietário</label>
            <input
              id="nfcore-buyer-email"
              name="buyer_email"
              type="email"
              required
              maxLength={320}
              autoComplete="email"
            />

            {error && (
              <p role="alert" className="muted">
                {error}
              </p>
            )}

            <button className="button button--primary" type="submit" disabled={pending}>
              {pending ? "Iniciando contratação..." : "Continuar para pagamento"}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="muted">
            Ao continuar, você será direcionado ao provedor de checkout configurado
            pela FM Tecnologia. A ativação do NFCore ocorre somente após confirmação
            válida do pagamento e conclusão da jornada de identidade.
          </p>
        </article>
      </div>
    </section>
  );
}
