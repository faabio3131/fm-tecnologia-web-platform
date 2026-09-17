# Preparação de exportação estática — 2026-09-14

Base remota: PR #4, `feat/site-dev001-foundation`, commit
`6c9b7d66181db32f7d5ca3ff1bbd2049b2d4a584`.

O Diretor solicitou preparar e testar as configurações para Cloudflare Pages.
A decisão posterior de domínio é `fmtecnologiaia.com.br`, registrado pelo Diretor
segundo seu relato e screenshots; substitui `fmtecnologia.ai` na configuração.
Não comprova ativação DNS, HTTPS, titularidade verificada externamente ou deploy.
PR #1 e PR #2 não foram alteradas; suas referências antigas de domínio ainda
precisam de reconciliação documental em tarefa própria.

## Configuração candidata de hospedagem

- Framework: Next.js (Static HTML Export).
- Build: `npm run build`.
- Diretório de saída: `out`.
- Diretório raiz: raiz do repositório.
- Branch contendo esta preparação: `feat/site-dev001-foundation`, não `main`.
- Runtime testado: Node 24.19.0, npm 11.9.0. O packageManager declara npm 11.4.2;
  essa versão exata não foi usada nesta verificação.
- Não exige credenciais ou variáveis secretas para este build.
- `NEXT_PUBLIC_SITE_URL`, se definido, substitui o domínio padrão durante o build.
- `npm start` executa `next start` e não é o servidor de um export estático.
  A hospedagem deve servir os arquivos de `out`.

Esses valores não autorizam publicação. Confirmar branch e escopo de publicação
antes de Save and Deploy. URLs pages.dev não são privadas por padrão.

## Evidência local

- Instalação limpa: `npm ci --offline` passou usando o cache existente.
- Lint, typecheck e `npm test`: passaram; 15 testes, zero falhas.
- `npm run build`: passou com exportação física para `out`.
- `node --experimental-strip-types tests/export-check.mjs`: passou; 14 páginas
  públicas, seus canonicals, referências locais a assets, sitemap, robots e 404.
- `npm audit --json`: zero vulnerabilidades reportadas.
- Avisos: ESLint 9.34.0 sem suporte; configuração http-proxy do ambiente npm
  marcada como desconhecida. Sem alteração de versões ou lockfile nesta etapa.
- Sem teste visual renderizado nesta etapa; sem teste do runtime Cloudflare.

## Limites preservados

Sem alteração visual, SaaS, banco, migrations, credenciais, merge ou deploy.
Conta, formulário de contato e trial não se tornam operacionais pela exportação.
Identidade oficial e certificação visual continuam pendentes; GO-16 não promovido.
DEV-002 não iniciada. PR #4 deve permanecer aberta e Draft.
