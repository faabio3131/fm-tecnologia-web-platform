"use client";

import { OperationalResource, type OperationalCommand } from "@/src/components/iron-fit/operational-resource";

const operations: OperationalCommand[] = [
  {
    label: "Cadastrar aluno",
    method: "POST",
    path: () => "students",
    rolesNote: "Cadastro permitido pelo Core para OWNER, MANAGER e RECEPTION; o backend permanece a autoridade.",
    fields: [
      { name: "name", label: "Nome", required: true },
      { name: "email", label: "E-mail", type: "email", required: true },
      { name: "phone", label: "Telefone" },
      { name: "birthDate", label: "Nascimento", type: "date" },
      { name: "gender", label: "Gênero" },
      { name: "goal", label: "Objetivo" },
      { name: "level", label: "Nível" },
      { name: "consentHealth", label: "Consentimento saúde", type: "checkbox" },
      { name: "consentComm", label: "Consentimento comunicação", type: "checkbox" },
      { name: "consentBiometry", label: "Consentimento biometria", type: "checkbox" },
    ],
  },
  {
    label: "Atualizar consentimentos",
    method: "PATCH",
    path: (values) => `students/${values.studentId}/consents`,
    body: (values) => ({ consentHealth: values.consentHealth, consentComm: values.consentComm, consentBiometry: values.consentBiometry }),
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "consentHealth", label: "Saúde", type: "checkbox" },
      { name: "consentComm", label: "Comunicação", type: "checkbox" },
      { name: "consentBiometry", label: "Biometria", type: "checkbox" },
    ],
  },
];

export default function StudentsPage() {
  return <OperationalResource title="Alunos" description="Cadastro, consulta e consentimentos no tenant autenticado. O Web nunca aceita gymId como autoridade." listPath="students" preferred={["id", "name", "email", "status", "goal", "level"]} operations={operations} />;
}
