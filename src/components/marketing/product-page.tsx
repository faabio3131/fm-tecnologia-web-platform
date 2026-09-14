import type { Product } from "@/src/catalog/types";
import { formatBRL } from "@/src/catalog/commerce";
import { Badge } from "@/src/components/ui/badge";
import { ProductActions } from "./product-actions";

export function ProductPage({ product }: { product: Product }) {
  return (
    <main>
      <section className="product-hero">
        <div className="ambient ambient-one" />
        <div className="container narrow">
          <Badge>{product.publicLabel}</Badge>
          <p className="product-code">FM / {product.id.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="lead">{product.positioning}</p>
          <ProductActions product={product} />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Informações públicas</span>
            <h2>Conteúdo sob governança.</h2>
          </div>
          <p className="large-copy">
            {product.shortDescription} Esta página apresenta somente informações aprovadas para divulgação.
          </p>
        </div>
      </section>

      {product.pricing && (
        <section className="section section--surface">
          <div className="container">
            <div className="pricing-summary">
              <div>
                <span>Mensal</span>
                <strong>{formatBRL(product.pricing.monthly)}<small>/mês</small></strong>
              </div>
              <div>
                <span>Anual</span>
                <strong>{formatBRL(product.pricing.annual)}<small>/ano</small></strong>
              </div>
              <div>
                <span>Enterprise</span>
                <strong>Sob consulta</strong>
              </div>
            </div>
            {product.trialPolicy && (
              <p className="trial-note">
                Política comercial aprovada: {product.trialPolicy.days} dias, sem cartão. {product.trialPolicy.constraint}
                {" "}A liberação operacional do teste permanece pendente de certificação e homologação.
              </p>
            )}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container cta-panel">
          <span className="eyebrow">Próximo passo</span>
          <h2>{product.priority === "primary" ? "Converse com a FM Tecnologia." : "Acompanhe o que estamos construindo."}</h2>
          <ProductActions product={product} />
        </div>
      </section>
    </main>
  );
}
