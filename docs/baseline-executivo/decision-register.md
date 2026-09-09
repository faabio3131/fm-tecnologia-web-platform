# Decision Register

## Regras

- Registre decisões antes de refletir seus efeitos nos demais artefatos.
- Vincule toda decisão à evidência da Fase 0 ou marque-a como bloqueada.
- Não use este registro para criar fatos comerciais ausentes da Fase 0.
- Decisões substituídas permanecem no histórico e apontam para a sucessora.
- IDs `DEC-*` abaixo são canônicos e herdados da Fase 0 v1.2; não devem ser renumerados localmente.

## Autoridade

`Diretor → Arquitetura Mestre → Fase 0 v1.2 → Baseline Executivo`

Fonte consolidada: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `6b923ce320d415a4dec5cc3eadd4dc92cb6bbb01`.

## Estados

`proposta` · `aprovada` · `rejeitada` · `substituida` · `bloqueada`

## Decisões canônicas aplicáveis ao Baseline

| ID | Data | Tema | Decisão | Origem/evidência | Responsável | Estado | Impacta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DEC-04 | 2026-09-08 | Nomenclatura | Kordena é o nome canônico; “Coordena” é nomenclatura antiga/erro documental. | Fase 0 v1.2, seção 12.1 | Diretor/Marca/Produto | aprovada | Registros, páginas e dossiers aplicáveis |
| DEC-09 | 2026-09-08 | Identidade visual | Connected Modular refinado v1.0, Brand Baseline v1.0, paleta, tipografia, tokens e dark/light estão aprovados; o pacote foi produzido e sua incorporação ao repositório permanece pendente. | Fase 0 v1.2, seção 12.1 | Diretor/Design | aprovada | Asset Manifest e futura experiência visual |
| DEC-15 | 2026-09-08 | Portfólio | O portfólio inicial possui Kordena, Iron Fit, Vendedor IA, CampaIA, Super Core Extreme e ERP Core. A inclusão não autoriza oferta comercial. | Fase 0 v1.2, seção 12.1 | Diretor | aprovada | Product Registry; Home; Marketplace |
| DEC-16 | 2026-09-08 | Visibilidade | Vendedor IA, CampaIA e ERP Core terão página pública e serão identificados como “Em desenvolvimento”, sem disponibilidade comercial. | Fase 0 v1.2, seção 12.1 | Diretor/Produto/Marketing | aprovada | Product Registry; Home; Marketplace |
| DEC-17 | 2026-09-08 | Prioridade | Kordena e Iron Fit são Produtos Principais com destaque na Home/Marketplace; a informação de produto pronto não comprova disponibilidade comercial, trial, pricing ou certificação. | Fase 0 v1.2, seção 12.1 | Diretor/Produto | aprovada | Product Registry; Home; Marketplace; dossiers |
| DEC-18 | 2026-09-08 | Posicionamento | Super Core Extreme é tecnologia/plataforma estratégica em Pesquisa & Desenvolvimento, terá página pública e não será apresentado como SaaS comercial disponível. | Fase 0 v1.2, seção 12.1 | Diretor/Produto | aprovada | Product Registry; Home; Marketplace; dossier |
| DEC-19 | 2026-09-08 | Governança | Existência no portfólio, lifecycle, visibilidade no website, prontidão técnica, certificação, disponibilidade comercial, trial, pricing e produção/homologação são dimensões independentes. | Fase 0 v1.2, seção 12.1 | Diretor/Produto/Arquitetura | aprovada | Registry; políticas; contratos; gates |
| DEC-20 | 2026-09-08 | Organização do site | Home/Marketplace usarão os grupos Produtos Principais, O que estamos construindo e Tecnologia & P&D. | Fase 0 v1.2, seção 12.1 | Diretor/Produto/Marketing | aprovada | Home; Marketplace; Product Registry |
| DEC-21 | 2026-09-08 | Autoridade | A hierarquia documental é Diretor → Arquitetura Mestre → Fase 0 v1.2 → Baseline Executivo; divergências devem ser reconciliadas antes da programação. | Fase 0 v1.2, seção 12.1 | Diretor/Arquitetura | aprovada | Todos os artefatos |

## Aliases históricos removidos da camada vigente

Os identificadores locais `D-001` a `D-008` usados na primeira versão do Baseline não são autoridades paralelas e foram substituídos pelas referências canônicas acima. Qualquer histórico externo que ainda os mencione deve apontar para a decisão `DEC-*` correspondente antes de ser usado como evidência.

## Modelo de nova decisão específica do Baseline

| ID | Data | Tema | Decisão | Origem/evidência | Responsável | Estado | Substitui/impacta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `BASE-DEC-NNN` | `AAAA-MM-DD` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `proposta` | `PENDENTE_EVIDENCIA` |
