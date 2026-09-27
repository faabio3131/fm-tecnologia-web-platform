import type { Product } from "@/src/catalog/types";
import { approvedCtaLabels, getProductActions } from "@/src/catalog/commerce";
import { ButtonLink } from "@/src/components/ui/button-link";

export function ProductActions({ product }: { product: Product }) {
  const actions = getProductActions(product);

  if (!actions.trial && !actions.specialist) {
    return (
      <p className="availability">
        Esta é uma iniciativa de Tecnologia &amp; P&amp;D, sem oferta comercial nesta etapa.
      </p>
    );
  }

  return (
    <div className="actions">
      {actions.trial && (
        <ButtonLink href={`/contato?produto=${product.slug}&interesse=trial`}>
          {approvedCtaLabels.trial}
        </ButtonLink>
      )}
      {actions.specialist && (
        <ButtonLink href={`/contato?produto=${product.slug}`} variant="secondary">
          {approvedCtaLabels.specialist}
        </ButtonLink>
      )}
    </div>
  );
}
