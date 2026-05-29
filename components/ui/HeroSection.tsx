'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store'

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const { scrollProgress } = usePortfolioStore()

  // Fade out hero as scroll progresses
  const opacity = Math.max(0, 1 - scrollProgress * 15)
  const translateY = scrollProgress * -60

  return (
    <section
      className="scroll-section"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0 8vw',
      }}
    >
      <div
        ref={titleRef}
        className="section-overlay"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          transition: 'none',
          maxWidth: '700px',
        }}
      >
        {/* Kerala tagline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            width: '40px',
            height: '1px',
            background: 'var(--kerala-amber)',
            opacity: 0.6,
          }} />
          <span className="section-label" style={{ margin: 0 }}>
            🌧 Vagamon · Kerala — A Journey Through 8 Years
          </span>
        </div>

        {/* Main title */}
        <h1 className="hero-title">
          <em>Donet</em>
          <br />
          Joseph
        </h1>

        {/* Subtitle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{
            width: '2px',
            height: '48px',
            background: 'linear-gradient(180deg, var(--kerala-amber), transparent)',
          }} />
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--kerala-amber-bright)',
              marginBottom: '0.3rem',
            }}>
              Senior IT Support Specialist
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(184, 212, 200, 0.7)',
              fontWeight: 300,
            }}>
              8+ Years · Qatar &amp; Kerala · Hardware &amp; Enterprise Systems
            </p>
          </div>
        </div>

        {/* Contact quick links */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="tel:+917558920076" className="contact-link" style={{ textDecoration: 'none' }}>
            <span>📞</span> +91 7558 920076
          </a>
          <a href="mailto:donetj@gmail.com" className="contact-link" style={{ textDecoration: 'none' }}>
            <span>✉</span> donetj@gmail.com
          </a>
          <span className="contact-link">
            <span>📍</span> Kottayam, Kerala
          </span>
        </div>
      </div>

      {/* Decorative corner element */}
      <div style={{
        position: 'absolute',
        bottom: '15vh',
        right: '8vw',
        opacity: opacity * 0.4,
        fontFamily: 'var(--font-display)',
        fontSize: '8rem',
        fontWeight: 900,
        fontStyle: 'italic',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(212, 130, 10, 0.3)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        IT
      </div>
    </section>
  )
}
