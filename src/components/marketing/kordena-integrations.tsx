const integrations = [
  { name: "iFood", group: "Marketplaces", text: "Pedidos do iFood integrados à visão operacional do estabelecimento." },
  { name: "Keeta", group: "Marketplaces", text: "Pedidos recebidos pela Keeta reunidos no mesmo fluxo operacional." },
  { name: "99Food", group: "Marketplaces", text: "Pedidos do 99Food conectados à operação do Kordena." },
  { name: "Google Maps", group: "Delivery e rotas", text: "Apoio a endereços, distâncias, rotas e estimativas de chegada no delivery próprio." },
  { name: "WhatsApp", group: "Relacionamento", text: "Canal usado em ações de relacionamento, comunicação e campanhas orgânicas." },
  { name: "Facebook", group: "Marketing", text: "Publicações e campanhas orgânicas com apoio de IA e revisão da equipe." },
  { name: "Instagram", group: "Marketing", text: "Conteúdo e campanhas orgânicas conectados à estratégia de relacionamento do negócio." },
];

export function KordenaIntegrations() {
  return (
    <section id="integracoes" className="section kordena-integrations-section">
      <div className="container">
        <div className="landing-heading kordena-heading-wide">
          <p className="eyebrow">Integrações e ecossistema</p>
          <h2>Os canais do negócio conectados à mesma operação.</h2>
          <p>
            O Kordena reúne canais de venda, delivery, rotas e relacionamento para reduzir fragmentação e manter a operação coordenada. As integrações abaixo representam o ecossistema confirmado para a plataforma.
          </p>
        </div>
        <div className="kordena-integrations-grid">
          {integrations.map((integration) => (
            <article className="kordena-integration-card" key={integration.name}>
              <span>{integration.group}</span>
              <h3>{integration.name}</h3>
              <p>{integration.text}</p>
            </article>
          ))}
        </div>
        <p className="kordena-integrations-note">
          A ativação de canais e credenciais é realizada conforme a configuração e implantação de cada operação.
        </p>
      </div>
    </section>
  );
}
