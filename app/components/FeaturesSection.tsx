'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const features = [
  {
    id: 1,
    title: 'Intelligent Pipeline',
    icon: '/icons/cog-8-tooth.svg',
    description:
      'AI-driven workflow automation that learns from your patterns. Automatically optimize task sequencing, detect anomalies, and self-heal broken pipelines — all without manual intervention.',
    altText: 'Cog gear icon representing workflow automation',
  },
  {
    id: 2,
    title: 'Real-time Analytics',
    icon: '/icons/chart-pie.svg',
    description:
      'Live data visualization with sub-second latency. Monitor KPIs, track conversion funnels, and generate predictive dashboards powered by streaming ML models.',
    altText: 'Pie chart icon representing analytics',
  },
  {
    id: 3,
    title: 'Smart Routing',
    icon: '/icons/arrow-path.svg',
    description:
      'Dynamic traffic management with intelligent load balancing. Route data flows based on real-time capacity, priority, and cost optimization rules — automatically.',
    altText: 'Circular arrows icon representing smart routing',
  },
  {
    id: 4,
    title: 'Growth Tracking',
    icon: '/icons/arrow-trending-up.svg',
    description:
      'Performance metrics that reveal the full growth story. From cohort retention to revenue attribution, surface the signals that matter most to your business.',
    altText: 'Trending up arrow icon representing growth metrics',
  },
  {
    id: 5,
    title: 'Modular Architecture',
    icon: '/icons/cube-16-solid.svg',
    description:
      'Plug-and-play components that snap together in minutes. Build complex data infrastructure from battle-tested building blocks — no vendor lock-in ever.',
    altText: 'Cube icon representing modular components',
  },
  {
    id: 6,
    title: 'Deep Integrations',
    icon: '/icons/link-solid.svg',
    description:
      'Connect any data source with 200+ pre-built connectors. From Salesforce to Snowflake, Kafka to PostgreSQL — plug in once and synchronize everything.',
    altText: 'Chain link icon representing integrations',
  },
]

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  // Refs for cross-breakpoint state transfer
  const activeIndexRef  = useRef<number | null>(null)
  const openAccordionRef = useRef<number | null>(null)
  const isMobileRef     = useRef(false)
  const debounceTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768

    const handleResize = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        const nowMobile = window.innerWidth < 768
        const wasMobile = isMobileRef.current
        if (nowMobile !== wasMobile) {
          isMobileRef.current = nowMobile
          if (nowMobile) {
            // Desktop → Mobile: transfer hovered bento → open accordion
            const index = activeIndexRef.current
            if (index !== null) {
              setOpenAccordion(index)
              openAccordionRef.current = index
            }
          } else {
            // Mobile → Desktop: transfer open accordion → active bento
            const index = openAccordionRef.current
            activeIndexRef.current = index
            setActiveIndex(index)
          }
        }
      }, 50)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  const toggleAccordion = (idx: number) => {
    const next = openAccordionRef.current === idx ? null : idx
    openAccordionRef.current = next
    setOpenAccordion(next)
  }

  return (
    <section
      id="features"
      className="py-24 px-6"
      style={{
        /* FIX 4: radial gradient overlay + top border */
        background: 'radial-gradient(ellipse at top, #D9E8E2 0%, #F1F6F4 60%)',
        borderTop: '1px solid #D9E8E2',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <span
            className="section-badge"
            style={{ color: '#114C5A', background: 'rgba(17,76,90,0.08)', border: '1px solid rgba(17,76,90,0.18)' }}
          >
            <img src="/icons/cog-8-tooth.svg" alt="" width={12} height={12}
              style={{ filter: 'invert(25%) sepia(60%) saturate(300%) hue-rotate(160deg)' }} />
            Platform Features
          </span>

          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#172B36',
            lineHeight: 1.15,
          }}>
            Everything you need to{' '}
            {/* FIX 4: gradient text #FFC801 → #FF9932 */}
            <span style={{
              background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              move faster
            </span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            color: 'rgba(23,43,54,0.65)',
            maxWidth: '560px',
            lineHeight: 1.7,
          }}>
            Six core capabilities that transform how your team builds, runs,
            and scales data automation at any stage.
          </p>
        </div>

        {/* DESKTOP: Bento Grid (≥768px) — FIX 1 */}
        <div className="hidden md:grid bento-grid" role="list" aria-label="Feature cards">
          {features.map((feature, idx) => {
            const isCard6 = idx === 5
            return (
              <article
                key={feature.id}
                className={`bento-card ${activeIndex === idx ? 'active' : ''}`}
                role="listitem"
                tabIndex={0}
                aria-label={feature.title}
                onMouseEnter={() => { activeIndexRef.current = idx; setActiveIndex(idx) }}
                onMouseLeave={() => { activeIndexRef.current = null; setActiveIndex(null) }}
                onFocus={() => { activeIndexRef.current = idx; setActiveIndex(idx) }}
                onBlur={() => { activeIndexRef.current = null; setActiveIndex(null) }}
              >
                {/* Card 6 is horizontal: icon left, text right */}
                <div className={isCard6 ? 'bento-icon' : 'bento-icon'}>
                  <img src={feature.icon} alt={feature.altText} width={24} height={24} />
                </div>

                <div className={isCard6 ? 'bento-card-text' : ''}>
                  {/* FIX 5: typography */}
                  <h3 className="bento-title">{feature.title}</h3>
                  <p className="bento-desc">{feature.description}</p>

                  {/* FIX 5: Learn more with arrow-path.svg, #FF9932 color */}
                  <span className="bento-learn-more">
                    <img src="/icons/arrow-path.svg" alt="" width={13} height={13} />
                    Learn more
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {/* MOBILE: Accordion (<768px) — FIX 8 */}
        <div className="block md:hidden accordion-list" role="list" aria-label="Feature accordion">
          {features.map((feature, idx) => {
            const isOpen = openAccordion === idx
            return (
              <div
                key={feature.id}
                className={`accordion-item ${isOpen ? 'open' : ''} w-full overflow-hidden`}
                role="listitem"
              >
                <button
                  type="button"
                  className="accordion-header"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-body-${idx}`}
                  id={`accordion-header-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                >
                  <div className="accordion-header-left">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: '#114C5A' }}
                    >
                      <img src={feature.icon} alt="" width={18} height={18}
                        style={{ filter: 'invert(1) brightness(2)' }} />
                    </div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#172B36',
                    }}>
                      {feature.title}
                    </span>
                  </div>
                  {/* FIX 8: chevron-down rotates 180deg on open via CSS */}
                  <img
                    src="/icons/chevron-down.svg"
                    alt={isOpen ? 'Collapse' : 'Expand'}
                    width={20}
                    height={20}
                    className="accordion-chevron"
                    style={{ filter: 'invert(25%) sepia(60%) saturate(300%) hue-rotate(160deg)' }}
                  />
                </button>

                {/* FIX 8: max-height 0 → 600px transition */}
                <div
                  id={`accordion-body-${idx}`}
                  role="region"
                  aria-labelledby={`accordion-header-${idx}`}
                  className="accordion-body"
                  style={{ maxHeight: isOpen ? '600px' : '0' }}
                >
                  <div className="accordion-body-inner">
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      color: '#114C5A',
                      lineHeight: 1.7,
                    }}>
                      {feature.description}
                    </p>
                    <span className="bento-learn-more" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                      <img src="/icons/arrow-path.svg" alt="" width={13} height={13} />
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
