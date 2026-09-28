import { products } from "@/src/catalog/products";
import { ProductCard } from "@/src/components/marketing/product-card";
import { SectionHeading } from "@/src/components/marketing/section-heading";
import { ButtonLink } from "@/src/components/ui/button-link";
import { FmPremiumHero } from "@/src/components/marketing/fm-premium-hero";

const principalDescriptions: Record<string, string> = {
  kordena: "Gestão inteligente de ponta a ponta para negócios do setor alimentício.",
  "iron-fit": "Gestão, alunos, treinos, avaliações, agenda, acesso, equipamentos e financeiro em uma operação conectada.",
  nfcore: "Automação e gestão fiscal inteligente para reduzir erros, retrabalho e centralizar a operação no Core.",
};

export default function Home() {
  const principal = products.filter(p => p.priority === "primary");
  const building = products.filter(p => p.lifecycle === "in_development" && p.priority !== "primary");
  const research = products.filter(p => p.lifecycle === "research_and_development");

  return (
    <main className="fm-premium-home">
      <FmPremiumHero />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Produtos principais"
            title="Soluções inteligentes para cada frente da operação."
            description="Produtos especializados que conectam gestão, desempenho e fiscal dentro do ecossistema FM."
          />
          <div className="cards cards--three">
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
