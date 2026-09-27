import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

const capabilities = [
  ["Documentos fiscais", "Modelo canônico para organizar documentos, eventos, estados e evidências da operação fiscal."],
  ["Regras e aplicabilidade", "Motor de regras versionadas para separar contexto fiscal, regras tributárias e decisões de execução."],
  ["Emissão governada", "Pipeline com sequenciamento, idempotência, assinatura, validação XML/XSD e integração por gateway."],
  ["Pós-emissão", "Fluxos previstos para consulta, cancelamento, inutilização, contingência e acompanhamento do ciclo fiscal."],
  ["Reconciliação e auditoria", "Rastreabilidade, arquivo, eventos e reconciliação para reduzir divergências e facilitar investigação."],
  ["Evolução fiscal", "Arquitetura preparada para múltiplos documentos, UFs e evolução tributária sem acoplar regras ao frontend."],
] as const;

const authorityFlow = [
  ["01", "Contexto fiscal", "Empresa, unidade, jurisdição e configuração autorizada."],
  ["02", "NFCore", "Interpreta contexto, coordena capacidades e recomenda ações."],
  ["03", "Serviços determinísticos", "Validam contratos e executam operações fiscais autorizadas."],
  ["04", "Providers e autoridades", "Integrações externas, credenciais, homologação e retorno oficial."],
  ["05", "Auditoria", "Estado, evidências, reconciliação e rastreabilidade preservados."],
] as const;

const governance = [
  ["Homologação real", "Produção fiscal não é presumida. Cada cenário depende de credenciais, ambiente e evidência oficial."],
  ["Autoridade separada", "IA apoia e coordena; serviços determinísticos validam e executam operações críticas."],
  ["Isolamento e acesso", "Autenticação, RBAC, tenancy e escopo operacional permanecem autoridades técnicas do produto."],
  ["Evolução controlada", "Mudanças de regras, integrações e providers devem preservar versionamento, testes e rastreabilidade."],
] as const;

export function NFCoreLanding() {
  const message = "Olá! Quero conhecer o NFCore e entender o estágio atual, disponibilidade e implantação.";
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

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
              <p className="nfcore-support">O NFCore organiza regras, documentos, emissão, eventos, reconciliação e auditoria sem transferir autoridade crítica para a IA.</p>
              <div className="actions nfcore-actions">
                <a className="button button--primary" href="#mission-control">Conhecer o NFCore <span aria-hidden="true">↓</span></a>
                <a className="button button--secondary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a>
              </div>
              <p className="nfcore-release">Lançamento em preparação. Produção fiscal real depende de homologação, credenciais e autorização aplicáveis.</p>
            </div>

            <div className="nfcore-hero__visual" aria-label="Identidade NFCore e principais domínios da infraestrutura fiscal">
              <div className="nfcore-orbit nfcore-orbit--one" aria-hidden="true" />
              <div className="nfcore-orbit nfcore-orbit--two" aria-hidden="true" />
              <div className="nfcore-mark-card nfcore-mark-card--approved">
                <Image
                  className="nfcore-approved-brand"
                  src="/brand/nfcore-brand-approved.webp"
                  alt="NFCore — Infrastructure Mission Control"
                  width={1400}
                  height={521}
                  priority
                  unoptimized
                />
              </div>
              <span className="nfcore-domain nfcore-domain--1">Regras</span>
              <span className="nfcore-domain nfcore-domain--2">Documentos</span>
              <span className="nfcore-domain nfcore-domain--3">Gateways</span>
              <span className="nfcore-domain nfcore-domain--4">Reconciliação</span>
              <span className="nfcore-domain nfcore-domain--5">Auditoria</span>
              <span className="nfcore-domain nfcore-domain--6">Governança</span>
            </div>
          </div>
        </div>
      </section>

      <nav className="nfcore-index" aria-label="Nesta página: NFCore">
        <div className="container">
          <a href="#mission-control">Mission Control</a>
          <a href="#core-fiscal">Core Fiscal</a>
          <a href="#capacidades">Capacidades</a>
          <a href="#governanca">Governança</a>
          <a href="#disponibilidade">Disponibilidade</a>
        </div>
      </nav>

      <section id="mission-control" className="nfcore-section nfcore-mission">
        <div className="container nfcore-split">
          <div>
            <p className="eyebrow">Mission Control fiscal</p>
            <h2>Uma camada para enxergar, coordenar e governar a operação fiscal.</h2>
            <p>O NFCore é tratado como infraestrutura fiscal horizontal da FM Tecnologia. Ele concentra contexto, regras, documentos, integrações e rastreabilidade para reduzir fragmentação e trabalho manual.</p>
            <div className="nfcore-assurance">
              <strong>O Core coordena. A autoridade crítica permanece determinística.</strong>
              <span>Recomendação de IA não substitui validação, política, assinatura, autorização, homologação ou execução fiscal.</span>
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
            <p>O NFCore pode compreender o contexto operacional e fiscal, relacionar sinais e apoiar decisões, enquanto serviços previsíveis preservam validação e autoridade nas operações críticas.</p>
          </div>
          <div className="nfcore-core-stage">
            <div className="nfcore-core-center nfcore-core-center--approved">
              <Image
                className="nfcore-core-approved-brand"
                src="/brand/nfcore-brand-approved.webp"
                alt="NFCore — Infrastructure Mission Control"
                width={1400}
                height={521}
                unoptimized
              />
              <span>Core Fiscal</span>
            </div>
            <div className="nfcore-core-pillar nfcore-core-pillar--1"><b>Contexto</b><span>empresa · unidade · jurisdição</span></div>
            <div className="nfcore-core-pillar nfcore-core-pillar--2"><b>Regras</b><span>versão · aplicabilidade · vigência</span></div>
            <div className="nfcore-core-pillar nfcore-core-pillar--3"><b>Operação</b><span>documentos · eventos · estados</span></div>
            <div className="nfcore-core-pillar nfcore-core-pillar--4"><b>Evidência</b><span>logs · reconciliação · auditoria</span></div>
          </div>
        </div>
      </section>

      <section id="capacidades" className="nfcore-section nfcore-capabilities">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Capacidades em foco</p>
            <h2>Da regra fiscal à evidência operacional.</h2>
            <p>A arquitetura foi organizada para evoluir por capacidades sem criar regras duplicadas ou acoplamento artificial a um único provider.</p>
          </div>
          <div className="nfcore-capability-grid">
            {capabilities.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="governanca" className="nfcore-section nfcore-governance">
        <div className="container">
          <div className="nfcore-heading">
            <p className="eyebrow">Segurança e governança</p>
            <h2>Fiscal exige precisão, evidência e autoridade clara.</h2>
          </div>
          <div className="nfcore-governance-grid">
            {governance.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="disponibilidade" className="container nfcore-contact" aria-labelledby="nfcore-contact-title">
        <div>
          <p className="eyebrow">Disponibilidade</p>
          <h2 id="nfcore-contact-title">NFCore está em preparação para lançamento comercial.</h2>
          <p>A página apresenta o posicionamento e a arquitetura do produto. Homologações, credenciais e produção fiscal continuam condicionadas às evidências e autorizações correspondentes.</p>
        </div>
        <div className="nfcore-contact__actions">
          <a className="button button--primary" href={whatsapp}>Falar sobre o NFCore <span aria-hidden="true">↗</span></a>
          <a className="button button--secondary" href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Interesse em NFCore")}`}>E-mail</a>
        </div>
      </section>
    </main>
  );
}
