# Baseline Executivo — estrutura documental

## Finalidade

Esta pasta reúne exclusivamente os artefatos de engenharia necessários para preparar o Baseline Executivo da FM Tecnologia. Ela não autoriza implementação de frontend, backend, banco de dados ou infraestrutura.

## Autoridade e regras de preenchimento

A consolidação oficial vigente é a **Fase 0 v1.3**, registrada no commit `34a71f5886ebfaf278be106205284f14eba54664`, arquivo `docs/FASE_0_INVENTARIO_E_READINESS.md`, branch `docs/fase-0-inventario-readiness`.

### Hierarquia obrigatória

1. Decisões executivas expressas do Diretor.
2. **“01 - ARQUITETURA MESTRE - SITE COMERCIAL FM TECNOLOGIA.pdf”**.
3. Fase 0 v1.3 (`docs/FASE_0_INVENTARIO_E_READINESS.md`).
4. Este Baseline Executivo (`docs/baseline-executivo/**`).

Em qualquer divergência, o documento de nível inferior deve ser corrigido. A Fase 0 registra a Arquitetura Mestre como fonte encontrada e lida integralmente, com 7 páginas; o Baseline herda esse fato e não o reinterpreta com base na disponibilidade local do PDF.

Use `PENDENTE_EVIDENCIA` somente quando a Fase 0 v1.3 ainda não tenha fechado o dado. Não rebaixe para pendente uma decisão já aprovada pelo Diretor e não promova uma decisão parcial para prova técnica inexistente. **Kordena** é o nome canônico. Identificadores estáveis não devem codificar informação comercial mutável.

### Conteúdo efetivamente verificado nesta reconciliação

A Fase 0 v1.3 foi consultada na PR #1, branch `docs/fase-0-inventario-readiness`, commit `34a71f5886ebfaf278be106205284f14eba54664`, e usada como autoridade superior para reconciliar os documentos desta pasta na PR #2. O arquivo da Fase 0 permanece em branch separada e não é duplicado neste Baseline.

### Restrições da autoridade

- Produtos não comercializados não podem ser apresentados como disponíveis.
- A estrutura deve crescer para muitos produtos sem redesenho estrutural.
- Fatos, clientes, credenciais e certificações não podem ser inventados.
- Presença no portfólio, preço aprovado ou trial aprovado não comprovam certificação, homologação, billing operacional ou disponibilidade comercial final.
- Prioridade editorial não equivale a disponibilidade comercial.
- `fmtecnologia.ai` está escolhido, mas registro/titularidade ainda precisam ser comprovados.
- Next.js/Vercel + AWS é direção executiva aprovada; serviços, regiões, ambientes, threat model e ADRs continuam pendentes.
- A arquitetura de IA é multi-provider/multi-modelo e provider-agnostic; nenhum artefato pode introduzir lock-in silencioso.
- Atendimento 24/7 significa **automação 24/7**, não atendimento humano 24/7.

## Decisões comerciais v1.3

| Tema | Decisão aprovada | Limite ainda pendente |
| --- | --- | --- |
| Domínio | `fmtecnologia.ai` | compra/registro/titularidade e mapa de subdomínios |
| Aquisição | autosserviço + consultivo/Enterprise | processo/ferramentas/owners |
| Kordena | R$ 299/mês; R$ 2.990/ano; 30 dias grátis sem cartão | certificação, homologação e TrialPolicy detalhada |
| Iron Fit | R$ 269/mês; R$ 2.690/ano; 30 dias grátis sem cartão; máximo 15 alunos | certificação, homologação e detalhes operacionais |
| Enterprise | preço sob consulta | proposta/processo comercial |
| Cadastro | e-mail e WhatsApp validados antes de efetivar a conta | IdP, MFA, sessão, recovery e federação |
| Web/Core | Next.js/Vercel + AWS para núcleo comercial/Conta FM/provisionamento | ADRs, topologia, região, IaC e custos |
| Legal/LGPD | estrutura preparada agora; dados formais após abertura da empresa | textos, data map, cookies, owners e dados formais |
| Atendimento | WhatsApp + e-mail; automação 24/7 | SLA, escalonamento, ferramenta e horário humano real |
| Institucional | empresa, missão e valores; sem página pessoal do fundador | copy final |
| IA | AI Gateway/provider abstraction, adapters, fallback governado e FinOps | contratos, adapters e política final de roteamento |

## Diretriz documental para Home e Marketplace — futura Fase 1

| Grupo | Itens | Regra de apresentação |
| --- | --- | --- |
| Produtos Principais | Kordena; Iron Fit | Prioridade editorial; trial/pricing aprovados, porém disponibilidade final segue condicionada a certificação/homologação |
| O que estamos construindo | Vendedor IA; CampaIA; ERP Core | Exibir **“Em desenvolvimento · Em breve”**; sem compra, assinatura ou trial |
| Tecnologia & P&D | Super Core Extreme | Exibir **“Tecnologia & P&D · Em desenvolvimento”**; não tratar como SaaS comercial disponível |

O Marketplace deverá suportar `research_and_development` → `in_development` → `beta` → `available` sem redesenho estrutural. A mudança de lifecycle altera conteúdo, badge, CTA e permissões comerciais. Esta regra não autoriza implementação nesta entrega.

## Governança de IA e custo

Todas as capacidades de IA do site devem consumir uma camada abstrata/Gateway no backend, nunca SDK/API específica de provider diretamente no frontend ou no domínio consumidor. O roteamento poderá considerar capacidade, qualidade, custo, latência, disponibilidade e contexto; fallback deve ser governado e compatível com contrato.

Telemetria FinOps deve permitir rastrear, quando aplicável: tenant/organização, produto, tarefa, provider, modelo, consumo/tokens, custo, latência, resultado, falha e correlation ID.

Metas executivas iniciais de custo operacional alocável por tenant:

- **Kordena:** alvo ≤ R$ 50/mês; limite de atenção R$ 75/mês.
- **Iron Fit:** alvo ≤ R$ 45/mês; limite de atenção R$ 67/mês.

São metas de engenharia financeira para proteção de margem bruta de infraestrutura/IA, não garantia de lucro líquido.

## Artefatos

| Artefato | Uso |
| --- | --- |
| [Product Registry](product-registry.yaml) | Catálogo controlado e esquema mínimo de produtos |
| [Product Dossier](product-dossier-template.md) | Evidências e decisões de um produto |
| [Decision Register](decision-register.md) | Rastreabilidade de decisões e divergências |
| [Asset Manifest](asset-manifest.yaml) | Inventário e estado dos ativos aprovados |
| [TrialPolicy](trial-policy-template.md) | Política de trial, preservando decisões já aprovadas |
| [Product Integration Contract](product-integration-contract-template.md) | Fronteiras documentais de integração e desacoplamento |
| [Entitlement Contract](entitlement-contract-template.md) | Direitos e regras de autorização |
| [Provisioning Contract](provisioning-contract-template.md) | Ciclo documental de provisionamento |
| [Definition of Done e gates](definition-of-done-gates.md) | Critérios de prontidão G0–G4 |

## Convenções de estado

- `rascunho`: em elaboração, sem aprovação.
- `em_revisao`: evidências reunidas, aguardando responsáveis.
- `aprovado`: validado pelos responsáveis indicados pela autoridade superior.
- `bloqueado`: há lacuna ou conflito que impede avanço.
- `PENDENTE_EVIDENCIA`: falta evidência específica; o valor não pode ser inferido.

Templates não são contratos executáveis. A passagem de gate exige evidências referenciáveis, responsável identificado e ausência de campos obrigatórios pendentes.