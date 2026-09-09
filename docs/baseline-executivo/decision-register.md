# Decision Register

## Regras

- Registre decisões antes de refletir seus efeitos nos demais artefatos.
- Vincule toda decisão à evidência da Fase 0 ou marque-a como bloqueada.
- Não use este registro para criar fatos comerciais ausentes da Fase 0.
- Decisões substituídas permanecem no histórico e apontam para a sucessora.

## Estados

`proposta` · `aprovada` · `rejeitada` · `substituida` · `bloqueada`

## Registro

| ID | Data | Tema | Decisão | Origem/evidência | Responsável | Estado | Substitui/impacta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D-001 | 2026-09-08 | Governança | A Fase 0 é a autoridade do Baseline Executivo. | Decisão do Diretor registrada na preparação inicial | Diretor | aprovada | Todos os artefatos |
| D-002 | 2026-09-08 | Nomenclatura | Kordena é o nome canônico. | Decisão do Diretor registrada na preparação inicial | Diretor | aprovada | Registros e dossiers aplicáveis |
| D-003 | 2026-09-08 | Portfólio | O portfólio inicial possui Kordena, Iron Fit, Vendedor IA, CampaIA, Super Core Extreme e ERP Core. A inclusão é institucional e não autoriza oferta comercial. | Decisão do Diretor | Diretor | aprovada | Product Registry; Home; Marketplace |
| D-004 | 2026-09-08 | Visibilidade | Produtos em desenvolvimento terão espaço público, identificados como “Em desenvolvimento”. | Decisão do Diretor | Diretor | aprovada | Vendedor IA; CampaIA; ERP Core |
| D-005 | 2026-09-08 | Posicionamento | Kordena e Iron Fit têm prioridade e destaque como produtos principais; a indicação de produto pronto não substitui certificação final. | Decisão do Diretor | Diretor | aprovada | Home; Marketplace; dossiers |
| D-006 | 2026-09-08 | Posicionamento | Super Core Extreme é tecnologia/plataforma estratégica de P&D, distinta dos SaaS comerciais. | Decisão do Diretor | Diretor | aprovada | Home; Marketplace; dossier |
| D-007 | 2026-09-08 | Governança | Status de portfólio, lifecycle, visibilidade, disponibilidade comercial, trial, pricing e certificação são estados independentes. | Regra de governança aprovada nesta revisão | Diretor | aprovada | Product Registry; políticas; gates |
| D-008 | 2026-09-08 | Autoridade | A Arquitetura Mestre é fonte oficial e foi encontrada e lida integralmente (7 páginas), conforme consolidação oficial da Fase 0 v1.2. | Fase 0 v1.2, commit `6b923ce320d415a4dec5cc3eadd4dc92cb6bbb01`, `docs/FASE_0_INVENTARIO_E_READINESS.md` | Diretor | aprovada | Todos os artefatos |

## Modelo de nova decisão

| ID | Data | Tema | Decisão | Origem/evidência | Responsável | Estado | Substitui/impacta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `D-NNN` | `AAAA-MM-DD` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `proposta` | `PENDENTE_EVIDENCIA` |
