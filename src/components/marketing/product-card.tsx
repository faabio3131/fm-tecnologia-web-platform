import Link from "next/link";
import type { Product } from "@/src/catalog/types";
import { Badge } from "@/src/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const priorityClass = product.priority === "primary" ? "product-card--principal" : "";

  return (
    <article className={`product-card ${priorityClass}`}>
      <div className="card-top">
        <Badge>{product.publicLabel}</Badge>
      </div>
      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>
      <Link className="text-link" href={`/produtos/${product.slug}`}>
        Conhecer produto <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
