import { useEffect, useRef, useState } from 'react'
import heroCore from '../assets/hero-core.webp'
import coreLoopVideo from '../assets/core-loop.webm'
import { useReducedMotion } from '../hooks/useMediaFlags'

/**
 * V6 do visual do Hero: em vez de reconstruir o Core ao vivo em WebGL
 * (teto de fidelidade do tempo real — ver V4/V4.1/V5 no histórico do
 * git), o MESMO modelo 3D modelado no Blender (blender/build_core.py)
 * é renderizado offline em Cycles (path-tracing) e usado como um loop
 * de vídeo curto — luz/vidro/reflexo muito mais próximos da V3, ainda
 * vindos de um asset 3D real. Cai para a imagem estática se o vídeo
 * falhar ao carregar, ou fica parado no primeiro frame com
 * prefers-reduced-motion.
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const reducedMotion = useReducedMotion()
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion) {
      // mantém a cena visível (primeiro frame), só para a animação
      const pauseAtStart = () => {
        video.currentTime = 0
        video.pause()
      }
      if (video.readyState >= 1) pauseAtStart()
      else video.addEventListener('loadedmetadata', pauseAtStart, { once: true })
    } else {
      video.play().catch(() => {
        /* autoplay bloqueado por alguma política do navegador — segue com o poster */
      })
    }
  }, [reducedMotion])

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

  const useVideo = !videoFailed

  return (
    <div className="hero-visual" ref={stageRef} data-mode={useVideo ? 'video' : 'image'}>
      <div className="hero-visual__glow" aria-hidden="true" />

      <div className="hero-visual__particles" aria-hidden="true">
        <span className="hv-particle hv-particle--0" />
        <span className="hv-particle hv-particle--1" />
        <span className="hv-particle hv-particle--2" />
      </div>

      {useVideo ? (
        <div className="hero-visual__video-wrap">
          <video
            ref={videoRef}
            className="hero-visual__video"
            src={coreLoopVideo}
            poster={heroCore}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-label="FM Core — inteligência artificial conectando dados e operação"
            onError={() => setVideoFailed(true)}
          />
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
