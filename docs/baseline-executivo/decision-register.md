# Decision Register

## Regras

- Registre decisões antes de refletir seus efeitos nos demais artefatos.
- Vincule toda decisão à evidência da Fase 0 ou marque-a como bloqueada/parcial.
- Não use este registro para criar fatos comerciais ausentes da autoridade superior.
- Decisões substituídas permanecem no histórico e apontam para a sucessora.
- IDs `DEC-*` abaixo são canônicos e herdados da **Fase 0 v1.3**; não devem ser renumerados localmente.
- Uma decisão comercial aprovada não deve ser confundida com certificação, homologação ou contrato técnico concluído.

## Autoridade

`Diretor → Arquitetura Mestre → Fase 0 v1.3 → Baseline Executivo`

Fonte consolidada: `docs/FASE_0_INVENTARIO_E_READINESS.md`, commit `34a71f5886ebfaf278be106205284f14eba54664`, branch `docs/fase-0-inventario-readiness`.

## Estados

`proposta` · `aprovada` · `parcial` · `rejeitada` · `substituida` · `bloqueada`

## Decisões canônicas aplicáveis ao Baseline

| ID | Data | Tema | Decisão | Origem/evidência | Responsável | Estado | Impacta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DEC-02 | 2026-09-08 | Domínio | `fmtecnologia.ai` é o domínio escolhido; compra/registro/titularidade e mapa de subdomínios ainda precisam ser concluídos. | Fase 0 v1.3, seções 9 e 12 | Diretor/Técnico | parcial | Domínio, DNS, URLs, infraestrutura |
| DEC-04 | 2026-09-08 | Nomenclatura | Kordena é o nome canônico; “Coordena” é nomenclatura antiga/erro documental. | Fase 0 v1.3, seção 12 | Diretor/Marca/Produto | aprovada | Registros, páginas e dossiers |
| DEC-07 | 2026-09-08 | Trial | Kordena: 30 dias sem cartão. Iron Fit: 30 dias sem cartão, máximo 15 alunos. Contratos de elegibilidade/antiabuso/expiração ainda precisam ser fechados. | Fase 0 v1.3, seções 4, 5, 6, 11 e 12 | Diretor/Produto/Comercial/Risco | parcial | Registry, TrialPolicy, onboarding, entitlement |
| DEC-08 | 2026-09-08 | Pricing | Kordena: R$ 299/mês ou R$ 2.990/ano. Iron Fit: R$ 269/mês ou R$ 2.690/ano. Enterprise: sob consulta. | Fase 0 v1.3, seções 4, 5 e 12 | Diretor/Comercial/Financeiro | aprovada | Registry, páginas de preço, dossiers, billing futuro |
| DEC-09 | 2026-09-08 | Identidade visual | Connected Modular refinado v1.0, Brand Baseline v1.0, paleta, tipografia, tokens e dark/light aprovados; incorporação ao repositório permanece pendente. | Fase 0 v1.3, seção 12 | Diretor/Design | aprovada | Asset Manifest, futura experiência visual |
| DEC-11 | 2026-09-08 | Conta FM / dados | E-mail e WhatsApp devem ser validados antes de efetivar a conta; IdP, MFA, sessão, recovery, federação e data map permanecem pendentes. | Fase 0 v1.3, seções 2, 5, 6 e 12 | Diretor/Arquitetura/Segurança/Legal | parcial | Conta FM, identidade, cadastro, consentimentos |
| DEC-12 | 2026-09-08 | Suporte | Atendimento via WhatsApp + e-mail com automação 24/7; não prometer humano 24/7. SLA, owner, escalonamento e ferramenta permanecem pendentes. | Fase 0 v1.3, seções 2, 10 e 12 | Diretor/Operações/Comercial | parcial | Suporte, Help Center, copy comercial |
| DEC-13 | 2026-09-08 | Stack / hosting | Next.js/Vercel para a camada Web + AWS para núcleo comercial, Conta FM e provisionamento. Serviços, regiões, ambientes e ADRs ainda precisam ser fechados. | Fase 0 v1.3, seções 2, 10, 12 e 15 | Diretor/Arquitetura/Operações | parcial | Infra, deployment, NFRs, custos |
| DEC-14 | 2026-09-08 | Integração SaaS | SaaS permanecem isolados por contratos/adapters; contratos concretos de SSO, provisionamento, entitlement e eventos ainda são necessários. | Fase 0 v1.3, seções 7, 10 e 12 | Diretor/Arquitetura/Times de Produto | parcial | Integration/Provisioning/Entitlement Contracts |
| DEC-15 | 2026-09-08 | Portfólio | Portfólio inicial: Kordena, Iron Fit, Vendedor IA, CampaIA, Super Core Extreme e ERP Core. | Fase 0 v1.3, seções 4 e 12 | Diretor | aprovada | Product Registry; Home; Marketplace |
| DEC-16 | 2026-09-08 | Visibilidade | Vendedor IA, CampaIA e ERP Core serão públicos como **“Em desenvolvimento · Em breve”**, sem disponibilidade comercial. | Fase 0 v1.3, seções 2, 4 e 12 | Diretor/Produto/Marketing | aprovada | Registry; Home; Marketplace |
| DEC-17 | 2026-09-08 | Prioridade | Kordena e Iron Fit são Produtos Principais com destaque na Home/Marketplace; prioridade não comprova homologação/certificação. | Fase 0 v1.3, seções 2, 4 e 12 | Diretor/Produto | aprovada | Registry; Home; Marketplace; dossiers |
| DEC-18 | 2026-09-08 | Posicionamento | Super Core Extreme será público como **“Tecnologia & P&D · Em desenvolvimento”**, sem ser tratado como SaaS comercial disponível. | Fase 0 v1.3, seções 2, 4 e 12 | Diretor/Produto | aprovada | Registry; Home; Marketplace; dossier |
| DEC-19 | 2026-09-08 | Governança | Portfólio, lifecycle, website, prontidão, certificação, comercialização, trial, pricing e homologação são dimensões independentes. | Fase 0 v1.3, seções 2, 4 e 12 | Diretor/Produto/Arquitetura | aprovada | Registry; políticas; contratos; gates |
| DEC-20 | 2026-09-08 | Organização do site | Home/Marketplace usarão Produtos Principais, O que estamos construindo e Tecnologia & P&D. | Fase 0 v1.3, seções 2, 5 e 12 | Diretor/Produto/Marketing | aprovada | Home; Marketplace; Registry |
| DEC-21 | 2026-09-08 | Autoridade | Hierarquia: Diretor → Arquitetura Mestre → Fase 0 v1.3 → Baseline Executivo; divergências devem ser reconciliadas antes da programação. | Fase 0 v1.3, seções 1 e 12 | Diretor/Arquitetura | aprovada | Todos os artefatos |
| DEC-22 | 2026-09-08 | Aquisição | Modelo híbrido: autosserviço para trial + fluxo consultivo para clientes maiores/Enterprise. | Fase 0 v1.3, seções 2, 5 e 12 | Diretor/Comercial/Produto | aprovada | Home, CTAs, CRM, jornadas |
| DEC-23 | 2026-09-08 | Legal/LGPD | Preparar estrutura legal/LGPD agora; razão social, CNPJ e dados formais entram após abertura da empresa. | Fase 0 v1.3, seções 2, 10 e 12 | Diretor/Legal/Segurança | parcial | Legal, Trust, dados, rodapé, cadastro |
| DEC-24 | 2026-09-08 | Institucional | Site centrado na empresa, missão e valores; sem página pessoal do fundador. | Fase 0 v1.3, seções 2, 5 e 12 | Diretor/Marca/Marketing | aprovada | Empresa, Home, sitemap, conteúdo |
| DEC-25 | 2026-09-08 | Arquitetura de IA | Site e produtos permanecem multi-provider/multi-modelo, provider-agnostic; AI Gateway/adapters, segredos no backend e fallback governado são princípios obrigatórios. | Fase 0 v1.3, seções 2, 3, 7, 10, 12 e 15 | Diretor/Arquitetura | aprovada | Integração, segurança, observabilidade, AI adapters |
| DEC-26 | 2026-09-08 | FinOps | Medir custo por tenant/produto/tarefa/provider/modelo. Kordena: alvo ≤ R$ 50/mês e atenção R$ 75. Iron Fit: alvo ≤ R$ 45/mês e atenção R$ 67. | Fase 0 v1.3, seções 2, 7, 12 e 14 | Diretor/Arquitetura/Financeiro | aprovada | FinOps, observabilidade, roteamento, alertas |

## Regras de interpretação da v1.3

1. `DEC-07` autoriza registrar duração/cartão e o limite de 15 alunos do Iron Fit, mas não permite inventar antiabuso, grace period ou entitlements.
2. `DEC-08` autoriza registrar os preços aprovados, sem inferir gateway, impostos, meios de pagamento ou disponibilidade comercial final.
3. `DEC-13` não congela serviços AWS específicos nem substitui ADRs.
4. `DEC-25` não fixa uma lista exclusiva de providers. Google API pode ser uso atual no ecossistema, mas não é dependência exclusiva.
5. `DEC-26` define metas de engenharia financeira, não promessa de lucro líquido.

## Aliases históricos removidos da camada vigente

Os identificadores locais `D-001` a `D-008` usados na primeira versão do Baseline não são autoridades paralelas e permanecem substituídos pelas referências canônicas `DEC-*`.

## Modelo de nova decisão específica do Baseline

| ID | Data | Tema | Decisão | Origem/evidência | Responsável | Estado | Substitui/impacta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `BASE-DEC-NNN` | `AAAA-MM-DD` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `PENDENTE_EVIDENCIA` | `proposta` | `PENDENTE_EVIDENCIA` |