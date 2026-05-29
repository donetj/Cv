'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePortfolioStore } from '@/lib/store'

const RAIN_COUNT = 8000
const SPLASH_COUNT = 200

export function RainSystem() {
  const { rainIntensity } = usePortfolioStore()
  const rainRef = useRef<THREE.Points>(null)
  const splashRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  // Rain drop geometry - vertical streaks
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 3)
    const velocities = new Float32Array(RAIN_COUNT)

    for (let i = 0; i < RAIN_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = Math.random() * 40 - 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
      velocities[i] = 0.3 + Math.random() * 0.4
    }

    return { positions, velocities }
  }, [])

  // Splash geometry on ground
  const splashPositions = useMemo(() => {
    const pos = new Float32Array(SPLASH_COUNT * 3)
    for (let i = 0; i < SPLASH_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = 0.02
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [])

  // Rain material - thin bright streaks
  const rainMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(0x8ac8e8),
      size: 0.06,
      transparent: true,
      opacity: 0.4 * rainIntensity,
      sizeAttenuation: true,
      depthWrite: false,
    })
  }, [rainIntensity])

  // Splash material
  const splashMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(0xaaddff),
      size: 0.15,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
      depthWrite: false,
    })
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta
    if (!rainRef.current) return

    const posAttr = rainRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < RAIN_COUNT; i++) {
      // Move rain down (with slight wind angle)
      arr[i * 3] += 0.02 * rainIntensity  // slight wind
      arr[i * 3 + 1] -= velocities[i] * rainIntensity * 0.8

      // Wrap when below ground
      if (arr[i * 3 + 1] < -5) {
        arr[i * 3] = (Math.random() - 0.5) * 80
        arr[i * 3 + 1] = 35 + Math.random() * 10
        arr[i * 3 + 2] = (Math.random() - 0.5) * 80
      }
    }

    posAttr.needsUpdate = true

    // Animate splashes
    if (splashRef.current) {
      const splashAttr = splashRef.current.geometry.attributes.position
      const sArr = splashAttr.array as Float32Array
      for (let i = 0; i < SPLASH_COUNT; i++) {
        // Random flicker - splash scale pulsing
        if (Math.random() < 0.02) {
          sArr[i * 3] = (Math.random() - 0.5) * 40
          sArr[i * 3 + 2] = (Math.random() - 0.5) * 40
        }
      }
      splashAttr.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Main rain drops */}
      <points ref={rainRef} material={rainMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={RAIN_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
      </points>

      {/* Ground splashes */}
      <points ref={splashRef} material={splashMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={splashPositions}
            count={SPLASH_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
      </points>
    </group>
  )
}
