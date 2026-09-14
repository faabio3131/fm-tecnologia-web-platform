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
Kordena, 90–120 s: abrir com a visão de gestão do restaurante; mostrar um atendimento como fio condutor; relacionar produção à ficha técnica, insumos e custos; mostrar a visão financeira e o relacionamento com clientes. Encerrar com o papel do Assistente de Atendimento e do Gerente IA, identificando explicitamente o que ainda estiver em preparação. Cada cena depende de um módulo demonstrável na versão autorizada; se não houver, usar explicação editorial identificada como escopo futuro, nunca uma tela inventada. O pedido é exemplo de integração, não a definição inteira do produto.
Iron Fit, 75 s: 0–10 contexto da academia; 10–25 cadastro/convite em ambiente autorizado; 25–45 aluno consulta treino, sessões e exercícios; 45–65 agenda e check-in com confirmação; 65–75 nome e contato. Não gravar dados de saúde reais.
Cada gravação: identificar SHA/ambiente/data/responsável, ocultar segredos, fornecer legenda e transcrição, validar com responsável pelo produto.

## Validação
Revisão de fontes e consistência editorial realizada. Pipeline acrescentado para executar lint, typecheck, suite existente, build/export e smoke das landings no GitHub; seu resultado deve ser conferido no commit publicado. Cloudflare build/deploy deve ser conferido separadamente. Não declarar inspeção visual ou teste de toque automatizado: navegador indisponível nesta sessão.

## Reversão
Reverter o commit desta entrega, preservando ef11b69 como último estado anterior publicado. Não alterar repositórios dos SaaS. PR #4 permanece sem merge. As PRs documentais #5/#6 permanecem independentes.

## Correção de posicionamento do Kordena

A orientação do diretor em 14/09/2026 corrige o recorte excessivo da primeira versão. A migração Web de Salão/PDV/KDS não define o limite comercial ou conceitual do produto inteiro. A página passa a apresentar gestão, operação e inteligência: atendimento/vendas, produção/entrega, cardápio/fichas, estoque/validade, financeiro/resultados, clientes/fidelização e as duas frentes de IA.

### Base e limites de cada afirmação

Fontes do repositório faabio3131/fm-ai-platform consultadas nesta revisão:

| Área | Evidência | Limite da apresentação |
| --- | --- | --- |
| Visão integrada e módulos legados | docs/arquitetura-operacional-v1.md, seções 1, 4.1, 18 e 19 | Documento mistura diagnóstico existente e projeto futuro; não comprova integração comercial de todos os módulos. |
| Cardápio, ficha, CMV, saldo/validade, dashboard e CRM | Diagnóstico da seção 4.1 da arquitetura | Apresentar domínios do produto, sem prometer contabilidade completa ou resultado financeiro garantido. |
| Estoque por movimentos e reservas | docs/ledger-estoque-v1.md | Nova orquestração não está conectada ao runtime real nessa entrega; não anunciar baixa integrada automática em produção. |
| Clientes e fidelização | docs/crm-conversao-consentida-v1.md | CRM legado existe; nova conversão consentida é test-only. Não anunciar envio real de campanha, conexão com marketplace ou conformidade certificada. |
| Assistente de Atendimento | docs/mica-v1.md no SHA 5a17b0c8a1cb6dad576ce5b089166748b138900c | Identidade pública é configurável; Mica não é nome comercial. Nova V1 é test-only, sem LLM/transporte real comprovado. Identificar como em preparação. |
| Gerente IA | docs/gerente-ia-v1.md | Consultas, relatórios, sugestão de compra e rascunho de campanha; priorizar/pausar depende de confirmação humana. Flag test-only. Não prometer compra, campanha publicada, voz ou fechamento autônomo. |
| Disponibilidade operacional | docs/V1_WAVE2_EXECUTION_STATUS.md | Dependência PagBank permanece pendente; não declarar cutover PIX, produção ou homologação concluídos. |

A disponibilidade dos módulos aparece junto da apresentação dos recursos, e IA está marcada em preparação nos cards, cenários e FAQ. Preços, estados de readiness e liberação do trial continuam sem alterações. Iron Fit preserva seu texto e aparência; os campos novos no componente apenas permitem títulos específicos por produto.

### Diretriz para próximas versões

A abertura deve explicar o negócio que o Kordena ajuda a gerir; as seções detalham seus pilares. Não voltar a usar apenas mesas/comandas/cozinha como definição do produto. Materiais comerciais e vídeos devem seguir a mesma amplitude e identificar recursos ainda não liberados. A evolução dessa página não modifica o runtime do Kordena nem constitui certificação.
