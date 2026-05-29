'use client'

import { useRef, useEffect } from 'react'
import { usePortfolioStore, SECTIONS } from '@/lib/store'

// Reusable animated section wrapper
function AnimatedSection({
  children,
  sectionId,
  align = 'left',
}: {
  children: React.ReactNode
  sectionId: number
  align?: 'left' | 'right' | 'center'
}) {
  const { scrollProgress, activeSection } = usePortfolioStore()
  const section = SECTIONS[sectionId]
  const isActive = activeSection === sectionId

  // Calculate local progress within this section
  const localProgress = section
    ? Math.max(0, Math.min(1,
        (scrollProgress - section.scrollStart) /
        (section.scrollEnd - section.scrollStart)
      ))
    : 0

  const opacity = Math.min(1, localProgress * 4) * Math.max(0, 1 - (localProgress - 0.7) * 3.3)
  const translateX = align === 'left'
    ? (1 - Math.min(1, localProgress * 3)) * -40
    : (1 - Math.min(1, localProgress * 3)) * 40
  const translateY = (1 - Math.min(1, localProgress * 4)) * 20

  const paddingMap: Record<string, string> = {
    left: '0 8vw 0 8vw',
    right: '0 8vw 0 50vw',
    center: '0 15vw',
  }

  return (
    <section
      className="scroll-section"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: paddingMap[align],
        pointerEvents: 'none',
      }}
    >
      <div
        className="section-overlay"
        style={{
          opacity,
          transform: `translateX(${translateX}px) translateY(${translateY}px)`,
          transition: 'none',
          width: '100%',
          maxWidth: '560px',
          pointerEvents: opacity > 0.3 ? 'all' : 'none',
        }}
      >
        {children}
      </div>
    </section>
  )
}

// ── Professional Summary ───────────────────────────────────────────────────────
export function SummarySection() {
  return (
    <AnimatedSection sectionId={1} align="left">
      <div className="glass-card">
        <span className="section-label">About the Journey</span>
        <h2 className="section-title">
          Where Monsoon Meets <em style={{ color: 'var(--kerala-amber-bright)', fontStyle: 'italic' }}>Mastery</em>
        </h2>
        <p className="section-body">
          A seasoned IT Support Specialist with over 8 years of hands-on experience
          navigating complex enterprise environments across Qatar and Kerala.
          Proficient in POS systems, ERP solutions, hardware engineering, and
          multi-platform support — delivering uptime and calm in any storm.
        </p>
        <div className="ornament-divider">
          <span className="ornament-symbol">◆</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
          {[
            { label: 'Experience', value: '8+ Years' },
            { label: 'Speciality', value: 'IT Support' },
            { label: 'Regions', value: 'Qatar · Kerala' },
            { label: 'Systems', value: 'POS · SAP · CRM' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--kerala-amber)',
                opacity: 0.7,
                marginBottom: '0.2rem',
              }}>{label}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#fff',
              }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Lulu Retail Qatar ──────────────────────────────────────────────────────────
export function LuluSection() {
  return (
    <AnimatedSection sectionId={2} align="right">
      <div className="glass-card">
        <span className="section-label">Chapter I · Qatar Desert 🇶🇦</span>
        <div className="exp-card" style={{ borderColor: 'var(--kerala-amber)', marginBottom: 0 }}>
          <div className="exp-company">Lulu Retail Qatar</div>
          <div className="exp-role">Senior IT Support Specialist</div>
          <div className="exp-period">2018 — 2024 · Doha, Qatar</div>
          <p className="exp-desc">
            Led comprehensive IT support operations across Lulu's Qatar hypermarkets.
            Spearheaded POS system management, SAP ERP integration, and end-to-end
            hardware lifecycle management for 500+ workstations. Reduced system
            downtime by 40% through proactive maintenance protocols.
          </p>
        </div>
        <div className="ornament-divider"><span className="ornament-symbol">◆</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['POS Management', 'SAP ERP', 'Hardware Support', 'Network Admin', 'Active Directory', 'CCTV Systems'].map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Jubeerich Consultancy ──────────────────────────────────────────────────────
export function JubeerichSection() {
  return (
    <AnimatedSection sectionId={3} align="left">
      <div className="glass-card">
        <span className="section-label">Chapter II · Kochi, Kerala 🌴</span>
        <div className="exp-card" style={{ borderColor: '#4a8c5c', marginBottom: 0 }}>
          <div className="exp-company">Jubeerich Consultancy</div>
          <div className="exp-role">IT Support Engineer</div>
          <div className="exp-period">2015 — 2018 · Kochi, Kerala</div>
          <p className="exp-desc">
            Delivered end-to-end IT infrastructure support for corporate clients
            across Kerala. Managed Windows Server environments, CRM implementations,
            and enterprise network deployments. Provided on-site and remote
            troubleshooting for 200+ users.
          </p>
        </div>
        <div className="ornament-divider"><span className="ornament-symbol">◆</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['Windows Server', 'CRM Systems', 'Network Setup', 'Troubleshooting', 'Client Support', 'IT Infrastructure'].map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Syscon Softwares ───────────────────────────────────────────────────────────
export function SysconSection() {
  return (
    <AnimatedSection sectionId={4} align="right">
      <div className="glass-card">
        <span className="section-label">Chapter III · The Roots 🌱</span>
        <div className="exp-card" style={{ borderColor: 'var(--kerala-rain)', marginBottom: 0 }}>
          <div className="exp-company">Syscon Softwares</div>
          <div className="exp-role">IT Support Technician</div>
          <div className="exp-period">2013 — 2015 · Kerala</div>
          <p className="exp-desc">
            Foundation years in IT support, hardware repair, and software installation.
            Gained hands-on expertise in POS hardware setup, system configuration,
            and first-level technical support. Developed strong troubleshooting
            methodology across diverse client environments.
          </p>
        </div>
        <div className="ornament-divider"><span className="ornament-symbol">◆</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['Hardware Repair', 'POS Setup', 'System Config', 'Tech Support', 'Software Install', 'Field Service'].map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Core Competencies ─────────────────────────────────────────────────────────
const ALL_SKILLS = [
  { category: 'POS & Retail Systems', icon: '🏪', items: ['POS Installation', 'POS Troubleshooting', 'Barcode Systems', 'Receipt Printers', 'Cash Drawers'] },
  { category: 'Enterprise Software', icon: '⚙️', items: ['SAP ERP', 'CRM Platforms', 'Active Directory', 'Windows Server', 'Office 365'] },
  { category: 'Hardware & Infrastructure', icon: '🔧', items: ['PC Assembly', 'Network Cabling', 'CCTV Setup', 'IP Phones', 'Server Rack'] },
  { category: 'Networking', icon: '🌐', items: ['LAN/WAN Setup', 'Firewall Config', 'TCP/IP', 'VPN', 'Wi-Fi Deployment'] },
]

export function SkillsSection() {
  return (
    <AnimatedSection sectionId={5} align="center">
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>
          Core Competencies
        </span>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          The Spice Box of <em style={{ color: 'var(--kerala-amber-bright)', fontStyle: 'italic' }}>Skills</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {ALL_SKILLS.map(({ category, icon, items }) => (
            <div key={category} className="glass-card" style={{ padding: '1.2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.8rem',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--kerala-amber)',
                }}>{category}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {items.map(item => (
                  <span key={item} className="skill-tag" style={{ fontSize: '0.6rem' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Education ─────────────────────────────────────────────────────────────────
export function EducationSection() {
  return (
    <AnimatedSection sectionId={6} align="left">
      <div className="glass-card">
        <span className="section-label">Education &amp; Credentials</span>
        <h2 className="section-title">
          Built on a Strong <em style={{ color: 'var(--kerala-amber-bright)', fontStyle: 'italic' }}>Foundation</em>
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="exp-card" style={{ marginBottom: '1rem' }}>
            <div className="exp-company" style={{ fontSize: '1.1rem' }}>Bachelor of Computer Application</div>
            <div className="exp-role">BCA — Computer Science</div>
            <div className="exp-period">Mahatma Gandhi University · Kottayam, Kerala</div>
          </div>

          <div className="exp-card" style={{ marginBottom: '1rem' }}>
            <div className="exp-company" style={{ fontSize: '1.1rem' }}>Higher Secondary Education</div>
            <div className="exp-role">Plus Two — Science Stream</div>
            <div className="exp-period">Kerala Board of Higher Secondary</div>
          </div>
        </div>

        <div className="ornament-divider"><span className="ornament-symbol">◆</span></div>

        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--kerala-amber)',
            marginBottom: '0.8rem',
          }}>Certifications &amp; Training</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              'CompTIA A+', 'Microsoft Certified', 'SAP End-User',
              'CCTV Installation', 'Network+ Foundations', 'Qatar Work Visa (Ready)'
            ].map(cert => (
              <span key={cert} className="skill-tag">{cert}</span>
            ))}
          </div>
        </div>

        <div className="ornament-divider"><span className="ornament-symbol">◆</span></div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--kerala-amber)', opacity: 0.7 }}>Languages</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#fff', marginTop: '0.3rem' }}>
              Malayalam · English · Hindi · Arabic (Basic)
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Contact / CTA ─────────────────────────────────────────────────────────────
export function ContactSection() {
  return (
    <AnimatedSection sectionId={7} align="center">
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
        <span className="section-label" style={{ display: 'block' }}>End of the Road?</span>
        <h2 className="section-title">
          Ready to Return to <em style={{ color: 'var(--kerala-amber-bright)', fontStyle: 'italic' }}>Qatar</em>
        </h2>
        <p className="section-body" style={{ marginBottom: '2.5rem' }}>
          8+ years of enterprise IT expertise, a valid visa, and the same steady hands
          that kept Qatar's retail systems running through every challenge.
          Let's write the next chapter together.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
          <a href="tel:+917558920076" className="cta-button cta-button-primary interactive">
            <span>📞</span>
            <span>Call Now: +91 7558 920076</span>
          </a>
          <a href="mailto:donetj@gmail.com" className="cta-button interactive">
            <span>✉</span>
            <span>donetj@gmail.com</span>
          </a>
          <a
            href="https://wa.me/917558920076"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button interactive"
            style={{ borderColor: '#25d366', color: '#25d366' }}
          >
            <span>💬</span>
            <span>WhatsApp Message</span>
          </a>
        </div>

        <div className="ornament-divider" style={{ margin: '1.5rem auto', maxWidth: '200px' }}>
          <span className="ornament-symbol">◆</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: 'rgba(184, 212, 200, 0.4)',
          marginTop: '1rem',
        }}>
          "Through Kerala's monsoon roads and Qatar's desert sands —<br />
          reliability is my constant."
        </div>

        <div style={{
          marginTop: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(184, 212, 200, 0.25)',
        }}>
          Kottayam, Kerala · Available Immediately
        </div>
      </div>
    </AnimatedSection>
  )
}
