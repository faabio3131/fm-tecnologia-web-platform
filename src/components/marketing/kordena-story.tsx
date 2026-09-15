const coreAreas = [
  "Atendimento",
  "Salão e comandas",
  "PDV e vendas",
  "Produção e KDS",
  "Delivery",
  "Estoque",
  "Financeiro",
  "CRM e marketing",
];

const orderFlow = [
  "Pedido",
  "Produção",
  "Consumo de insumos",
  "Estoque",
  "Pagamento",
  "Receita e custo",
  "Margem",
  "Financeiro",
  "Gestão",
];

const coreQuestions = [
  "Quais produtos apresentam maior risco de perda?",
  "Quais insumos estão próximos do vencimento?",
  "Qual o valor financeiro atual do meu estoque?",
  "Como está meu faturamento hoje?",
  "Qual é meu lucro real?",
  "Existe algum pedido atrasado?",
  "Quais clientes estão há mais tempo sem comprar?",
  "Existe oportunidade de promoção baseada no estoque atual?",
];

export function KordenaStory() {
  return (
    <>
      <section id="core" className="section kordena-core-section">
        <div className="container kordena-core-grid">
          <div className="kordena-core-copy">
            <p className="eyebrow">Gerente IA Core</p>
            <h2>O cérebro que conecta toda a sua operação.</h2>
            <p>
              O Kordena não trata atendimento, produção, estoque e financeiro como áreas isoladas. O Gerente IA Core relaciona os dados da operação para ajudar sua equipe a acompanhar o que está acontecendo, identificar riscos e transformar informação em decisão.
            </p>
            <p>
              Um pedido pode movimentar o caixa, gerar produção, consumir insumos, alterar estoque, criar receita, gerar custo e impactar a margem. O Core conecta essas consequências para que o proprietário enxergue o negócio de ponta a ponta.
            </p>
          </div>
          <div className="kordena-core-map" aria-label="Áreas conectadas pelo Gerente IA Core">
            <div className="kordena-core-center kordena-core-center--brandmark" aria-hidden="true">
              <img className="kordena-core-brandmark kordena-core-brandmark--static" src="/kordena-core-approved.webp" alt="" />
            </div>
            <div className="kordena-core-areas">
              {coreAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="fluxo" className="section section--surface">
        <div className="container">
          <div className="landing-heading kordena-heading-wide">
            <p className="eyebrow">Uma venda movimenta todo o negócio</p>
            <h2>Da primeira ação ao resultado financeiro.</h2>
            <p>O Kordena acompanha as relações que existem entre a operação e o resultado para reduzir fragmentação e dar contexto às decisões.</p>
          </div>
          <ol className="kordena-flow" aria-label="Fluxo de uma venda no Kordena">
            {orderFlow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>

      <section id="estoque-inteligente" className="section">
        <div className="container kordena-dual-grid">
          <article className="kordena-impact-card kordena-impact-card--dark">
            <p className="eyebrow">Estoque inteligente</p>
            <h2>Produto parado também é dinheiro parado.</h2>
            <p>Inventário, movimentações, estoque mínimo, reservas, validade e valor financeiro deixam de ser controles separados e passam a fazer parte da mesma visão.</p>
            <div className="kordena-action-chain"><span>Risco detectado</span><b>→</b><span>Alerta</span><b>→</b><span>Sugestão</span><b>→</b><span>Ação</span></div>
            <p>Produtos e insumos próximos do vencimento podem gerar alertas e, quando aplicável, sugestões de ações promocionais para favorecer o aproveitamento dentro das condições adequadas de validade e segurança.</p>
          </article>
          <article className="kordena-impact-card">
            <p className="eyebrow">Proteção de margem</p>
            <h2>Antecipe o problema antes que ele vire prejuízo.</h2>
            <p>Vencimento, excesso de estoque, falta de insumos, retrabalho, compras inadequadas e decisões sem informação podem corroer o resultado pouco a pouco.</p>
            <ul><li>Identifique riscos de falta e perda.</li><li>Visualize itens próximos do vencimento.</li><li>Relacione estoque, vendas e custos.</li><li>Use sinais da operação para agir mais cedo.</li></ul>
          </article>
        </div>
      </section>

      <section id="financeiro" className="section section--surface">
        <div className="container kordena-finance-grid">
          <div>
            <p className="eyebrow">Gestão financeira em tempo real</p>
            <h2>Faturamento não é lucro.</h2>
            <p>O proprietário precisa enxergar a relação entre o que vende, o que custa operar, o capital mantido em estoque e o resultado que realmente sobra. O Kordena aproxima essa leitura da rotina diária do estabelecimento.</p>
          </div>
          <div className="kordena-finance-metrics">
            {['Faturamento','Recebimentos','Pendências','Estornos','Ticket médio','Custos','Valor em estoque','Margens','Lucro real','Projeções e previsões'].map(item => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section id="eficiencia" className="section kordena-efficiency-section">
        <div className="container kordena-efficiency-grid">
          <div>
            <p className="eyebrow">Eficiência operacional</p>
            <h2>Menos tarefas manuais. Mais inteligência trabalhando pelo seu negócio.</h2>
            <p>O Kordena centraliza e automatiza atividades que normalmente consomem horas da equipe: conferências, acompanhamento de estoque, cruzamento de informações, consultas financeiras, relatórios e monitoramento operacional.</p>
            <p>Isso pode reduzir retrabalho, diminuir a dependência de controles paralelos e permitir que a equipe concentre tempo em atividades de maior valor para o cliente e para o crescimento da empresa.</p>
          </div>
          <div className="kordena-efficiency-list">{['Conferências e consolidação de dados','Acompanhamento de pedidos e produção','Monitoramento de estoque e validade','Verificação de vendas e indicadores','Identificação de riscos operacionais','Relatórios e acompanhamento financeiro'].map(item => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section id="core-em-acao" className="section section--surface">
        <div className="container">
          <div className="landing-heading kordena-heading-wide"><p className="eyebrow">Core em ação</p><h2>Informação útil no momento de decidir.</h2><p>Exemplos de perguntas, alertas e análises que representam a experiência inteligente do Kordena, sempre apoiada pelos dados disponíveis na operação e mantendo as decisões sob controle humano.</p></div>
          <div className="kordena-prompt-grid">{coreQuestions.map(question => <blockquote key={question}>“{question}”</blockquote>)}</div>
        </div>
      </section>
    </>
  );
}
