'use client'

import { usePortfolioStore, SECTIONS } from '@/lib/store'

export default function JourneyHUD() {
  const { scrollProgress, activeSection } = usePortfolioStore()

  const handleStopClick = (sectionId: number) => {
    const section = SECTIONS[sectionId]
    const targetScroll = section.scrollStart * (document.body.scrollHeight - window.innerHeight)
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <nav className="journey-hud" aria-label="Journey navigation">
      {SECTIONS.map((section, index) => (
        <div key={section.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Connector line above (except first) */}
          {index > 0 && (
            <div
              className="journey-line"
              style={{ height: '32px' }}
            >
              <div
                className="journey-line-fill"
                style={{
                  height: `${Math.max(0, Math.min(100,
                    ((scrollProgress - section.scrollStart) /
                     (section.scrollEnd - section.scrollStart)) * 100
                  ))}%`
                }}
              />
            </div>
          )}

          {/* Stop dot */}
          <div
            className={`journey-stop ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => handleStopClick(section.id)}
            role="button"
            tabIndex={0}
            aria-label={`Jump to ${section.label}`}
            onKeyDown={(e) => e.key === 'Enter' && handleStopClick(section.id)}
          >
            <span className="journey-stop-label">{section.label}</span>
          </div>
        </div>
      ))}
    </nav>
  )
}
