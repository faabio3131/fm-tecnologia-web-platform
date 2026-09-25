import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { createFmLabelTexture } from './labelTexture'

const METAL_COLOR = '#8a97a6'
const GLASS_COLOR = '#1c4f8f'
const CYAN = '#8fd3ff'
const CYAN_BRIGHT = '#bfe6ff'

interface SceneProps {
  quality: 'high' | 'low'
  reducedMotion: boolean
}

export default function CoreScene3D({ quality, reducedMotion }: SceneProps) {
  const isLow = quality === 'low'

  return (
    <Canvas
      dpr={[1, isLow ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [1.35, 0.35, 6.1], fov: 32 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.32} color="#9fc4ea" />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-3.2, 1.2, -1.8]} intensity={12} color="#4fb0ff" distance={11} />
      <pointLight position={[2.2, -1.8, 3]} intensity={4} color="#bfe6ff" distance={9} />

      <Environment resolution={isLow ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={4} color="#eaf6ff" position={[2, 3, 3]} scale={[5, 3, 1]} rotation={[0, -Math.PI / 4, 0]} />
        <Lightformer form="rect" intensity={3} color="#4fb0ff" position={[-4, 0.5, 2]} scale={[4, 2.5, 1]} rotation={[0, Math.PI / 3, 0]} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, -3, 2]} scale={[6, 2, 1]} rotation={[Math.PI / 4, 0, 0]} />
        <Lightformer form="ring" intensity={1.2} color="#bfe6ff" position={[4, 1, -2]} scale={3.5} />
      </Environment>

      <CoreGroup quality={quality} reducedMotion={reducedMotion} />

      {!isLow && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.42} luminanceSmoothing={0.25} radius={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  )
}

function CoreGroup({ quality }: { quality: 'high' | 'low'; reducedMotion: boolean }) {
  const rootRef = useRef<THREE.Group>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)
  const neuralRef = useRef<THREE.Group>(null)
  const nodesMaterialRef = useRef<THREE.PointsMaterial>(null)
  const pointer = useRef({ x: 0, y: 0 })

  const isLow = quality === 'low'
  const ringSegments = isLow ? 48 : 96
  const icoDetail = isLow ? 1 : 2

  const labelTexture = useMemo(() => createFmLabelTexture(), [])

  const nodePositions = useMemo(() => {
    const count = isLow ? 60 : 140
    const positions = new Float32Array(count * 3)
    const radius = 0.62
    for (let i = 0; i < count; i++) {
      // distribuição aproximadamente esférica (Fibonacci sphere)
      const t = i / Math.max(1, count - 1)
      const inclination = Math.acos(1 - 2 * t)
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i
      const r = radius * (0.86 + 0.14 * Math.sin(i * 12.9898))
      positions[i * 3] = r * Math.sin(inclination) * Math.cos(azimuth)
      positions[i * 3 + 1] = r * Math.sin(inclination) * Math.sin(azimuth) * 0.85 + 0.15
      positions[i * 3 + 2] = r * Math.cos(inclination)
    }
    return positions
  }, [isLow])

  useFrame((state, delta) => {
    const { pointer: ptr } = state
    pointer.current.x += (ptr.x - pointer.current.x) * 0.04
    pointer.current.y += (ptr.y - pointer.current.y) * 0.04

    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.06
      rootRef.current.rotation.y += pointer.current.x * 0.0009
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        pointer.current.y * 0.12,
        0.05,
      )
    }

    if (ring1.current) ring1.current.rotation.z += delta * 0.11
    if (ring2.current) ring2.current.rotation.z -= delta * 0.07
    if (ring3.current) ring3.current.rotation.z += delta * 0.045

    const t = state.clock.elapsedTime
    if (neuralRef.current) {
      neuralRef.current.position.y = 1.32 + Math.sin(t * 0.5) * 0.025
      const s = 1 + Math.sin(t * 0.8) * 0.012
      neuralRef.current.scale.setScalar(s)
    }
    if (nodesMaterialRef.current) {
      nodesMaterialRef.current.size = 0.028 + Math.sin(t * 1.4) * 0.006
    }
  })

  return (
    <group ref={rootRef}>
      {/* Corpo metálico octogonal */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.16, 1.16, 1.28, 8, 1]} />
        <meshPhysicalMaterial
          color={METAL_COLOR}
          metalness={0.92}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          envMapIntensity={2.4}
        />
      </mesh>

      {/* Aro frontal levemente recuado */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.66]}>
        <cylinderGeometry args={[1.02, 1.02, 0.06, 8, 1]} />
        <meshStandardMaterial color="#0d151f" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Face de vidro azul/ciano */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.92, 0.92, 0.1, 8, 1]} />
        <meshPhysicalMaterial
          color={GLASS_COLOR}
          transmission={0.92}
          roughness={0.08}
          thickness={0.6}
          ior={1.4}
          clearcoat={1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Emblema FM */}
      <mesh position={[0, 0, 0.77]}>
        <planeGeometry args={[1.15, 1.15]} />
        <meshBasicMaterial map={labelTexture} transparent toneMapped={false} />
      </mesh>

      {/* Eixo energético central */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.7, 8]} />
        <meshBasicMaterial color={CYAN_BRIGHT} toneMapped={false} transparent opacity={0.75} />
      </mesh>

      {/* Anéis orbitais */}
      <mesh ref={ring1} rotation={[Math.PI / 2.25, 0.3, 0]}>
        <torusGeometry args={[1.58, 0.065, 16, ringSegments]} />
        <meshStandardMaterial color="#d7e2ee" metalness={0.9} roughness={0.22} envMapIntensity={2.2} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.6, -0.4, 0.2]}>
        <torusGeometry args={[1.88, 0.038, 16, ringSegments]} />
        <meshStandardMaterial color={CYAN} metalness={0.55} roughness={0.15} emissive={CYAN} emissiveIntensity={0.6} envMapIntensity={1.8} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 1.9, 0.15, -0.25]}>
        <torusGeometry args={[1.36, 0.05, 16, ringSegments]} />
        <meshStandardMaterial color="#9aa8b8" metalness={0.92} roughness={0.28} envMapIntensity={2} />
      </mesh>

      {/* Estrutura neural superior */}
      <group ref={neuralRef} position={[0, 1.32, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.64, icoDetail]} />
          <meshStandardMaterial
            color={CYAN}
            wireframe
            transparent
            opacity={0.45}
            emissive={CYAN}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.58, 24, 24]} />
          <meshBasicMaterial color={CYAN_BRIGHT} transparent opacity={0.05} toneMapped={false} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={nodesMaterialRef}
            color="#ffffff"
            size={0.03}
            sizeAttenuation
            transparent
            opacity={0.9}
            toneMapped={false}
          />
        </points>
      </group>
    </group>
  )
}
