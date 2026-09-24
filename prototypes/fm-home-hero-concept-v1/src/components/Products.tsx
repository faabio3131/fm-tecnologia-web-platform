const products = [
  {
    name: 'Kordena',
    tag: 'Gestão operacional',
    description: 'Orquestra processos e times em uma operação única e visível.',
    accent: '#4fb0ff',
  },
  {
    name: 'IRON',
    tag: 'Automação industrial',
    description: 'Conecta chão de fábrica, dados e decisões em tempo real.',
    accent: '#7ad0ff',
  },
  {
    name: 'CampaIA',
    tag: 'Marketing com IA',
    description: 'Planeja, executa e otimiza campanhas com inteligência aplicada.',
    accent: '#6fe3d1',
  },
  {
    name: 'NFCore',
    tag: 'Fiscal & documentos',
    description: 'Emissão e gestão fiscal integradas ao restante do ecossistema.',
    accent: '#a68bff',
  },
]

export default function Products() {
  return (
    <section className="products" id="produtos">
      <div className="products__header">
        <p className="eyebrow">ECOSSISTEMA FM</p>
        <h2>Um núcleo. Vários produtos especializados.</h2>
      </div>

      <div className="products__grid">
        {products.map((product) => (
          <article
            key={product.name}
            className="product-card"
            style={{ ['--accent' as string]: product.accent }}
          >
            <div className="product-card__glow" aria-hidden="true" />
            <p className="product-card__tag">{product.tag}</p>
            <h3>{product.name}</h3>
            <p className="product-card__desc">{product.description}</p>
            <span className="product-card__link">Saiba mais →</span>
          </article>
        ))}
      </div>
    </section>
  )
}
