import type React from 'react'
import { useEffect, useRef } from 'react'
import heroCore from '../assets/hero-core.webp'

/**
 * V2 do visual do Hero: usa uma imagem premium/renderizada como asset
 * principal (fornecida pela FM), em vez de reconstruir o "Core" em
 * SVG/CSS ou WebGL. Em torno dela: glow controlado, partículas discretas,
 * parallax leve por ponteiro e 2-3 cards flutuantes em HTML/CSS.
 */
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
        <div className="hero-visual__reflection" aria-hidden="true" />
      </div>

      <FloatingCard className="float-card float-card--metrics" delay="0s">
        <BarIcon />
        <div>
          <span className="float-card__label">Operação</span>
          <span className="float-card__value">+34% eficiência</span>
        </div>
      </FloatingCard>

      <FloatingCard className="float-card float-card--trend" delay="1.4s">
        <TrendIcon />
        <div>
          <span className="float-card__label">Decisões</span>
          <span className="float-card__value">Tempo real</span>
        </div>
      </FloatingCard>

      <FloatingCard className="float-card float-card--ai" delay="0.7s">
        <SparkIcon />
        <span className="float-card__label">IA aplicada</span>
      </FloatingCard>
    </div>
  )
}

function FloatingCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className: string
  delay: string
}) {
  return (
    <div className={className} style={{ animationDelay: delay }} aria-hidden="true">
      {children}
    </div>
  )
}

function BarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="float-card__icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 19V10M12 19V5M19 19v-6" />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="float-card__icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16 9.5 10.5 13.5 14.5 20 8M20 8h-4.5M20 8v4.5" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="float-card__icon" fill="currentColor">
      <path d="M12 2.5c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
    </svg>
  )
}
