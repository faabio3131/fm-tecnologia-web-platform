import { Suspense, lazy, useEffect, useRef } from 'react'
import heroCore from '../assets/hero-core.webp'
import { CanvasErrorBoundary } from '../three/CanvasErrorBoundary'
import { useIsCompactViewport, useReducedMotion, useWebGLSupport } from '../hooks/useMediaFlags'

/**
 * V4 do visual do Hero: o asset 2D (V2/V3) dá lugar a uma cena 3D real
 * (three.js via @react-three/fiber) do Core — mesma composição, mesma
 * máscara/glow/partículas, mesmas placas operacionais ao redor. Cai para
 * a imagem estática quando WebGL não está disponível ou falha em runtime.
 */
const PLATES = [
  { label: 'Atendimento', position: 'top' },
  { label: 'Vendas', position: 'upper-right' },
  { label: 'Estoque', position: 'lower-right' },
  { label: 'Produção', position: 'bottom' },
  { label: 'Financeiro', position: 'lower-left' },
  { label: 'Clientes', position: 'upper-left' },
] as const

const CoreScene3D = lazy(() => import('../three/CoreScene3D'))

export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const hasWebGL = useWebGLSupport()
  const reducedMotion = useReducedMotion()
  const isCompact = useIsCompactViewport()
  const use3D = hasWebGL

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
    <div className="hero-visual" ref={stageRef} data-mode={use3D ? '3d' : 'image'}>
      <div className="hero-visual__glow" aria-hidden="true" />

      <div className="hero-visual__particles" aria-hidden="true">
        <span className="hv-particle hv-particle--0" />
        <span className="hv-particle hv-particle--1" />
        <span className="hv-particle hv-particle--2" />
      </div>

      {use3D ? (
        <div className="hero-visual__canvas-wrap">
          <CanvasErrorBoundary fallback={<StaticCoreImage />}>
            <Suspense fallback={null}>
              <CoreScene3D quality={isCompact ? 'low' : 'high'} reducedMotion={reducedMotion} />
            </Suspense>
          </CanvasErrorBoundary>
        </div>
      ) : (
        <StaticCoreImage />
      )}

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
