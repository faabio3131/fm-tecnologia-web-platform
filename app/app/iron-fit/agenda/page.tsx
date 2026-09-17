"use client";

import { OperationalResource, type OperationalCommand } from "@/src/components/iron-fit/operational-resource";

const operations: OperationalCommand[] = [
  {
    label: "Criar horário",
    method: "POST",
    path: () => "schedule-slots",
    fields: [
      { name: "weekday", label: "Dia da semana (0–6)", type: "number", required: true },
      { name: "startTime", label: "Início (HH:mm)", required: true },
      { name: "endTime", label: "Fim (HH:mm)", required: true },
      { name: "capacity", label: "Capacidade", type: "number", required: true },
      { name: "active", label: "Ativo", type: "checkbox" },
    ],
    body: (values) => ({ weekday: Number(values.weekday), startTime: values.startTime, endTime: values.endTime, capacity: Number(values.capacity), active: values.active }),
  },
  {
    label: "Reservar aluno",
    method: "POST",
    path: () => "schedules",
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "slotId", label: "ID do horário", required: true },
      { name: "date", label: "Data", type: "date", required: true },
    ],
  },
  {
    label: "Registrar check-in",
    method: "PATCH",
    path: (values) => `schedules/${values.scheduleId}/check-in`,
    fields: [{ name: "scheduleId", label: "ID da reserva", required: true }],
    body: () => ({}),
  },
];

export default function SchedulePage() {
  return <OperationalResource title="Agenda" description="Horários, capacidade, reservas e check-in delegados ao Core, que continua responsável por conflitos e regras de tenant." listPath="schedule-slots" preferred={["id", "weekday", "startTime", "endTime", "capacity", "active"]} operations={operations} />;
}
