'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { setCursor, setHovering } = usePortfolioStore()

  useEffect(() => {
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let raf: number

    const handleMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      setCursor(dotX, dotY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, .interactive')
      setHovering(!!isInteractive)
    }

    const animate = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`
        dotRef.current.style.top = `${dotY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(raf)
    }
  }, [setCursor, setHovering])

  const { isHovering } = usePortfolioStore()

  return (
    <div className="cursor" aria-hidden="true">
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          transform: `translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`,
          opacity: isHovering ? 0.9 : 0.6,
        }}
      />
    </div>
  )
}
