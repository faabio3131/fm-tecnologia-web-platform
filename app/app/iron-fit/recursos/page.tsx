"use client";

import { OperationalResource } from "@/src/components/iron-fit/operational-resource";

export default function RecursosPage() {
  return <OperationalResource
    title="Recursos e Entitlements"
    description="Capacidades, limites e configurações resolvidos pelo Product Entitlement Engine do Core."
    listPath="product-entitlements/tenant/features"
    preferred={["featureKey", "enabled", "limitValue", "policyValues", "source"]}
    empty="Nenhum entitlement resolvido para o tenant atual."
    notice="A interface não deriva autoridade do nome do plano. A resolução final de feature e configuração permanece no backend."
    operations={[
      {
        label: "Configurar recurso do tenant",
        method: "PUT",
        path: (values) => `product-entitlements/tenant/configurations/${encodeURIComponent(String(values.featureKey))}`,
        fields: [
          { name: "featureKey", label: "Feature key", required: true },
          { name: "featureEnabled", label: "Habilitado", type: "checkbox" },
          { name: "limitValue", label: "Limite", type: "number" },
        ],
        body: (values) => ({
          featureEnabled: Boolean(values.featureEnabled),
          ...(String(values.limitValue ?? "") !== "" ? { limitValue: Number(values.limitValue) } : {}),
        }),
        rolesNote: "A mutação é aceita somente para OWNER/MANAGER e continua sujeita às políticas do PE no backend.",
      },
      {
        label: "Restaurar configuração canônica",
        method: "DELETE",
        path: (values) => `product-entitlements/tenant/configurations/${encodeURIComponent(String(values.featureKey))}`,
        fields: [{ name: "featureKey", label: "Feature key", required: true }],
        rolesNote: "Remove apenas o override permitido; não altera o plano nem cria entitlement pelo navegador.",
      },
    ]}
  />;
}
