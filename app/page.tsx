import Link from "next/link";
import { products } from "@/src/catalog/products";
import { ProductCard } from "@/src/components/marketing/product-card";
import { SectionHeading } from "@/src/components/marketing/section-heading";
import { ButtonLink } from "@/src/components/ui/button-link";

const principalDescriptions: Record<string, string> = {
  kordena: "Gestão inteligente de ponta a ponta para negócios do setor alimentício.",
  "iron-fit": "Gestão, alunos, treinos, avaliações, agenda, acesso, equipamentos e financeiro em uma operação conectada.",
  nfcore: "Automação e gestão fiscal inteligente para reduzir erros, retrabalho e centralizar a operação no Core.",
  command: "Central executiva governada para consolidar produtos, métricas, operação e inteligência em uma única visão.",
};

export default function Home() {
  const principal = products.filter(p => p.priority === "primary");
  const building = products.filter(p => p.lifecycle === "in_development" && p.priority !== "primary");
  const research = products.filter(p => p.lifecycle === "research_and_development");

  const groups = [
    { label: "Produtos principais", items: principal },
    { label: "Em desenvolvimento", items: building },
    { label: "Tecnologia & P&D", items: research },
  ];

  return (
    <main className="fm-premium-home fm-institutional-home">
      <section className="hero fm-institutional-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="hero-kicker"><span /> FM TECNOLOGIA</p>
            <h1>IA para melhorar hoje e <em>evoluir o amanhã.</em></h1>
            <p className="lead">Tecnologia inteligente para transformar operações, decisões e resultados.</p>
            <div className="actions">
              <ButtonLink href="/produtos">Explorar ecossistema</ButtonLink>
              <ButtonLink href="/precos" variant="secondary">Conhecer planos</ButtonLink>
            </div>
          </div>
          <nav className="portfolio-map" aria-label="Explore o ecossistema">
            <p className="eyebrow">Explore o ecossistema</p>
            {groups.map((group) => (
              <div className="portfolio-map-group" key={group.label}>
                <span>{group.label}</span>
                <div>
                  {group.items.map((product) => (
                    <Link href={`/produtos/${product.slug}`} key={product.id}>
                      {product.slug === "atendevendeia" ? "Atende e Vende IA" : product.name}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Produtos principais"
            title="Soluções inteligentes para cada frente da operação."
            description="Produtos especializados que conectam gestão, desempenho e fiscal dentro do ecossistema FM."
          />
          <div className="cards cards--four">
            {principal.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                description={principalDescriptions[p.slug]}
              />
            ))}
          </div>
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
          <div>
            <span className="eyebrow">Tecnologia &amp; P&amp;D</span>
            <h2>Super Core Extreme</h2>
            <p>Pesquisa e desenvolvimento da FM Tecnologia. Sem oferta comercial nesta etapa.</p>
          </div>
          <ButtonLink href={"/produtos/" + research[0]!.slug} variant="secondary">Explorar pesquisa</ButtonLink>
        </div>
      </section>
    </main>
  );
}
