# TrialPolicy — `[PRODUCT_ID]`

> Conforme a Arquitetura Mestre e a Fase 0 v1.3, a plataforma deve possuir um Trial & Conversion Engine com política por produto. Este template preserva decisões já aprovadas e mantém como `PENDENTE_EVIDENCIA` apenas o que ainda não foi fechado.

## Autoridade

`Diretor → Arquitetura Mestre → Fase 0 v1.3 → Baseline Executivo`

Fonte: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `262fb3fd65c35ae89520fd262386a07ea5d576fc`.

## Baseline de trial do portfólio inicial

| Produto | Trial | Cartão | Limite aprovado | Release comercial |
| --- | --- | --- | --- | --- |
| Kordena | **30 dias** | **não exigido** | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` até certificação/homologação e contratos |
| Iron Fit | **30 dias** | **não exigido** | **máximo 15 alunos** | `PENDENTE_EVIDENCIA` até certificação/homologação e contratos |
| Vendedor IA | não disponível | n/a | n/a | não comercializado |
| CampaIA | não disponível | n/a | n/a | não comercializado |
| Super Core Extreme | não disponível | n/a | n/a | Tecnologia & P&D · Em desenvolvimento |
| ERP Core | não disponível | n/a | n/a | não comercializado |

Decisão canônica: `DEC-07`. Pricing é governado separadamente por `DEC-08`.

**Regra:** trial aprovado como política comercial não equivale a trial liberado em produção. A liberação depende de certificação, homologação, provisionamento, entitlement, identidade e critérios de gate aplicáveis.

## Identificação da instância

| Campo | Valor |
| --- | --- |
| Product ID | `PENDENTE_EVIDENCIA` |
| Política ID/versão | `PENDENTE_EVIDENCIA` |
| Trial policy status | `approved_partial_contract` para Kordena/Iron Fit; `not_available` para os demais itens atuais |
| Trial release status | `PENDENTE_EVIDENCIA` quando aplicável |
| Evidência específica | `DEC-07` + evidências técnicas `PENDENTE_EVIDENCIA` |
| Estado documental | `em_revisao` quando Kordena/Iron Fit; `bloqueado` se faltarem contratos obrigatórios |

## Cadastro e pré-condições comuns

- Validação obrigatória de e-mail antes de efetivar conta: **SIM** (`DEC-11`).
- Validação obrigatória de WhatsApp antes de efetivar conta: **SIM** (`DEC-11`).
- Conta/Organization válida: `PENDENTE_EVIDENCIA` quanto ao contrato técnico.
- Aceite de termos versionados: `PENDENTE_EVIDENCIA`.
- Certificação/homologação do produto antes da liberação pública: `PENDENTE_EVIDENCIA`.

## Elegibilidade e ciclo

- Critérios de elegibilidade: `PENDENTE_EVIDENCIA`
- Início: após pré-condições e provisionamento aprovados — contrato exato `PENDENTE_EVIDENCIA`
- Duração Kordena/Iron Fit: **30 dias**
- Exigência de cartão Kordena/Iron Fit: **NÃO**
- Repetição/renovação: `PENDENTE_EVIDENCIA`
- Prevenção de abuso: `PENDENTE_EVIDENCIA`
- Encerramento e expiração: `PENDENTE_EVIDENCIA`
- Grace period: `PENDENTE_EVIDENCIA`
- Conversão e consentimento: `PENDENTE_EVIDENCIA`
- Cancelamento: `PENDENTE_EVIDENCIA`

## Limites funcionais

### Kordena

- Limites adicionais durante trial: `PENDENTE_EVIDENCIA`

### Iron Fit

- Máximo de alunos durante trial: **15**
- Outros limites: `PENDENTE_EVIDENCIA`

Não inventar limites extras sem decisão executiva/evidência.

## Controles

- Entitlements concedidos: `PENDENTE_EVIDENCIA`
- Dados exigidos e finalidade: `PENDENTE_EVIDENCIA`
- Antiabuso/duplicidade: `PENDENTE_EVIDENCIA`
- Comunicações autorizadas: `PENDENTE_EVIDENCIA`
- Eventos/auditoria: `PENDENTE_EVIDENCIA`
- Comportamento em falha: `PENDENTE_EVIDENCIA`
- Provisionamento/reconciliação: `PENDENTE_EVIDENCIA`

## Pricing relacionado — referência, não regra de entitlement

- Kordena: **R$ 299/mês** ou **R$ 2.990/ano**.
- Iron Fit: **R$ 269/mês** ou **R$ 2.690/ano**.
- Enterprise: **sob consulta**.

Fonte: `DEC-08`. O Trial Service não deve inferir direitos pagos diretamente do texto de pricing.

## Aprovação

- Responsável técnico: `PENDENTE_EVIDENCIA`
- Responsável produto/comercial: `PENDENTE_EVIDENCIA`
- Evidências de teste: `PENDENTE_EVIDENCIA`
- Aprovadores/datas: `PENDENTE_EVIDENCIA`