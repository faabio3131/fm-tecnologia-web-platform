import { notFound, redirect } from "next/navigation";

import { canStartTrial } from "@/src/catalog/commerce";
import { getProduct, products } from "@/src/catalog/products";
import { ContentPage } from "@/src/components/marketing/content-page";
import { ButtonLink } from "@/src/components/ui/button-link";
import { siteConfig } from "@/src/config/site";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export default async function TrialEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  if (canStartTrial(product) && product.trialActivationUrl) {
    redirect(product.trialActivationUrl);
  }

  const hasTrialPolicy = Boolean(product.trialPolicy);
  const message = hasTrialPolicy
    ? `Olá! Tenho interesse no teste grátis do ${product.name}. Quero ser avisado quando a ativação online estiver disponível.`
    : `Olá! Tenho interesse no ${product.name}. Quero saber quando haverá teste grátis ou disponibilidade comercial.`;
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

  return (
    <ContentPage
      eyebrow="Teste grátis"
      title={hasTrialPolicy ? `Teste do ${product.name}` : product.name}
      intro={
        hasTrialPolicy
          ? "A rota de ativação deste produto existe, mas permanece fechada até a liberação comercial e técnica correspondente."
          : "Este produto ainda não possui uma política de teste grátis liberada."
      }
    >
      <section className="section">
        <div className="container narrow">
          <article className="product-card">
            <h2>
              {hasTrialPolicy
                ? "Ativação online em preparação"
                : "Teste grátis ainda não disponível"}
            </h2>
            <p>
              {hasTrialPolicy
                ? "Quando este produto for certificado para trial público, esta mesma rota encaminhará o cliente ao fluxo correto de cadastro, sem depender da tela de outro produto."
                : "A disponibilidade será exibida somente quando existir uma política de trial aprovada e uma rota de ativação certificada para este produto."}
            </p>
            <div className="actions">
              <a className="button button--primary" href={whatsapp}>
                Falar com a FM <span aria-hidden="true">↗</span>
              </a>
              <ButtonLink href={`/produtos/${product.slug}`} variant="secondary">
                Voltar ao produto
              </ButtonLink>
            </div>
          </article>
        </div>
      </section>
    </ContentPage>
  );
}
