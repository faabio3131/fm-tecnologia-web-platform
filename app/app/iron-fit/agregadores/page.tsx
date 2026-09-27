"use client";

import { OperationalResource } from "@/src/components/iron-fit/operational-resource";

export default function AgregadoresPage() {
  return <>
    <OperationalResource
      title="Aggregator Hub"
      description="Resumo operacional do Aggregator Hub para o tenant autenticado."
      listPath="aggregator/operations/summary"
      preferred={["provider", "status", "authorized", "provisional", "risk", "settlement"]}
      empty="Nenhum fato operacional do Aggregator para o tenant atual."
      notice="Wellhub, TotalPass e outros parceiros só são exibidos conforme estado canônico do backend. Esta superfície não declara homologação externa nem disponibilidade live por conta própria."
    />
    <OperationalResource
      title="Inteligência de Agregadores"
      description="Analytics por provider calculados pelo domínio AGG, sem reconstrução de métricas no navegador."
      listPath="aggregator/intelligence/providers?days=30"
      preferred={["provider", "visits", "authorized", "denied", "revenue", "risk"]}
      empty="Sem analytics de agregadores no período."
    />
  </>;
}
