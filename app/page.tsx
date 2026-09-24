import { products } from "@/src/catalog/products";
import { ProductCard } from "@/src/components/marketing/product-card";
import { SectionHeading } from "@/src/components/marketing/section-heading";
import { ButtonLink } from "@/src/components/ui/button-link";
import { FmPremiumHero } from "@/src/components/marketing/fm-premium-hero";

export default function Home() {
  const principal = products.filter(p => p.priority === "primary");
  const building = products.filter(p => p.lifecycle === "in_development" && p.priority !== "primary");
  const research = products.filter(p => p.lifecycle === "research_and_development");

  return (
    <main>
      <FmPremiumHero />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Produtos principais" title="Kordena, Iron Fit Core e NFCore." description="Conheça as principais plataformas da FM Tecnologia e o estágio comercial de cada produto." />
          <div className="cards cards--three">{principal.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <SectionHeading eyebrow="O que estamos construindo" title="Produtos em desenvolvimento." />
          <div className="cards cards--three">{building.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container research-panel">
          <div><span className="eyebrow">Tecnologia & P&amp;D</span><h2>Super Core Extreme</h2><p>Pesquisa e desenvolvimento da FM Tecnologia. Sem oferta comercial nesta etapa.</p></div>
          <ButtonLink href={"/produtos/" + research[0]!.slug} variant="secondary">Explorar pesquisa</ButtonLink>
        </div>
      </section>
    </main>
  );
}
