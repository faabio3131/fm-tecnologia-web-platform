import { products } from "@/src/catalog/products";
import { ProductCard } from "@/src/components/marketing/product-card";
import { ContentPage } from "@/src/components/marketing/content-page";
import { createMetadata } from "@/src/lib/seo/metadata";

export const metadata = createMetadata("Produtos", "Conheça o ecossistema de produtos da FM Tecnologia.", "/produtos");

const catalogBadgeLabels: Record<string, string> = {
  nfcore: "Produto Principal · NFCore",
  command: "Produto Principal · Command",
};

export default function Produtos() {
  const groups = [
    { title: "Produtos principais", items: products.filter(p => p.priority === "primary"), columns: "cards--four" },
    { title: "Em desenvolvimento", items: products.filter(p => p.lifecycle === "in_development" && p.priority !== "primary"), columns: "cards--three" },
    { title: "Tecnologia & P&D", items: products.filter(p => p.lifecycle === "research_and_development"), columns: "" },
  ];

  return (
    <div className="products-catalog-page">
      <ContentPage eyebrow="Ecossistema FM" title="Produtos com uma visão em comum." intro="Conheça o portfólio e o estágio de cada iniciativa da FM Tecnologia.">
        <div className="container catalog-groups">
          {groups.map((group, index) => (
            <section className="catalog-group" key={group.title} aria-labelledby={`group-${index}`}>
              <h2 id={`group-${index}`}>{group.title}</h2>
              <div className={`cards ${group.columns}`}>
                {group.items.map(p => (
                  <ProductCard key={p.id} product={p} badgeLabel={catalogBadgeLabels[p.slug]} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </ContentPage>
    </div>
  );
}
