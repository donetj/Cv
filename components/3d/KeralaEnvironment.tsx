'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Procedural palm tree
function PalmTree({ position, scale = 1, lean = 0 }: { position: [number, number, number], scale?: number, lean?: number }) {
  const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x6b4a2a),
    roughness: 0.9,
    metalness: 0.0,
  }), [])

  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2d6b3a),
    roughness: 0.8,
    metalness: 0.0,
    side: THREE.DoubleSide,
  }), [])

  const leafRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (leafRef.current) {
      const t = state.clock.getElapsedTime()
      leafRef.current.rotation.y = Math.sin(t * 0.5 + position[0]) * 0.08
      leafRef.current.rotation.z = Math.sin(t * 0.7 + position[2]) * 0.05
    }
  })

  const h = 4.5 * scale

  // Fixed frond angles — no Math.random() in render
  const frondTilts = [0.65, 0.72, 0.60, 0.78, 0.68, 0.75, 0.63, 0.70]

  return (
    <group position={position}>
      <mesh material={trunkMat} position={[0, h / 2, 0]} rotation={[0, 0, lean]} castShadow>
        <cylinderGeometry args={[0.12 * scale, 0.22 * scale, h, 8]} />
      </mesh>

      <group ref={leafRef} position={[Math.sin(lean) * h, h, 0]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2
          const tilt = frondTilts[i]
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh
                material={leafMat}
                position={[0.8 * scale, -0.2, 0]}
                rotation={[tilt, 0, 0]}
                castShadow
              >
                <planeGeometry args={[2.2 * scale, 0.35 * scale]} />
              </mesh>
            </group>
          )
        })}
        {/* Coconuts */}
        {[0, 1, 2].map(i => (
          <mesh
            key={i}
            material={new THREE.MeshStandardMaterial({ color: 0x5a3a1a, roughness: 0.8 })}
            position={[
              Math.cos((i / 3) * Math.PI * 2) * 0.25,
              -0.3,
              Math.sin((i / 3) * Math.PI * 2) * 0.25
            ]}
          >
            <sphereGeometry args={[0.15 * scale, 8, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Tea bush
function TeaBush({ position }: { position: [number, number, number] }) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2a5c35),
    roughness: 0.9,
  }), [])

  return (
    <group position={position}>
      <mesh material={mat} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 8, 6]} />
      </mesh>
      <mesh material={mat} position={[0.4, -0.1, 0.2]} castShadow>
        <sphereGeometry args={[0.45, 6, 5]} />
      </mesh>
      <mesh material={mat} position={[-0.3, -0.05, -0.1]} castShadow>
        <sphereGeometry args={[0.4, 6, 5]} />
      </mesh>
    </group>
  )
}

// Mountain silhouette — segment count fixed, no Math.random()
function Mountain({ position, scale, color, segments = 5 }: {
  position: [number, number, number],
  scale: [number, number, number],
  color: string,
  segments?: number
}) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 1.0,
    metalness: 0.0,
    fog: true,
  }), [color])

  return (
    <group position={position}>
      <mesh material={mat} scale={scale} castShadow receiveShadow>
        <coneGeometry args={[1, 1, segments]} />
      </mesh>
    </group>
  )
}

// Old Kerala colonial wooden house
function KeralaHouse({ position }: { position: [number, number, number] }) {
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd4b896),
    roughness: 0.9,
  }), [])

  const roofMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x8b3a2a),
    roughness: 0.8,
  }), [])

  const woodMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x5c3d20),
    roughness: 1.0,
  }), [])

  const windowGlowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffb830),
    emissive: new THREE.Color(0xffb830),
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.9,
  }), [])

  const lanternFrameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.5,
    metalness: 0.8,
  }), [])

  return (
    <group position={position}>
      <mesh material={wallMat} position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 3, 4]} />
      </mesh>

      {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
        <mesh key={i} material={woodMat} position={[x, 1.2, 2.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 2.4, 6]} />
        </mesh>
      ))}

      <mesh material={roofMat} position={[0, 2.5, 2.4]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[5.2, 0.1, 2]} />
      </mesh>

      <mesh material={roofMat} position={[0, 3.4, 0]} castShadow>
        <coneGeometry args={[3.8, 1.5, 4]} />
      </mesh>

      {[-1.2, 1.2].map((x, i) => (
        <group key={i}>
          <mesh material={windowGlowMat} position={[x, 1.6, 2.01]}>
            <planeGeometry args={[0.6, 0.8]} />
          </mesh>
          <pointLight
            position={[x, 1.6, 2.5]}
            color={0xffb830}
            intensity={1.5}
            distance={4}
            decay={2}
          />
          <mesh material={woodMat} position={[x, 1.6, 2.02]}>
            <boxGeometry args={[0.7, 0.9, 0.04]} />
          </mesh>
        </group>
      ))}

      <mesh material={woodMat} position={[0, 0.9, 2.01]}>
        <boxGeometry args={[0.9, 1.8, 0.06]} />
      </mesh>

      <group position={[0, 2.3, 2.2]}>
        <mesh material={lanternFrameMat}>
          <boxGeometry args={[0.2, 0.3, 0.2]} />
        </mesh>
        <pointLight color={0xff9900} intensity={3} distance={6} decay={2} />
      </group>
    </group>
  )
}

// Wet road with puddles — ellipseGeometry replaced with circleGeometry (scaled)
function WetRoad() {
  const roadMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2a2a2a),
    roughness: 0.3,
    metalness: 0.1,
    envMapIntensity: 0.8,
  }), [])

  const puddleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4466aa),
    roughness: 0.05,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6,
    envMapIntensity: 2,
  }), [])

  const grassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2a5c20),
    roughness: 1.0,
  }), [])

  const mudMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4a3520),
    roughness: 1.0,
  }), [])

  const centerLineMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xffffff,
    opacity: 0.3,
    transparent: true,
  }), [])

  // Fixed puddle data — no Math.random() in render
  const puddles: [number, number, number, number, number][] = [
    [-1.2, 0.02, -10, 0.9, 0.5],
    [1.5,  0.02,  -5, 0.7, 0.4],
    [-0.5, 0.02,   2, 1.0, 0.55],
    [1.0,  0.02,   8, 0.8, 0.45],
    [-1.8, 0.02,  15, 0.6, 0.35],
    [0.8,  0.02,  22, 0.9, 0.5],
    [-1.0, 0.02, -18, 0.75, 0.4],
    [1.3,  0.02, -25, 0.85, 0.48],
  ]

  return (
    <group>
      <mesh material={grassMat} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200, 50, 50]} />
      </mesh>

      <mesh material={roadMat} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 200]} />
      </mesh>

      {[-3.5, 3.5].map((x, i) => (
        <mesh key={i} material={mudMat} position={[x, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2, 200]} />
        </mesh>
      ))}

      {Array.from({ length: 30 }, (_, i) => (
        <mesh key={i} material={centerLineMat} position={[0, 0.02, i * 3 - 45]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 1.5]} />
        </mesh>
      ))}

      {/* Puddles: use circleGeometry scaled on X to make ellipse shape */}
      {puddles.map(([x, y, z, rx, rz], i) => (
        <mesh
          key={i}
          material={puddleMat}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[rx, rz, 1]}
        >
          <circleGeometry args={[1, 12]} />
        </mesh>
      ))}
    </group>
  )
}

// Fog plane layers
function VolumetricFog() {
  const fogMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xb8d4c8),
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), [])

  return (
    <group>
      {[5, 10, 15, 20, 25].map((z, i) => (
        <mesh key={i} material={fogMat} position={[0, 3 + i * 2, z]}>
          <planeGeometry args={[100, 15]} />
        </mesh>
      ))}
    </group>
  )
}

export function KeralaEnvironment() {
  const teaBushes = useMemo(() => {
    const items: { pos: [number, number, number] }[] = []
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        items.push({
          pos: [
            6 + col * 1.8 + (row % 2) * 0.9,
            0.4 + row * 0.3,
            -15 + row * 6 + col * 0.5,
          ] as [number, number, number]
        })
        items.push({
          pos: [
            -6 - col * 1.8 - (row % 2) * 0.9,
            0.4 + row * 0.3,
            -15 + row * 6 + col * 0.5,
          ] as [number, number, number]
        })
      }
    }
    return items
  }, [])

  // Fixed bg palm positions/scales — no Math.random() in render
  const bgPalms: { x: number; z: number; scale: number; lean: number }[] = [
    { x: -15, z: -15, scale: 0.9,  lean:  0.06 },
    { x: -12, z:  -7, scale: 1.2,  lean: -0.08 },
    { x:  10, z:   1, scale: 1.0,  lean:  0.04 },
    { x:  13, z:   9, scale: 0.85, lean: -0.06 },
    { x: -18, z:  17, scale: 1.1,  lean:  0.09 },
    { x:  16, z:  25, scale: 1.3,  lean: -0.05 },
  ]

  return (
    <group>
      {/* === TERRAIN === */}
      <WetRoad />

      {/* === MOUNTAINS (distant) === */}
      <Mountain position={[-25, 10, -50]} scale={[12, 22, 12]} color="#1a3a2a" segments={5} />
      <Mountain position={[-10,  8, -55]} scale={[15, 18, 15]} color="#1e3d2a" segments={6} />
      <Mountain position={[  5, 12, -60]} scale={[18, 25, 18]} color="#182e1f" segments={7} />
      <Mountain position={[ 20,  9, -52]} scale={[14, 20, 14]} color="#1a3422" segments={5} />
      <Mountain position={[ 35, 11, -48]} scale={[12, 19, 12]} color="#1c3825" segments={6} />
      <Mountain position={[-40, 14, -55]} scale={[20, 30, 20]} color="#152818" segments={7} />

      {/* Mid-range hills */}
      <Mountain position={[-15, 5, -30]} scale={[ 8, 12,  8]} color="#254a30" segments={5} />
      <Mountain position={[ 15, 6, -28]} scale={[10, 14, 10]} color="#2a4e35" segments={6} />
      <Mountain position={[-30, 7, -35]} scale={[12, 16, 12]} color="#1e3e28" segments={5} />
      <Mountain position={[ 28, 5, -32]} scale={[ 8, 11,  8]} color="#2a4e35" segments={6} />

      {/* === TEA PLANTATION === */}
      {teaBushes.map((bush, i) => (
        <TeaBush key={i} position={bush.pos} />
      ))}

      {/* === PALM TREES (roadside) === */}
      <PalmTree position={[-4.5, 0,  -8]} scale={1.2} lean={ 0.08} />
      <PalmTree position={[ 5.5, 0, -12]} scale={1.0} lean={-0.06} />
      <PalmTree position={[-5.0, 0,   2]} scale={1.4} lean={ 0.10} />
      <PalmTree position={[ 4.8, 0,   5]} scale={1.1} lean={-0.05} />
      <PalmTree position={[-4.2, 0,  15]} scale={1.3} lean={ 0.07} />
      <PalmTree position={[ 5.2, 0,  20]} scale={0.9} lean={-0.09} />
      <PalmTree position={[-5.8, 0, -20]} scale={1.1} lean={ 0.04} />
      <PalmTree position={[ 4.5, 0, -25]} scale={1.2} lean={-0.07} />
      <PalmTree position={[-3.8, 0,  28]} scale={1.0} lean={ 0.06} />
      <PalmTree position={[ 6.0, 0,  32]} scale={1.3} lean={-0.04} />

      {/* Scattered background palms */}
      {bgPalms.map((p, i) => (
        <PalmTree
          key={`bg-palm-${i}`}
          position={[p.x, 0, p.z]}
          scale={p.scale}
          lean={p.lean}
        />
      ))}

      {/* === KERALA HOUSES === */}
      <KeralaHouse position={[ 12, 0,   8]} />
      <KeralaHouse position={[-14, 0, -15]} />

      {/* === VOLUMETRIC FOG LAYERS === */}
      <VolumetricFog />

      {/* === LIGHTING === */}
      <ambientLight color={0x334433} intensity={0.4} />

      <directionalLight
        color={0x8ab4b8}
        intensity={0.8}
        position={[5, 20, -10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <spotLight
        color={0xc8d8a0}
        intensity={2}
        position={[15, 25, -20]}
        angle={0.4}
        penumbra={0.8}
        distance={60}
        castShadow
      />

      <pointLight color={0xff8833} intensity={1} position={[10, 3, 8]} distance={20} decay={2} />
      <pointLight color={0x4488aa} intensity={0.5} position={[-10, 8, 0]} distance={30} decay={2} />
    </group>
  )
}
