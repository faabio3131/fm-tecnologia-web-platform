# Orientação mestre de trabalho — Landing pages dos produtos FM
Versão 1.0 · 14/09/2026 · Documento de orientação preparado para revisão e execução por etapas.

## Objetivo e prioridade
Criar apresentações comerciais completas para **Kordena** e **Iron Fit**, prioritários para o lançamento segundo o Diretor. As páginas devem explicar o produto, mostrar software real e levar o visitante ao contato ou teste quando liberado. Replicar o processo nos demais produtos conforme amadurecerem.

Nome canônico: Kordena. “Coordena” é referência histórica/transcrição; não criar outra marca ou rota.
Escopo desta entrega: documentação de trabalho. Não implementa páginas, grava vídeos ou declara produtos certificados.

## Fontes e precedência
Diretor → Arquitetura Mestre → Fase 0 → Baseline Executivo.
- [Arquitetura Mestre v1.0](https://drive.google.com/file/d/17mpNXMvJNZFzPqVwDkR6rTa4uBHc519x/view): seções 8–10, 12–17, 23–26, 32–33, 38–41.
- [Fase 0 v1.3](https://github.com/faabio3131/fm-tecnologia-web-platform/blob/262fb3fd65c35ae89520fd262386a07ea5d576fc/docs/FASE_0_INVENTARIO_E_READINESS.md).
- [Dossiê canônico](https://github.com/faabio3131/fm-tecnologia-web-platform/blob/32d615bbce96118b11781c428ebfa29c312c044d/docs/baseline-executivo/product-dossier-template.md).
- [Plano funcional](../PLANO_CONTINUIDADE_FUNCIONAL.md), especialmente PF-01 e dependências PF-03–06.
- Decisões posteriores do Diretor: preservar visual atual; páginas próprias com vídeos/demonstrações; priorizar Kordena/Iron Fit.

“Praticamente prontos” registra a prioridade informada pelo Diretor. Não substitui evidência de funcionalidades, aprovação de mídia nem testes do fluxo de aquisição.
Este documento detalha PF-01; não altera a sequência de Conta FM, provisionamento e billing.

## Documentos de execução
- [Kordena](KORDENA.md)
- [Iron Fit](IRON_FIT.md)
- [Modelo para os próximos produtos](MODELO_NOVO_PRODUTO.md)
- [Checklist e passagem de trabalho](CHECKLIST_EXECUCAO.md)

## Jornada e endereços
Institucional/portfólio → Conhecer produto → landing do produto → assistir demonstração → entender condições → contato ou trial.
Tráfego de anúncio/pesquisa/WhatsApp pode entrar diretamente na landing: ela deve fazer sentido sem visita à Home.
Usar as rotas existentes /produtos/kordena e /produtos/iron-fit. Não criar sites ou domínios separados nesta frente.
Preservar retorno ao portfólio, marca FM, menu responsivo corrigido e rodapé. Nenhuma barra fixa adicional deve roubar a área útil do celular.

## Estrutura editorial compartilhada
| Bloco | Conteúdo e finalidade | Evidência/ação |
| --- | --- | --- |
| 1. Apresentação | Nome, para quem, problema resolvido, frase de valor curta, tela real e até dois CTAs | Posicionamento e imagem aprovados; “Ver demonstração” + contato/trial conforme estado |
| 2. Veja funcionando | Vídeo principal com resumo do que será visto | Player sob demanda, poster real, legenda e transcrição |
| 3. Aplicação prática | Três tarefas relevantes, cada uma ligando problema → ação → resultado observável | Capturas/microdemos da versão validada; sem métricas inventadas |
| 4. Capacidades | Até seis grupos de funcionalidades essenciais, com detalhes expansíveis quando útil | Matriz claim → evidência; não publicar listas copiadas de outro produto |
| 5. Adoção e confiança | Como começar, suporte, integrações e segurança comprováveis | Condições reais; remover itens opcionais sem evidência |
| 6. Planos e teste | Mensal/anual, Enterprise, política de teste e disponibilidade atual | Fonte comercial central; texto editorial não altera direitos |
| 7. Perguntas frequentes | Cinco a oito dúvidas reais sobre uso, implantação, limites e suporte | Respostas verificadas; dúvidas sem resposta voltam para o dossiê |
| 8. Próximo passo | Uma chamada curta com ação contextual | Contato ou entrada na jornada certificada do produto |

Não repetir a mesma explicação em hero, card e CTA final. Os blocos podem ser combinados quando houver pouco conteúdo.
Ausência de material obrigatório bloqueia a nova versão completa da landing; a página atual continua disponível. Não publicar esqueletos vazios, players sem vídeo ou “em preparação” espalhado pela nova página.
Não impor seções para aumentar volume. A identidade de cada produto aparece em seu conteúdo e telas; manter cores e componentes atuais nesta etapa.

## Densidade, leitura e interação
Diretrizes de implementação propostas, a conferir no preview:
- Reutilizar container e tokens atuais; seções geralmente 32–56 px, evitando grandes vazios e alturas mínimas de tela.
- Título principal moderado (referência: 36–56 px desktop, 30–40 px móvel), descrição curta, corpo legível; ajustar por teste sem reduzir legibilidade.
- No desktop, apresentação e preview podem dividir duas colunas; no móvel, empilhar.
- Mostrar informação útil já na primeira tela; não exigir rolar uma tela inteira para descobrir o produto.
- Cards ajustados ao conteúdo, sem alturas artificiais. Telas têm proporção preservada e opção de ampliação acessível.
- Navegação por âncora, se necessária, compacta e sem nova barra persistente no celular; considerar cabeçalho ao posicionar destino.
- Abas só quando comparam conteúdos equivalentes. Preferir seções claras e FAQ expansível a esconder toda informação.
- A rolagem deve existir por conteúdo útil, não por margens. Não há promessa de caber toda a landing em uma única tela.

## Vídeos e demonstrações
Pacote mínimo por produto:
1. Vídeo principal de 60–90 segundos como alvo editorial, com legendas e transcrição.
2. Poster do vídeo e três a cinco screenshots relevantes.
3. Até três microdemos de 15–30 segundos, se agregarem prova diferente do vídeo principal.

Roteiro-base: problema/contexto (0–10 s), tarefa real e resultado (10–60 s), como começar e CTA coerente (últimos 10–20 s). Tempos orientativos.
Gravar a versão real em ambiente de demonstração com dados sintéticos identificados. Ocultar segredos, clientes, documentos, mensagens e informações pessoais.
Toda mídia deve registrar produto, versão/commit, ambiente, data, responsável, cenário, direitos de uso, texto alternativo, legendas e aprovação.
Não fabricar dashboards, resultados, logos de clientes, depoimentos ou “IA funcionando” com animações que se passem por software real.
Vídeo não toca áudio nem baixa o arquivo completo automaticamente. Reservar espaço para evitar saltos; carregar player pesado somente ao solicitar reprodução.
Falha da mídia não impede leitura nem contato; manter resumo/transcrição e alternativa de tentar novamente.
Tour interativo é evolução opcional. Não criar demo pública conectada a dados operacionais nem expor credenciais. Um tour ilustrativo precisa ser identificado como tal.
Hospedagem, formato e compressão serão escolhidos na execução conforme material e recursos existentes; nenhum fornecedor é contratado por este plano.

## Estados e CTAs
| Estado verificado | Ação permitida | Regra |
| --- | --- | --- |
| Apresentação pronta, aquisição não integrada | Ver demonstração / Falar com especialista | Exibir claramente que ativação do teste ainda não está disponível |
| Trial certificado e liberado para o produto | Testar grátis por 30 dias / Ver demonstração | Levar à Conta FM com contexto do produto; testar retorno e provisionamento |
| Contratação certificada | Ação de assinatura coerente com oferta | Não liberar apenas porque o preço aparece na página |
| Produto em desenvolvimento/P&D | Conhecer / acompanhar quando canal existir | Sem compra ou trial; sem botão que promete ação inexistente |

Disponibilidade de página, vídeo, trial e pagamento são independentes.
Até a integração: contato via /contato com identificação do produto ou canais aprovados. Se adotar parâmetro de interesse, especificar e testar seu consumo; não presumir que /contato já processa esse parâmetro.
Contato atual: fmtecnologia.comercial@gmail.com e https://wa.me/5511978350851. Reutilizar configuração central, sem duplicar dados.
Clicar no CTA não envia mensagem nem registra consentimento automaticamente.

## Implementação orientada ao repositório
Base conhecida: Next.js 15, React 19, TypeScript, CSS próprio, export estático na Cloudflare Pages. Não introduzir Tailwind ou migração de hospedagem nesta frente.
Reutilizar app/produtos/[slug]/page.tsx, template de produto e catálogo; adaptar componentes pequenos para apresentação, mídia, cenários e FAQ.
Definir conteúdo estruturado por produto (posicionamento, capacidades, cenários, mídias, FAQs e referências de evidência), preservando IDs, preços e disponibilidade já existentes. Não misturar conteúdo com regras de entitlement.
A configuração poderá evoluir para CMS no PF-01; não é necessário contratar CMS para as duas primeiras páginas. A fronteira editorial deve permitir essa evolução.
Componentes de cliente somente para interações necessárias. Não depender de API operacional para renderizar a apresentação pública.
Preservar os quatro outros produtos. Não substituir globalmente todos os templates por uma oferta de lançamento.
Antes de editar, conferir branch/HEAD e instruções locais vigentes; produzir mudança isolada e revisão rastreável. Nenhum merge automático.

## SEO, acessibilidade e medição
Título e descrição exclusivos por produto, um H1, hierarquia semântica, canonical coerente com domínio de publicação, sitemap e Open Graph.
Não inventar avaliações, preços promocionais ou schema de oferta incompatível com disponibilidade.
Player utilizável por teclado, legendas/transcrição; botões com nome acessível; imagens com alt e dimensões; contraste, foco, zoom 200% e preferência de redução de movimento.
Proposta de eventos: product_page_view, demo_play, demo_complete, product_contact_click e trial_cta_click; registrar product_id, origem permitida e posição do CTA, sem dados pessoais em URLs/eventos. Estes eventos ainda não estão implementados.
Não chamar clique de “trial iniciado”: início real depende de confirmação do backend. Evitar duplicidade ao navegar; respeitar preferências de coleta conforme política definida.

## Trabalho em blocos
| Bloco | Entrega | Critério para concluir |
| --- | --- | --- |
| LP-01 | Dossiês e inventário dos dois produtos | Público, tarefas, capacidades, evidências, versão e lacunas revisados |
| LP-02 | Copy e roteiros individuais | Cada frase factual rastreada; Diretor revisa posicionamento e mensagem |
| LP-03 | Mídia real e pacote acessível | Vídeo, screenshots, transcrição/legendas e permissões conferidos |
| LP-04 | Template compartilhado + primeira landing | Preview testável com dados e mídias reais; sem mudança de identidade |
| LP-05 | Segunda landing e revisão cruzada | Conteúdo específico; zero preço, screenshot ou CTA trocado entre produtos |
| LP-06 | Testes e publicação editorial | Matriz de qualidade concluída e conteúdo aprovado; disponibilidade técnica preservada |
| LP-07 | Ativação comercial por produto | Dependências de Conta FM/trial/billing certificadas; tarefa separada da publicação editorial |

Ordem de trabalho: preparar dossiês de ambos; usar Kordena como primeiro template quando seus materiais estiverem prontos; aplicar ao Iron Fit. Caso Iron Fit tenha pacote validado antes, antecipá-lo sem bloquear a trilha compartilhada.
Papéis: Diretor decide posicionamento/prioridade e aprova conteúdo; engenharia especifica, implementa e testa; responsável do produto comprova versão/capacidade; produção de mídia executa roteiro. Não presumir equipe ou proprietário inexistente.
Handoff obrigatório: conteúdo aprovado + manifesto de mídia + evidências + patch/commit + testes + pendências + instrução de reversão.
