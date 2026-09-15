import { siteConfig } from "@/src/config/site";

const governancePillars = [
  { title: "Controle humano", text: "Alertas, análises e recomendações apoiam a equipe sem retirar das pessoas o controle sobre decisões importantes." },
  { title: "Acessos e responsabilidades", text: "Usuários e equipes trabalham conforme seus acessos, funções e responsabilidades dentro da operação." },
  { title: "Operação centralizada", text: "Informações de áreas diferentes são reunidas em uma mesma visão para reduzir fragmentação e dar contexto às decisões." },
  { title: "Inteligência governada", text: "O Gerente IA Core atua como inteligência de apoio, respeitando configuração, contexto e limites definidos para cada estabelecimento." },
];

const valueChain = [
  ["Operação", "Pedido recebido"],
  ["Estoque", "Insumos consumidos"],
  ["Custos", "Custo atualizado"],
  ["Margem", "Margem impactada"],
  ["Financeiro", "Resultado consolidado"],
  ["Decisão", "Gestão informada"],
];

export function KordenaGovernanceAndValue() {
  return <>
    <section id="seguranca" className="section kordena-governance-section">
      <div className="container kordena-governance-grid">
        <div className="kordena-governance-copy">
          <p className="eyebrow">Segurança, confiança e governança</p>
          <h2>Inteligência com controle. Automação com responsabilidade.</h2>
          <p>O Kordena foi pensado para apoiar a operação sem retirar das pessoas o controle sobre decisões importantes. A plataforma organiza informações, conecta áreas e utiliza inteligência para gerar alertas, análises e recomendações dentro do contexto de cada negócio.</p>
        </div>
        <div className="kordena-governance-pills">
          {governancePillars.map((pillar, index) => <article key={pillar.title}><span>0{index + 1}</span><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></article>)}
        </div>
      </div>
    </section>

    <section id="valor" className="section kordena-value-section">
      <div className="container">
        <div className="landing-heading kordena-heading-wide kordena-value-heading">
          <p className="eyebrow">Da operação à decisão</p>
          <h2>Cada movimento do negócio deixa um impacto. O Kordena conecta os pontos.</h2>
          <p>Uma venda não termina no caixa. Ela movimenta produção, consome estoque, gera custos, altera margens e modifica o resultado financeiro. O Gerente IA Core relaciona esses sinais para transformar acontecimentos operacionais em informação útil para gestão.</p>
        </div>
        <ol className="kordena-value-chain" aria-label="Cadeia de impacto da operação à decisão">
          {valueChain.map(([title, detail], index) => <li key={title}><span className="kordena-value-index">0{index + 1}</span><strong>{title}</strong><small>{detail}</small>{index < valueChain.length - 1 && <b aria-hidden="true">→</b>}</li>)}
        </ol>
      </div>
    </section>
  </>;
}

export function KordenaEnterprise() {
  const message = encodeURIComponent("Olá! Quero conversar sobre implantação e condições Enterprise do Kordena.");
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number}?text=${message}`;
  const email = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Interesse em Kordena")}`;
  const items = [
    ["Configuração da operação", "Estrutura inicial organizada conforme processos, canais e necessidades do estabelecimento."],
    ["Integrações e canais", "Configuração de integrações e credenciais conforme os canais necessários para cada operação."],
    ["Usuários e acessos", "Estruturação de usuários, responsabilidades e acessos de acordo com a organização da equipe."],
    ["Condições Enterprise", "Condições comerciais para operações maiores ou com necessidades específicas, sempre sob consulta."],
  ];
  return <section id="enterprise" className="container kordena-enterprise-section" aria-labelledby="kordena-enterprise-title">
    <div className="kordena-enterprise-copy"><p className="eyebrow">Enterprise e implantação</p><h2 id="kordena-enterprise-title">Para operações que precisam ir além da configuração padrão.</h2><p>Cada operação tem processos, canais, equipes e necessidades diferentes. A implantação do Kordena pode ser configurada de acordo com o contexto do negócio, incluindo estrutura operacional, integrações, acessos e fluxos necessários para colocar a plataforma em funcionamento.</p><div className="actions"><a className="button button--primary" href={whatsapp}>Falar com a FM <span aria-hidden="true">↗</span></a><a className="button button--secondary" href={email}>E-mail <span aria-hidden="true">→</span></a></div></div>
    <div className="kordena-enterprise-grid">{items.map(([title,text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>;
}
