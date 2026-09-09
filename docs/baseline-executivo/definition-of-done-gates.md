# Definition of Done e gates G0–G4

## Regra geral

Um gate só é aprovado quando todos os critérios aplicáveis têm evidência vinculada, os responsáveis definidos pela Fase 0 aprovam e não há `PENDENTE_EVIDENCIA` em campo obrigatório. Itens não aplicáveis exigem justificativa e aprovação no Decision Register. A aprovação documental não autoriza implementação.

Nenhum placar de readiness promove gate automaticamente. Enquanto a Fase 0 permanecer **NO-GO para programação definitiva**, nenhum gate pode ser tratado como autorização para programar.

## Definition of Done do Baseline Executivo

- [x] A Fase 0 v1.3 está identificada e referenciada como fonte de verdade documental.
- [x] Product Registry contém somente os seis produtos/tecnologias comprovados pela Fase 0.
- [ ] Cada produto registrado possui dossier e vínculos para seus contratos aplicáveis.
- [x] Nome canônico **Kordena** está consistente em todos os artefatos aplicáveis.
- [x] Pricing e regras de trial já aprovados na v1.3 foram refletidos sem convertê-los em certificação/homologação.
- [x] Arquitetura de IA está documentada como multi-provider/multi-modelo, sem provider exclusivo inferido.
- [ ] Ativos possuem origem, direitos de uso, integridade, estado e aprovação rastreáveis.
- [x] Decisões executivas aplicáveis possuem estado e evidência de origem.
- [ ] Contratos aplicáveis cobrem segurança, privacidade, isolamento, falhas, auditoria e aceite.
- [ ] Lacunas estão resolvidas ou formalmente bloqueadas; nenhuma lacuna foi mascarada.
- [ ] Aprovações e evidências de G0–G4 estão registradas.

## Gates

### G0 — Autoridade e escopo

**Objetivo:** confirmar a base documental antes de consolidar conteúdo.

- [x] Referência válida da Fase 0 v1.3 registrada.
- [x] Escopo e exclusões do Baseline confirmados.
- [ ] Responsáveis e aprovadores identificados integralmente.
- [x] Convenções de nomenclatura confirmadas, incluindo Kordena.
- [x] Lacunas registradas sem inferência.
- [x] Hierarquia Diretor → Arquitetura Mestre → Fase 0 v1.3 → Baseline preservada.

**Saída:** escopo documental autorizado, ou estado `bloqueado`/`PARTIAL` com motivos.

### G1 — Inventário e dossiers

**Objetivo:** comprovar o que compõe o baseline.

- [x] Product Registry validado contra a Fase 0 v1.3.
- [ ] Dossier de cada produto registrado revisado.
- [ ] Asset Manifest validado integralmente, inclusive incorporação ao repositório e direitos de uso.
- [ ] Dependências e documentos associados rastreáveis.
- [x] Estados de lifecycle/website/comercialização/trial/pricing/certificação permanecem independentes.

**Saída:** inventário completo, rastreável e sem itens inventados.

### G2 — Políticas e contratos

**Objetivo:** fechar regras e fronteiras documentais aplicáveis.

- [x] Existência de trial foi confirmada para Kordena e Iron Fit; inexistência comercial permanece para itens em desenvolvimento/P&D.
- [x] Duração/cartão foram confirmados para Kordena e Iron Fit; Iron Fit possui limite aprovado de 15 alunos.
- [x] Pricing-base foi aprovado para Kordena e Iron Fit e Enterprise está sob consulta.
- [ ] TrialPolicies detalhadas cobrem elegibilidade, antiabuso, expiração, conversão e entitlements.
- [ ] Contratos de integração, entitlement e provisionamento aplicáveis revisados.
- [ ] Identidade, isolamento organizacional, segurança e privacidade avaliados.
- [ ] AI Gateway/provider adapters, fallback, telemetria e FinOps possuem contratos/ADRs verificáveis.
- [ ] Estados, falhas, compatibilidade, auditoria e aceite definidos quando aplicáveis.

**Saída:** contratos aprovados ou bloqueios explícitos e rastreáveis.

### G3 — Consistência e verificabilidade

**Objetivo:** demonstrar consistência transversal do baseline.

- [ ] IDs, nomes, versões e referências são consistentes entre artefatos.
- [ ] Todo requisito possui origem e critério de aceite verificável.
- [ ] Cenários positivos, negativos, falhas e isolamento estão documentados.
- [ ] Divergências foram resolvidas via Decision Register.
- [ ] Não restam campos obrigatórios `PENDENTE_EVIDENCIA`.
- [ ] Metas FinOps possuem método de medição e alertas definidos.

**Saída:** pacote documental apto à aprovação executiva.

### G4 — Aprovação e congelamento do baseline

**Objetivo:** registrar a decisão executiva e controlar mudanças posteriores.

- [ ] Definition of Done integralmente atendida.
- [ ] Responsáveis da Fase 0 aprovaram os artefatos aplicáveis.
- [ ] Versões e data do baseline foram registradas.
- [ ] Riscos residuais e aceites estão documentados.
- [ ] Processo de mudança exige nova decisão, análise de impacto e reaprovação.

**Saída:** baseline documental aprovado e versionado. Implementação continua fora do escopo e depende de autorização separada.

## Readiness herdado da Fase 0 v1.3

A Fase 0 vigente registra **4 critérios RESOLVIDOS, 11 PARCIAIS e 3 ABERTOS**, com estado global **NO-GO para programação definitiva**. Fonte: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `262fb3fd65c35ae89520fd262386a07ea5d576fc`.

O avanço decorre de decisões executivas sobre domínio, trial, pricing, cadastro, aquisição, infraestrutura, legal/LGPD, suporte, institucional e arquitetura/FinOps de IA. Ele não substitui certificação, contratos, registro do domínio, assets, threat model, sitemap ou backlog.

| Readiness Fase 0 v1.3 | Relação rastreável com gates | Efeito permitido |
| --- | --- | --- |
| 4 resolvidos | Sustentam critérios individuais quando a evidência correspondente está vinculada | Não promove gate automaticamente |
| 11 parciais | Decisões existem, mas prova/contrato/ADR ainda é incompleto | Mantém gate em PARTIAL/BLOCKED |
| 3 abertos | Provisionamento/entitlement, threat model/NFRs e backlog continuam abertos | Bloqueiam qualquer PASS afetado |
| Status global NO-GO | Condiciona todo o Baseline | Proíbe programação definitiva e interpretação de gate como autorização de implementação |

## Reavaliação de passagem de gate

Estados permitidos: `PASS`, `PARTIAL` e `BLOCKED`. `PARTIAL` registra avanço comprovado sem liberar o gate.

| Gate | Estado reconciliado v1.3 | Evidência | Bloqueios restantes |
| --- | --- | --- | --- |
| G0 | PARTIAL (NO-GO) | Fase 0 v1.3 e hierarquia/decisões reconciliadas | Responsáveis/aprovadores completos e aprovação formal |
| G1 | PARTIAL (NO-GO) | Seis itens, grupos, labels, pricing/trial e governança de estados reconciliados | Dossiers completos, categorias, assets reais, direitos, dependências e evidências específicas |
| G2 | PARTIAL (NO-GO) | Trial/pricing-base, validações de cadastro, Vercel/AWS e princípio multi-provider/FinOps estão definidos | TrialPolicy detalhada; IdP; integração/entitlement/provisionamento; AI contracts/ADRs; segurança/privacidade |
| G3 | BLOCKED | Regras de consistência/precedência existem | Resolver campos obrigatórios, cenários, critérios de aceite e revisão transversal |
| G4 | BLOCKED | Processo e Definition of Done documentados | Conclusão de G0–G3, aprovações executivas, riscos residuais e versão final |

`PARTIAL` não equivale a `PASS` nem a GO. O estado global permanece **NO-GO para programação definitiva** e nenhum gate autoriza implementação.