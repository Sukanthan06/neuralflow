'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // FIX 7: Hide scroll indicator after scrolling 100px
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return
      if (window.scrollY > 100) {
        scrollIndicatorRef.current.classList.add('hidden')
      } else {
        scrollIndicatorRef.current.classList.remove('hidden')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
      style={{ background: 'linear-gradient(135deg, #114C5A 0%, #172B36 100%)' }}
    >
      {/* Background mesh grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,232,226,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,232,226,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,200,1,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* FIX 6: Floating arrow-trending-up — gentle 3s float, forsythia glow */}
      <div
        className="float-icon-a absolute hidden md:block"
        aria-hidden="true"
        style={{ top: '18%', left: '8%', opacity: 0.55 }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,200,1,0.12)', border: '1.5px solid rgba(255,200,1,0.2)' }}
        >
          <img
            src="/icons/arrow-trending-up.svg"
            alt="trending growth indicator"
            width={40}
            height={40}
            style={{ filter: 'invert(85%) sepia(60%) saturate(400%) hue-rotate(0deg) brightness(105%)' }}
          />
        </div>
      </div>

      {/* FIX 6: Floating chart-pie — 1.5s delay, saffron glow */}
      <div
        className="float-icon-b absolute hidden md:block"
        aria-hidden="true"
        style={{ top: '22%', right: '7%', opacity: 0.5 }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,153,50,0.12)', border: '1.5px solid rgba(255,153,50,0.2)' }}
        >
          <img
            src="/icons/chart-pie.svg"
            alt="analytics dashboard indicator"
            width={40}
            height={40}
            style={{ filter: 'invert(70%) sepia(50%) saturate(500%) hue-rotate(340deg) brightness(105%)' }}
          />
        </div>
      </div>

      {/* Floating pills */}
      <div
        className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full float-a"
        aria-hidden="true"
        style={{
          bottom: '28%',
          left: '10%',
          background: 'rgba(17,76,90,0.8)',
          border: '1px solid rgba(217,232,226,0.15)',
          backdropFilter: 'blur(12px)',
          opacity: 0.8,
          animationDelay: '1.5s',
        }}
      >
        <img src="/icons/arrow-path.svg" alt="" width={14} height={14}
          style={{ filter: 'invert(70%) sepia(30%) hue-rotate(130deg)' }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#D9E8E2' }}>
          99.9% uptime
        </span>
      </div>

      <div
        className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full float-b"
        aria-hidden="true"
        style={{
          bottom: '28%',
          right: '10%',
          background: 'rgba(17,76,90,0.8)',
          border: '1px solid rgba(217,232,226,0.15)',
          backdropFilter: 'blur(12px)',
          opacity: 0.8,
          animationDelay: '2s',
        }}
      >
        <img src="/icons/cog-8-tooth.svg" alt="" width={14} height={14}
          style={{ filter: 'invert(70%) sepia(30%) hue-rotate(130deg)' }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#D9E8E2' }}>
          10M+ pipelines
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl gap-8">
        {/* Badge */}
        <div className="hero-animate-badge">
          <span className="section-badge section-badge-dark">
            <img src="/icons/arrow-trending-up.svg" alt="" width={12} height={12}
              style={{ filter: 'invert(80%) sepia(50%) saturate(400%) brightness(105%)' }} />
            Now in Public Beta
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-animate-1 text-3xl md:text-6xl"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#F1F6F4',
          }}
        >
          Automate Everything.{' '}
          <br />
          <span className="gradient-text">Scale Infinitely.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-animate-2 max-w-2xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: 400,
            lineHeight: 1.7,
            color: '#D9E8E2',
          }}
        >
          NeuralFlow connects your entire data ecosystem with intelligent AI pipelines —
          orchestrating workflows, predicting bottlenecks, and scaling operations
          without writing a single line of code.
        </p>

        {/* CTAs */}
        <div className="hero-animate-3 flex flex-col md:flex-row gap-4 justify-center w-full max-w-sm md:max-w-none px-4 md:px-0">
          <a href="#pricing" className="btn-primary w-full md:w-auto justify-center">
            <img src="/icons/arrow-trending-up.svg" alt="" width={18} height={18}
              style={{ filter: 'brightness(0)' }} />
            Start Free Trial
          </a>
          <a href="#features" className="btn-secondary w-full md:w-auto justify-center">
            Explore Features
            <img src="/icons/chevron-right.svg" alt="" width={16} height={16}
              style={{ filter: 'invert(85%) sepia(15%) hue-rotate(120deg)' }} />
          </a>
        </div>

        {/* Trust indicators */}
        <div
          className="hero-animate-4 flex flex-wrap items-center justify-center gap-6"
          style={{ borderTop: '1px solid rgba(217,232,226,0.1)', paddingTop: '2rem', marginTop: '0.5rem' }}
        >
          {[
            { icon: '/icons/cog-8-tooth.svg', text: 'No-code setup' },
            { icon: '/icons/link-solid.svg',  text: '200+ integrations' },
            { icon: '/icons/chart-pie.svg',   text: 'Real-time insights' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2" style={{ color: 'rgba(217,232,226,0.7)' }}>
              <img src={icon} alt="" width={16} height={16}
                style={{ filter: 'invert(70%) sepia(20%) hue-rotate(120deg)' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500 }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FIX 7: Scroll indicator — bounce chevron, fades after 100px scroll */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute bottom-8 flex flex-col items-center gap-1"
        aria-hidden="true"
        style={{ opacity: 0.55 }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem',
          color: '#D9E8E2',
          letterSpacing: '0.12em',
          fontWeight: 600,
        }}>
          SCROLL
        </span>
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={22}
          height={22}
          className="scroll-bounce"
          style={{ filter: 'invert(85%) sepia(15%) hue-rotate(120deg)' }}
        />
      </div>
    </section>
  )
}
