"use client";

import { OperationalResource, type OperationalCommand } from "@/src/components/iron-fit/operational-resource";

const operations: OperationalCommand[] = [
  {
    label: "Enviar mensagem",
    method: "POST",
    path: () => "communication/messages",
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "templateId", label: "ID do template" },
      { name: "channel", label: "Canal", required: true },
      { name: "title", label: "Título" },
      { name: "body", label: "Mensagem", required: true },
    ],
  },
];

export default function CommunicationPage() {
  return <OperationalResource title="Comunicação" description="Histórico e envio operacional usando o módulo canônico de comunicação do IRON FIT." listPath="communication/messages" preferred={["id", "studentId", "channel", "title", "status", "createdAt"]} operations={operations} />;
}
