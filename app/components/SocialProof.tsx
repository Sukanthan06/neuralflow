'use client'

const testimonials = [
  {
    id: 1,
    quote:
      "NeuralFlow cut our data processing time by 80%. We went from running nightly batch jobs to real-time pipelines in a single afternoon. It's genuinely magical.",
    name: 'Priya Nair',
    role: 'Head of Data Engineering',
    company: 'FinStack',
    avatar: 'PN',
  },
  {
    id: 2,
    quote:
      "The smart routing alone saved us $40K/month in cloud spend. The AI predictions are scarily accurate — it anticipated our traffic spikes before our own engineers did.",
    name: 'Marcus Chen',
    role: 'CTO',
    company: 'Logify',
    avatar: 'MC',
  },
  {
    id: 3,
    quote:
      "We evaluated five automation platforms. NeuralFlow won on every dimension: depth of integrations, reliability, and the quality of the real-time analytics.",
    name: 'Sara Lindström',
    role: 'VP Engineering',
    company: 'DataPulse',
    avatar: 'SL',
  },
]

const companyLogos = [
  { name: 'FinStack', icon: '/icons/cube-16-solid.svg' },
  { name: 'Logify', icon: '/icons/link.svg' },
  { name: 'DataPulse', icon: '/icons/chart-pie.svg' },
  { name: 'Orion Labs', icon: '/icons/cog-8-tooth.svg' },
  { name: 'Nexus', icon: '/icons/arrow-path.svg' },
]

const stats = [
  { value: '10M+', label: 'Automations run', icon: '/icons/arrow-path.svg' },
  { value: '99.9%', label: 'Uptime SLA', icon: '/icons/arrow-trending-up.svg' },
  { value: '4.9★', label: 'Average rating', icon: '/icons/chart-pie.svg' },
  { value: '<50ms', label: 'Median latency', icon: '/icons/cog-8-tooth.svg' },
]

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      className="py-24 px-6"
      style={{ background: '#F1F6F4' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* Stats row */}
        <div>
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <span
              className="section-badge"
              style={{ color: '#114C5A', background: 'rgba(17,76,90,0.08)', border: '1px solid rgba(17,76,90,0.18)' }}
            >
              <img
                src="/icons/arrow-trending-up.svg"
                alt=""
                width={12}
                height={12}
                style={{ filter: 'invert(25%) sepia(60%) saturate(300%) hue-rotate(160deg)' }}
              />
              Trusted Worldwide
            </span>
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                color: '#172B36',
                lineHeight: 1.2,
              }}
            >
              Numbers that speak for themselves
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(17,76,90,0.08)',
                  boxShadow: '0 2px 16px rgba(17,76,90,0.05)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(17,76,90,0.07)' }}
                >
                  <img
                    src={stat.icon}
                    alt=""
                    width={20}
                    height={20}
                    style={{ filter: 'invert(25%) sepia(60%) saturate(300%) hue-rotate(160deg)' }}
                  />
                </div>
                <span
                  className="stat-number"
                  aria-label={stat.value}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'rgba(23,43,54,0.55)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="flex flex-col items-center text-center mb-12 gap-3">
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                color: '#172B36',
                lineHeight: 1.2,
              }}
            >
              What our customers say
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(23,43,54,0.55)',
                maxWidth: '480px',
              }}
            >
              Real stories from teams who transformed their data operations with NeuralFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="testimonial-card flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      style={{ color: '#FFC801', fontSize: '1rem' }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    color: 'rgba(23,43,54,0.75)',
                    flex: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <footer className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #114C5A, #172B36)',
                      color: '#FFC801',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <cite
                      style={{
                        fontStyle: 'normal',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#172B36',
                        display: 'block',
                      }}
                    >
                      {t.name}
                    </cite>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.775rem',
                        color: 'rgba(23,43,54,0.5)',
                      }}
                    >
                      {t.role} · {t.company}
                    </span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Company logos */}
        <div className="flex flex-col items-center gap-8">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'rgba(23,43,54,0.4)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Trusted by leading teams
          </p>
          {/* FIX 11: Infinite marquee — duplicate list for seamless loop */}
          <div className="marquee-wrapper w-full">
            <div className="marquee-track">
              {/* First set */}
              {companyLogos.map(({ name, icon }) => (
                <div key={`a-${name}`} className="logo-chip" aria-label={name}>
                  <img src={icon} alt="" width={18} height={18}
                    style={{ filter: 'invert(25%) sepia(60%) saturate(300%) hue-rotate(160deg)', opacity: 0.7 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(23,43,54,0.6)' }}>
                    {name}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companyLogos.map(({ name, icon }) => (
                <div key={`b-${name}`} className="logo-chip" aria-hidden="true">
                  <img src={icon} alt="" width={18} height={18}
                    style={{ filter: 'invert(25%) sepia(60%) saturate(300%) hue-rotate(160deg)', opacity: 0.7 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(23,43,54,0.6)' }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
