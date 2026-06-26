'use client'

import { useEffect, useState, useRef } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeRef = useRef<() => void>(null!)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen])

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: 'javascript:void(0)' },
    { label: 'Blog', href: 'javascript:void(0)' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'nav-transparent'
        }`}
        style={{ transition: 'background-color 300ms ease-out, border-bottom 300ms ease-out' }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 no-underline"
            aria-label="NeuralFlow home"
          >
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
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FFC801' }}
            >
              NeuralFlow
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150"
              style={{ background: 'rgba(217,232,226,0.08)' }}
              aria-label="Search"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(217,232,226,0.16)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(217,232,226,0.08)'
              }}
            >
              <img
                src="/icons/search.svg"
                alt=""
                width={18}
                height={18}
                style={{ filter: 'invert(85%) sepia(15%) hue-rotate(120deg)' }}
              />
            </button>
            <a href="#pricing" className="btn-primary btn-sm">
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(217,232,226,0.08)' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span className="flex flex-col gap-1.5 w-4">
              <span className="block h-0.5 w-full rounded" style={{ background: '#D9E8E2' }} />
              <span className="block h-0.5 w-full rounded" style={{ background: '#D9E8E2' }} />
              <span className="block h-0.5 w-2/3 rounded" style={{ background: '#D9E8E2' }} />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        className={`mobile-nav ${mobileOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(217,232,226,0.08)' }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <img
            src="/icons/x-mark.svg"
            alt=""
            width={18}
            height={18}
            style={{ filter: 'invert(85%) sepia(15%) hue-rotate(120deg)' }}
          />
        </button>

        <ul className="flex flex-col gap-1 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="block px-3 py-3 rounded-lg text-base font-medium transition-colors duration-150"
                style={{ color: '#D9E8E2', textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#FFC801')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#D9E8E2')
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: 'rgba(217,232,226,0.08)', color: '#D9E8E2' }}
          >
            <img
              src="/icons/search.svg"
              alt=""
              width={16}
              height={16}
              style={{ filter: 'invert(85%) sepia(15%) hue-rotate(120deg)' }}
            />
            Search
          </button>
          <a
            href="#pricing"
            className="btn-primary w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </a>
        </div>
      </nav>
    </>
  )
}
