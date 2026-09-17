import Link from "next/link";
import { hasProductLanding, ProductLanding } from "./product-landing";
import { IronFitCoreLanding } from "./iron-fit-core-landing";
import type { Product } from "@/src/catalog/types";
import { formatBRL } from "@/src/catalog/commerce";
import { Badge } from "@/src/components/ui/badge";
import { ProductActions } from "./product-actions";

export function ProductPage({ product }: { product: Product }) {
  if (product.slug === "iron-fit") return <IronFitCoreLanding />;
  if (hasProductLanding(product.slug)) return <ProductLanding product={product} />;
  return (
    <main>
      <section className="product-hero">
        <div className="container">
          <Link className="back-link" href="/produtos">← Todos os produtos</Link>
          <div className={`product-overview ${product.pricing ? "product-overview--priced" : ""}`}>
            <div className="product-intro">
              <Badge>{product.publicLabel}</Badge>
              <h1>{product.name}</h1>
              <p className="lead">{product.positioning}</p>
              <p className="product-description">{product.shortDescription}</p>
              <ProductActions product={product} />
            </div>
            {product.pricing && (
              <section className="product-conditions" aria-labelledby="conditions-title">
                <h2 id="conditions-title">Condições comerciais</h2>
                <div className="pricing-summary">
                  <div><span>Mensal</span><strong>{formatBRL(product.pricing.monthly)}<small>/mês</small></strong></div>
                  <div><span>Anual</span><strong>{formatBRL(product.pricing.annual)}<small>/ano</small></strong></div>
                </div>
                <p className="enterprise-line"><span>Enterprise</span><strong>Sob consulta</strong></p>
                {product.trialPolicy && (
                  <div className="trial-note">
                    <strong>Teste ainda não disponível para ativação.</strong>
                    <p>Política prevista: {product.trialPolicy.days} dias, sem cartão. {product.trialPolicy.constraint}</p>
                    <p>A liberação depende de certificação e homologação.</p>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
