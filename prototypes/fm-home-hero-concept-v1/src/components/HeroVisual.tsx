import { useEffect, useRef, useState } from 'react'
import heroCore from '../assets/hero-core.webp'
import coreCore from '../assets/core-captions/core-core.webp'
import coreKordena from '../assets/core-captions/core-kordena.webp'
import coreGerenteIa from '../assets/core-captions/core-gerente-ia.webp'
import coreFmTecnologia from '../assets/core-captions/core-fm-tecnologia.webp'
import coreTotalControle from '../assets/core-captions/core-total-controle.webp'
import { useReducedMotion } from '../hooks/useMediaFlags'

/**
 * V7 do visual do Hero: a MESMA imagem aprovada da V3, em 5 cópias —
 * cada uma só com um selo/legenda diferente sobreposto (Core — em
 * destaque, Kordena, Gerente IA, FM Tecnologia, Total controle). Nenhum
 * pixel novo do Core em si foi gerado, só o selo de texto por cima.
 * O "giro" é um carrossel com flip 3D (perspective + rotateY) trocando
 * entre as 5, não uma reconstrução 3D da cena.
 */
const SLIDES = [
  { src: coreCore, label: 'Core' },
  { src: coreKordena, label: 'Kordena' },
  { src: coreGerenteIa, label: 'Gerente IA' },
  { src: coreFmTecnologia, label: 'FM Tecnologia' },
  { src: coreTotalControle, label: 'Total controle' },
] as const

const PLATES = [
  { label: 'Atendimento', position: 'top' },
  { label: 'Vendas', position: 'upper-right' },
  { label: 'Estoque', position: 'lower-right' },
  { label: 'Produção', position: 'bottom' },
  { label: 'Financeiro', position: 'lower-left' },
  { label: 'Clientes', position: 'upper-left' },
] as const

const SLIDE_INTERVAL_MS = 3600

export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (reducedMotion || failed) return
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [reducedMotion, failed])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const handlePointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      target.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      }
    }

    const handlePointerLeave = () => {
      target.current = { x: 0, y: 0 }
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05
      current.current.y += (target.current.y - current.current.y) * 0.05

      stage.style.setProperty('--shift-x-soft', `${current.current.x * 6}px`)
      stage.style.setProperty('--shift-y-soft', `${current.current.y * 4}px`)

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handlePointerMove)
    stage.addEventListener('pointerleave', handlePointerLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      stage.removeEventListener('pointerleave', handlePointerLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="hero-visual" ref={stageRef} data-mode={failed ? 'image' : 'carousel'}>
      <div className="hero-visual__glow" aria-hidden="true" />

      <div className="hero-visual__particles" aria-hidden="true">
        <span className="hv-particle hv-particle--0" />
        <span className="hv-particle hv-particle--1" />
        <span className="hv-particle hv-particle--2" />
      </div>

      {failed ? (
        <StaticCoreImage />
      ) : (
        <div className="hero-visual__flip-wrap">
          {SLIDES.map((slide, i) => {
            const offset = i - activeIndex
            const state = offset === 0 ? 'active' : offset === -1 || offset === SLIDES.length - 1 ? 'prev' : 'next'
            return (
              <img
                key={slide.label}
                src={slide.src}
                alt={
                  i === 0
                    ? 'FM Core — inteligência artificial conectando dados e operação'
                    : ''
                }
                aria-hidden={i === 0 ? undefined : true}
                className={`hero-visual__flip-slide hero-visual__flip-slide--${state}`}
                width={1536}
                height={1536}
                onError={() => setFailed(true)}
              />
            )
          })}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {SLIDES[activeIndex].label}
      </p>

      <div className="hero-plates" aria-label="Áreas conectadas pelo FM Core">
        {PLATES.map((plate, index) => (
          <span
            key={plate.label}
            className={`hero-plate hero-plate--${plate.position}`}
            style={{ animationDelay: `${0.5 + index * 0.12}s` }}
          >
            {plate.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function StaticCoreImage() {
  return (
    <div className="hero-visual__image-wrap">
      <img
        src={heroCore}
        alt="FM Core — inteligência artificial conectando dados e operação"
        className="hero-visual__image"
        width={1536}
        height={1536}
      />
      <div className="hero-visual__sweep" aria-hidden="true" />
      <div className="hero-visual__reflection" aria-hidden="true" />
    </div>
  )
}
