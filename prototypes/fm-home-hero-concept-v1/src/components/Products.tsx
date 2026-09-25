const products = [
  {
    name: 'Kordena',
    tag: 'Gestão operacional',
    description: 'Orquestra processos e times em uma operação única e visível.',
    accent: '#3b82f6',
    icon: 'orchestrate',
  },
  {
    name: 'IRON',
    tag: 'Academias & fitness',
    description: 'Gestão completa para academias e estúdios: alunos, planos, acesso e treino em um só lugar.',
    accent: '#22d3ee',
    icon: 'fitness',
  },
  {
    name: 'CampaIA',
    tag: 'Marketing com IA',
    description: 'Planeja, executa e otimiza campanhas com inteligência aplicada.',
    accent: '#60a5fa',
    icon: 'campaign',
  },
  {
    name: 'NFCore',
    tag: 'Fiscal & documentos',
    description: 'Emissão e gestão fiscal integradas ao restante do ecossistema.',
    accent: '#38bdf8',
    icon: 'document',
  },
]

export default function Products() {
  return (
    <section className="products" id="produtos">
      <div className="products__header">
        <p className="eyebrow">ECOSSISTEMA FM</p>
        <h2>Um núcleo. Vários produtos especializados.</h2>
        <p className="products__intro-text">
          Cada produto resolve uma vertical específica — todos conectados pelo
          mesmo Core de inteligência e dados.
        </p>
      </div>

      <div className="products__grid">
        {products.map((product) => (
          <article
            key={product.name}
            className="product-card"
            style={{ ['--accent' as string]: product.accent }}
          >
            <div className="product-card__glow" aria-hidden="true" />
            <div className="product-card__icon-wrap">
              <ProductIcon name={product.icon} />
            </div>
            <p className="product-card__tag">{product.tag}</p>
            <h3>{product.name}</h3>
            <p className="product-card__desc">{product.description}</p>
            <span className="product-card__link">
              Saiba mais
              <ArrowIcon />
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProductIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    orchestrate: 'M12 3v6M12 15v6M5 12H3M21 12h-2M7.5 7.5 6 6M18 18l-1.5-1.5M16.5 7.5 18 6M6 18l1.5-1.5M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    fitness: 'M6.5 8v8M17.5 8v8M4 10v4M20 10v4M8 12h8',
    campaign: 'M4 10v4h3l6 4V6l-6 4H4ZM17 9a4 4 0 0 1 0 6',
    document: 'M7 3h7l4 4v14H7V3ZM14 3v4h4M9 12h6M9 16h6',
  }

  return (
    <svg viewBox="0 0 24 24" className="product-card__icon" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="product-card__arrow" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
