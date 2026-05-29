'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store'

const LOADING_MESSAGES = [
  'Gathering monsoon clouds...',
  'Winding through Vagamon hills...',
  'Starting the Mahindra engine...',
  'Wetting the mountain roads...',
  'Brewing the tea estate mist...',
]

export default function LoadingScreen() {
  const { loadingProgress, isLoaded } = usePortfolioStore()
  const msgIndex = Math.min(
    Math.floor((loadingProgress / 100) * LOADING_MESSAGES.length),
    LOADING_MESSAGES.length - 1
  )

  return (
    <div className={`loading-screen ${isLoaded ? 'hidden' : ''}`}>
      {/* Mandala SVG */}
      <div className="loading-mandala">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
          {/* Outer ring */}
          <circle cx="60" cy="60" r="56" fill="none" stroke="#d4820a" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.5" />
          {/* Middle ring with lotus petals */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const x1 = 60 + Math.cos(angle) * 40
            const y1 = 60 + Math.sin(angle) * 40
            const x2 = 60 + Math.cos(angle + Math.PI / 8) * 28
            const y2 = 60 + Math.sin(angle + Math.PI / 8) * 28
            const x3 = 60 + Math.cos(angle - Math.PI / 8) * 28
            const y3 = 60 + Math.sin(angle - Math.PI / 8) * 28
            return (
              <path
                key={i}
                d={`M 60 60 L ${x1} ${y1} Q ${x2} ${y2} 60 60 Q ${x3} ${y3} ${x1} ${y1}`}
                fill="none"
                stroke="#d4820a"
                strokeWidth="0.8"
                opacity="0.6"
              />
            )
          })}
          {/* Inner circle */}
          <circle cx="60" cy="60" r="16" fill="none" stroke="#f0a030" strokeWidth="0.8" opacity="0.8" />
          {/* Center dot */}
          <circle cx="60" cy="60" r="3" fill="#f0a030" opacity="0.9" />
          {/* Spoke lines */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const x = 60 + Math.cos(angle) * 56
            const y = 60 + Math.sin(angle) * 56
            return (
              <line
                key={`spoke-${i}`}
                x1={60 + Math.cos(angle) * 16}
                y1={60 + Math.sin(angle) * 16}
                x2={x}
                y2={y}
                stroke="#4a8c5c"
                strokeWidth="0.5"
                opacity="0.3"
              />
            )
          })}
        </svg>
      </div>

      <div className="loading-title">Donet Joseph</div>
      <div className="loading-subtitle">Senior IT Support Specialist</div>

      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>

      <div className="loading-status">{LOADING_MESSAGES[msgIndex]}</div>

      {/* Kerala decorative text */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.4em',
        color: 'rgba(184, 212, 200, 0.2)',
        textTransform: 'uppercase'
      }}>
        Kerala · Qatar · 8+ Years
      </div>
    </div>
  )
}
