'use client'

import { usePortfolioStore } from '@/lib/store'

export default function ScrollHint() {
  const { scrollProgress } = usePortfolioStore()
  const isHidden = scrollProgress > 0.05

  return (
    <div className={`scroll-hint ${isHidden ? 'hidden' : ''}`} aria-hidden="true">
      <span className="scroll-hint-text">Scroll to journey</span>
      <div className="scroll-hint-arrow">
        <div className="scroll-hint-dot" />
      </div>
    </div>
  )
}
