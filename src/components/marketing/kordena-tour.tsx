import { KordenaIntegrations } from "./kordena-integrations";

export function KordenaTour() {
  return (
    <>
      <section id="tour" className="section kordena-tour-section">
        <div className="container">
          <div className="landing-heading kordena-heading-wide">
            <p className="eyebrow">Tour do produto</p>
            <h2>Conheça as principais áreas que formam a experiência do Kordena.</h2>
            <p>Esta galeria já está preparada para receber capturas reais do sistema. Enquanto as imagens definitivas são selecionadas, cada quadro identifica exatamente qual parte do produto será demonstrada.</p>
          </div>
          <div className="kordena-tour-grid">
            <article className="kordena-tour-card kordena-tour-card--featured"><div className="kordena-tour-frame"><em>Screenshot real em preparação</em></div><div className="kordena-tour-copy"><span>Operação</span><h3>Operação e pedidos</h3><p>Visão preparada para mostrar salão, balcão, PDV, pedidos, produção e expedição no fluxo operacional.</p></div></article>
            <article className="kordena-tour-card"><div className="kordena-tour-frame"><em>Screenshot real em preparação</em></div><div className="kordena-tour-copy"><span>Estoque</span><h3>Estoque e prevenção de perdas</h3><p>Espaço reservado para apresentar inventário, movimentações, níveis mínimos, validades e sinais de risco.</p></div></article>
            <article className="kordena-tour-card"><div className="kordena-tour-frame"><em>Screenshot real em preparação</em></div><div className="kordena-tour-copy"><span>Financeiro</span><h3>Financeiro e visão do proprietário</h3><p>Área preparada para receber telas de faturamento, recebimentos, custos, estoque, margens, lucros e previsões.</p></div></article>
            <article className="kordena-tour-card"><div className="kordena-tour-frame"><em>Screenshot real em preparação</em></div><div className="kordena-tour-copy"><span>Core</span><h3>Gerente IA Core</h3><p>Espaço destinado às telas e interações que mostram alertas, consultas, análises e recomendações apoiadas pelos dados da operação.</p></div></article>
          </div>
        </div>
      </section>
      <KordenaIntegrations />
    </>
  );
}
