# Product Integration Contract — `[PRODUCT_ID]`

> Contrato documental, não executável. Sistemas e integrações específicas só podem ser nomeados quando confirmados pela autoridade superior. A Fase 0 v1.3 confirma como princípios: SaaS isolados por contratos/adapters e IA multi-provider/multi-modelo provider-agnostic.

## Autoridade

`Diretor → Arquitetura Mestre → Fase 0 v1.3 → Baseline Executivo`

Fonte: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `34a71f5886ebfaf278be106205284f14eba54664`.

## Modelo de desacoplamento para os seis produtos

```text
Website / FM Platform
        ↓
BFF / Core comercial
        ↓
Product Integration Contract
        ↓
Product-specific tenant/workspace
        ↓
Entitlements
        ↓
Produto operacional
```

O site comercial não deve acessar diretamente bancos de dados dos produtos. Um contrato deve ser instanciado por produto, sem presumir endpoint, tenant API ou contrato operacional.

Direção de infraestrutura já aprovada: **Next.js/Vercel para a camada Web + AWS para núcleo comercial/Conta FM/provisionamento** (`DEC-13`). Isso não altera a independência contratual dos SaaS.

## Controle do contrato

- Contract ID/versão: `PENDENTE_EVIDENCIA`
- Product ID: `PENDENTE_EVIDENCIA`
- Fonte e consumidor: `PENDENTE_EVIDENCIA`
- Responsáveis: `PENDENTE_EVIDENCIA`
- Referência da Fase 0: `34a71f5886ebfaf278be106205284f14eba54664`
- Estado: `rascunho`

## Fronteira

- Objetivo: `PENDENTE_EVIDENCIA`
- Casos de uso autorizados: `PENDENTE_EVIDENCIA`
- Fora do escopo: `PENDENTE_EVIDENCIA`
- Dependências confirmadas: `PENDENTE_EVIDENCIA`
- Regra de isolamento: o site/core não acessa banco operacional do SaaS diretamente.

## Interface e dados

- Operações/eventos: `PENDENTE_EVIDENCIA`
- Esquemas e versionamento: `PENDENTE_EVIDENCIA`
- Identidade e contexto organizacional: `PENDENTE_EVIDENCIA`
- Autenticação e autorização: `PENDENTE_EVIDENCIA`
- Classificação, minimização e retenção de dados: `PENDENTE_EVIDENCIA`
- Idempotência, ordenação e concorrência: `PENDENTE_EVIDENCIA`
- Correlation ID: `PENDENTE_EVIDENCIA`

## Identidade e cadastro

A Conta FM deve exigir validação de **e-mail e WhatsApp antes da efetivação da conta** (`DEC-11`). O contrato deve definir como uma identidade central validada é federada/representada no produto sem duplicar credenciais desnecessariamente.

- Identity/SSO contract: `PENDENTE_EVIDENCIA`
- Tenant/Organization mapping: `PENDENTE_EVIDENCIA`
- Reautenticação/MFA conforme risco: `PENDENTE_EVIDENCIA`

## IA — quando houver capacidade de IA na integração

Princípio obrigatório (`DEC-25`): **multi-provider + multi-modelo + provider-agnostic**.

```text
Produto / Feature / Agent
        ↓
AI Gateway / Provider Abstraction
        ↓
Policy / Router
        ↓
Provider Adapter
        ↓
Model
        ↓
Telemetry / FinOps
```

- Nenhum domínio consumidor deve depender diretamente de SDK/API de um provider.
- Chaves e segredos permanecem no backend.
- Providers/modelos específicos: `PENDENTE_EVIDENCIA` por política/ADR; não existe provider exclusivo implícito.
- Critérios de roteamento: `PENDENTE_EVIDENCIA` (capacidade, qualidade, custo, latência, disponibilidade, contexto e risco são dimensões permitidas pela Fase 0).
- Fallback: `PENDENTE_EVIDENCIA`, sempre governado e compatível com contrato.
- Dados autorizados por provider: `PENDENTE_EVIDENCIA`.
- Retenção/privacidade por provider: `PENDENTE_EVIDENCIA`.

## FinOps / observabilidade de IA

Quando aplicável, registrar (`DEC-26`):

- tenant/organization;
- produto/feature/tarefa;
- provider/modelo;
- consumo/tokens/unidades faturáveis;
- custo;
- latência;
- sucesso/falha;
- fallback/rota;
- correlation ID.

Metas iniciais de custo alocável:

- Kordena: alvo ≤ R$ 50/mês; atenção R$ 75/mês.
- Iron Fit: alvo ≤ R$ 45/mês; atenção R$ 67/mês.

Método de medição, alertas e otimizações: `PENDENTE_EVIDENCIA`.

## Comportamento operacional

- Disponibilidade e limites: `PENDENTE_EVIDENCIA`
- Timeouts, repetição e fallback: `PENDENTE_EVIDENCIA`
- Erros e códigos: `PENDENTE_EVIDENCIA`
- Observabilidade e auditoria: `PENDENTE_EVIDENCIA`
- Compatibilidade e descontinuação: `PENDENTE_EVIDENCIA`
- Circuit breaker/backpressure quando aplicável: `PENDENTE_EVIDENCIA`

## Aceite

- Cenários de contrato: `PENDENTE_EVIDENCIA`
- Cenários negativos/isolamento: `PENDENTE_EVIDENCIA`
- Evidências: `PENDENTE_EVIDENCIA`
- Aprovações: `PENDENTE_EVIDENCIA`