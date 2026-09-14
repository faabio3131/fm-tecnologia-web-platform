# Checklist de execução e entrega
Referência: [Orientação mestre](ORIENTACAO_MESTRE.md). Checklist ainda não executado.

## Antes da implementação
- [ ] Conferir instruções do repositório, base/HEAD e trabalho existente.
- [ ] Fechar dossiê, release e público por produto.
- [ ] Relacionar todas as afirmações a evidências.
- [ ] Aprovar copy, roteiro e pacote real de mídia.
- [ ] Definir estados comerciais e CTAs com fonte central.
- [ ] Identificar lacunas obrigatórias e owner, sem pedir novamente dados já confirmados.

## Qualidade de página
- [ ] Visitante entende produto, público e próximo passo sem depender da Home.
- [ ] Nenhuma seção vazia, claim inventado ou repetição desnecessária.
- [ ] Vídeos mostram a versão aprovada e dados sintéticos; poster, legenda e transcrição presentes.
- [ ] Play, pausa, controles, tela ampliada e falha de mídia tratados.
- [ ] Vídeo não baixa integralmente antes da interação; dimensões reservadas.
- [ ] Hero/cards mantêm densidade útil; menu fecha ao navegar; rolagem não fica presa.
- [ ] Preview em 360/390 px, tablet 768 px e desktop 1366 px; paisagem móvel e zoom 200%.
- [ ] Sem corte horizontal; texto e preço legíveis; teclado/foco/contraste/reduced motion conferidos.
- [ ] Título, canonical, sitemap, Open Graph e links internos corretos.
- [ ] Capturar medição de performance antes/depois com mesmo viewport/rede e investigar regressões de mídia.

## Conversão e isolamento
- [ ] Botões de contato funcionam e mantêm o contexto escolhido quando implementado.
- [ ] Nenhuma mensagem enviada automaticamente pelo clique.
- [ ] CTA de teste permanece indisponível sem certificação do fluxo.
- [ ] Preços e condições iguais ao catálogo e página de preços.
- [ ] Conteúdo/CMS não altera entitlement, billing ou dados do SaaS.
- [ ] Quatro produtos restantes mantêm seus estados públicos e páginas.
- [ ] Eventos, se implementados, distinguem clique, reprodução e trial realmente iniciado.

## Gates da alteração de código
- [ ] Lint, typecheck, testes de catálogo/CTA/governança e build.
- [ ] Exportação das duas rotas e regressão das demais páginas.
- [ ] Testes de mídia/teclado/links/estados de CTA conforme mudança.
- [ ] Revisão visual pelo Diretor e evidências de testes salvas.
- [ ] Commit, PR e instrução de rollback; publicação conforme autorização vigente.
- [ ] Smoke pós-publicação; sem declarar aprovação de capacidades não testadas.

## Relatório obrigatório do executor
Produto e release:
Branch, base e HEAD:
Arquivos alterados:
Afirmações/mídias aprovadas:
Testes realmente executados e resultados:
Testes não executados e motivo:
Disponibilidade de CTA antes/depois:
Pendências/responsáveis:
URL de preview e capturas:
Forma de reversão:

Entregar em GitHub. Não considerar concluído trabalho que exista somente em ambiente temporário. Não fazer merge ou iniciar integrações de produto por consequência de uma alteração editorial.
