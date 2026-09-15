const intelligenceAxes = [
  ["Contexto", "Dados da operação fitness organizados pelo Core Vertical para preservar o contexto correto."],
  ["Insights", "Arquitetura preparada para interpretar sinais e padrões sem transformar a IA em dependência dos fluxos essenciais."],
  ["Evolução", "Recursos inteligentes podem evoluir sobre a mesma base operacional de acompanhamento e desempenho."],
  ["Governança", "Inteligência como apoio à decisão, com supervisão e regras definidas pela operação."],
] as const;

const hubCapabilities = ["Elegibilidade", "Agenda", "Check-in", "Acesso", "Reconciliação", "Providers"] as const;

const securityPillars = [
  ["Isolamento entre academias", "Dados e operações são vinculados ao contexto correto da academia e da unidade."],
  ["Papéis e responsabilidades", "Cada perfil acessa apenas os recursos compatíveis com suas permissões."],
  ["Rastreabilidade", "Operações importantes podem ser acompanhadas por registros e auditoria."],
  ["Governança operacional", "Fluxos críticos preservam controle humano, regras e contexto."],
] as const;

export function IronFitIntelligenceEcosystemSecurity() {
  return (
    <>
      <section id="inteligencia" className="ironfit-section ironfit-intelligence" aria-labelledby="ironfit-intelligence-title">
        <div className="container">
          <div className="ironfit-intelligence-layout">
            <div className="ironfit-intelligence-copy">
              <p className="eyebrow">IRON INTELLIGENCE</p>
              <h2 id="ironfit-intelligence-title">Inteligência conectada à operação, sem substituir o controle humano.</h2>
              <p>O Iron Fit Core foi arquitetado para incorporar inteligência ao acompanhamento e à gestão sem transformar a IA em dependência dos fluxos essenciais da academia.</p>
              <div className="ironfit-human-control">
                <strong>O profissional continua no controle.</strong>
                <span>Treinos, avaliações, aprovações e decisões permanecem sujeitos ao fluxo humano definido pela operação.</span>
              </div>
            </div>
            <div className="ironfit-intelligence-network" aria-label="Quatro eixos da Iron Intelligence">
              <div className="ironfit-intelligence-core"><span>IRON</span><strong>INTELLIGENCE</strong><small>Core + contexto</small></div>
              {intelligenceAxes.map(([title, text], index) => (
                <article key={title} className={`ironfit-intelligence-node ironfit-intelligence-node--${index + 1}`}>
                  <span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="ironfit-intelligence-guardrail">
            <strong>Inteligência governada desde a arquitetura.</strong>
            <p>A arquitetura prevê sanitização de informações antes do uso em recursos inteligentes, evitando o envio indevido de credenciais, tokens, dados financeiros e outros elementos sensíveis. Insights, projeções e assistentes permanecem capacidades evolutivas e não substituem os fluxos essenciais.</p>
          </div>
        </div>
      </section>

      <section id="ecossistema" className="ironfit-section ironfit-ecosystem" aria-labelledby="ironfit-ecosystem-title">
        <div className="container">
          <div className="ironfit-centered-heading ironfit-centered-heading--compact">
            <p className="eyebrow">Aggregator Hub</p>
            <h2 id="ironfit-ecosystem-title">Preparado para um ecossistema fitness conectado.</h2>
            <p>O Iron Fit Core foi arquitetado para se conectar a ecossistemas de benefícios, acesso, agenda e parceiros fitness através de uma camada própria de integração.</p>
          </div>
          <div className="ironfit-hub-diagram" aria-label="Fluxo conceitual do Aggregator Hub">
            <div className="ironfit-hub-core"><span>IRON FIT</span><strong>CORE</strong></div>
            <i aria-hidden="true">↔</i>
            <div className="ironfit-hub-center"><span>AGGREGATOR</span><strong>HUB</strong><small>camada de integração</small></div>
            <i aria-hidden="true">↔</i>
            <div className="ironfit-hub-providers"><strong>Providers</strong><span>Wellhub · TotalPass · ClassPass</span><small>Arquitetura preparada para integração. Ativação externa depende de preparação/homologação.</small></div>
          </div>
          <div className="ironfit-hub-capabilities">
            {hubCapabilities.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
          </div>
          <div className="ironfit-ecosystem-note">
            <strong>Uma camada para conectar a academia ao ecossistema sem fragmentar a operação.</strong>
            <p>Acesso, agenda, check-in, elegibilidade e reconciliação retornam ao mesmo contexto operacional. A arquitetura também está preparada para evoluir em conteúdo, creators e experiências digitais fitness com governança de direitos.</p>
          </div>
        </div>
      </section>

      <section id="seguranca" className="ironfit-section ironfit-security" aria-labelledby="ironfit-security-title">
        <div className="container">
          <div className="ironfit-security-head">
            <div>
              <p className="eyebrow">Segurança, confiança e governança</p>
              <h2 id="ironfit-security-title">Tecnologia conectada. Acessos controlados. Operação rastreável.</h2>
            </div>
            <p>O Iron Fit Core foi construído considerando autenticação, RBAC, perfis e permissões, isolamento entre academias, auditoria, rastreabilidade, controles financeiros, consentimentos e responsabilidades operacionais.</p>
          </div>
          <div className="ironfit-security-grid">
            {securityPillars.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="ironfit-security-details">
            <article><strong>Financeiro com controles técnicos</strong><p>Fluxos financeiros foram projetados com controles de concorrência, consistência e idempotência para reduzir duplicidade e inconsistências operacionais.</p></article>
            <article><strong>Consentimentos por contexto</strong><p>A arquitetura prevê consentimentos específicos para diferentes tipos de uso de dados, incluindo contextos de saúde, comunicação e biometria quando aplicável.</p></article>
            <article><strong>Validação técnica interna</strong><p>A arquitetura é validada por testes automatizados e controles técnicos internos, sem apresentar certificações externas não comprovadas.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
