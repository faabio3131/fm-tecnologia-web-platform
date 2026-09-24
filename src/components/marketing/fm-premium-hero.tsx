import Link from "next/link";
import { products } from "@/src/catalog/products";
import { ButtonLink } from "@/src/components/ui/button-link";
import { FmCore3D } from "@/src/components/marketing/fm-core-3d";

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
        </div>

        <aside className="fm-core-visual" aria-label="Core tridimensional da FM Tecnologia">
          <FmCore3D />
        </aside>

        <div className="fm-premium-hero__proof" aria-label="Diferenciais da plataforma">
          {proofPoints.map((point) => <span key={point}>{point}</span>)}
        </div>
      </div>

      <nav className="container fm-premium-container fm-premium-hero__ecosystem" aria-label="Explore o ecossistema FM">
        <span>Ecossistema FM</span>
        <div>
          {products.map((product) => (
            <Link key={product.id} href={"/produtos/" + product.slug}>{product.name}</Link>
          ))}
        </div>
      </nav>
      <div className="fm-premium-hero__handoff" aria-hidden="true" />
    </section>
  );
}
