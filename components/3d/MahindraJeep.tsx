'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface JeepProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scrollProgress?: number
}

export function MahindraJeep({ position = [0, 0, 0], rotation = [0, 0, 0], scrollProgress = 0 }: JeepProps) {
  const jeepRef = useRef<THREE.Group>(null)
  const wheelsRef = useRef<THREE.Group>(null)
  const wipersRef = useRef<THREE.Group>(null)
  const wiperAngle = useRef(0)
  const wiperDir = useRef(1)
  const wheelRot = useRef(0)

  // Materials
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4a6040),  // weathered military green
    roughness: 0.85,
    metalness: 0.1,
  }), [])

  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x1a1a1a),
    roughness: 0.9,
    metalness: 0.2,
  }), [])

  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x888888),
    roughness: 0.3,
    metalness: 0.9,
  }), [])

  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2a3a4a),
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.6,
  }), [])

  const rubberMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x111111),
    roughness: 1.0,
    metalness: 0.0,
  }), [])

  const headlightMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xfff5aa),
    roughness: 0.1,
    metalness: 0.3,
    emissive: new THREE.Color(0xfff5aa),
    emissiveIntensity: 2.0,
  }), [])

  const mudMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4a3520),
    roughness: 1.0,
    metalness: 0.0,
  }), [])

  useFrame((_, delta) => {
    // Wheel rotation based on scroll
    wheelRot.current += delta * 3
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach(wheel => {
        wheel.rotation.x = wheelRot.current
      })
    }

    // Wiper animation
    wiperAngle.current += delta * 1.5 * wiperDir.current
    if (wiperAngle.current > 0.6) wiperDir.current = -1
    if (wiperAngle.current < -0.1) wiperDir.current = 1
    if (wipersRef.current) {
      wipersRef.current.children.forEach((wiper, i) => {
        wiper.rotation.z = (i === 0 ? 1 : -1) * wiperAngle.current
      })
    }

    // Subtle jeep bounce (driving on road)
    if (jeepRef.current) {
      jeepRef.current.position.y = position[1] + Math.sin(Date.now() * 0.008) * 0.03
    }
  })

  return (
    <group ref={jeepRef} position={position} rotation={rotation}>

      {/* === MAIN BODY === */}
      {/* Lower body/chassis */}
      <mesh material={bodyMat} position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[2.0, 0.6, 4.2]} />
      </mesh>

      {/* Upper cabin (open top) */}
      <mesh material={bodyMat} position={[0, 1.05, 0.3]} castShadow>
        <boxGeometry args={[1.95, 0.55, 2.4]} />
      </mesh>

      {/* Front hood */}
      <mesh material={bodyMat} position={[0, 0.95, -1.4]} castShadow>
        <boxGeometry args={[1.95, 0.15, 1.6]} />
      </mesh>

      {/* Rear section */}
      <mesh material={bodyMat} position={[0, 0.75, 1.8]} castShadow>
        <boxGeometry args={[1.95, 0.35, 0.6]} />
      </mesh>

      {/* === FRONT GRILLE / FACE === */}
      {/* Grille plate */}
      <mesh material={darkMat} position={[0, 0.75, -2.12]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.08]} />
      </mesh>

      {/* Grille slots */}
      {[-0.5, -0.2, 0.1, 0.4].map((y, i) => (
        <mesh key={i} material={darkMat} position={[0, 0.75 + y * 0.3, -2.17]}>
          <boxGeometry args={[1.5, 0.06, 0.05]} />
        </mesh>
      ))}

      {/* Bumper */}
      <mesh material={darkMat} position={[0, 0.5, -2.2]} castShadow>
        <boxGeometry args={[2.1, 0.2, 0.1]} />
      </mesh>

      {/* Headlights */}
      {[-0.55, 0.55].map((x, i) => (
        <group key={i}>
          <mesh material={headlightMat} position={[x, 0.9, -2.16]}>
            <circleGeometry args={[0.18, 16]} />
          </mesh>
          {/* Headlight lens */}
          <mesh material={glassMat} position={[x, 0.9, -2.14]}>
            <cylinderGeometry args={[0.17, 0.17, 0.05, 16]} />
          </mesh>
          {/* Headlight glow light */}
          <pointLight
            position={[x, 0.9, -2.5]}
            color={0xfff5aa}
            intensity={2}
            distance={8}
            decay={2}
          />
        </group>
      ))}

      {/* === WINDSHIELD === */}
      <mesh material={glassMat} position={[0, 1.35, -0.58]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[1.85, 0.6, 0.05]} />
      </mesh>

      {/* Windshield frame */}
      <mesh material={darkMat} position={[0, 1.35, -0.56]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.9, 0.65, 0.03]} />
      </mesh>

      {/* === WIPERS === */}
      <group ref={wipersRef} position={[0, 1.32, -0.55]}>
        {/* Left wiper */}
        <group position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
          <mesh material={darkMat} position={[0.3, 0, 0]}>
            <boxGeometry args={[0.6, 0.03, 0.02]} />
          </mesh>
        </group>
        {/* Right wiper */}
        <group position={[0.5, 0, 0]} rotation={[0, 0, 0]}>
          <mesh material={darkMat} position={[-0.3, 0, 0]}>
            <boxGeometry args={[0.6, 0.03, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* === DOORS (open-frame sides) === */}
      {/* Left door frame */}
      <mesh material={bodyMat} position={[-0.975, 1.05, 0.3]} castShadow>
        <boxGeometry args={[0.05, 0.5, 2.3]} />
      </mesh>
      {/* Right door frame */}
      <mesh material={bodyMat} position={[0.975, 1.05, 0.3]} castShadow>
        <boxGeometry args={[0.05, 0.5, 2.3]} />
      </mesh>

      {/* === SPARE TIRE (rear mounted) === */}
      <group position={[0, 0.8, 2.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={rubberMat} castShadow>
          <torusGeometry args={[0.42, 0.12, 8, 16]} />
        </mesh>
        <mesh material={chromeMat}>
          <cylinderGeometry args={[0.28, 0.28, 0.12, 8]} />
        </mesh>
      </group>

      {/* === ROLL BAR === */}
      {/* Left bar */}
      <mesh material={chromeMat} position={[-0.8, 1.55, 0.2]} rotation={[0, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.85, 8]} />
      </mesh>
      {/* Right bar */}
      <mesh material={chromeMat} position={[0.8, 1.55, 0.2]} rotation={[0, 0, -0.05]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.85, 8]} />
      </mesh>
      {/* Top bar */}
      <mesh material={chromeMat} position={[0, 1.98, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.65, 8]} />
      </mesh>
      {/* Rear bar */}
      <mesh material={chromeMat} position={[0, 1.98, 1.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.5, 8]} />
      </mesh>

      {/* === WHEELS === */}
      <group ref={wheelsRef}>
        {/* Front Left */}
        <group position={[-1.1, 0.42, -1.4]}>
          <mesh material={rubberMat} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.14, 8, 16]} />
          </mesh>
          <mesh material={chromeMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.18, 6]} />
          </mesh>
          {/* Lug nuts */}
          {[0,1,2,3,4,5].map(i => (
            <mesh key={i} material={chromeMat} position={[
              -0.1,
              Math.cos((i/6)*Math.PI*2) * 0.18,
              Math.sin((i/6)*Math.PI*2) * 0.18
            ]}>
              <sphereGeometry args={[0.025, 6, 6]} />
            </mesh>
          ))}
          {/* Mud splatter */}
          <mesh material={mudMat} position={[0.1, -0.1, 0]} rotation={[Math.random(), Math.random(), Math.random()]}>
            <sphereGeometry args={[0.06, 4, 4]} />
          </mesh>
        </group>

        {/* Front Right */}
        <group position={[1.1, 0.42, -1.4]}>
          <mesh material={rubberMat} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.14, 8, 16]} />
          </mesh>
          <mesh material={chromeMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.18, 6]} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[-1.1, 0.42, 1.4]}>
          <mesh material={rubberMat} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.14, 8, 16]} />
          </mesh>
          <mesh material={chromeMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.18, 6]} />
          </mesh>
        </group>

        {/* Rear Right */}
        <group position={[1.1, 0.42, 1.4]}>
          <mesh material={rubberMat} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.14, 8, 16]} />
          </mesh>
          <mesh material={chromeMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.18, 6]} />
          </mesh>
        </group>
      </group>

      {/* === MUD FLAPS === */}
      {[[-1.0, 1.4], [1.0, 1.4], [-1.0, -1.4], [1.0, -1.4]].map(([x, z], i) => (
        <mesh key={i} material={rubberMat} position={[x as number, 0.3, z as number]}>
          <boxGeometry args={[0.05, 0.25, 0.3]} />
        </mesh>
      ))}

      {/* === ANTENNA === */}
      <mesh material={chromeMat} position={[0.8, 2.2, -1.2]} rotation={[0.1, 0, 0.05]}>
        <cylinderGeometry args={[0.01, 0.005, 0.8, 6]} />
      </mesh>

      {/* === JERRY CAN on side === */}
      <group position={[-1.05, 0.8, 1.0]}>
        <mesh material={new THREE.MeshStandardMaterial({ color: 0x556b44, roughness: 0.8 })}>
          <boxGeometry args={[0.1, 0.45, 0.3]} />
        </mesh>
        <mesh material={chromeMat} position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} />
        </mesh>
      </group>

      {/* === GROUND SHADOW === */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 5.5]} />
        <shadowMaterial opacity={0.4} />
      </mesh>

      {/* === UNDERCARRIAGE (chassis) === */}
      <mesh material={darkMat} position={[0, 0.18, 0]}>
        <boxGeometry args={[1.8, 0.1, 3.8]} />
      </mesh>

      {/* === EXHAUST PIPE === */}
      <mesh material={chromeMat} position={[-0.9, 0.25, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
      </mesh>
    </group>
  )
}
