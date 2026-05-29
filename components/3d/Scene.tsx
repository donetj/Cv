'use client'

import { useRef, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { KeralaEnvironment } from './KeralaEnvironment'
import { MahindraJeep } from './MahindraJeep'
import { RainSystem } from './RainSystem'
import { usePortfolioStore, CAMERA_KEYFRAMES, SECTIONS } from '@/lib/store'

// ── Camera controller ──────────────────────────────────────────────────────────
function CameraController() {
  const { camera } = useThree()
  const { scrollProgress, setActiveSection } = usePortfolioStore()
  const targetPos = useRef(new THREE.Vector3(0, 4, 18))
  const targetLook = useRef(new THREE.Vector3(0, 1, 0))
  const currentPos = useRef(new THREE.Vector3(0, 4, 18))
  const currentLook = useRef(new THREE.Vector3(0, 1, 0))

  useEffect(() => {
    const t = scrollProgress
    const totalSections = CAMERA_KEYFRAMES.length
    const rawIdx = t * (totalSections - 1)
    const idxA = Math.floor(rawIdx)
    const idxB = Math.min(idxA + 1, totalSections - 1)
    const localT = rawIdx - idxA

    const kfA = CAMERA_KEYFRAMES[idxA]
    const kfB = CAMERA_KEYFRAMES[idxB]

    const ease = localT < 0.5
      ? 4 * localT * localT * localT
      : 1 - Math.pow(-2 * localT + 2, 3) / 2

    targetPos.current.set(
      kfA.position[0] + (kfB.position[0] - kfA.position[0]) * ease,
      kfA.position[1] + (kfB.position[1] - kfA.position[1]) * ease,
      kfA.position[2] + (kfB.position[2] - kfA.position[2]) * ease,
    )
    targetLook.current.set(
      kfA.target[0] + (kfB.target[0] - kfA.target[0]) * ease,
      kfA.target[1] + (kfB.target[1] - kfA.target[1]) * ease,
      kfA.target[2] + (kfB.target[2] - kfA.target[2]) * ease,
    )

    const section = SECTIONS.findIndex(s => t >= s.scrollStart && t < s.scrollEnd)
    if (section >= 0) setActiveSection(section)
  }, [scrollProgress, setActiveSection])

  useFrame((_, delta) => {
    const lerpSpeed = 2.5 * delta
    currentPos.current.lerp(targetPos.current, lerpSpeed)
    currentLook.current.lerp(targetLook.current, lerpSpeed)
    camera.position.copy(currentPos.current)
    camera.lookAt(currentLook.current)

    const shake = 0.008
    camera.position.x += (Math.random() - 0.5) * shake
    camera.position.y += (Math.random() - 0.5) * shake * 0.5
  })

  return null
}

// ── Jeep controller ────────────────────────────────────────────────────────────
function JeepController() {
  const { scrollProgress } = usePortfolioStore()
  const jeepZRef = useRef(0)
  const targetZ = useRef(0)

  useEffect(() => {
    targetZ.current = 8 - scrollProgress * 50
  }, [scrollProgress])

  useFrame((_, delta) => {
    jeepZRef.current += (targetZ.current - jeepZRef.current) * 3 * delta
  })

  const jeepPos: [number, number, number] = [0, 0, jeepZRef.current]

  return (
    <MahindraJeep
      position={jeepPos}
      rotation={[0, Math.PI, 0]}
      scrollProgress={scrollProgress}
    />
  )
}

// ── Mist / God Ray ─────────────────────────────────────────────────────────────
function GodRay() {
  const meshRef = useRef<THREE.Mesh>(null)

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xc8e8c0),
    transparent: true,
    opacity: 0.04,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.03 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.01
    }
  })

  return (
    <group position={[8, 20, -15]} rotation={[0, 0, -0.3]}>
      <mesh ref={meshRef} material={mat} rotation={[0, 0, 0.15]}>
        <coneGeometry args={[8, 25, 4, 1, true]} />
      </mesh>
      <mesh material={mat} rotation={[0, 0.8, 0.05]}>
        <coneGeometry args={[5, 20, 4, 1, true]} />
      </mesh>
    </group>
  )
}

// ── Scene content ──────────────────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <CameraController />
      <fog attach="fog" args={['#1a3020', 15, 80]} />
      <KeralaEnvironment />
      <JeepController />
      <RainSystem />
      <GodRay />
      <Stars radius={80} depth={30} count={500} factor={2} saturation={0} fade speed={0.5} />
    </>
  )
}

// ── Post-processing ────────────────────────────────────────────────────────────
function PostEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        radius={0.8}
      />
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.04}
        bokehScale={2.5}
        height={480}
      />
      <Vignette eskil={false} offset={0.3} darkness={0.7} />
    </EffectComposer>
  )
}

// ── Scroll handler ─────────────────────────────────────────────────────────────
function ScrollHandler() {
  const { setScrollProgress } = usePortfolioStore()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress])

  return null
}

// ── Main Scene export ──────────────────────────────────────────────────────────
export default function Scene() {
  const { setLoadingProgress, setIsLoaded } = usePortfolioStore()

  return (
    <>
      <ScrollHandler />
      <Canvas
        className="canvas-container"
        camera={{ position: [0, 4, 18], fov: 55, near: 0.1, far: 200 }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
          let p = 0
          const interval = setInterval(() => {
            p += Math.random() * 15
            setLoadingProgress(Math.min(p, 95))
            if (p >= 95) {
              clearInterval(interval)
              setTimeout(() => {
                setLoadingProgress(100)
                setTimeout(() => setIsLoaded(true), 600)
              }, 400)
            }
          }, 200)
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          <PostEffects />
        </Suspense>
      </Canvas>
    </>
  )
}
