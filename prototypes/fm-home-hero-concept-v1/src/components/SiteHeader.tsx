export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top">
          <span className="brand__mark">FM</span>
          <span className="brand__name">FM Tecnologia</span>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#produtos">Produtos</a>
          <a href="#solucoes">Soluções</a>
          <a href="#precos">Preços</a>
          <a href="#recursos">Recursos</a>
          <a href="#empresa">Empresa</a>
        </nav>

        <div className="site-header__actions">
          <button className="btn btn--ghost" type="button">
            Entrar
          </button>
          <button className="btn btn--primary" type="button">
            Comece grátis
          </button>
        </div>
      </div>
    </header>
  )
}
