"use client";

import { OperationalResource } from "@/src/components/iron-fit/operational-resource";

export default function EquipamentosPage() {
  return <OperationalResource
    title="Equipment Intelligence"
    description="Catálogo e inventário operacional resolvidos pelo domínio canônico EQ. O tenant é derivado da sessão autenticada."
    listPath="equipments/catalog"
    preferred={["standardName", "name", "type", "manufacturer", "model", "selected"]}
    empty="Nenhum equipamento disponível no catálogo para este contexto."
    notice="Compatibilidade, seleção e disponibilidade são decididas pelo Core. O navegador não envia gymId como autoridade."
    operations={[
      {
        label: "Cadastrar equipamento local",
        method: "POST",
        path: () => "equipments",
        fields: [
          { name: "name", label: "Nome", required: true },
          { name: "standardName", label: "Nome padronizado" },
          { name: "type", label: "Tipo" },
          { name: "primaryMuscle", label: "Grupo muscular principal" },
          { name: "movementPattern", label: "Padrão de movimento" },
          { name: "difficulty", label: "Dificuldade" },
          { name: "videoUrl", label: "URL de vídeo" },
        ],
        rolesNote: "Disponível somente quando o RBAC do Core autorizar SUPER_ADMIN, OWNER, MANAGER ou TRAINER.",
      },
    ]}
  />;
}
