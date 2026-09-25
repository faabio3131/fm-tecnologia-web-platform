const suggestions = [
  { icon: 'grid', label: 'Conhecer os produtos' },
  { icon: 'compass', label: 'Qual solução é ideal para minha empresa?' },
  { icon: 'spark', label: 'Ver soluções com IA' },
  { icon: 'chat', label: 'Falar com a FM' },
]

/**
 * Demonstração puramente visual do conceito do Core.
 * Sem integração com LLM, API ou backend — apenas composição estática.
 */
export default function CoreAssistant() {
  return (
    <section className="assistant" id="core-assistant" aria-label="Demonstração do Core, gerente de IA da FM">
      <div className="assistant__intro">
        <p className="eyebrow">GERENTE DE IA</p>
        <h2>Converse com o Core</h2>
        <p className="assistant__intro-text">
          Uma inteligência cognitiva que conhece o ecossistema FM e ajuda a
          encontrar o caminho certo dentro dele — em segundos.
        </p>
      </div>

      <div className="assistant__panel">
        <header className="assistant__header">
          <div className="assistant__avatar" aria-hidden="true">
            <span className="assistant__avatar-core" />
            <span className="assistant__avatar-ring" />
          </div>
          <div className="assistant__identity">
            <span className="assistant__name">Core · FM Tecnologia</span>
            <span className="assistant__status">
              <span className="assistant__status-dot" aria-hidden="true" />
              Online agora
            </span>
          </div>
        </header>

        <div className="assistant__bubble">
          <p className="assistant__greeting">Olá, eu sou o Core, seu gerente de IA.</p>
          <p className="assistant__text">
            Sou a inteligência cognitiva da FM Tecnologia. Posso ajudar você a
            conhecer nossos produtos, encontrar a solução mais adequada para
            sua empresa e explorar nosso ecossistema.
          </p>
        </div>

        <div className="assistant__suggestions">
          {suggestions.map((item) => (
            <button key={item.label} type="button" className="chip">
              <SuggestionIcon name={item.icon} />
              {item.label}
            </button>
          ))}
        </div>

        <form
          className="assistant__composer"
          onSubmit={(event) => event.preventDefault()}
          aria-label="Demonstração visual — envio desabilitado"
        >
          <input
            type="text"
            className="assistant__input"
            placeholder="Pergunte algo ao Core…"
            disabled
            aria-disabled="true"
          />
          <button type="submit" className="assistant__send" disabled aria-disabled="true" aria-label="Enviar mensagem">
            <SendIcon />
          </button>
        </form>
      </div>
    </section>
  )
}

function SuggestionIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    compass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 6.5-2 5-5 2 2-5 5-2Z',
    spark: 'M12 2.5c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z',
    chat: 'M4 5h16v11H8l-4 4V5Z',
  }

  return (
    <svg viewBox="0 0 24 24" className="chip__icon" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 20 4l-6 16-3-7-7-1Z" />
    </svg>
  )
}
