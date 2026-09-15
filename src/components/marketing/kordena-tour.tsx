const tourViews = [
  {
    title: "Operação e pedidos",
    text: "Visão preparada para mostrar salão, balcão, PDV, pedidos, produção e expedição no fluxo operacional.",
    label: "Operação",
  },
  {
    title: "Estoque e prevenção de perdas",
    text: "Espaço reservado para apresentar inventário, movimentações, níveis mínimos, validades e sinais de risco.",
    label: "Estoque",
  },
  {
    title: "Financeiro e visão do proprietário",
    text: "Área preparada para receber telas de faturamento, recebimentos, custos, estoque, margens, lucros e previsões.",
    label: "Financeiro",
  },
  {
    title: "Gerente IA Core",
    text: "Espaço destinado às telas e interações que mostram alertas, consultas, análises e recomendações apoiadas pelos dados da operação.",
    label: "Core",
  },
];

export function KordenaTour() {
  return (
    <section id="tour" className="section kordena-tour-section">
      <div className="container">
        <div className="landing-heading kordena-heading-wide">
          <p className="eyebrow">Tour do produto</p>
          <h2>Conheça as principais áreas que formam a experiência do Kordena.</h2>
          <p>Esta galeria já está preparada para receber capturas reais do sistema. Enquanto as imagens definitivas são selecionadas, cada quadro identifica exatamente qual parte do produto será demonstrada.</p>
        </div>
        <div className="kordena-tour-grid">
          {tourViews.map((view, index) => (
            <article className={`kordena-tour-card ${index === 0 ? "kordena-tour-card--featured" : ""}`} key={view.title}>
              <div className="kordena-tour-frame" aria-label={`Espaço reservado para screenshot de ${view.title}`}>
                <div className="kordena-tour-windowbar" aria-hidden="true"><i /><i /><i /><span>Kordena</span></div>
                <div className="kordena-tour-skeleton" aria-hidden="true">
                  <span className="kordena-tour-sidebar" />
                  <div><b /><b /><b /><b /></div>
                </div>
                <em>Screenshot real em preparação</em>
              </div>
              <div className="kordena-tour-copy">
                <span>{view.label}</span>
                <h3>{view.title}</h3>
                <p>{view.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
