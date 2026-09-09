# Baseline Executivo — estrutura documental

## Finalidade

Esta pasta reúne exclusivamente os artefatos de engenharia necessários para preparar o Baseline Executivo da FM Tecnologia. Ela não autoriza implementação de frontend, backend, banco de dados ou infraestrutura.

## Autoridade e regras de preenchimento

A consolidação oficial vigente é a **Fase 0 v1.2**, registrada no commit `6b923ce320d415a4dec5cc3eadd4dc92cb6bbb01`, arquivo `docs/FASE_0_INVENTARIO_E_READINESS.md`, branch de publicação `docs/fase-0-inventario-readiness`.

### Hierarquia obrigatória

1. Decisões executivas do Diretor.
2. **“01 - ARQUITETURA MESTRE - SITE COMERCIAL FM TECNOLOGIA.pdf”**.
3. Fase 0 v1.2 (`docs/FASE_0_INVENTARIO_E_READINESS.md`).
4. Este Baseline Executivo (`docs/baseline-executivo/**`).

Em qualquer divergência, o documento de nível inferior deve ser corrigido. A Fase 0 v1.2 registra a Arquitetura Mestre como fonte encontrada e lida integralmente, com 7 páginas; o Baseline herda esse fato da consolidação oficial e não o reinterpreta com base na disponibilidade local do PDF.

Use `PENDENTE_EVIDENCIA` quando faltar evidência específica; não presuma nem complete o dado. **Kordena** é o nome canônico. Toda divergência deve ser registrada no Decision Register, e identificadores estáveis não devem codificar informação comercial mutável.

### Conteúdo efetivamente verificado nesta reconciliação

A referência, o commit, o caminho, a branch, a leitura integral do PDF e os números de readiness foram fornecidos pela Direção como estado oficial da Fase 0 v1.2. O commit e o arquivo da Fase 0 não estão presentes neste checkout local; por isso, esta execução verificou diretamente somente os documentos do Baseline, preservando como herdadas as declarações oficiais da Fase 0.

### Restrições da autoridade

- Produtos não comercializados não podem ser apresentados como disponíveis.
- A estrutura deve crescer para muitos produtos sem redesenho estrutural.
- Fatos, clientes e credenciais não podem ser inventados.
- Presença no portfólio não autoriza venda, trial, preço, pagamento, produção, SLA ou certificação.

## Diretriz documental para Home e Marketplace — futura Fase 1

| Grupo | Itens | Regra de apresentação |
| --- | --- | --- |
| Produtos disponíveis / produtos principais | Kordena; Iron Fit | Prioridade e destaque de produto principal; “disponível” continua condicionado à certificação final |
| O que estamos construindo | Vendedor IA; CampaIA; ERP Core | Identificar explicitamente como “Em desenvolvimento” |
| Tecnologia/P&D | Super Core Extreme | Tecnologia/plataforma estratégica de P&D, distinta de SaaS comercial disponível |

O Marketplace deverá filtrar estados e permitir a promoção `in_development` → `beta` → `available` sem redesenho estrutural. Esta é uma regra documental para a Fase 1 e não autoriza implementação nesta entrega.

## Artefatos

| Artefato | Uso |
| --- | --- |
| [Product Registry](product-registry.yaml) | Catálogo controlado e esquema mínimo de produtos |
| [Product Dossier](product-dossier-template.md) | Evidências e decisões de um produto |
| [Decision Register](decision-register.md) | Rastreabilidade de decisões e divergências |
| [Asset Manifest](asset-manifest.yaml) | Inventário e estado dos ativos aprovados |
| [TrialPolicy](trial-policy-template.md) | Política de trial sem pressupor sua existência |
| [Product Integration Contract](product-integration-contract-template.md) | Fronteiras documentais de integração |
| [Entitlement Contract](entitlement-contract-template.md) | Direitos e regras de autorização |
| [Provisioning Contract](provisioning-contract-template.md) | Ciclo documental de provisionamento |
| [Definition of Done e gates](definition-of-done-gates.md) | Critérios de prontidão G0–G4 |

## Convenções de estado

- `rascunho`: em elaboração, sem aprovação.
- `em_revisao`: evidências reunidas, aguardando responsáveis.
- `aprovado`: validado pelos responsáveis indicados na Fase 0.
- `bloqueado`: há lacuna ou conflito que impede avanço.
- `PENDENTE_EVIDENCIA`: falta evidência específica na Fase 0; o valor não pode ser inferido.

Templates não são contratos executáveis. A passagem de gate exige evidências referenciáveis, responsável identificado e ausência de campos obrigatórios pendentes.
