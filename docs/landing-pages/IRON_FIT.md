# Orientação de página — Iron Fit
Versão 1.0 · Prioridade de lançamento informada pelo Diretor · Página completa a produzir.

## Identificação
- Nome: Iron Fit; ID prod_iron_fit; rota /produtos/iron-fit.
- Referência: [orientação mestre](ORIENTACAO_MESTRE.md).
- Público candidato: gestão de academias, a detalhar no dossiê conforme módulos prontos.
- Preço aprovado: R$ 269/mês ou R$ 2.690/ano; Enterprise sob consulta.
- Política aprovada: 30 dias sem cartão, máximo de 15 alunos durante o teste. Ativação operacional depende da integração certificada.

## Direção editorial proposta
Mostrar como a academia organiza sua operação usando o software real. A Arquitetura Mestre cita academia, unidade, planos, equipe e primeiros alunos como exemplos de onboarding; esses exemplos não certificam que todas as funções estejam implementadas.

Não anunciar acompanhamento metabólico, prescrição por IA, integração com catracas, pagamentos ou Aggregator Hub operacional sem evidências específicas. A existência de arquitetura para uma integração não comprova sua disponibilidade comercial.

## Pautas para demonstração
| Pauta candidata | O que validar na release | Prova a capturar se aprovada |
| --- | --- | --- |
| Primeiros passos | Configuração de academia/unidade e permissões existentes | Fluxo real com academia fictícia |
| Cadastro e organização de alunos | Inclusão, consulta e associação a plano, se disponíveis | Um aluno fictício do início à confirmação |
| Rotina de atendimento/gestão | Tarefa frequente realmente concluída pelo sistema | Resultado visível e replicável |
| Visão da operação | Indicadores disponíveis, origem e atualização | Dashboard real com dados demonstrativos, sem promessa de resultado |

Escolher três tarefas comprovadas. Treinos, cobrança, frequência, integrações e IA só entram se auditados na release escolhida.

## Roteiro do vídeo principal
- Abertura: contexto da academia e problema de uma rotina específica.
- Meio: executar tarefa principal com aluno/academia fictícios e mostrar a confirmação no sistema.
- Fechamento: resultado observável e orientação para conhecer condições, contatar ou testar conforme disponibilidade.
- Não sugerir que dados fictícios representam clientes ou resultados obtidos.

## Mapa da landing
Hero com benefício comprovável → vídeo da rotina → três cenários → capacidades por necessidade → implantação/suporte → planos e teste com limite de 15 alunos → FAQ → CTA.
Preservar identidade FM e visual atual; diferenciação pelo conteúdo e telas, sem redesenhar a marca.

## Perguntas para FAQ — respostas a produzir
1. Para quais tipos e tamanhos de academia o produto está preparado?
2. Quais rotinas estão incluídas no plano?
3. Como cadastrar equipe e controlar acesso?
4. É possível operar múltiplas unidades na versão oferecida?
5. Como importar dados ou iniciar uma academia sem cadastro anterior?
6. Como funciona o limite de 15 alunos no teste?
7. O que acontece ao terminar os 30 dias?
8. Quais integrações e canais de suporte estão disponíveis?

## Evidências para LP-01
| Item | Estado inicial | Ação |
| --- | --- | --- |
| Repositório/release/ambiente demonstrável | A verificar na execução | Confirmar fonte canônica e SHA certificado |
| Público e capacidades | Direção candidata, sem auditoria atual | Concluir dossiê com responsável |
| Mídias reais | Não fornecidas nesta tarefa | Capturar após validação |
| Planos, unidades e recursos incluídos | Escopo detalhado pendente | Validar antes de escrever FAQ/benefícios |
| Limite de 15 alunos | Política aprovada; enforcement não testado aqui | Conferir backend e cenário do 16º aluno antes de liberar trial |
| Trial/acesso/integrações | Não certificados nesta frente | Preservar contato consultivo |

Critério específico: nenhuma mídia ou funcionalidade do Kordena; valores 269/2690 do catálogo; limite de alunos visível junto ao teste; zero promessa de acompanhamento clínico/metabólico ou IA sem prova.
