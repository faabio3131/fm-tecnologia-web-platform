import type React from 'react'
import HeroVisual from './HeroVisual'

const differentiators = [
  { icon: 'brain', label: 'IA + automação' },
  { icon: 'layers', label: 'Produtos verticais' },
  { icon: 'trend', label: 'Arquitetura preparada para crescer' },
]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__ambient" aria-hidden="true">
        <span className="hero__ambient-blob hero__ambient-blob--a" />
        <span className="hero__ambient-blob hero__ambient-blob--b" />
      </div>

      <div className="hero__grid">
        <div className="hero__content">
          <p className="eyebrow reveal-in" style={{ animationDelay: '0.05s' }}>
            FM TECNOLOGIA · IA · AUTOMAÇÃO · SOFTWARE
          </p>

          <h1 className="hero__headline reveal-in" style={{ animationDelay: '0.15s' }}>
            Tecnologia que conecta operação, <span className="hero__headline-accent">dados e inteligência.</span>
          </h1>

          <p className="hero__description reveal-in" style={{ animationDelay: '0.25s' }}>
            Desenvolvemos produtos inteligentes para transformar processos,
            acelerar decisões e preparar operações para crescer.
          </p>

          <div className="hero__actions reveal-in" style={{ animationDelay: '0.35s' }}>
            <button className="btn btn--primary btn--lg" type="button">
              Conhecer produtos
            </button>
            <button className="btn btn--outline btn--lg" type="button">
              Falar com a FM
            </button>
          </div>

          <ul className="hero__differentiators reveal-in" style={{ animationDelay: '0.45s' }}>
            {differentiators.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual reveal-in" style={{ animationDelay: '0.2s' }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactElement> = {
    brain: (
      <path d="M8 3.5a2.5 2.5 0 0 1 4 2v1.2a2.5 2.5 0 0 1 4 2.05c.9.36 1.5 1.24 1.5 2.25 0 .58-.2 1.1-.53 1.53.33.43.53.96.53 1.53 0 1.27-.98 2.3-2.22 2.4A2.5 2.5 0 0 1 12 19.5a2.5 2.5 0 0 1-4-2v-11a2.5 2.5 0 0 1 0-3z" />
    ),
    layers: (
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Zm-9 8 9 4.5 9-4.5M3 15.5l9 4.5 9-4.5" />
    ),
    trend: <path d="M4 17 10 11 14 15 20 7M20 7h-5M20 7v5" />,
  }

  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}
