export default function CtaFinal() {
  return (
    <section className="cta-final">
      <div className="cta-final__panel">
        <div className="cta-final__glow" aria-hidden="true" />
        <div className="cta-final__content">
          <p className="eyebrow">FM TECNOLOGIA</p>
          <h2>Pronto para conectar sua operação?</h2>
          <p className="cta-final__text">
            Fale com a FM e veja como o Core pode se encaixar na sua operação
            — do atendimento ao financeiro.
          </p>
        </div>
        <div className="cta-final__actions">
          <button className="btn btn--primary btn--lg" type="button">
            Conhecer produtos
          </button>
          <button className="btn btn--outline btn--lg" type="button">
            Falar com a FM
          </button>
        </div>
      </div>
    </section>
  )
}
