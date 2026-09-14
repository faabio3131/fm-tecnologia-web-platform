# Plano de continuidade funcional — FM Tecnologia

Versão 1.0 · 14/09/2026 · Revisão e planejamento concluídos; execução funcional ainda não iniciada.

## 1. Escopo e autoridade

Pedido atual: revisar a Arquitetura Mestre, identificar funcionalidades pendentes e definir a sequência de implementação. Preservar o visual aprovado para testes; explorar outras cores/visuais somente depois das funcionalidades completas.

Hierarquia: Diretor → Arquitetura Mestre → Fase 0 → Baseline Executivo. Este plano é uma proposta executiva rastreável; não substitui as autoridades nem declara gates técnicos aprovados.

Fontes efetivamente consultadas:
- [Arquitetura Mestre v1.0, 7 páginas](https://drive.google.com/file/d/17mpNXMvJNZFzPqVwDkR6rTa4uBHc519x/view): seções 4, 12–30, 34–41 e anexos.
- [Fase 0 v1.3](https://github.com/faabio3131/fm-tecnologia-web-platform/blob/262fb3fd65c35ae89520fd262386a07ea5d576fc/docs/FASE_0_INVENTARIO_E_READINESS.md): requisitos, decisões, blocos de execução, GO/NO-GO.
- [Decision Register](https://github.com/faabio3131/fm-tecnologia-web-platform/blob/32d615bbce96118b11781c428ebfa29c312c044d/docs/baseline-executivo/decision-register.md) e Definition of Done G0–G4 da mesma revisão.
- Templates de Product Integration, Provisioning e Entitlement da mesma revisão: ainda não são contratos concretos de produto.
- Código e árvore completos inventariados em ef11b695c0cac664c4b3b3d2907ca25b33aa1a32; leitura dirigida de autenticação, catálogo, integrações, configuração e Recursos.
- Decisões e testes manuais relatados pelo Diretor nesta conversa em 14/09/2026.

Não foram auditados nesta revisão os repositórios operacionais dos SaaS. Não se presume endpoint, disponibilidade, contrato ou certificação deles.

## 2. Estado real

| Capacidade | Evidência | Estado |
| --- | --- | --- |
| Site público, navegação, catálogo, preços | Código publicado na Cloudflare Pages; seis itens no catálogo | Fundação implementada |
| Visual atual | Diretor aprovou manutenção provisória; celular por screenshots e tablet por relato | Aceito para testes, sem redesenho nesta etapa |
| Menu móvel e cabeçalho | ef11b69; Cloudflare success; usuário respondeu “Ficou bom” após reteste | Correção aceita pelo usuário; não equivale a auditoria completa de acessibilidade |
| Contato por WhatsApp | Link para 5511978350851 testado pelo usuário | Direcionamento confirmado; identidade do perfil será ajustada pelo Diretor |
| Contato por e-mail | mailto para fmtecnologia.comercial@gmail.com; destinatário confirmado | Direcionamento confirmado; entrega de mensagem não testada |
| Cadastro e login | /entrar exibe botão desabilitado; nenhuma rota de cadastro na árvore | Não implementados |
| Identidade e organizações | Nenhum backend correspondente na árvore | Não implementados |
| Trial e acesso aos SaaS | Catálogo mantém liberação pendente; integrações contém somente README | Não implementados |
| Billing, CRM, automação, CMS, administração | Nenhum módulo executável correspondente na árvore | Não implementados |
| Recursos/demos | Página de Recursos em construção; sem evidência de mídia real integrada | Pendente |
| Domínio próprio | Configuração usa fmtecnologiaia.com.br; usuário informou registro no Registro.br | Registro informado; DNS, TLS e vínculo ao site não verificados nesta revisão |

Build/deploy bem-sucedido não certifica entrega de e-mail, segurança de autenticação, isolamento, pagamento ou integração dos produtos. Aceite visual não encerra automaticamente DEV-001R/G0–G4. Não repetir como placar atual os 18 critérios históricos sem reavaliação item a item.

## 3. Reconciliações necessárias

| Referência anterior | Decisão/evidência posterior | Tratamento |
| --- | --- | --- |
| DEC-02: fmtecnologia.ai | Código usa fmtecnologiaia.com.br; domínio informado como registrado pelo Diretor | Registrar sucessão documental, verificar domínio e definir URLs de conta/API/callbacks |
| DEC-13: Next.js/Vercel + núcleo AWS | Site está em Next.js com exportação estática na Cloudflare Pages | Cloudflare é a hospedagem atual da Web; não inferir migração do núcleo AWS nem contratar serviços sem ADR |
| DEC-09: identidade oficial | Visual atual explicitamente aceito para testes | Preservar visual; assets finais e evolução de marca ficam em trilha posterior |
| DEC-12: automação de suporte | Gmail e link de WhatsApp aprovados/testados | Não confundir contato manual com automação 24/7 ou entrega de códigos |
| DEC-11: validar e-mail e WhatsApp | Regra não foi revogada | Conta só se torna plenamente ativa após ambas as validações reais |
| GO-16: /produtos ou /marketplace | /produtos funciona e foi testado, mas configuração continua candidata | Recomendar manter /produtos; formalização ainda pendente |

As revisões antigas permanecem históricas. Este registro explicita o delta; a consolidação formal da Fase 0/Baseline é uma entrega inicial do próximo bloco, sem alterar silenciosamente PRs #1/#2.

## 4. Sequência proposta e critérios de aceite

Os IDs PF abaixo identificam tarefas deste plano. Não renumeram fases oficiais nem significam que DEV-002 já começou.

| Ordem | Entrega | Dependências e saída verificável | Origem |
| --- | --- | --- | --- |
| PF-00 | Fechar preparação técnica e documental | Reavaliar DEV-001R; reconciliar decisões; definir serviços, identidade, dados, ambientes, responsáveis e contratos; selecionar primeiro produto piloto por evidências | Mestre 35/40; Fase 0 blocos 0–5, GO-10/11/14/15/17 |
| PF-01 | Conteúdo de produto, demos, SEO e operação editorial | Dossiês e mídias reais aprovados; FAQ, benefícios e workflows comprováveis; CMS com preview/versionamento sem autoridade sobre permissões; publicar/reverter conteúdo e medir peso de mídia | Mestre fase 2; Fase 0 blocos 7/8 |
| PF-02 | Fundação do núcleo comercial e segurança | BFF/API, persistência, ambientes separados, migrations, logs, secrets e CI; testes de autorização e isolamento; site público preservado se API falhar | Mestre 25/27–30/35–37; Fase 0 blocos 4/5 |
| PF-03 | Conta FM | Cadastro, verificações de e-mail e WhatsApp, login/logout, recuperação, sessão, MFA conforme política; organização/membership/papéis e consentimentos | Mestre 14/15/26; DEC-11; bloco 9 |
| PF-04 | Integração do primeiro produto | Contratos reais de identidade, referência de tenant, provisionamento e direitos; adapter com consulta/reconciliação, idempotência, retries e compensação | Mestre 15/27/41; DEC-14; bloco 10 |
| PF-05 | Trial, onboarding e acesso inicial | Fluxo completo para produto aprovado; retomada, limites, expiração e falhas; painel mínimo “meus produtos” e status real do provisionamento | Mestre 12/13/18; blocos 10/14 |
| PF-06 | Assinaturas e cobrança | Provedor selecionado e sandbox; catálogo financeiro versionado, checkout, webhooks assinados, cancelamento/alteração e reconciliação | Mestre 16/17; bloco 11 |
| PF-07 | CRM, notificações e automações | Origem dos leads, fluxo Enterprise, eventos de ativação, avisos de trial, métricas e consentimentos; mensagens reais só nos canais autorizados | Mestre 19–21; bloco 12 |
| PF-08 | Área do cliente, administração, suporte e confiança | Autogestão, permissões internas, auditoria, Help Center, políticas e operação Enterprise; ações sensíveis com reautenticação/confirmacão | Mestre 25/26/34; blocos 13/14 |
| PF-09 | Certificação e lançamento controlado | Jornada ponta a ponta, segurança, carga, acessibilidade, recuperação/rollback, alertas, custos e suporte testados; liberação por produto | Mestre 35–39/43; bloco 15 |
| PF-10 | Expansão e IA futura | Repetir contrato de entrada para novos produtos; automação e IA por adapters, com medição e governança | Mestre fase 7 e seção 42; DEC-25/26 |

PF-01 pode avançar em paralelo à preparação do backend quando houver material validado. A arquitetura oficial coloca demos/SEO/CMS antes de Conta FM; este plano preserva essa trilha, sem fazer de um vídeo ausente motivo para impedir a especificação técnica da identidade.

Segurança, privacidade, observabilidade e suporte mínimo começam em PF-00/PF-02; não ficam adiados para PF-08. O painel mínimo de acesso entra no trial, enquanto autogestão ampla e administração entram depois. A implementação e liberação de cada bloco dependem das evidências e gates aplicáveis.

## 5. Primeiro pacote concreto: PF-00

| Item | Artefato a produzir | Decisões/dados a fechar |
| --- | --- | --- |
| PF-00.1 | Registro consolidado das decisões de 14/09 e matriz atual de readiness | Domínio, Cloudflare, visual provisório, canais e evidências; preservar pendências técnicas reais |
| PF-00.2 | ADR de Web/BFF/core e ambientes | Manter Web pública na Cloudflare; definir integração com núcleo, serviços/região, custos e rollback; AWS segue direção anterior até decisão expressa |
| PF-00.3 | ADR de identidade e notificações | IdP, sessão, MFA/recovery, provedor de e-mail transacional e API de WhatsApp; comparação e custos antes da escolha |
| PF-00.4 | Modelo de dados e mapa de privacidade | User, Organization, Membership, Consent, ProductTenantRef, Trial, Entitlement, Subscription e AuditEvent; ownership e retenção |
| PF-00.5 | Threat model e requisitos operacionais | Roubo de sessão, enumeração, abuso de códigos, spoofing de tenant, vazamento entre empresas, webhooks/replay, backups e limites |
| PF-00.6 | Dossiê técnico do piloto e contratos reais | Referência de release, ambiente, owner e APIs existentes de Kordena/Iron Fit; selecionar primeiro piloto pela prontidão demonstrada |
| PF-00.7 | Backlog executável de PF-02/PF-03 | Tarefas por componente, contratos versionados, critérios/testes e dependências; estimativas após decisões técnicas |

Responsabilidades propostas: Diretor decide produto/negócio/orçamento e aprova; engenharia elabora contratos, ADRs e evidências; responsáveis pelos produtos comprovam interfaces e release; revisão especializada de privacidade/financeiro conforme aplicável. Nomes/owners ausentes devem ser preenchidos, nunca simulados.

Não escolher IdP, pagamento, CMS ou serviço AWS por suposição. O e-mail Gmail aprovado pode continuar como contato comercial; ele não demonstra a existência de serviço automatizado para confirmação/recuperação. O link wa.me também não demonstra capacidade de enviar e validar códigos.

O site estático atual não contém o núcleo de autenticação/trial. Proposta: manter sua disponibilidade pública e conectar as novas jornadas a um backend protegido, conforme os contratos oficiais. Definir hospedagem da área autenticada/callbacks no ADR, sem introduzir endpoints fictícios.

## 6. Matriz mínima de testes funcionais

| Jornada | Cenários que devem passar |
| --- | --- |
| Cadastro/verificação | Dados válidos/inválidos; duplicidade; uma verificação faltando; código incorreto/expirado/reutilizado; reenvio limitado; falha do canal; retomada; nenhuma ativação incompleta |
| Login/sessão | Credencial inválida; rate limit; expiração; logout; recuperação; sessão revogada; MFA/recovery conforme política; acesso direto à rota protegida |
| Organização e acesso | Usuário A não lê/altera empresa B; trocar ID/URL/header não altera autoridade; revogar membership impede acesso; troca de organização preserva escopo |
| Provisionamento | Sucesso, clique duplo, requisições concorrentes, timeout após sucesso remoto, retry, falha parcial, compensação e reconciliação sem tenant duplicado |
| Trial/onboarding | Elegibilidade; início/fim por relógio do servidor; limites aplicados no SaaS; expiração; retomada; falha de integração sem falso sucesso; produto indisponível não ativável |
| Billing | Webhook válido/inválido, replay, duplicidade e fora de ordem; pagamento falho; alteração/cancelamento; direitos concedidos só por estado financeiro confiável |
| Conteúdo/CMS | Preview/publicação/rollback; sem alteração de direitos por texto/preço editorial; mídia acessível e responsiva; links e metadata corretos |
| Operação | Falha parcial mantém páginas públicas; restaurar backup; rollback; logs sem segredos; teclado/mobile/tablet; alertas e eventos reconciliados |

Políticas já aprovadas: Kordena 30 dias sem cartão, R$ 299/mês ou R$ 2.990/ano; Iron Fit 30 dias sem cartão, até 15 alunos, R$ 269/mês ou R$ 2.690/ano; Enterprise sob consulta. Elegibilidade, início exato do relógio, extensão, grace period, retenção após expiração e antiabuso exigem contrato; não serão inventados nesta revisão.

## 7. Critério da primeira entrega funcional

A primeira entrega de identidade é concluída quando um usuário de teste consegue cadastrar-se, validar os dois canais, entrar, sair, recuperar acesso e operar somente sua organização, com falhas/abuso testados. Isso não concede trial automaticamente.

A primeira entrega comercial integrada é concluída quando, além disso, um produto explicitamente aprovado recebe um tenant único, aplica os direitos e limites corretos, conduz à primeira ação de valor e expira/converte conforme política comprovada.

Não liberar simultaneamente todos os SaaS. Kordena e Iron Fit são candidatos; a prioridade visual não escolhe o piloto nem comprova readiness. Os quatro itens em desenvolvimento/P&D continuam públicos sem contratação/trial.

## 8. Resultado desta revisão

Revisão da arquitetura e plano de sequência concluídos. Nenhuma funcionalidade sensível implementada, nenhum serviço contratado e nenhum merge executado. Documentação entregue em branch própria, baseada no estado publicado ef11b69. O visual atual permanece preservado.

Próxima execução recomendada: PF-00, começando pela reconciliação documental e definição técnica da Conta FM. O pedido atual autoriza esta revisão e planejamento; não é tratado como escolha automática de fornecedores nem como liberação de produção dos SaaS.
