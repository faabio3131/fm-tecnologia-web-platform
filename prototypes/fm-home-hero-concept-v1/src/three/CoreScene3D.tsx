import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
// `?inline`: embute o GLB como base64 no próprio chunk JS. Escolha
// deliberada para este protótipo — evita depender de o host de preview
// (ou qualquer static server simples) servir .glb com o content-type
// correto. No site real, isso viraria um asset estático normal (`?url`).
import coreModelUrl from '../assets/fm-core.glb?inline'
import { createFmLabelTexture } from './labelTexture'

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
      camera={{ position: [1.1, 0.35, 6.4], fov: 33 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.3} color="#9fc4ea" />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-3.2, 1.2, -1.8]} intensity={7} color="#4fb0ff" distance={11} />
      <pointLight position={[2.2, -1.8, 3]} intensity={2} color="#bfe6ff" distance={9} />

      <Environment resolution={isLow ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#eaf6ff" position={[2, 3, 3]} scale={[5, 3, 1]} rotation={[0, -Math.PI / 4, 0]} />
        <Lightformer form="rect" intensity={1.6} color="#4fb0ff" position={[-4, 0.5, 2]} scale={[4, 2.5, 1]} rotation={[0, Math.PI / 3, 0]} />
        <Lightformer form="rect" intensity={0.9} color="#ffffff" position={[0, -3, 2]} scale={[6, 2, 1]} rotation={[Math.PI / 4, 0, 0]} />
        <Lightformer form="ring" intensity={0.7} color="#bfe6ff" position={[4, 1, -2]} scale={3.5} />
      </Environment>

      <ModeledCore reducedMotion={reducedMotion} />

      {!isLow && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.42} luminanceThreshold={0.6} luminanceSmoothing={0.22} radius={0.5} />
        </EffectComposer>
      )}
    </Canvas>
  )
}

function ModeledCore({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF(coreModelUrl)
  const rootRef = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const parts = useRef<Record<string, THREE.Object3D | undefined>>({})

  // Clona a cena por render — evita compartilhar/estragar o cache do useGLTF
  // se o componente remontar (ex.: troca de qualidade mobile/desktop).
  const cloned = useMemo(() => scene.clone(true), [scene])

  const glassTexture = useMemo(() => createFmLabelTexture(), [])

  useEffect(() => {
    parts.current = {
      ring0: cloned.getObjectByName('Ring_0'),
      ring1: cloned.getObjectByName('Ring_1'),
      ring2: cloned.getObjectByName('Ring_2'),
      ring3: cloned.getObjectByName('Ring_3'),
      brain: cloned.getObjectByName('Brain'),
      nodes: cloned.getObjectByName('NeuralNodes'),
    }

    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mat = mesh.material as THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial
      if (!mat) return
      mat.envMapIntensity = 1.5
      // O material de vidro exportado do Blender às vezes perde a
      // transmissão no round-trip glTF — garantimos aqui, no lado do
      // three.js, que ele realmente se comporta como vidro.
      if (mesh.name === 'GlassPanel' && 'transmission' in mat) {
        const glass = mat as THREE.MeshPhysicalMaterial
        glass.transmission = 0.9
        glass.roughness = 0.06
        glass.thickness = 0.5
        glass.ior = 1.4
        glass.clearcoat = 1
        glass.envMapIntensity = 1.2
      }
    })
  }, [cloned])

  useFrame((state, delta) => {
    const { pointer: ptr } = state
    pointer.current.x += (ptr.x - pointer.current.x) * 0.04
    pointer.current.y += (ptr.y - pointer.current.y) * 0.04

    if (rootRef.current && !reducedMotion) {
      rootRef.current.rotation.y += delta * 0.05
    }
    if (rootRef.current) {
      rootRef.current.rotation.y += pointer.current.x * 0.0008
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        pointer.current.y * 0.1,
        0.05,
      )
    }

    const p = parts.current
    if (p.ring0) p.ring0.rotation.z += delta * 0.09
    if (p.ring1) p.ring1.rotation.z -= delta * 0.06
    if (p.ring2) p.ring2.rotation.z += delta * 0.04
    if (p.ring3) p.ring3.rotation.z -= delta * 0.07

    const t = state.clock.elapsedTime
    if (p.brain) {
      p.brain.scale.setScalar(1 + Math.sin(t * 0.8) * 0.012)
    }
    if (p.nodes) {
      p.nodes.rotation.y += delta * 0.03
    }
  })

  return (
    <group ref={rootRef} position={[0, -0.55, 0]}>
      <primitive object={cloned} />
      {/* Emblema FM sobre o painel de vidro do modelo */}
      <mesh position={[0, 0, 0.72]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshBasicMaterial map={glassTexture} transparent toneMapped={false} depthTest={false} />
      </mesh>
    </group>
  )
}

useGLTF.preload(coreModelUrl)
