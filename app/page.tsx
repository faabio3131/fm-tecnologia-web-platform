import { products } from "@/src/catalog/products";
import { ProductCard } from "@/src/components/marketing/product-card";
import { SectionHeading } from "@/src/components/marketing/section-heading";
import { ButtonLink } from "@/src/components/ui/button-link";

export default function Home() {
  const principal = products.filter((product) => product.priority === "primary");
  const building = products.filter((product) => product.lifecycle === "in_development");
  const research = products.filter((product) => product.lifecycle === "research_and_development");

  return (
    <main>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orb" aria-hidden="true" />
        <div className="container hero-content">
          <p className="hero-kicker"><span /> FM TECNOLOGIA</p>
          <h1>Tecnologia para<br /><em>construir o próximo.</em></h1>
          <p className="lead">Conheça o ecossistema de produtos e tecnologias da FM Tecnologia.</p>
          <div className="actions">
            <ButtonLink href="/produtos">Explorar ecossistema</ButtonLink>
            <ButtonLink href="/contato" variant="secondary">Falar com um especialista</ButtonLink>
          </div>
          <div className="hero-foot"><span>01 — Produtos</span><span>02 — Tecnologia</span><span>03 — P&amp;D</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Produtos Principais" title="Produtos em destaque no ecossistema FM." description="Preços e políticas comerciais aprovados são apresentados sem presumir certificação ou disponibilidade operacional." />
          <div className="cards cards--two">{principal.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeading eyebrow="Ecossistema" title="Portfólio inicial da FM Tecnologia." description="Produtos e tecnologias reunidos com seus estados públicos atuais." />
          <div className="ecosystem-list">
            {products.map((product, index) => (
              <a href={`/produtos/${product.slug}`} key={product.id}>
                <span>0{index + 1}</span><strong>{product.name}</strong><small>{product.group}</small><b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="O que estamos construindo" title="Produtos em desenvolvimento." />
          <div className="cards cards--three">{building.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="section research">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="Tecnologia & P&D" title="Pesquisa e desenvolvimento da FM Tecnologia." />
            <ButtonLink href={`/produtos/${research[0]!.slug}`} variant="secondary">Conhecer {research[0]!.name}</ButtonLink>
          </div>
          <div className="research-visual" aria-hidden="true"><span>R&amp;D</span><i /><i /><i /></div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-panel cta-panel--dark">
          <span className="eyebrow">Próximo passo</span>
          <h2>Conheça os planos ou converse com a FM.</h2>
          <div className="actions">
            <ButtonLink href="/precos">Conhecer planos</ButtonLink>
            <ButtonLink href="/contato" variant="secondary">Falar com um especialista</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
