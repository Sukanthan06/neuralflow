'use client'

import { useEffect, useRef } from 'react'

const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: 'javascript:void(0)' },
      { label: 'Roadmap', href: 'javascript:void(0)' },
      { label: 'Status', href: 'javascript:void(0)' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation', href: 'javascript:void(0)' },
      { label: 'API Reference', href: 'javascript:void(0)' },
      { label: 'SDK Libraries', href: 'javascript:void(0)' },
      { label: 'Open Source', href: 'javascript:void(0)' },
      { label: 'GitHub', href: 'javascript:void(0)' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: 'javascript:void(0)' },
      { label: 'Blog', href: 'javascript:void(0)' },
      { label: 'Careers', href: 'javascript:void(0)' },
      { label: 'Press Kit', href: 'javascript:void(0)' },
      { label: 'Contact', href: 'javascript:void(0)' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: 'javascript:void(0)' },
      { label: 'Terms of Service', href: 'javascript:void(0)' },
      { label: 'Cookie Policy', href: 'javascript:void(0)' },
      { label: 'GDPR', href: 'javascript:void(0)' },
      { label: 'Security', href: 'javascript:void(0)' },
    ],
  },
]

export default function Footer() {
  // FIX 12: FAB appears after 300px scroll
  const fabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!fabRef.current) return
      if (window.scrollY > 300) {
        fabRef.current.classList.add('visible')
      } else {
        fabRef.current.classList.remove('visible')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
    <footer
      style={{ background: '#172B36', borderTop: '1px solid rgba(217,232,226,0.08)' }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row: logo + back-to-top */}
        <div className="flex items-start justify-between mb-14 gap-6 flex-wrap">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <a href="/" className="flex items-center gap-2 no-underline" aria-label="NeuralFlow home">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FFC801, #FF9932)' }}
                aria-hidden="true"
              >
                <img
                  src="/icons/cube-16-solid.svg"
                  alt=""
                  width={16}
                  height={16}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#FFC801',
                }}
              >
                NeuralFlow
              </span>
            </a>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                color: 'rgba(217,232,226,0.45)',
                lineHeight: 1.65,
              }}
            >
              AI-driven data automation for modern teams. Build smarter pipelines. Scale without limits.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { href: '#', icon: '/icons/link.svg', label: 'Website' },
                { href: '#', icon: '/icons/arrow-trending-up.svg', label: 'Twitter' },
                { href: '#', icon: '/icons/cube-16-solid.svg', label: 'GitHub' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                  style={{ background: 'rgba(217,232,226,0.06)', border: '1px solid rgba(217,232,226,0.1)' }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      'rgba(255,200,1,0.12)'
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                      'rgba(255,200,1,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      'rgba(217,232,226,0.06)'
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                      'rgba(217,232,226,0.1)'
                  }}
                >
                  <img
                    src={icon}
                    alt=""
                    width={14}
                    height={14}
                    style={{ filter: 'invert(70%) sepia(20%) hue-rotate(120deg)' }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <img
              src="/icons/chevron-up.svg"
              alt=""
              width={18}
              height={18}
              style={{ filter: 'invert(80%) sepia(50%) saturate(400%) brightness(105%)' }}
            />
          </button>
        </div>

        {/* Link grid: responsive columns */}
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14"
        >
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#D9E8E2',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '1px solid rgba(217,232,226,0.08)', paddingTop: '1.5rem' }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(217,232,226,0.3)',
            }}
          >
            © {new Date().getFullYear()} NeuralFlow, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <img
              src="/icons/link-solid.svg"
              alt=""
              width={12}
              height={12}
              style={{ filter: 'invert(50%) sepia(10%) hue-rotate(120deg)' }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: 'rgba(217,232,226,0.25)',
              }}
            >
              neuralflow.ai
            </span>
          </div>
        </div>
      </div>
    </footer>

    {/* FIX 12: Fixed FAB — #FFC801, circular, 44px, scale hover, 300px scroll threshold */}
    <button
      ref={fabRef}
      type="button"
      className="back-to-top-fab"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <img
        src="/icons/chevron-up-solid.svg"
        alt=""
        width={20}
        height={20}
      />
    </button>
    </>
  )
}
