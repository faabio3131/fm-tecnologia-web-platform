import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

const fiscalCapabilities = [
  ["Documentos fiscais", "Modelo canônico para NF-e, NFC-e e NFS-e, com lifecycle, estados, correlação, archive e evidências preservadas."],
  ["Emissão governada", "Pipeline com idempotência, autoridade de numeração, validações, assinatura e gateway separados do Core cognitivo."],
  ["Consulta e acompanhamento", "Consulta documental e leitura de estado para acompanhar a operação sem depender de interpretação manual dispersa."],
  ["Cancelamento e inutilização", "Operações explícitas e governadas, executadas somente quando a capability do contexto autoriza a ação."],
  ["Contingência", "Tratamento de contingência como capacidade própria, nunca como fallback implícito ou atalho para produção."],
  ["Reconciliação", "Compara estado interno e retorno de provider para tratar divergências, resultados desconhecidos e recuperação operacional."],
  ["Capability & Readiness", "Autoridade fail-closed por documento, ação, jurisdição e ambiente para impedir execução sem prontidão comprovada."],
  ["Regras e jurisdição", "Regras versionadas com vigência, aplicabilidade, prioridade e proveniência normativa separadas do frontend."],
  ["Providers e certificados", "Bindings por contexto fiscal e referências seguras para certificados, CSC e demais materiais protegidos."],
  ["Webhooks e processamento assíncrono", "Inbox, outbox, entrega governada, retries e rastreabilidade para integrações e processamento em background."],
  ["Control Plane", "Administração de empresas, unidades, ambientes, perfis fiscais, capabilities, providers e configurações autorizadas."],
  ["Auditoria e observabilidade", "Audit trail, eventos, métricas, tracing, alertas, suporte a incidentes e evidência operacional."],
] as const;

const platformCapabilities = [
  ["Bridge e API versionada", "Contratos públicos versionados permitem que produtos consumidores integrem o NFCore sem copiar regras fiscais para cada SaaS."],
  ["Integrações multiproduto", "Contract packs e fronteiras host-neutral permitem atender Kordena, Iron, CampaIA e novos produtos sem fundir autoridades."],
  ["Identidade e acesso", "Login, sessão, recuperação de senha, RBAC, CSRF e escopo de tenant/unidade derivados da autoridade autenticada."],
  ["Onboarding governado", "Configuração progressiva de organização, empresa, unidade, ambiente e referências fiscais sem expor segredo no navegador."],
  ["Planos, entitlements e uso", "Camada comercial separa plano, entitlement, quota, medição de uso e billing da autoridade fiscal determinística."],
  ["Pricing, liberação e checkout", "Catálogo comercial versionado, decisão humana de liberação e bindings Cakto governados com compra fail-closed."],
] as const;

const fiscalActions = [
  ["Emitir", "issue"],
  ["Consultar", "query"],
  ["Cancelar", "cancel"],
  ["Inutilizar", "inutilize"],
  ["Contingência", "contingency"],
  ["Reconciliar", "reconcile"],
  ["Referenciar arquivo", "archive_reference"],
] as const;

const authorityFlow = [
  ["01", "Contexto fiscal", "Empresa, unidade, documento, jurisdição, ambiente e configuração autorizada."],
  ["02", "NFCore", "Interpreta contexto, coordena capacidades e apresenta a intenção operacional."],
  ["03", "Capability & política", "Verifica se aquela ação está explicitamente permitida para o contexto e o nível de readiness."],
  ["04", "Serviço determinístico", "Executa contratos, validações, idempotência, lifecycle, assinatura e operação autorizada."],
  ["05", "Provider / autoridade externa", "Processa a integração externa somente com credenciais, ambiente e homologação aplicáveis."],
  ["06", "Evidência", "Preserva estado, archive, eventos, reconciliação, audit trail e proveniência."],
] as const;

const governance = [
  ["Fail-closed por padrão", "Ausência, ambiguidade ou insuficiência de capability/readiness bloqueia a ação em vez de inferir autorização."],
  ["Autoridade separada", "IA pode apoiar contexto e decisão; emissão, cancelamento, assinatura e demais mutações críticas permanecem determinísticas."],
  ["Isolamento e acesso", "Tenant, unidade, RBAC, sessão, CSRF e permissões impedem que o frontend declare sua própria autoridade."],
  ["Segredos protegidos", "Certificados, CSC, tokens e chaves são tratados por referências e boundaries de Vault/Secret Manager, não pelo browser."],
  ["Idempotência e concorrência", "Reservas, lifecycle e sequence authority reduzem duplicidade, replay inseguro e inconsistência sob concorrência."],
  ["Auditoria e proveniência", "Operações preservam correlation, eventos, versão, origem e evidências necessárias para investigação e reconciliação."],
] as const;

const internalReady = [
  "Core fiscal modular e host-neutral",
  "Portal Web conectado à API real",
  "Autenticação, sessão, RBAC e recuperação de senha",
  "PostgreSQL, migrations e persistência durável",
  "Worker assíncrono, inbox/outbox e reconciliação",
  "Control Plane e Capability/Readiness",
  "Portal premium, pricing e liberação comercial governada",
  "Checkout Cakto governado em configuração interna",
] as const;

const externalPending = [
  "Infraestrutura real de staging/produção e Secret Manager",
  "Credenciais, callbacks e evento real da Cakto",
  "Certificados, CSC e credenciais fiscais reais",
  "Providers fiscais e endpoints oficiais aplicáveis",
  "Homologação por documento × operação × jurisdição × provider",
  "Piloto fiscal controlado com evidência externa",
  "Go/No-Go humano e PRODUCTION_APPROVED",
  "Deploy, DNS/cutover e smoke de produção autorizados",
] as const;

export function NFCoreLanding() {
  const message = "Olá! Quero conhecer o NFCore e entender o estágio atual, disponibilidade e implantação.";
  const whatsapp = "https://wa.me/" + siteConfig.whatsapp.number + "?text=" + encodeURIComponent(message);

  return (
    <main className="nfcore-landing">
      <section className="nfcore-hero" aria-labelledby="nfcore-title">
        <div className="nfcore-grid" aria-hidden="true" />
        <div className="container nfcore-hero__inner">
          <Link className="back-link" href="/produtos">← Todos os produtos</Link>
          <div className="nfcore-hero__grid">
            <div className="nfcore-hero__copy">
              <p className="eyebrow">Infrastructure Mission Control · Gestão Fiscal</p>
              <div className="nfcore-status">Produto Principal · Em desenvolvimento</div>
              <h1 id="nfcore-title" className="nfcore-wordmark"><span className="nfcore-wordmark__nf">NF</span><span className="nfcore-wordmark__core">CORE</span></h1>
              <p className="nfcore-tagline">Infraestrutura fiscal. Sob controle.</p>
              <p className="lead">Reduza erros humanos, diminua o retrabalho operacional e centralize a gestão fiscal em uma infraestrutura coordenada pelo Core.</p>
              <p className="nfcore-support">O NFCore conecta documentos, regras, emissão, providers, integrações, readiness, reconciliação e auditoria sem transferir autoridade fiscal crítica para a IA.</p>
              <div className="actions nfcore-actions">
                <a className="button button--primary" href="#mission-control">Conhecer o NFCore <span aria-hidden="true">↓</span></a>
                <a className="button button--secondary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a>
              </div>
              <p className="nfcore-release">Lançamento em preparação. Produção fiscal real depende de homologação, credenciais e autorização aplicáveis.</p>
            </div>

            <div className="nfcore-hero__visual" aria-label="Identidade NFCore e dez macrocapacidades da infraestrutura fiscal">
              <div className="nfcore-orbit nfcore-orbit--one" aria-hidden="true" />
              <div className="nfcore-orbit nfcore-orbit--two" aria-hidden="true" />
              <div className="nfcore-hero-visual-layout">
                <div className="nfcore-domain-column nfcore-domain-column--left" aria-label="Capacidades NFCore à esquerda">
                  <span className="nfcore-domain">Emissão</span>
                  <span className="nfcore-domain">Documentos</span>
                  <span className="nfcore-domain">Regras Fiscais</span>
                  <span className="nfcore-domain">Reconciliação</span>
                  <span className="nfcore-domain">Readiness</span>
                </div>

                <div className="nfcore-mark-card nfcore-mark-card--approved">
                  <Image
                    className="nfcore-approved-brand"
                    src="/brand/nfcore-brand-hero-final.png"
                    alt="NFCore — Controle de missão e gerenciamento inteligente"
                    width={1672}
                    height={941}
                    priority
                    unoptimized
                  />
                </div>

                <div className="nfcore-domain-column nfcore-domain-column--right" aria-label="Capacidades NFCore à direita">
                  <span className="nfcore-domain">Providers</span>
                  <span className="nfcore-domain">Integrações</span>
                  <span className="nfcore-domain">Webhooks</span>
                  <span className="nfcore-domain">Auditoria</span>
                  <span className="nfcore-domain">Governança</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="nfcore-index" aria-label="Nesta página: NFCore">
        <div className="container">
          <a href="#mission-control">Mission Control</a>
          <a href="#core-fiscal">Core Fiscal</a>
          <a href="#operacao-fiscal">Operação</a>
          <a href="#capacidades">Capacidades</a>
          <a href="#plataforma">Plataforma</a>
          <a href="#governanca">Governança</a>
          <a href="#disponibilidade">Readiness</a>
        </div>
      </nav>

      <section id="mission-control" className="nfcore-section nfcore-mission">
        <div className="container nfcore-split">
          <div>
            <p className="eyebrow">Mission Control fiscal</p>
            <h2>Uma camada para enxergar, coordenar e governar a operação fiscal.</h2>
            <p>O NFCore é uma infraestrutura fiscal horizontal da FM Tecnologia. Ele centraliza contexto, documentos, regras, integrações, estados operacionais e evidências para reduzir fragmentação e trabalho manual entre produtos, equipes e providers.</p>
            <p>Em vez de cada SaaS reconstruir emissão, readiness, auditoria ou regras de integração, o NFCore oferece uma autoridade fiscal compartilhada por contratos versionados e boundaries explícitos.</p>
            <div className="nfcore-assurance">
              <strong>O Core coordena. A autoridade crítica permanece determinística.</strong>
              <span>Recomendação de IA não substitui validação, política, assinatura, autorização, homologação, capability ou execução fiscal.</span>
            </div>
          </div>
          <div className="nfcore-mission-panel">
            <p className="eyebrow">Fluxo de autoridade</p>
            <ol>
              {authorityFlow.map(([index, title, text]) => (
                <li key={title}><span>{index}</span><div><strong>{title}</strong><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="core-fiscal" className="nfcore-section nfcore-core">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Core Fiscal</p>
            <h2>Inteligência com contexto. Execução com controle.</h2>
            <p>O NFCore pode compreender o contexto operacional e fiscal, relacionar sinais e apoiar decisões, enquanto serviços previsíveis preservam a autoridade nas operações críticas.</p>
          </div>
          <div className="nfcore-core-stage">
            <div className="nfcore-core-center nfcore-core-center--approved">
              <Image
                className="nfcore-core-approved-brand"
                src="/brand/nfcore-emblem-final.png"
                alt="Símbolo NFCore"
                width={1254}
                height={1254}
                unoptimized
              />
              <div className="nfcore-core-brand-lockup" aria-label="NF CORE — Infraestrutura fiscal inteligente">
                <div className="nfcore-core-brand-wordmark" aria-hidden="true">
                  <span className="nfcore-core-brand-wordmark__nf">NF</span>
                  <span className="nfcore-core-brand-wordmark__core">CORE</span>
                </div>
                <span className="nfcore-core-slogan">Infraestrutura fiscal inteligente</span>
              </div>
              <span className="nfcore-core-caption">Core Fiscal</span>
            </div>
            <div className="nfcore-core-pillar nfcore-core-pillar--1"><b>Contexto</b><span>empresa · unidade · jurisdição</span></div>
            <div className="nfcore-core-pillar nfcore-core-pillar--2"><b>Regras</b><span>versão · aplicabilidade · vigência</span></div>
            <div className="nfcore-core-pillar nfcore-core-pillar--3"><b>Operação</b><span>documentos · eventos · estados</span></div>
            <div className="nfcore-core-pillar nfcore-core-pillar--4"><b>Evidência</b><span>logs · reconciliação · auditoria</span></div>
          </div>
        </div>
      </section>

      <section id="operacao-fiscal" className="nfcore-section nfcore-operations">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Operação fiscal governada</p>
            <h2>NF-e, NFC-e e NFS-e dentro de um lifecycle controlado.</h2>
            <p>O NFCore modela documentos e operações fiscais como capacidades explícitas. A família documental, por si só, não autoriza uma ação: emissão, cancelamento, contingência ou qualquer outra mutação depende do contexto e do readiness correspondente.</p>
          </div>
          <div className="nfcore-action-strip" aria-label="Ações fiscais governadas">
            {fiscalActions.map(([label, action]) => (
              <div key={action} className="nfcore-action-chip"><strong>{label}</strong><span>{action}</span></div>
            ))}
          </div>
          <div className="nfcore-document-grid">
            <article><span>01</span><h3>NF-e</h3><p>Documento eletrônico para cenários compatíveis com a capability e a jurisdição configuradas.</p></article>
            <article><span>02</span><h3>NFC-e</h3><p>Operação de consumidor com lifecycle, idempotência, sequência e controles específicos quando autorizados.</p></article>
            <article><span>03</span><h3>NFS-e</h3><p>Serviços com contexto municipal/provider e tratamento explícito de particularidades de autorização.</p></article>
          </div>
          <p className="nfcore-context-note">Cobertura comercial real é sempre definida por <strong>documento × operação × UF/município × provider × ambiente</strong>. O NFCore não generaliza homologação sem evidência.</p>
        </div>
      </section>

      <section id="capacidades" className="nfcore-section nfcore-capabilities">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Capacidades do NFCore</p>
            <h2>Da regra fiscal à evidência operacional.</h2>
            <p>A arquitetura é organizada por capacidades independentes e versionadas. Isso permite evoluir documentos, jurisdições, providers e produtos consumidores sem duplicar a autoridade fiscal.</p>
          </div>
          <div className="nfcore-capability-grid nfcore-capability-grid--extended">
            {fiscalCapabilities.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="plataforma" className="nfcore-section nfcore-platform">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Plataforma e ecossistema</p>
            <h2>Uma infraestrutura fiscal para vários produtos, não um motor preso a um único SaaS.</h2>
            <p>O NFCore foi estruturado como autoridade fiscal horizontal da FM Tecnologia. Produtos consumidores se integram por contratos e adapters, preservando isolamento, versionamento e governança.</p>
          </div>
          <div className="nfcore-platform-grid">
            {platformCapabilities.map(([title, text]) => (
              <article key={title}><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="nfcore-platform-flow" aria-label="Fluxo multiproduto do NFCore">
            <span>Produtos FM</span><b>→</b><span>Bridge / API</span><b>→</b><span>NFCore</span><b>→</b><span>Providers fiscais</span>
          </div>
        </div>
      </section>

      <section id="governanca" className="nfcore-section nfcore-governance">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Segurança e governança</p>
            <h2>Fiscal exige precisão, evidência e autoridade clara.</h2>
            <p>As barreiras de segurança não são complementos de interface. Elas fazem parte do contrato operacional do produto e permanecem válidas mesmo quando a experiência visual ou os providers evoluem.</p>
          </div>
          <div className="nfcore-governance-grid nfcore-governance-grid--extended">
            {governance.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="disponibilidade" className="nfcore-section nfcore-readiness">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Readiness real</p>
            <h2>Internamente avançado. Produção fiscal continua governada por evidência externa.</h2>
            <p>O CURRENT do NFCore possui uma base funcional forte, mas isso não equivale a afirmar que todas as células fiscais ou integrações externas estejam homologadas e liberadas para produção.</p>
          </div>
          <div className="nfcore-readiness-grid">
            <article className="nfcore-readiness-card nfcore-readiness-card--internal">
              <span className="nfcore-readiness-label">Implementado / preparado internamente</span>
              <ul>{internalReady.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="nfcore-readiness-card nfcore-readiness-card--external">
              <span className="nfcore-readiness-label">Dependências externas / humanas antes do Go-Live</span>
              <ul>{externalPending.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="container nfcore-contact" aria-labelledby="nfcore-contact-title">
        <div>
          <p className="eyebrow">Disponibilidade comercial</p>
          <h2 id="nfcore-contact-title">NFCore está em preparação para lançamento comercial.</h2>
          <p>A plataforma pode ser apresentada e avaliada tecnicamente. Ativação comercial, checkout real, homologações e produção fiscal continuam condicionados às configurações, evidências e autorizações correspondentes.</p>
        </div>
        <div className="nfcore-contact__actions">
          <a className="button button--primary" href={whatsapp}>Falar sobre o NFCore <span aria-hidden="true">↗</span></a>
          <a className="button button--secondary" href={"mailto:" + siteConfig.contactEmail + "?subject=" + encodeURIComponent("Interesse em NFCore")}>E-mail</a>
        </div>
      </section>
    </main>
  );
}
