# Product Dossier — `[NOME_CANÔNICO]`

> Template documental para cada um dos seis itens do Product Registry. Observar a hierarquia: decisões do Diretor, Arquitetura Mestre, **Fase 0 v1.3** e, por último, este Baseline. Substitua lacunas por referências verificáveis; não use suposições nem apague decisões já aprovadas.

## Autoridade

Fonte consolidada: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `34a71f5886ebfaf278be106205284f14eba54664`.

## Controle

| Campo | Valor |
| --- | --- |
| Product ID | `PENDENTE_EVIDENCIA` |
| Nome canônico e slug | `PENDENTE_EVIDENCIA` (usar **Kordena** quando aplicável) |
| Estado | `rascunho` |
| Responsável | `PENDENTE_EVIDENCIA` |
| Referência da Arquitetura Mestre/decisão | `PENDENTE_EVIDENCIA` |
| Última validação | `PENDENTE_EVIDENCIA` |

## Proposição e escopo

- Posicionamento autorizado: `PENDENTE_EVIDENCIA`
- Público-alvo: `PENDENTE_EVIDENCIA`
- Problema que resolve: `PENDENTE_EVIDENCIA`
- Benefícios comprovados: `PENDENTE_EVIDENCIA`
- Funcionalidades comprovadas: `PENDENTE_EVIDENCIA`
- Dentro/fora do escopo: `PENDENTE_EVIDENCIA`

## Experiência comercial

- Estágio/lifecycle: `PENDENTE_EVIDENCIA`
- Visibilidade e requisitos para publicação: `PENDENTE_EVIDENCIA`
- Disponibilidade comercial/certificação: `PENDENTE_EVIDENCIA`
- CTA permitido: `PENDENTE_EVIDENCIA`
- Trial e política: preencher conforme `DEC-07` quando Kordena/Iron Fit; não inferir release técnico.
- Pricing: preencher conforme `DEC-08` quando Kordena/Iron Fit.
- Enterprise: sob consulta para Kordena/Iron Fit conforme `DEC-08`.
- Aquisição: autosserviço + rota consultiva/Enterprise conforme `DEC-22` quando aplicável.

### Baseline comercial já aprovado — não voltar a `PENDENTE_EVIDENCIA`

| Produto | Trial | Pricing |
| --- | --- | --- |
| Kordena | 30 dias, sem cartão | R$ 299/mês; R$ 2.990/ano; Enterprise sob consulta |
| Iron Fit | 30 dias, sem cartão, máximo 15 alunos | R$ 269/mês; R$ 2.690/ano; Enterprise sob consulta |
| Vendedor IA | não disponível enquanto `in_development` | não publicar oferta |
| CampaIA | não disponível enquanto `in_development` | não publicar oferta |
| Super Core Extreme | não disponível; Tecnologia & P&D | não publicar oferta |
| ERP Core | não disponível enquanto `in_development` | não publicar oferta |

## Status público para itens indisponíveis

- Vendedor IA: **Em desenvolvimento · Em breve**.
- CampaIA: **Em desenvolvimento · Em breve**.
- ERP Core: **Em desenvolvimento · Em breve**.
- Super Core Extreme: **Tecnologia & P&D · Em desenvolvimento**.

## Dependências e contratos

| Tema | Referência | Estado |
| --- | --- | --- |
| Integração SaaS | `PENDENTE_EVIDENCIA` | `rascunho` |
| Entitlements | `PENDENTE_EVIDENCIA` | `rascunho` |
| Provisionamento | `PENDENTE_EVIDENCIA` | `rascunho` |
| TrialPolicy detalhada | `PENDENTE_EVIDENCIA` | `rascunho` |
| Assets | `PENDENTE_EVIDENCIA` | `rascunho` |
| Identidade/SSO | `PENDENTE_EVIDENCIA` | `rascunho` |
| SuporteRoute | `PENDENTE_EVIDENCIA` | `rascunho` |

## Arquitetura de IA — quando o produto/feature usar IA

A Fase 0 v1.3 determina arquitetura **multi-provider/multi-modelo e provider-agnostic** (`DEC-25`). O dossier deve registrar capacidades e requisitos, não acoplar a identidade do produto a um fornecedor específico.

- Capacidade de IA usada: `PENDENTE_EVIDENCIA`
- Contrato com AI Gateway: `PENDENTE_EVIDENCIA`
- Providers/modelos permitidos por política: `PENDENTE_EVIDENCIA`
- Critérios de roteamento/fallback: `PENDENTE_EVIDENCIA`
- Dados/contexto permitido por provider: `PENDENTE_EVIDENCIA`
- Tratamento de segredos: backend-only conforme `DEC-25`
- Telemetria/FinOps: `PENDENTE_EVIDENCIA`

## FinOps

Quando aplicável, registrar custo alocável por tenant/produto/tarefa/provider/modelo. Metas executivas iniciais (`DEC-26`):

- Kordena: alvo ≤ R$ 50/mês; atenção R$ 75/mês.
- Iron Fit: alvo ≤ R$ 45/mês; atenção R$ 67/mês.

- Método de medição: `PENDENTE_EVIDENCIA`
- Alertas: `PENDENTE_EVIDENCIA`
- Estratégia de otimização/cache/roteamento: `PENDENTE_EVIDENCIA`

## Riscos, privacidade e segurança

- Dados tratados e finalidade: `PENDENTE_EVIDENCIA`
- Requisitos de segurança e acesso: `PENDENTE_EVIDENCIA`
- Riscos e mitigações: `PENDENTE_EVIDENCIA`
- Requisitos legais/LGPD: `PENDENTE_EVIDENCIA`
- Segredos/credenciais nunca expostos no frontend: obrigatório quando aplicável

## Evidências e aprovação

- Evidências e origem de cada afirmação: `PENDENTE_EVIDENCIA`
- Pendências/evidence gaps: `PENDENTE_EVIDENCIA`
- Decisões relacionadas: `PENDENTE_EVIDENCIA`
- Gates concluídos: `PENDENTE_EVIDENCIA`
- Aprovadores e datas: `PENDENTE_EVIDENCIA`