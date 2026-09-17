"use client";

import { OperationalResource, type OperationalCommand } from "@/src/components/iron-fit/operational-resource";

const operations: OperationalCommand[] = [
  {
    label: "Criar treino",
    method: "POST",
    path: () => "workouts",
    rolesNote: "Criação determinística pelo profissional. Candidatos da IA continuam separados e sujeitos a revisão humana.",
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "assessmentId", label: "ID da avaliação" },
      { name: "goal", label: "Objetivo" },
      { name: "level", label: "Nível" },
      { name: "weeklyFrequency", label: "Frequência semanal", type: "number" },
      { name: "startDate", label: "Início", type: "date" },
      { name: "validUntil", label: "Validade", type: "date" },
      { name: "notes", label: "Observações" },
    ],
    body: (values) => ({
      studentId: values.studentId,
      ...(values.assessmentId ? { assessmentId: values.assessmentId } : {}),
      ...(values.goal ? { goal: values.goal } : {}),
      ...(values.level ? { level: values.level } : {}),
      ...(values.weeklyFrequency ? { weeklyFrequency: Number(values.weeklyFrequency) } : {}),
      ...(values.startDate ? { startDate: values.startDate } : {}),
      ...(values.validUntil ? { validUntil: values.validUntil } : {}),
      ...(values.notes ? { notes: values.notes } : {}),
    }),
  },
  {
    label: "Revisão humana de status",
    method: "PATCH",
    path: (values) => `workouts/${values.workoutId}/status`,
    rolesNote: "Esta ação exige usuário autenticado autorizado. A IA não usa esta transição e não pode aprovar ou ativar treino.",
    fields: [
      { name: "workoutId", label: "ID do treino", required: true },
      { name: "status", label: "Novo status", type: "select", required: true, options: [
        { value: "PENDING_REVIEW", label: "Pendente de revisão" },
        { value: "APPROVED", label: "Aprovado" },
        { value: "ACTIVE", label: "Ativo" },
        { value: "EXPIRED", label: "Expirado" },
      ] },
    ],
    body: (values) => ({ status: values.status }),
  },
];

export default function WorkoutsPage() {
  return <OperationalResource title="Treinos" description="Treinos, candidatos de IA e lifecycle canônico. Registros createdByAI ficam visíveis para revisão; aprovação e ativação são sempre ações humanas autenticadas." listPath="workouts" preferred={["id", "studentId", "status", "createdByAI", "approvedById", "goal", "level", "validUntil"]} operations={operations} notice="O Web não executa geração ou ativação automática de treino. Equipamentos e demais compatibilidades continuam validados pelo Core." />;
}
