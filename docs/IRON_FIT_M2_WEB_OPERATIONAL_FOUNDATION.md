# IRON FIT — M2 Web Operational Foundation

Status do documento: implementação M2 em certificação.

## Escopo

M2 cria somente a fundação operacional Web: autenticação, sessão, seleção multi-tenant governada pelo backend, namespace protegido `/app/iron-fit/*`, shell responsivo, estados de sessão e hardening frontend. M3 continua responsável pelos módulos operacionais de negócio.

## Autoridades

- Backend canônico: `faabio3131/iron-fit-backend`.
- Contratos utilizados: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me`.
- O frontend nunca determina tenant, roles ou permissions como autoridade. `gymId` é apenas uma seleção solicitada no login e o backend valida membership/tenant antes de emitir sessão.
- RBAC na Web serve somente à experiência; o backend continua responsável pela autorização.

## Fronteira BFF e sessão

O navegador fala apenas com `/api/iron-fit/auth/*` da mesma origem. A URL do backend usa a variável server-only `IRON_FIT_API_URL`; não existe `NEXT_PUBLIC_*` para esse contrato.

Tokens retornados pelo backend nunca são devolvidos ao JavaScript do navegador. O BFF grava:

- `iron_fit_access`: cookie HttpOnly de sessão;
- `iron_fit_refresh`: cookie HttpOnly, SameSite=Lax, Secure em produção, máximo de 30 dias alinhado ao TTL de refresh do backend.

Refresh rotaciona os dois cookies. Logout tenta revogar a sessão no backend e sempre limpa os cookies do navegador.

## Multi-tenant

Quando `/auth/login` retorna `requires_tenant_selection=true`, a Web apresenta exclusivamente a lista `tenants` recebida do backend. A senha permanece apenas no estado em memória do formulário e o login é reenviado com o `gymId` selecionado. Nenhum tenant é persistido como autoridade no browser.

## Shell e proteção de rota

`middleware.ts` protege `/app/iron-fit/:path*` pela presença do cookie como gate de UX. Isso não substitui validação real: o shell chama `/api/iron-fit/auth/session`, que consulta `GET /auth/me` no backend. Em 401 tenta refresh uma vez e então redireciona para `/entrar` se a sessão não puder ser recuperada.

A área autenticada recebe chrome próprio e não herda Header/Footer comercial. O shell contém somente a visão de fundação M2; Dashboard, Alunos, Avaliações, Treinos, Agenda, Acesso e Financeiro pertencem ao M3 e não são antecipados.

## Segurança Web

- ausência de access/refresh token em `localStorage` ou `sessionStorage`;
- cookies HttpOnly/SameSite e Secure em produção;
- same-origin check em mutações de autenticação;
- CSP, `frame-ancestors 'none'`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`;
- erros de upstream sanitizados;
- dependency audit high no CI;
- área autenticada com `robots: noindex,nofollow`.

## Mudança necessária de runtime

O site estava em `output: "export"`, incompatível com BFF e cookies HttpOnly server-side. M2 remove o static export e mantém a landing pública dentro do mesmo Next.js server runtime. A cobertura anterior de HTML não foi removida: os smoke tests agora executam contra `next start` após o production build e continuam verificando canonicals, assets, slogan, portfólio, sitemap, robots, 404, Kordena e IRON FIT.

## Quality gate M2

Obrigatório antes da promoção:

1. `npm ci`;
2. `npm audit --audit-level=high`;
3. lint;
4. typecheck;
5. testes permanentes, incluindo `iron-fit-m2-foundation.test.ts`;
6. production build;
7. runtime smoke contra `next start`;
8. branch CI verde;
9. PR CI verde;
10. mergeability clean;
11. squash na linha de integração Web;
12. CI pós-merge verde;
13. reconciliação e readback na Ordem Mestre.
