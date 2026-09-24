import { useEffect, useRef } from 'react'

/**
 * Composição premium do "FM Core": núcleo hexagonal em vidro/metal com o
 * monograma FM, uma malha neural holográfica orbitando acima, e anéis
 * orbitais metálicos concêntricos. Tudo em SVG + CSS (sem WebGL) para
 * garantir nitidez, leveza e acabamento consistente em qualquer GPU.
 */
export default function CoreVisual() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const handlePointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width - 0.5
      const relY = (event.clientY - rect.top) / rect.height - 0.5
      target.current = { x: relX, y: relY }
    }

    const handlePointerLeave = () => {
      target.current = { x: 0, y: 0 }
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06
      current.current.y += (target.current.y - current.current.y) * 0.06

      const rotY = current.current.x * 14
      const rotX = current.current.y * -10
      const shiftX = current.current.x * 18
      const shiftY = current.current.y * 14

      stage.style.setProperty('--rot-x', `${rotX}deg`)
      stage.style.setProperty('--rot-y', `${rotY}deg`)
      stage.style.setProperty('--shift-x', `${shiftX}px`)
      stage.style.setProperty('--shift-y', `${shiftY}px`)

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

  const neuralNodes = generateNeuralNodes()

  return (
    <div className="core-stage" ref={stageRef}>
      <div className="core-stage__glow" aria-hidden="true" />

      <div className="core-stage__parallax">
        {/* Anéis orbitais metálicos */}
        <div className="core-rings" aria-hidden="true">
          <div className="core-ring core-ring--outer" />
          <div className="core-ring core-ring--mid" />
          <div className="core-ring core-ring--inner" />
          <div className="core-ring core-ring--tilt" />
        </div>

        {/* Partículas flutuantes */}
        <div className="core-particles" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`core-particle core-particle--${i % 6}`} />
          ))}
        </div>

        {/* Malha neural holográfica */}
        <svg
          className="neural-mesh"
          viewBox="0 0 360 260"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id="neuralGlow" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#bfe6ff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#5fb3ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1c4f8f" stopOpacity="0" />
            </radialGradient>
            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.1" />
            </filter>
          </defs>

          <ellipse cx="180" cy="120" rx="150" ry="105" fill="url(#neuralGlow)" />

          {neuralNodes.edges.map(([a, b], i) => (
            <line
              key={i}
              x1={neuralNodes.points[a].x}
              y1={neuralNodes.points[a].y}
              x2={neuralNodes.points[b].x}
              y2={neuralNodes.points[b].y}
              stroke="#8fd3ff"
              strokeOpacity={0.25}
              strokeWidth={0.6}
            />
          ))}

          {neuralNodes.points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#eaf6ff"
              filter="url(#softBlur)"
              className="neural-node"
              style={{ animationDelay: `${(i % 9) * 0.35}s` }}
            />
          ))}
        </svg>

        {/* Núcleo hexagonal em vidro/metal */}
        <div className="core-hex">
          <svg viewBox="0 0 220 220" className="core-hex__svg" aria-hidden="true">
            <defs>
              <linearGradient id="metalEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3c4a5e" />
                <stop offset="45%" stopColor="#0d1620" />
                <stop offset="100%" stopColor="#020509" />
              </linearGradient>
              <linearGradient id="glassFace" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#123457" />
                <stop offset="55%" stopColor="#08192b" />
                <stop offset="100%" stopColor="#01070d" />
              </linearGradient>
              <radialGradient id="hexInnerGlow" cx="50%" cy="42%" r="60%">
                <stop offset="0%" stopColor="#7fd0ff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7fd0ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            <polygon
              points="110,6 202,58 202,162 110,214 18,162 18,58"
              fill="url(#metalEdge)"
              stroke="#5c7690"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <polygon
              points="110,22 188,66 188,154 110,198 32,154 32,66"
              fill="url(#glassFace)"
              stroke="#79b8ec"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <polygon
              points="110,22 188,66 188,154 110,198 32,154 32,66"
              fill="url(#hexInnerGlow)"
            />
          </svg>

          <div className="core-hex__mark">
            <span className="core-hex__fm">FM</span>
            <span className="core-hex__label">FM Tecnologia</span>
          </div>

          <div className="core-hex__beam" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function generateNeuralNodes() {
  const points = [
    { x: 180, y: 40, r: 2.6 },
    { x: 150, y: 55, r: 2 },
    { x: 210, y: 55, r: 2 },
    { x: 120, y: 78, r: 1.8 },
    { x: 180, y: 70, r: 3 },
    { x: 240, y: 78, r: 1.8 },
    { x: 100, y: 108, r: 2 },
    { x: 150, y: 100, r: 2.2 },
    { x: 210, y: 100, r: 2.2 },
    { x: 260, y: 108, r: 2 },
    { x: 130, y: 130, r: 1.6 },
    { x: 180, y: 122, r: 2.6 },
    { x: 230, y: 130, r: 1.6 },
    { x: 160, y: 150, r: 1.8 },
    { x: 200, y: 150, r: 1.8 },
  ]

  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
    [3, 6], [3, 7], [4, 7], [4, 8], [5, 8], [5, 9],
    [6, 10], [7, 10], [7, 11], [8, 11], [8, 12], [9, 12],
    [10, 13], [11, 13], [11, 14], [12, 14], [1, 7], [2, 8],
  ]

  return { points, edges }
}
