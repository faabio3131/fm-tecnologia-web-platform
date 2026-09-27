# Refinamento de layout — 2026-09-14

Solicitação do Diretor: aplicar a compactação discutida após a análise dos
concorrentes, aproveitando a composição em duas colunas e os refinamentos de
cards, sem adotar claims, terminal fictício ou mudança de identidade.

Base: PR #4, branch `feat/site-dev001-foundation`, commit
`fc0622b1048d5ade9083edfec5044fd987832190`, árvore
`3562d7bb2b128bd92b1db6961c124d38ab5c7231`.
Snapshot local conferido pelo hash da árvore; não existem AGENTS.md nessa árvore.

## Alterações

- CSS próprio preservado; nenhuma dependência adicionada.
- Seções passam de 128 px por lado para escala de 32–56 px.
- Header de 78 para 68 px; rodapé e páginas internas compactados.
- Cards sem altura mínima de 380 px, sem iniciais decorativas e com selos flexíveis.
- Home em duas colunas com navegação real pelos seis produtos e seus estágios.
- Catálogo organizado em principais, desenvolvimento e P&D.
- Página de produto reúne resumo, ação consultiva e preços; remove duas seções
  redundantes e a grande chamada final repetida.
- Preços, regras de trial e condições de disponibilidade preservados.
- Descrições públicas deixam de expor linguagem de dossiê interno; nenhuma
  funcionalidade foi acrescentada ao catálogo.
- Botão do formulário ainda não operacional agora está explicitamente desabilitado.
- Foco visível, alvos de toque e preferência de redução de movimento preservados.

## Verificação anterior à atualização

`npm ci`, lint, build, typecheck, 15 testes existentes, verificação dos 14 HTMLs
exportados/canonicals/assets/sitemap/robots/404 e `git diff --check`: PASS.
A tentativa inicial `npm ci --offline` não encontrou um pacote no cache;
`npm ci` normal concluiu com o mesmo lockfile. Avisos do ambiente: http-proxy npm
não reconhecido e ESLint 9.34.0 sem suporte. Sem upgrade de dependências.

A política do navegador remoto bloqueia navegação file:// para a cópia local;
nenhum contorno foi tentado. Validação renderizada será feita no site público de
teste já autorizado após o build da Cloudflare. Antes da alteração, em viewport
1363 × 936, Kordena media 2063 px de conteúdo principal e 2524 px de documento.

## Escopo preservado

PR continua aberta e Draft, sem merge. Atualização limitada ao site de teste
pages.dev já publicado e conectado à branch pelo Diretor. Sem DNS/domínio próprio,
sem mudanças em outros SaaS, autenticação, integrações ou liberação de trial.
Visual permanece provisório até receber e validar os assets oficiais de marca.
DEV-002 não iniciada.

## Verificação após publicação

Commit de layout: `75f569533f20a891d972fa038405ea7be30949db`.
Cloudflare Pages reportou `success` e a URL pública passou a servir o novo layout.

- Inspeção visual desktop: início, catálogo, Kordena, preços e acesso.
- Demais páginas visitadas e presença de títulos/conteúdo conferida.
- Kordena em viewport 1363 × 936: conteúdo principal de 2063,125 para 490,922 px,
  redução aproximada de 76,2%. Todos os dados principais e preços visíveis juntos.
- Home: abertura de aproximadamente 498 px e atalhos para os seis produtos.
- Export: 14 páginas com h1 único e 411 referências internas resolvidas.
- Link do mapa do ecossistema navega para Kordena e mostra condições comerciais.
- Botões de contato e acesso continuam desabilitados, sem funcionalidade simulada.
- Ajuste adicional no destino do skip link: tabIndex=-1 para receber foco.

Limite da validação: viewport móvel, zoom de 200% e preferência de redução de
movimento não foram emulados com sucesso pela interface disponível. Regras
responsivas foram revistas no código, mas não equivalem a certificação visual
móvel. Não se declara aprovação completa de acessibilidade. Assets oficiais
continuam pendentes. Erros de console observados pertenciam à extensão do
navegador, não foram atribuídos ao aplicativo.
