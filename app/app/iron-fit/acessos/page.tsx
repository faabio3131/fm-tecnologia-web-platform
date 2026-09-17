"use client";

import { OperationalResource, type OperationalCommand } from "@/src/components/iron-fit/operational-resource";

const operations: OperationalCommand[] = [
  {
    label: "Emitir credencial",
    method: "POST",
    path: () => "access/credentials",
    rolesNote: "A emissão cria uma credencial; ela não autoriza acesso no navegador. A decisão física continua no Core/device chain-of-trust.",
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "type", label: "Tipo", type: "select", options: [{ value: "QR_CODE", label: "QR Code" }] },
      { name: "expiresAt", label: "Expira em", type: "datetime-local" },
    ],
  },
];

export default function AccessPage() {
  return <OperationalResource title="Acesso físico" description="Histórico administrativo read-only das decisões registradas pelo Core e emissão governada de credenciais." listPath="access/events" preferred={["id", "createdAt", "deviceId", "studentId", "allowed", "denialReason"]} operations={operations} notice="Esta tela nunca decide liberação física. Allowed/denialReason são fatos já registrados pelo mecanismo canônico de acesso." />;
}
