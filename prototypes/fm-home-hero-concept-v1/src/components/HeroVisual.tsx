import { useEffect, useRef } from 'react'
import heroCore from '../assets/hero-core.webp'

/**
 * V3 do visual do Hero: mantém a imagem premium como asset principal
 * (V2) e adiciona as placas operacionais aprovadas ao redor do Core,
 * um sweep de luz sutil para reforçar a sensação de "banner vivo", e
 * mantém glow/partículas/parallax controlados.
 */
const PLATES = [
  { label: 'Atendimento', position: 'top' },
  { label: 'Vendas', position: 'upper-right' },
  { label: 'Estoque', position: 'lower-right' },
  { label: 'Produção', position: 'bottom' },
  { label: 'Financeiro', position: 'lower-left' },
  { label: 'Clientes', position: 'upper-left' },
] as const

export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

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

      stage.style.setProperty('--shift-x', `${current.current.x * 14}px`)
      stage.style.setProperty('--shift-y', `${current.current.y * 10}px`)
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
    <div className="hero-visual" ref={stageRef}>
      <div className="hero-visual__glow" aria-hidden="true" />

      <div className="hero-visual__particles" aria-hidden="true">
        <span className="hv-particle hv-particle--0" />
        <span className="hv-particle hv-particle--1" />
        <span className="hv-particle hv-particle--2" />
      </div>

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
