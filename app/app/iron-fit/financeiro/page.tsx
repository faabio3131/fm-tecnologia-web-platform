"use client";

import { OperationalResource, type OperationalCommand } from "@/src/components/iron-fit/operational-resource";

const operations: OperationalCommand[] = [
  {
    label: "Criar conta financeira",
    method: "POST",
    path: () => "financial/accounts",
    fields: [
      { name: "name", label: "Nome", required: true },
      { name: "type", label: "Tipo", required: true },
      { name: "initialBalance", label: "Saldo inicial (centavos)", type: "number" },
    ],
    body: (values) => ({ name: values.name, type: values.type, ...(values.initialBalance ? { initialBalance: Number(values.initialBalance) } : {}) }),
  },
  {
    label: "Criar assinatura do aluno",
    method: "POST",
    path: () => "financial/subscriptions",
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "planName", label: "Plano", required: true },
      { name: "amount", label: "Valor (centavos)", type: "number", required: true },
      { name: "nextBillingAt", label: "Próxima cobrança", type: "date" },
    ],
    body: (values) => ({ studentId: values.studentId, planName: values.planName, amount: Number(values.amount), ...(values.nextBillingAt ? { nextBillingAt: values.nextBillingAt } : {}) }),
  },
  {
    label: "Criar cobrança",
    method: "POST",
    path: () => "financial/charges",
    fields: [
      { name: "studentId", label: "ID do aluno", required: true },
      { name: "subscriptionId", label: "ID da assinatura" },
      { name: "amount", label: "Valor (centavos)", type: "number", required: true },
      { name: "dueDate", label: "Vencimento", type: "date", required: true },
      { name: "paymentMethod", label: "Forma de pagamento" },
    ],
    body: (values) => ({ studentId: values.studentId, ...(values.subscriptionId ? { subscriptionId: values.subscriptionId } : {}), amount: Number(values.amount), dueDate: values.dueDate, ...(values.paymentMethod ? { paymentMethod: values.paymentMethod } : {}) }),
  },
  {
    label: "Registrar pagamento",
    method: "PATCH",
    path: (values) => `financial/charges/${values.chargeId}/pay`,
    fields: [
      { name: "chargeId", label: "ID da cobrança", required: true },
      { name: "accountId", label: "ID da conta", required: true },
      { name: "paidAt", label: "Pago em", type: "date" },
      { name: "paymentMethod", label: "Forma de pagamento" },
    ],
    body: (values) => ({ accountId: values.accountId, ...(values.paidAt ? { paidAt: values.paidAt } : {}), ...(values.paymentMethod ? { paymentMethod: values.paymentMethod } : {}) }),
  },
];

export default function FinancePage() {
  return <OperationalResource title="Financeiro do aluno" description="Contas, cobranças, assinaturas e pagamentos do domínio operacional da academia. Este módulo não é o billing SaaS da FM Tecnologia." listPath="financial/charges" preferred={["id", "studentId", "subscriptionId", "amount", "dueDate", "status", "paidAt", "paymentMethod"]} operations={operations} notice="Valores permanecem no formato e nas regras do Core. Billing comercial do IRON FIT é escopo posterior (M6)." />;
}
