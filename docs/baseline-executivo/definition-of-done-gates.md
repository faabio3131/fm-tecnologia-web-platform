# Definition of Done e gates G0–G4

## Regra geral

Um gate só é aprovado quando todos os critérios aplicáveis têm evidência vinculada, os responsáveis definidos pela Fase 0 aprovam e não há `PENDENTE_EVIDENCIA` em campo obrigatório. Itens não aplicáveis exigem justificativa e aprovação no Decision Register. A aprovação documental não autoriza implementação.

Nenhum placar de readiness promove gate automaticamente. Enquanto a Fase 0 permanecer **NO-GO para programação definitiva**, nenhum gate pode ser tratado como autorização para programar.

## Definition of Done do Baseline Executivo

- [x] A Fase 0 está identificada e referenciada como fonte de verdade documental.
- [x] Product Registry contém somente os seis produtos/tecnologias comprovados pela Fase 0.
- [ ] Cada produto registrado possui dossier e vínculos para seus contratos aplicáveis.
- [x] Nome canônico **Kordena** está consistente em todos os artefatos aplicáveis.
- [x] Preços, trials, provedores e integrações não foram presumidos.
- [ ] Ativos possuem origem, direitos de uso, integridade, estado e aprovação rastreáveis.
- [x] Decisões executivas aplicáveis possuem responsável, evidência e estado.
- [ ] Contratos aplicáveis cobrem segurança, privacidade, isolamento, falhas, auditoria e aceite.
- [ ] Lacunas estão resolvidas ou formalmente bloqueadas; nenhuma lacuna foi mascarada.
- [ ] Aprovações e evidências de G0–G4 estão registradas.

## Gates

### G0 — Autoridade e escopo

**Objetivo:** confirmar a base documental antes de consolidar conteúdo.

- [x] Referência válida da Fase 0 registrada.
- [x] Escopo e exclusões do Baseline confirmados.
- [ ] Responsáveis e aprovadores identificados.
- [x] Convenções de nomenclatura confirmadas, incluindo Kordena.
- [x] Lacunas iniciais registradas sem inferência.

**Saída:** escopo documental autorizado, ou estado `bloqueado` com motivos.

### G1 — Inventário e dossiers

**Objetivo:** comprovar o que compõe o baseline.

- [x] Product Registry validado contra a Fase 0.
- [ ] Dossier de cada produto registrado revisado.
- [ ] Asset Manifest validado integralmente, inclusive incorporação ao repositório e direitos de uso.
- [ ] Dependências e documentos associados rastreáveis.

**Saída:** inventário completo, rastreável e sem itens inventados.

### G2 — Políticas e contratos

**Objetivo:** fechar regras e fronteiras documentais aplicáveis.

- [ ] Existência ou inexistência de trial confirmada antes de aprovar TrialPolicy.
- [ ] Contratos de integração, entitlement e provisionamento aplicáveis revisados.
- [ ] Identidade, isolamento organizacional, segurança e privacidade avaliados.
- [ ] Estados, falhas, compatibilidade, auditoria e aceite definidos quando aplicáveis.

**Saída:** contratos aprovados ou bloqueios explícitos e rastreáveis.

### G3 — Consistência e verificabilidade

**Objetivo:** demonstrar consistência transversal do baseline.

- [ ] IDs, nomes, versões e referências são consistentes entre artefatos.
- [ ] Todo requisito possui origem e critério de aceite verificável.
- [ ] Cenários positivos, negativos, falhas e isolamento estão documentados.
- [ ] Divergências foram resolvidas via Decision Register.
- [ ] Não restam campos obrigatórios `PENDENTE_EVIDENCIA`.

**Saída:** pacote documental apto à aprovação executiva.

### G4 — Aprovação e congelamento do baseline

**Objetivo:** registrar a decisão executiva e controlar mudanças posteriores.

- [ ] Definition of Done integralmente atendida.
- [ ] Responsáveis da Fase 0 aprovaram os artefatos aplicáveis.
- [ ] Versões e data do baseline foram registradas.
- [ ] Riscos residuais e aceites estão documentados.
- [ ] Processo de mudança exige nova decisão, análise de impacto e reaprovação.

**Saída:** baseline documental aprovado e versionado. Implementação continua fora do escopo e depende de autorização separada.

## Readiness herdado da Fase 0 v1.2

A Fase 0 vigente registra **3 critérios resolvidos, 5 parciais e 10 abertos**, com estado global **NO-GO para programação definitiva**. Fonte: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `6b923ce320d415a4dec5cc3eadd4dc92cb6bbb01`.

Esse placar não possui equivalência automática com G0–G4. A rastreabilidade abaixo indica somente como o readiness condiciona a avaliação; cada gate conserva seus próprios critérios e exige evidência formal:

| Readiness Fase 0 v1.2 | Relação rastreável com gates | Efeito permitido |
| --- | --- | --- |
| 3 resolvidos | Podem sustentar critérios individuais de G0/G1 quando a evidência correspondente for vinculada | Não promove gate automaticamente |
| 5 parciais | Indicam evidência incompleta a ser reconciliada principalmente em G0–G3 | Mantém o critério e o gate em NO-GO |
| 10 abertos | Representam lacunas a mapear nos artefatos e contratos de G1–G4 | Bloqueiam qualquer `PASS` afetado |
| Status global NO-GO | Condiciona todo o Baseline | Proíbe programação definitiva e qualquer interpretação de gate como autorização de implementação |

A validação cruzada da Fase 0 v1.2 com os dez documentos do Baseline confirma a autoridade e o inventário, mas não resolve os campos `PENDENTE_EVIDENCIA`, os dossiers, contratos, assets ou aprovações ainda ausentes.

## Reavaliação de passagem de gate

Estados permitidos: `PASS`, `PARTIAL` e `BLOCKED`. `PARTIAL` registra avanço comprovado sem liberar o gate; nenhum gate abaixo está liberado.

| Gate | Estado anterior | Estado reconciliado | Evidência | Bloqueios restantes |
| --- | --- | --- | --- | --- |
| G0 | BLOCKED | PARTIAL (NO-GO) | Fase 0 v1.2 validada; DEC-04, DEC-15 a DEC-21 registram nomenclatura, escopo, portfólio, governança e autoridade | Identificar responsáveis e aprovadores; obter aprovação formal do gate |
| G1 | BLOCKED | PARTIAL (NO-GO) | DEC-15 a DEC-20 sustentam seis itens, grupos e estados; Product Registry foi reconciliado | Dossiers completos; categorias; assets reais incorporados, direitos e aprovações; dependências e demais evidências específicas |
| G2 | BLOCKED | BLOCKED | DEC-19 preserva a separação entre estados e os templates documentam fronteiras sem inventar políticas | Políticas por produto; certificação; interfaces, entitlements e provisionamento reais aprovados |
| G3 | BLOCKED | BLOCKED | DEC-19 e DEC-21 governam consistência e precedência; templates possuem campos verificáveis | Resolver campos obrigatórios `PENDENTE_EVIDENCIA`; cenários e critérios de aceite; revisão transversal |
| G4 | BLOCKED | BLOCKED | Processo e Definition of Done estão documentados | Conclusão de G0–G3; aprovações executivas; riscos residuais; versão final do baseline |

`PARTIAL` não equivale a `PASS` nem a GO. O estado global permanece **NO-GO para programação definitiva** e nenhum gate autoriza implementação.
