import Link from "next/link";
import type { Product } from "@/src/catalog/types";
import { formatBRL } from "@/src/catalog/commerce";
import { siteConfig } from "@/src/config/site";
import { ButtonLink } from "@/src/components/ui/button-link";
import content from "@/src/catalog/product-landings.json";

export function hasProductLanding(slug: string): slug is keyof typeof content {
  return Object.prototype.hasOwnProperty.call(content, slug);
}

export function ProductLanding({ product }: { product: Product }) {
  if (!hasProductLanding(product.slug)) return null;
  const page = content[product.slug];
  const message = `Olá! Quero conhecer o ${product.name}. Podemos conversar sobre disponibilidade e implantação?`;
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
  const email = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Interesse em " + product.name)}`;

  return (
    <main className="product-landing">
      <section className="product-hero landing-hero">
        <div className="container">
          <Link className="back-link" href="/produtos">← Todos os produtos</Link>
          <div className="landing-hero-grid">
            <div>
              <p className="eyebrow">{page.audience}</p>
              <h1>{product.name}<span>{page.headline}</span></h1>
              <p className="lead">{page.intro}</p>
              <div className="actions">
                <a className="button landing-primary" href="#rotina">Conhecer a rotina <span aria-hidden="true">↓</span></a>
                <a className="button button--secondary" href={whatsapp}>Falar sobre o {product.name} <span aria-hidden="true">↗</span></a>
              </div>
              <p className="landing-release">Lançamento em preparação. Consulte a disponibilidade.</p>
            </div>
            <aside className="landing-journey" aria-label={page.journeyTitle}>
              <h2>{page.journeyTitle}</h2>
              <ol>{page.journey.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span>{step}</li>)}</ol>
              <p>Conheça abaixo as etapas e os recursos do produto.</p>
            </aside>
          </div>
        </div>
      </section>

      <nav className="container landing-index" aria-label={"Nesta página: " + product.name}>
        <a href="#rotina">Como funciona</a><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#duvidas">Dúvidas</a>
      </nav>

      <section id="rotina" className="section landing-workflows">
        <div className="container">
          <div className="landing-heading"><p className="eyebrow">Na prática</p><h2>{page.workflowTitle}</h2><p>{page.workflowIntro}</p></div>
          <div className="landing-scenarios">
            {page.scenarios.map((scenario, index) => (
              <details key={scenario.title} className="landing-scenario">
                <summary><span className="landing-step" aria-hidden="true">0{index + 1}</span><span><strong>{scenario.title}</strong><span className="landing-scenario-description">{scenario.description}</span></span><span className="landing-expand" aria-hidden="true">+</span></summary>
                <ol>{scenario.steps.map(step => <li key={step}>{step}</li>)}</ol>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="section section--surface">
        <div className="container">
          <div className="landing-heading"><p className="eyebrow">Recursos em foco</p><h2>O essencial para a sua rotina.</h2></div>
          <div className="landing-features">{page.features.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container landing-bottom-grid">
          <section id="planos" className="product-conditions" aria-labelledby="landing-plans-title">
            <p className="eyebrow">Planos e condições</p><h2 id="landing-plans-title">{product.name}</h2>
            {product.pricing && <><div className="pricing-summary">
              <div><span>Mensal</span><strong>{formatBRL(product.pricing.monthly)}<small>/mês</small></strong></div>
              <div><span>Anual</span><strong>{formatBRL(product.pricing.annual)}<small>/ano</small></strong></div>
            </div><p className="enterprise-line"><span>Enterprise</span><strong>Sob consulta</strong></p></>}
            {product.trialPolicy && <div className="trial-note"><strong>Teste ainda não disponível para ativação.</strong><p>Política prevista: {product.trialPolicy.days} dias, sem cartão. {product.trialPolicy.constraint}</p></div>}
            <div className="actions"><a className="button button--primary" href={whatsapp}>Consultar condições <span aria-hidden="true">↗</span></a></div>
            <p className="muted">Fale com a equipe para alinhar o lançamento e a implantação.</p>
          </section>
          <section id="duvidas" aria-labelledby="landing-faq-title">
            <div className="landing-heading"><p className="eyebrow">Antes de começar</p><h2 id="landing-faq-title">Perguntas frequentes</h2></div>
            <div className="landing-faq">{page.faqs.map(faq => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div>
          </section>
        </div>
      </section>

      <section className="container landing-contact" aria-labelledby="landing-contact-title">
        <div><p className="eyebrow">Converse com a FM</p><h2 id="landing-contact-title">Vamos falar sobre a sua operação?</h2><p>Conte o que você precisa e conheça os próximos passos para o {product.name}.</p></div>
        <div className="landing-contact-actions"><a className="button button--primary" href={whatsapp}>Conversar no WhatsApp <span aria-hidden="true">↗</span></a><ButtonLink href={email} variant="secondary">Enviar e-mail</ButtonLink></div>
      </section>
    </main>
  );
}
