'use client'

import { useEffect, useRef, useState } from 'react'
import { usePortfolioStore } from '@/lib/store'

export default function AudioToggle() {
  const { audioEnabled, toggleAudio } = usePortfolioStore()
  const rainRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Howler is loaded client-side only
    const initHowler = async () => {
      try {
        const { Howl } = await import('howler')
        rainRef.current = new Howl({
          src: ['/audio/rain-ambient.mp3'],
          loop: true,
          volume: 0,
          html5: true,
        })
      } catch (e) {
        // Audio files not present, silently fail
      }
    }
    initHowler()

    return () => {
      if (rainRef.current) rainRef.current.unload()
    }
  }, [])

  useEffect(() => {
    if (!rainRef.current) return
    if (audioEnabled) {
      rainRef.current.play()
      rainRef.current.fade(0, 0.6, 1500)
    } else {
      rainRef.current.fade(0.6, 0, 800)
      setTimeout(() => rainRef.current?.pause(), 800)
    }
  }, [audioEnabled])

  if (!mounted) return null

  return (
    <button
      className="audio-toggle interactive"
      onClick={toggleAudio}
      aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
    >
      <span className="audio-toggle-icon">
        {audioEnabled ? '🔊' : '🔇'}
      </span>
      <span className="audio-toggle-text">
        {audioEnabled ? 'Sound On' : 'Sound Off'}
      </span>
      {audioEnabled && (
        <span style={{
          display: 'flex',
          gap: '2px',
          alignItems: 'flex-end',
          height: '12px',
        }}>
          {[1, 3, 2, 4, 1].map((h, i) => (
            <span
              key={i}
              style={{
                width: '2px',
                height: `${h * 3}px`,
                background: 'var(--kerala-green-light)',
                borderRadius: '1px',
                animation: `audioBar 0.${5 + i}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </span>
      )}
      <style>{`
        @keyframes audioBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1.2); }
        }
      `}</style>
    </button>
  )
}
