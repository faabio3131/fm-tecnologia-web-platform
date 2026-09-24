const suggestions = [
  'Conhecer os produtos',
  'Qual solução é ideal para minha empresa?',
  'Ver soluções com IA',
  'Falar com a FM',
]

/**
 * Demonstração puramente visual do conceito de assistente do Core.
 * Sem integração com LLM, API ou backend — apenas composição estática.
 */
export default function CoreAssistant() {
  return (
    <section className="assistant" aria-label="Demonstração do Core, assistente de IA da FM">
      <div className="assistant__panel">
        <div className="assistant__avatar" aria-hidden="true">
          <span className="assistant__avatar-core" />
        </div>

        <div className="assistant__body">
          <p className="assistant__greeting">Olá, eu sou o Core.</p>
          <p className="assistant__text">
            Sou a camada de inteligência da FM Tecnologia. Posso ajudar você a
            conhecer nossos produtos, encontrar a solução mais adequada para
            sua empresa e explorar nosso ecossistema.
          </p>

          <div className="assistant__suggestions">
            {suggestions.map((label) => (
              <button key={label} type="button" className="chip">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
