# IRON FIT — M3 Core Web Parity

Status deste artefato: candidato de certificação M3.

## Autoridades

- Backend canônico: `faabio3131/iron-fit-backend`.
- Baseline de contratos usada no desenvolvimento: `2d6db81138e80907e4c62e318abf4cb2c3e2552b`.
- Web canônico: `faabio3131/fm-tecnologia-web-platform`.
- Fundação M2 já certificada antes deste bloco.

## Princípio

A Web é superfície operacional. Regras de negócio, RBAC, tenant, lifecycle, compatibilidade e autorização permanecem no backend.

O BFF `/api/iron-fit/core/[...path]`:

- possui allowlist explícita;
- nunca aceita `gymId` do navegador como autoridade;
- remove `gymId` de query e JSON body;
- mantém access token em cookie HttpOnly server-side;
- exige same-origin em mutações;
- sanitiza falhas do upstream;
- não expõe endpoint de scan físico.

## Superfícies implementadas

### Dashboard

Consome summary, revenue, attendance, overdue e birthdays do módulo canônico `dashboard`. Nenhum KPI é recalculado no browser.

### Alunos

Lista/cadastra alunos e atualiza consentimentos com o contrato `students`. O tenant vem exclusivamente da sessão autenticada.

### Avaliações

Consulta histórico por aluno e cria avaliações físicas pelo contrato `students/:studentId/assessments`.

### Treinos

Lista/cria treinos determinísticos e expõe a transição de status somente como comando humano autenticado. `createdByAI` e `approvedById` são exibidos para revisão. Não existe auto-activation Web.

### Agenda

Lista/cria slots, reserva alunos e registra check-in. Conflitos/capacidade continuam no Core.

### Comunicação

Lista mensagens e permite envio pelo módulo canônico `communication`.

### Acesso físico

Exibe somente fatos registrados em `access/events` e permite emissão governada de credenciais. O Web não recebe nem chama `access/scan` e jamais toma a decisão física de acesso.

### Financeiro do aluno

Exibe cobranças e permite contas, assinaturas do aluno, cobranças e pagamento conforme `financial`. Este domínio não é o billing SaaS comercial da FM Tecnologia.

## Lacuna canônica corrigida

O Core já persistia `AccessEvent`, mas não expunha histórico administrativo. O M3 adiciona ao backend uma leitura autenticada, tenant-scoped e read-only de até 200 eventos recentes, sem alterar a função `scan`, a chain-of-trust de dispositivo ou o cálculo de `allowed`.

## Segurança e regressão

`tests/iron-fit-m3-core-parity.test.ts` impede regressões de:

- ausência de superfícies M3;
- spoofing de `gymId` pelo navegador;
- bearer/token no browser;
- auto-activation de treino;
- decisão física de acesso pelo frontend;
- mistura entre financeiro do aluno e billing SaaS;
- remoção da navegação role-aware.

## Critério de promoção

M3 somente pode ser promovido após:

1. backend access-events branch/PR/post-merge 100% verdes;
2. Web branch CI 100% verde;
3. PR CI 100% verde;
4. mergeability limpa;
5. squash merge na linha de integração;
6. pós-merge CI 100% verde;
7. reconciliação e releitura da governança no Drive.
