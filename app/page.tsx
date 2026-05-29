'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { usePortfolioStore } from '@/lib/store'
import LoadingScreen from '@/components/ui/LoadingScreen'
import JourneyHUD from '@/components/ui/JourneyHUD'
import CustomCursor from '@/components/ui/CustomCursor'
import AudioToggle from '@/components/ui/AudioToggle'
import ScrollHint from '@/components/ui/ScrollHint'
import HeroSection from '@/components/ui/HeroSection'
import {
  SummarySection,
  LuluSection,
  JubeerichSection,
  SysconSection,
  SkillsSection,
  EducationSection,
  ContactSection,
} from '@/components/ui/ContentSections'

// Dynamic import for 3D scene (no SSR)
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => null,
})

// Total scroll height = number of "story beats" × 100vh
// 8 sections × 100vh each gives room for each chapter
const TOTAL_SCROLL_HEIGHT = '900vh'

export default function HomePage() {
  const { isLoaded } = usePortfolioStore()

  // Prevent scroll during loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoaded])

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Fixed 3D canvas */}
      <div className="canvas-container" style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <Scene />
      </div>

      {/* Rain vignette overlay */}
      <div className="rain-vignette" />

      {/* HUD elements (fixed) */}
      <JourneyHUD />
      <AudioToggle />
      <ScrollHint />

      {/* Scroll-driven content */}
      <main
        style={{
          position: 'relative',
          zIndex: 5,
          height: TOTAL_SCROLL_HEIGHT,
          pointerEvents: 'none',
        }}
      >
        {/* Section 0: Hero (0–12.5%) */}
        <HeroSection />

        {/* Section 1: Summary (12.5–25%) */}
        <SummarySection />

        {/* Section 2: Lulu Qatar (25–37.5%) */}
        <LuluSection />

        {/* Section 3: Jubeerich (37.5–50%) */}
        <JubeerichSection />

        {/* Section 4: Syscon (50–62.5%) */}
        <SysconSection />

        {/* Section 5: Skills (62.5–75%) */}
        <SkillsSection />

        {/* Section 6: Education (75–87.5%) */}
        <EducationSection />

        {/* Section 7: Contact (87.5–100%) */}
        <ContactSection />

        {/* Bottom spacer */}
        <div style={{ height: '50vh' }} />
      </main>

      {/* Ambient rain overlay lines (CSS-only) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(
            -80deg,
            transparent 0px,
            transparent 3px,
            rgba(138, 200, 232, 0.025) 3px,
            rgba(138, 200, 232, 0.025) 4px
          )`,
          backgroundSize: '4px 60px',
          animation: 'rainStreak 0.15s linear infinite',
        }}
      />

      <style>{`
        @keyframes rainStreak {
          from { background-position: 0 0; }
          to { background-position: 0 60px; }
        }
      `}</style>
    </>
  )
}
