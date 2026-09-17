"use client";

import { OperationalResource } from "@/src/components/iron-fit/operational-resource";
import { useIronFitSession } from "@/src/lib/iron-fit/session-context";

export default function CriadoresPage() {
  const user = useIronFitSession();
  const scope = user.isSuperAdmin ? "global" : "tenant";

  return <>
    <OperationalResource
      title="Creator Network"
      description="Console operacional e governança do Creator Network no escopo autorizado pela identidade autenticada."
      listPath={`creator-network/operations/${scope}/overview`}
      preferred={["creators", "contents", "pendingModeration", "published", "rights", "settlements"]}
      empty="Nenhuma operação do Creator Network para este escopo."
      notice="O escopo global existe somente para SUPER_ADMIN; OWNER/MANAGER usam o tenant autenticado. Storage/CDN externo não é apresentado como homologado sem evidência real."
    />
    <OperationalResource
      title="Creator Analytics"
      description="Métricas canônicas do Creator Network, preservando direitos, attribution e lifecycle do backend."
      listPath={`creator-network/operations/${scope}/analytics?days=30`}
      preferred={["contents", "views", "engagement", "usage", "settlement", "quality"]}
      empty="Sem métricas de Creator Network para o período."
    />
  </>;
}
