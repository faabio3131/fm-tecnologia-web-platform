import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/src/catalog/types";
import { formatBRL } from "@/src/catalog/commerce";
import { siteConfig } from "@/src/config/site";
import { ButtonLink } from "@/src/components/ui/button-link";
import { KordenaStory } from "./kordena-story";
import content from "@/src/catalog/product-landings.json";

export function hasProductLanding(slug: string): slug is keyof typeof content {
  return Object.prototype.hasOwnProperty.call(content, slug);
}

export function ProductLanding({ product }: { product: Product }) {
  if (!hasProductLanding(product.slug)) return null;
  const page = content[product.slug];
  const message = `Olá! Quero conhecer o ${product.name}. Podemos conversar sobre disponibilidade e implantação?`;
  const trialMessage = `Olá! Tenho interesse no teste grátis de ${product.trialPolicy?.days ?? 30} dias do ${product.name}. Quero ser avisado assim que a ativação estiver disponível.`;
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
  const trialWhatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(trialMessage)}`;
  const email = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Interesse em " + product.name)}`;
  const trialReady = product.trialReleaseStatus !== "pending_evidence" && product.trialReleaseStatus !== "unavailable";
  const isKordena = product.slug === "kordena";
  const audience = isKordena ? "Para negócios do setor alimentício" : page.audience;
  const trialCta = isKordena && product.trialPolicy ? `Teste grátis por ${product.trialPolicy.days} dias` : "Começar teste grátis";

  return (
    <main className={`product-landing ${isKordena ? "product-landing--kordena" : ""}`}>
      <section className="product-hero landing-hero">
        <div className="container">
          <Link className="back-link" href="/produtos">← Todos os produtos</Link>
          <div className="landing-hero-grid">
            <div>
              <p className="eyebrow">{audience}</p>
              <h1>{product.name}<span>{page.headline}</span></h1>
              <p className="lead">{page.intro}</p>
              <div className="actions">
                {product.trialPolicy ? (
                  <a className="button landing-primary" href="#teste">{trialCta} <span aria-hidden="true">↓</span></a>
                ) : (
                  <a className="button landing-primary" href="#rotina">{page.primaryCta} <span aria-hidden="true">↓</span></a>
                )}
                <a className="button button--secondary" href={isKordena ? "#core" : "#rotina"}>Ver como funciona <span aria-hidden="true">↓</span></a>
              </div>
              {product.trialPolicy ? (
                <p className="landing-release">{isKordena ? `${product.trialPolicy.days} dias grátis, sem cartão.` : `Teste previsto: ${product.trialPolicy.days} dias, sem cartão.`} {trialReady ? "Ativação disponível." : "Ativação online em preparação."}</p>
              ) : (
                <p className="landing-release">Lançamento em preparação. Consulte a disponibilidade.</p>
              )}
            </div>
            {isKordena ? (
              <aside className="kordena-hero-core kordena-hero-core--v2" aria-label="Demonstração visual do Gerente IA Core conectando a operação">
                <p className="eyebrow">Gerente IA Core</p>
                <h2>Uma inteligência central para conectar toda a operação.</h2>
                <div className="kordena-v2-scene" aria-hidden="true">
                  <span className="kordena-v2-node kordena-v2-node--atendimento">Atendimento</span>
                  <span className="kordena-v2-node kordena-v2-node--vendas">Vendas</span>
                  <span className="kordena-v2-node kordena-v2-node--estoque">Estoque</span>
                  <span className="kordena-v2-node kordena-v2-node--producao">Produção</span>
                  <span className="kordena-v2-node kordena-v2-node--financeiro">Financeiro</span>
                  <span className="kordena-v2-node kordena-v2-node--clientes">Clientes</span>
                  <div className="kordena-v2-energy kordena-v2-energy--one" />
                  <div className="kordena-v2-energy kordena-v2-energy--two" />
                  <div className="kordena-v2-energy kordena-v2-energy--three" />
                  <div className="kordena-v2-core-glow" />
                  <div className="kordena-v2-cube-wrap kordena-v2-cube-wrap--asset">
                    <Image className="kordena-core-brandmark kordena-core-brandmark--hero" src="/kordena-core-approved.webp" alt="" width={240} height={250} priority unoptimized />
                  </div>
                </div>
                <p>Atendimento, produção, estoque, vendas, financeiro e clientes conectados ao mesmo núcleo de inteligência.</p>
              </aside>
            ) : (
              <aside className="landing-journey" aria-label={page.journeyTitle}>
                <h2>{page.journeyTitle}</h2>
                <ol>{page.journey.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span>{step}</li>)}</ol>
                <p>Conheça abaixo as etapas e os recursos do produto.</p>
              </aside>
            )}
          </div>
        </div>
      </section>

      <nav className="container landing-index" aria-label={"Nesta página: " + product.name}>
        {isKordena && <a href="#core">Gerente IA Core</a>}
        <a href="#rotina">Como funciona</a>
        {isKordena && <><a href="#estoque-inteligente">Estoque inteligente</a><a href="#financeiro">Financeiro</a></>}
        <a href="#recursos">Recursos</a>
        <a href="#planos">Planos</a>
        {product.trialPolicy && <a href="#teste">Teste grátis</a>}
        <a href="#duvidas">Dúvidas</a>
      </nav>

      {isKordena && <KordenaStory />}

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
          <div className="landing-heading"><p className="eyebrow">Recursos em foco</p><h2>{page.featuresTitle}</h2>{page.featuresIntro && <p>{page.featuresIntro}</p>}</div>
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
            {product.trialPolicy && <div className="trial-note"><strong>{trialReady ? `${product.trialPolicy.days} dias grátis disponíveis.` : `${product.trialPolicy.days} dias grátis — ativação em preparação.`}</strong><p>Sem cartão. {product.trialPolicy.constraint}</p>{!trialReady && <p>A ativação online será liberada após certificação e homologação.</p>}</div>}
            <div className="actions">
              {product.trialPolicy && <a className="button button--primary" href="#teste">{trialCta} <span aria-hidden="true">↓</span></a>}
              <a className={`button ${product.trialPolicy ? "button--secondary" : "button--primary"}`} href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a>
            </div>
          </section>
          <section id="duvidas" aria-labelledby="landing-faq-title">
            <div className="landing-heading"><p className="eyebrow">Antes de começar</p><h2 id="landing-faq-title">Perguntas frequentes</h2></div>
            <div className="landing-faq">{page.faqs.map(faq => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div>
          </section>
        </div>
      </section>

      {product.trialPolicy && (
        <section id="teste" className="container landing-contact landing-trial" aria-labelledby="landing-trial-title">
          <div>
            <p className="eyebrow">{product.trialPolicy.days} dias grátis</p>
            <h2 id="landing-trial-title">Coloque o {product.name} para trabalhar no seu negócio.</h2>
            <p>Experimente uma nova forma de conectar sua operação, reduzir processos manuais e administrar seu negócio com mais inteligência. {product.trialPolicy.days} dias grátis, sem cartão.</p>
          </div>
          <div className="landing-contact-actions">
            {trialReady ? (
              <ButtonLink href="/entrar">{isKordena ? `Começar ${product.trialPolicy.days} dias grátis` : "Começar teste grátis"}</ButtonLink>
            ) : (
              <a className="button button--primary" href={trialWhatsapp}>{isKordena ? `Quero testar grátis por ${product.trialPolicy.days} dias` : `Quero testar o ${product.name}`} <span aria-hidden="true">↗</span></a>
            )}
            <a className="button button--secondary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      )}

      <section className="container landing-contact landing-contact--secondary" aria-labelledby="landing-contact-title">
        <div><p className="eyebrow">Implantação e Enterprise</p><h2 id="landing-contact-title">Precisa falar com a nossa equipe?</h2><p>Estamos disponíveis para implantação, condições Enterprise e dúvidas específicas da sua operação.</p></div>
        <div className="landing-contact-actions"><a className="button button--secondary" href={whatsapp}>WhatsApp <span aria-hidden="true">↗</span></a><ButtonLink href={email} variant="secondary">E-mail</ButtonLink></div>
      </section>
    </main>
  );
}
