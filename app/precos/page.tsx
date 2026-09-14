import { products } from "@/src/catalog/products";
import { formatBRL } from "@/src/catalog/commerce";
import { ContentPage } from "@/src/components/marketing/content-page";
import { ProductActions } from "@/src/components/marketing/product-actions";
import { createMetadata } from "@/src/lib/seo/metadata";

export const metadata = createMetadata("Preços", "Preços aprovados de Kordena e Iron Fit.", "/precos");

export default function Precos() {
  const priced = products.filter((product) => product.pricingStatus === "approved" && product.pricing);

  return (
    <ContentPage eyebrow="Preços transparentes" title="Planos e condições comerciais." intro="Conheça os valores de Kordena e Iron Fit. Os testes ainda não estão disponíveis para ativação.">
      <section className="section">
        <div className="container cards cards--two">
          {priced.map((product) => (
            <article className="price-card" key={product.id}>
              <span>{product.publicLabel}</span>
              <h2>{product.name}</h2>
              <div className="price"><strong>{formatBRL(product.pricing!.monthly)}</strong><small>/mês</small></div>
              <p>ou {formatBRL(product.pricing!.annual)}/ano</p>
              <ul>
                <li>Política-base de teste: 30 dias</li>
                <li>Sem cartão</li>
                {product.trialPolicy?.constraint && <li>{product.trialPolicy.constraint}</li>}
                <li>Enterprise sob consulta</li>
              </ul>
              <p className="muted">Ativação do teste pendente de certificação e homologação.</p>
              <ProductActions product={product} />
            </article>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
