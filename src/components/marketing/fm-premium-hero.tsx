import Link from "next/link";
import { products } from "@/src/catalog/products";
import { ButtonLink } from "@/src/components/ui/button-link";

const proofPoints = [
  "IA + automação",
  "Produtos verticais",
  "Arquitetura preparada para crescer",
] as const;

export function FmPremiumHero() {
  return (
    <section className="fm-premium-hero" aria-labelledby="fm-premium-hero-title">
      <div className="fm-premium-hero__atmosphere" aria-hidden="true" />
      <div className="container fm-premium-container fm-premium-hero__layout">
        <div className="fm-premium-hero__copy">
          <p className="fm-premium-hero__kicker">
            FM Tecnologia
            <small>IA · automação · software</small>
          </p>
          <h1 id="fm-premium-hero-title">
            Tecnologia que conecta
            <span>operação, dados e inteligência.</span>
          </h1>
          <p className="fm-premium-hero__lead">
            Criamos plataformas inteligentes para transformar processos complexos em gestão mais clara,
            decisões melhores e operações preparadas para crescer.
          </p>
          <p className="fm-premium-hero__core-line">
            No centro, uma linguagem de Core conecta contexto, automação e inteligência entre produtos
            especializados — sem esconder a operação atrás da tecnologia.
          </p>
          <div className="actions">
            <ButtonLink href="/produtos" className="fm-hero-primary">Explorar ecossistema</ButtonLink>
            <ButtonLink href="/contato" variant="secondary" className="fm-hero-secondary">Falar com a FM</ButtonLink>
          </div>
          <div className="fm-premium-hero__proof" aria-label="Diferenciais da plataforma">
            {proofPoints.map((point) => <span key={point}>{point}</span>)}
          </div>
        </div>

        <aside className="fm-core-visual" aria-label="Representação do Core tecnológico da FM Tecnologia">
          <div className="fm-core-scene" aria-hidden="true">
            <span className="fm-core-ring fm-core-ring--one" />
            <span className="fm-core-ring fm-core-ring--two" />
            <span className="fm-core-ring fm-core-ring--three" />
            <span className="fm-core-node fm-core-node--data">Dados</span>
            <span className="fm-core-node fm-core-node--automation">Automação</span>
            <span className="fm-core-node fm-core-node--intelligence">Inteligência</span>
            <span className="fm-core-node fm-core-node--decision">Decisão</span>

            <div className="fm-core-device">
              <div className="fm-core-device__depth" />
              <div className="fm-core-side-face">
                <span>FM</span>
                <strong>Tecnologia</strong>
              </div>
              <div className="fm-core-device__frame">
                <div className="fm-brain-chamber">
                  <svg className="fm-brain-svg" viewBox="0 0 220 180" role="presentation">
                    <defs>
                      <linearGradient id="fmBrainGradient" x1="18" y1="20" x2="200" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60A5FF" />
                        <stop offset=".52" stopColor="#00D2FF" />
                        <stop offset="1" stopColor="#0B5CFF" />
                      </linearGradient>
                    </defs>
                    <path className="brain-outline" d="M109 24c-12-15-38-12-48 5-17-4-34 9-34 27-15 7-20 27-10 40-6 18 7 37 25 38 6 17 27 24 42 15 8 10 22 15 34 10 12 5 26 0 34-10 16 9 36 1 42-15 18-1 31-20 25-38 10-13 5-33-10-40 0-18-17-31-34-27-10-17-36-20-48-5-7-4-11-4-18 0Z" />
                    <path className="brain-circuit" d="M83 36c-4 13 2 23 14 28-12 3-20 12-20 24 0 10 6 19 16 23-10 5-16 14-15 25M137 36c4 13-2 23-14 28 12 3 20 12 20 24 0 10-6 19-16 23 10 5 16 14 15 25M52 53c15 0 25 8 29 21M168 53c-15 0-25 8-29 21M38 91c14-8 30-4 38 8M182 91c-14-8-30-4-38 8M96 63c13 4 20 15 17 28M124 63c-13 4-20 15-17 28M84 121c9-8 21-11 34-7M136 121c-9-8-21-11-34-7M110 45v92" />
                    <circle className="brain-node" cx="62" cy="62" r="4" />
                    <circle className="brain-node" cx="158" cy="62" r="4" />
                    <circle className="brain-node" cx="83" cy="96" r="4" />
                    <circle className="brain-node" cx="137" cy="96" r="4" />
                    <circle className="brain-node" cx="110" cy="122" r="4" />
                  </svg>
                  <span className="fm-core-brain-label">Cognitive Core</span>
                </div>

                <div className="fm-core-brand-plaque">
                  <span className="fm-core-monogram">FM</span>
                  <div className="fm-core-brand-copy">
                    <strong>FM Tecnologia</strong>
                    <small>Core Intelligence System</small>
                  </div>
                </div>

                <div className="fm-core-status" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
              </div>
            </div>
            <span className="fm-core-caption">dados · automação · inteligência · contexto</span>
          </div>
        </aside>
      </div>

      <nav className="container fm-premium-container fm-premium-hero__ecosystem" aria-label="Explore o ecossistema FM">
        <span>Ecossistema FM</span>
        <div>
          {products.map((product) => (
            <Link key={product.id} href={"/produtos/" + product.slug}>{product.name}</Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
