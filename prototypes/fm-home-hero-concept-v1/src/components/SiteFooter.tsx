const columns = [
  {
    title: 'Produto',
    links: ['Kordena', 'IRON', 'CampaIA', 'NFCore'],
  },
  {
    title: 'Empresa',
    links: ['Sobre a FM', 'Carreiras', 'Contato'],
  },
  {
    title: 'Recursos',
    links: ['Documentação', 'Status', 'Suporte'],
  },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <a className="brand" href="#top">
            <span className="brand__mark">FM</span>
            <span className="brand__name">FM Tecnologia</span>
          </a>
          <p className="site-footer__tagline">
            Tecnologia que conecta operação, dados e inteligência.
          </p>
        </div>

        <div className="site-footer__columns">
          {columns.map((column) => (
            <div key={column.title} className="site-footer__column">
              <span className="site-footer__column-title">{column.title}</span>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#top">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} FM Tecnologia. Todos os direitos reservados.</span>
        <span className="site-footer__badge">Protótipo isolado — não integrado ao site oficial</span>
      </div>
    </footer>
  )
}
