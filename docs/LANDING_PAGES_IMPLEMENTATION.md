# Landing pages — implementação editorial de 14/09/2026

## Escopo entregue
Primeira versão das páginas Kordena/Iron Fit: apresentação específica, etapas expansíveis, recursos, preços centrais, FAQ e contato contextual por WhatsApp/e-mail. Preserva visual, menu e os outros quatro produtos. Não libera Conta FM, trial ou cobrança.

## Evidências consultadas (leitura, não reexecução dos testes dos SaaS)
Kordena: fm-ai-platform main em 5a17b0c8a1cb6dad576ce5b089166748b138900c.
- docs/web-parity/KORDENA_WEB_PARITY_V1_INVENTARIO_MESTRE.md registra migração de PDV/Salão/KDS e pendências em outros módulos.
- web/src/features/salao/services/salao-api.ts: mapa, abertura/consulta de comanda, lançamento e solicitação de conta.
- web/src/features/pdv/services/pdv-api.ts: catálogo e checkout com retorno de valores/pagamento.
- web/src/features/kds/services/kds-api.ts: setores, fila e transições.
- Checkpoints Fase 7/Fase 8 comprovam histórico técnico, sem comprovar lançamento atual ou integrações externas.

Iron Fit:
- Repositório antigo -gym-saas-backend foi renomeado para iron-fit-backend (mesmo ID 1352565244).
- Backend main 9763f9a3fd41cad1a9cf67ea36ae9bf67189bd24: students.controller.ts, workouts.controller.ts e docs/S12_CERTIFICATION.md.
- App main 8884d18bb7def30a69ec2e558263c0b26ed275fa: WorkoutsScreen.tsx, SchedulesScreen.tsx e CheckInScreen.tsx.
- Claims restritos a cadastro/convite, consulta de treino/sessões/exercícios, agenda de reservas e check-in. Não promete agenda de reserva pelo app quando só consulta foi verificada.
- S12 é evidência histórica da base, não certificação de todo o lançamento. Sem promover MFA, Aggregator Hub, catracas ou aconselhamento clínico.

Conteúdo novo em src/catalog/product-landings.json. Preços, trial e contato continuam no catálogo/configuração existentes. Os resumos de cards e SEO dos dois produtos foram atualizados com o mesmo escopo.

## Mídia ainda pendente
As árvores canônicas consultadas não contêm gravações de apresentação utilizáveis. Não há navegador/runtime de captura nesta sessão. Não foram fabricadas telas ou vídeos. Os blocos “Conheça a rotina” são explicações textuais expansíveis, não demos executáveis.
Esta primeira versão editorial não equivale à entrega final de LP-03/LP-06 do plano. Para concluir a versão com vídeo: acessar um ambiente demonstrável autorizado, capturar dados sintéticos, revisar versão/roteiro, produzir poster/legendas/transcrição e integrar mídia sob demanda. Site pode ser conferido enquanto essa produção permanece pendente.

## Roteiros preparados para futura gravação
Kordena, 75 s: 0–10 contexto do restaurante; 10–30 mesa/comanda e itens; 30–50 cozinha/setor/status; 50–65 consulta da conta e fechamento disponível; 65–75 nome e contato. Provar pré-condições e usar release demonstrável; não prometer transação externa pela montagem.
Iron Fit, 75 s: 0–10 contexto da academia; 10–25 cadastro/convite em ambiente autorizado; 25–45 aluno consulta treino, sessões e exercícios; 45–65 agenda e check-in com confirmação; 65–75 nome e contato. Não gravar dados de saúde reais.
Cada gravação: identificar SHA/ambiente/data/responsável, ocultar segredos, fornecer legenda e transcrição, validar com responsável pelo produto.

## Validação
Revisão de fontes e consistência editorial realizada. Pipeline acrescentado para executar lint, typecheck, suite existente, build/export e smoke das landings no GitHub; seu resultado deve ser conferido no commit publicado. Cloudflare build/deploy deve ser conferido separadamente. Não declarar inspeção visual ou teste de toque automatizado: navegador indisponível nesta sessão.

## Reversão
Reverter o commit desta entrega, preservando ef11b69 como último estado anterior publicado. Não alterar repositórios dos SaaS. PR #4 permanece sem merge. As PRs documentais #5/#6 permanecem independentes.
