import Link from "next/link";

import type { Product } from "@/src/catalog/types";
import { siteConfig } from "@/src/config/site";

const capabilities = [
  {
    title: "Visão executiva",
    text: "Reúna indicadores governados em um painel único, com período, qualidade, atualidade e origem de cada informação.",
  },
  {
    title: "Inteligência por produto",
    text: "Acompanhe cada SaaS da empresa como escopo próprio, compare produtos quando a semântica permitir e preserve a autoridade de cada fonte.",
  },
  {
    title: "Financeiro",
    text: "Consulte faturamento, recorrência e demais métricas financeiras somente quando houver fonte e definição aprovadas.",
  },
  {
    title: "Growth e Comercial",
    text: "Conecte funil, conversão, trials, assinaturas e sinais comerciais em uma leitura executiva rastreável.",
  },
  {
    title: "Operações e SRE",
    text: "Centralize sinais operacionais, saúde de integrações e evidências necessárias para investigar incidentes e degradações.",
  },
  {
    title: "Clientes, uso e suporte",
    text: "Organize métricas de clientes, utilização, engajamento e suporte sem misturar dado ausente com zero.",
  },
  {
    title: "Alertas governados",
    text: "Crie regras determinísticas, registre ocorrências e prepare ações com idempotência, RBAC e trilha de auditoria.",
  },
  {
    title: "Fontes e integrações",
    text: "Conecte sistemas por contratos explícitos, com source registry, proveniência e isolamento por organização e produto.",
  },
] as const;

const principles = [
  ["Dados ausentes", "Indisponível, nunca zero inventado."],
  ["Tenant e produto", "Escopo resolvido no servidor e bloqueio por padrão."],
  ["Core Executivo", "Interpreta evidências; não substitui a autoridade determinística."],
  ["Ações críticas", "Prévia, autorização e auditoria antes de qualquer efeito sensível."],
] as const;

const faqs = [
  {
    q: "O FM Command substitui os sistemas da empresa?",
    a: "Não. Ele funciona como camada executiva e cognitiva sobre fontes governadas. Cada produto continua sendo autoridade dos próprios dados e regras de negócio.",
  },
  {
    q: "O Command acessa diretamente o banco dos produtos?",
    a: "A arquitetura prioriza conectores e contratos server-to-server. A integração do Kordena, por exemplo, utiliza API governada e não acesso SQL direto ao banco operacional.",
  },
  {
    q: "Como o Core Executivo usa inteligência artificial?",
    a: "O Core recebe fatos e evidências das fontes autorizadas, separa fatos, inferências e recomendações e utiliza o modelo externo como provider de capacidade cognitiva. O modelo não é a autoridade dos números.",
  },
  {
    q: "É possível acompanhar vários produtos no mesmo painel?",
    a: "Sim. O Product Registry e o escopo por produto permitem acompanhar produtos individualmente e executar comparações somente quando métrica, unidade, moeda e período forem compatíveis.",
  },
  {
    q: "O Command executa automações sozinho?",
    a: "Alertas e ações seguem governança. Ações sensíveis não são disparadas diretamente pelo Core; passam por regras, permissões, prévia e confirmação conforme o risco.",
  },
  {
    q: "Qual é o estado de disponibilidade?",
    a: "A base técnica e o Visual Premium estão concluídos. A ativação comercial final depende das configurações de runtime e integrações externas aplicáveis ao ambiente de produção.",
  },
] as const;

export function CommandLanding({ product }: { product: Product }) {
  const message = "Olá! Quero conhecer o FM Command e entender como ele pode centralizar a gestão executiva dos meus produtos e operações.";
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
  const email = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Interesse no FM Command")}`;

  return (
    <main className="command-landing">
      <section className="command-hero">
        <div className="container">
          <Link className="back-link" href="/produtos">← Todos os produtos</Link>
          <div className="command-hero-grid">
            <div className="command-hero-copy">
              <p className="eyebrow">FM Command · Central Executiva</p>
              <h1>
                Comande a empresa com
                <span>dados governados e inteligência no centro.</span>
              </h1>
              <p className="lead">
                O FM Command consolida produtos, métricas, financeiro, crescimento, clientes,
                operações, alertas e inteligência executiva em uma única visão — sem inventar
                informação quando a fonte não existe.
              </p>
              <div className="actions">
                <a className="button command-primary" href={whatsapp}>Solicitar demonstração <span aria-hidden="true">↗</span></a>
                <a className="button command-secondary" href="#capacidades">Ver capacidades <span aria-hidden="true">↓</span></a>
              </div>
              <p className="command-release-note">
                Base técnica certificada e Visual Premium concluído. Integrações externas são ativadas de forma governada por ambiente.
              </p>
            </div>

            <aside className="command-console" aria-label="Prévia conceitual da central executiva FM Command">
              <div className="command-console-topbar">
                <div>
                  <span className="command-console-mark">FM</span>
                  <strong>COMMAND</strong>
                </div>
                <span>Ambiente governado</span>
              </div>
              <div className="command-console-body">
                <nav className="command-console-nav" aria-label="Módulos ilustrativos do FM Command">
                  {["Visão Geral", "Produtos", "Financeiro", "Comercial", "Clientes", "Operações", "Incidentes", "Core"].map((item, index) => (
                    <span className={index === 0 ? "active" : ""} key={item}>{item}</span>
                  ))}
                </nav>
                <div className="command-console-main">
                  <div className="command-console-heading">
                    <span>Central Executiva</span>
                    <strong>Visão governada da empresa</strong>
                  </div>
                  <div className="command-console-metrics">
                    <article><span>Exigem atenção</span><strong>Alertas governados</strong></article>
                    <article><span>Cobertura factual</span><strong>Com proveniência</strong></article>
                    <article><span>Produtos</span><strong>Escopo isolado</strong></article>
                    <article><span>Core Executivo</span><strong>Governado</strong></article>
                  </div>
                  <div className="command-console-strip">
                    <span>Financeiro</span>
                    <span>Growth</span>
                    <span>Operações</span>
                    <span>Clientes</span>
                    <span>Integrações</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <nav className="container command-index" aria-label="Nesta página: FM Command">
        <a href="#arquitetura">Como funciona</a>
        <a href="#capacidades">Capacidades</a>
        <a href="#core-command">Core Executivo</a>
        <a href="#governanca">Governança</a>
        <a href="#kordena-command">Kordena + Command</a>
        <a href="#duvidas-command">Dúvidas</a>
      </nav>

      <section id="arquitetura" className="section command-architecture">
        <div className="container">
          <div className="command-section-heading">
            <p className="eyebrow">Arquitetura executiva</p>
            <h2>O Command conecta. As fontes continuam sendo autoridade.</h2>
            <p>
              A informação entra por contratos governados, passa pela malha de integrações e pelo motor
              determinístico de métricas, ganha proveniência e só então chega ao painel e ao Core.
            </p>
          </div>
          <div className="command-flow" aria-label="Fluxo arquitetural do FM Command">
            {[
              ["01", "Fontes", "SaaS, billing, telemetria e sistemas autorizados."],
              ["02", "Integration Fabric", "Conectores, source registry, escopo e idempotência."],
              ["03", "Metric Engine", "Semântica e cálculo factual determinísticos."],
              ["04", "Evidence Pack", "Qualidade, período, atualidade e proveniência."],
              ["05", "FM Cognitive Core", "Interpretação e recomendação sobre fatos governados."],
              ["06", "Command", "Painel executivo, alertas e decisões rastreáveis."],
            ].map(([number, title, text]) => (
              <article key={title}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capacidades" className="section command-capabilities-section">
        <div className="container">
          <div className="command-section-heading">
            <p className="eyebrow">Capacidades</p>
            <h2>Uma visão executiva para acompanhar o negócio sem perder o contexto.</h2>
            <p>
              Cada módulo foi desenhado para preservar a separação entre dado disponível, dado ausente,
              inferência e recomendação.
            </p>
          </div>
          <div className="command-capabilities">
            {capabilities.map((item) => (
              <article key={item.title}>
                <span className="command-capability-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="core-command" className="section command-core-section">
        <div className="container command-core-grid">
          <div>
            <p className="eyebrow">FM Cognitive Vertical Core</p>
            <h2>Pergunte à empresa. O Core responde com o que consegue provar.</h2>
            <p>
              O Core Executivo consulta as mesmas autoridades do painel, preserva contexto por organização
              e usuário e mantém a proveniência das métricas utilizadas na resposta.
            </p>
            <div className="command-question-grid" aria-label="Exemplos de consultas executivas">
              <span>“Quanto faturamos neste período?”</span>
              <span>“Quais produtos exigem atenção agora?”</span>
              <span>“Como está a conversão de trials?”</span>
              <span>“Existem sinais operacionais fora do padrão?”</span>
              <span>“Compare o desempenho dos produtos compatíveis.”</span>
              <span>“Quais dados estão indisponíveis e por quê?”</span>
            </div>
          </div>
          <aside className="command-core-card">
            <span className="eyebrow">Resposta governada</span>
            <h3>Fato não disponível não vira resposta inventada.</h3>
            <ul>
              <li>Fatos e recomendações permanecem separados.</li>
              <li>Proveniência acompanha a informação utilizada.</li>
              <li>Previsões exigem evidência temporal suficiente.</li>
              <li>Falha de provider degrada com segurança.</li>
              <li>Ação crítica não nasce diretamente do LLM.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="governanca" className="section command-governance-section">
        <div className="container">
          <div className="command-section-heading">
            <p className="eyebrow">Governança por padrão</p>
            <h2>Controle, segurança e rastreabilidade fazem parte da arquitetura.</h2>
          </div>
          <div className="command-principles">
            {principles.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{text}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kordena-command" className="section command-integration-section">
        <div className="container command-integration-grid">
          <div>
            <p className="eyebrow">Integração entre produtos</p>
            <h2>O Kordena já prova o modelo de integração do Command.</h2>
            <p>
              O FM Command consome dados comerciais e de saúde do Kordena por contrato server-to-server,
              preservando a autoridade do Kordena e evitando acesso direto ao banco operacional.
            </p>
            <ul>
              <li>Clientes e contas comerciais.</li>
              <li>Trials e conversão.</li>
              <li>Assinaturas e pagamentos.</li>
              <li>MRR, ARR e churn quando a semântica está disponível.</li>
              <li>Usuários, unidades, catálogo e observabilidade.</li>
              <li>Proveniência e sincronização idempotente.</li>
            </ul>
          </div>
          <aside className="command-integration-map" aria-label="Fluxo Kordena para FM Command">
            <strong>KORDENA</strong>
            <span>API governada</span>
            <b aria-hidden="true">→</b>
            <strong>FM COMMAND</strong>
            <small>Sem SQL direto · autoridade preservada</small>
          </aside>
        </div>
      </section>

      <section className="section command-journey-section">
        <div className="container">
          <div className="command-section-heading">
            <p className="eyebrow">Da fonte à decisão</p>
            <h2>Uma jornada construída para reduzir decisão no escuro.</h2>
          </div>
          <ol className="command-journey">
            {[
              ["Conecte", "Registre fontes e produtos autorizados."],
              ["Governe", "Defina métricas, semântica, escopo e proveniência."],
              ["Observe", "Acompanhe indicadores, qualidade e saúde operacional."],
              ["Pergunte", "Use o Core Executivo sobre fatos autorizados."],
              ["Aja", "Trate alertas e decisões com permissão e auditoria."],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="duvidas-command" className="section command-faq-section">
        <div className="container command-faq-grid">
          <div className="command-section-heading">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>O que é importante saber antes de implantar.</h2>
          </div>
          <div className="command-faq">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container command-cta" aria-labelledby="command-cta-title">
        <div>
          <p className="eyebrow">FM Command</p>
          <h2 id="command-cta-title">Centralize a visão. Preserve as autoridades. Decida com evidência.</h2>
          <p>
            Conheça a arquitetura e veja como o Command pode consolidar a gestão executiva dos seus produtos e operações.
          </p>
        </div>
        <div className="command-cta-actions">
          <a className="button command-primary" href={whatsapp}>Solicitar demonstração <span aria-hidden="true">↗</span></a>
          <a className="button command-secondary" href={email}>Falar por e-mail <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <span className="sr-only">{product.name}</span>
    </main>
  );
}
