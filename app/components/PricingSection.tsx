'use client'

import { useRef, useEffect, memo } from 'react'

// ─── Data Matrix (no hardcoded values in JSX) ─────────────────────────────
const pricingMatrix = {
  starter: { base: 29 },
  pro: { base: 79 },
  enterprise: { base: 199 },
}

const currencyConfig = {
  USD: { symbol: '$', tariff: 1.0 },
  INR: { symbol: '₹', tariff: 83.5 },
  EUR: { symbol: '€', tariff: 0.92 },
}

const annualMultiplier = 0.8

type CurrencyKey = keyof typeof currencyConfig
type TierKey = keyof typeof pricingMatrix

function computePrice(tier: TierKey, currency: CurrencyKey, isAnnual: boolean): string {
  const base = pricingMatrix[tier].base
  const { tariff } = currencyConfig[currency]
  return Math.round(base * tariff * (isAnnual ? annualMultiplier : 1)).toLocaleString()
}

// ─── Isolated Price Display — mutates DOM directly, never re-renders ────────
interface PriceSpanProps {
  tierId: string
  tier: TierKey
  currencyRef: React.MutableRefObject<CurrencyKey>
  isAnnualRef: React.MutableRefObject<boolean>
  symbolRef: React.MutableRefObject<string>
}

const PriceDisplay = memo(function PriceDisplay({
  tierId,
  tier,
  currencyRef,
  isAnnualRef,
  symbolRef,
}: PriceSpanProps) {
  const symbolEl = useRef<HTMLSpanElement>(null)
  const amountEl = useRef<HTMLSpanElement>(null)
  const perPeriodEl = useRef<HTMLSpanElement>(null)
  const originalPriceEl = useRef<HTMLSpanElement>(null)

  // Register DOM refs in a global map so the controls can update them
  useEffect(() => {
    const update = () => {
      if (!symbolEl.current || !amountEl.current) return
      const cur = currencyRef.current
      const annual = isAnnualRef.current
      const { symbol } = currencyConfig[cur]
      const price = computePrice(tier, cur, annual)
      const originalPrice = computePrice(tier, cur, false)
      symbolEl.current.textContent = symbol
      amountEl.current.textContent = price
      if (perPeriodEl.current) {
        perPeriodEl.current.textContent = annual ? '/mo billed annually' : '/month'
      }
      if (originalPriceEl.current) {
        if (annual) {
          originalPriceEl.current.textContent = `${symbol}${originalPrice}/mo`
          originalPriceEl.current.style.display = 'inline'
        } else {
          originalPriceEl.current.style.display = 'none'
        }
      }
    }
    // Expose updater on window keyed by tier
    ;(window as unknown as Record<string, unknown>)[`updatePrice_${tierId}`] = update
    update() // initial render
    return () => {
      delete (window as unknown as Record<string, unknown>)[`updatePrice_${tierId}`]
    }
  }, [tier, tierId, currencyRef, isAnnualRef])

  const initPrice = computePrice(tier, 'USD', false)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end gap-1">
        <span
          ref={symbolEl}
          className="pricing-number"
          style={{ fontSize: '1.5rem', alignSelf: 'flex-start', paddingTop: '0.5rem' }}
          aria-hidden="true"
        >
          $
        </span>
        <span
          ref={amountEl}
          className="pricing-number"
          aria-live="polite"
          aria-label={`Price: ${initPrice}`}
          data-testid="price-value"
        >
          {initPrice}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          ref={perPeriodEl}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(217,232,226,0.5)',
          }}
        >
          /month
        </span>
        <span
          ref={originalPriceEl}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(217,232,226,0.35)',
            textDecoration: 'line-through',
            display: 'none',
          }}
        />
      </div>
    </div>
  )
})

// ─── Pricing Card (memo'd — must NOT log on currency/billing change) ────────
interface PricingCardProps {
  tierId: string
  tier: TierKey
  label: string
  tagline: string
  features: string[]
  isFeatured?: boolean
  badge?: string
  currencyRef: React.MutableRefObject<CurrencyKey>
  isAnnualRef: React.MutableRefObject<boolean>
  symbolRef: React.MutableRefObject<string>
}

const PricingCard = memo(function PricingCard({
  tierId,
  tier,
  label,
  tagline,
  features,
  isFeatured = false,
  badge,
  currencyRef,
  isAnnualRef,
  symbolRef,
}: PricingCardProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('card render')
  }
  return (
    <article
      className={`pricing-card flex flex-col gap-6 ${isFeatured ? 'featured' : ''}`}
      aria-label={`${label} pricing plan`}
      style={isFeatured ? { paddingTop: '3.25rem' } : {}}
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFC801',
            color: '#172B36',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '0 0 8px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          {badge}
        </span>
      )}
      {/* Plan header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.05rem',
              fontWeight: 700,
              color: isFeatured ? '#FFC801' : '#D9E8E2',
              marginBottom: '0.25rem',
            }}
          >
            {label}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(217,232,226,0.55)',
            }}
          >
            {tagline}
          </p>
        </div>
      </div>

      {/* Price — isolated DOM update, no re-render */}
      <PriceDisplay
        tierId={tierId}
        tier={tier}
        currencyRef={currencyRef}
        isAnnualRef={isAnnualRef}
        symbolRef={symbolRef}
      />

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(217,232,226,0.1)' }} />

      {/* Feature list */}
      <ul className="flex flex-col gap-0.5 list-none flex-1">
        {features.map((f) => (
          <li key={f} className="pricing-feature-item">
            <img
              src="/icons/arrow-trending-up.svg"
              alt=""
              width={14}
              height={14}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className={isFeatured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
        style={
          !isFeatured
            ? { borderColor: 'rgba(217,232,226,0.2)', color: '#D9E8E2' }
            : {}
        }
        aria-label={`Get started with ${label} plan`}
      >
        {tier === 'enterprise' ? 'Contact Sales' : 'Get Started'}
        <img
          src="/icons/chevron-right.svg"
          alt=""
          width={14}
          height={14}
          style={{
            filter: isFeatured ? 'brightness(0)' : 'invert(85%) sepia(15%) hue-rotate(120deg)',
          }}
        />
      </a>
    </article>
  )
})

// ─── Main Pricing Section ─────────────────────────────────────────────────────
const tiers: Array<{
  tierId: string
  tier: TierKey
  label: string
  tagline: string
  isFeatured?: boolean
  badge?: string
  features: string[]
}> = [
  {
    tierId: 'starter',
    tier: 'starter',
    label: 'Starter',
    tagline: 'Perfect for small teams and side projects',
    features: [
      'Up to 5 pipelines',
      '100K events/month',
      'Basic analytics dashboard',
      'Email support',
      '3 data connectors',
    ],
  },
  {
    tierId: 'pro',
    tier: 'pro',
    label: 'Pro',
    tagline: 'For growing teams with serious data needs',
    isFeatured: true,
    badge: 'Most Popular',
    features: [
      'Unlimited pipelines',
      '10M events/month',
      'Real-time analytics',
      'Priority support 24/7',
      '50+ data connectors',
      'Custom alerts & SLAs',
    ],
  },
  {
    tierId: 'enterprise',
    tier: 'enterprise',
    label: 'Enterprise',
    tagline: 'Enterprise-grade for mission-critical ops',
    features: [
      'Unlimited everything',
      'Custom event volume',
      'Dedicated infrastructure',
      'SLA-backed uptime 99.99%',
      '200+ connectors',
      'SSO & RBAC',
      'Dedicated CSM',
    ],
  },
]

export default function PricingSection() {
  // Isolated refs — never cause re-renders
  const currencyRef = useRef<CurrencyKey>('USD')
  const isAnnualRef = useRef(false)
  const symbolRef = useRef('$')

  // DOM refs for controls
  const billingMonthRef = useRef<HTMLButtonElement>(null)
  const billingAnnualRef = useRef<HTMLButtonElement>(null)
  const savingsBadgeRef = useRef<HTMLSpanElement>(null)

  function triggerPriceUpdates() {
    tiers.forEach(({ tierId }) => {
      const fn = (window as unknown as Record<string, unknown>)[`updatePrice_${tierId}`]
      if (typeof fn === 'function') (fn as () => void)()
    })
  }

  function handleBillingToggle(annual: boolean) {
    isAnnualRef.current = annual

    // Update button styles via DOM
    if (billingMonthRef.current && billingAnnualRef.current) {
      if (annual) {
        billingAnnualRef.current.classList.add('active')
        billingMonthRef.current.classList.remove('active')
      } else {
        billingMonthRef.current.classList.add('active')
        billingAnnualRef.current.classList.remove('active')
      }
    }

    // Show/hide savings badge
    if (savingsBadgeRef.current) {
      savingsBadgeRef.current.style.opacity = annual ? '1' : '0'
    }

    triggerPriceUpdates()
  }

  function handleCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const cur = e.target.value as CurrencyKey
    currencyRef.current = cur
    symbolRef.current = currencyConfig[cur].symbol
    triggerPriceUpdates()
  }

  return (
    <section
      id="pricing"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #172B36 0%, #114C5A 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14 gap-4">
          <span className="section-badge section-badge-dark">
            <img
              src="/icons/chart-pie.svg"
              alt=""
              width={12}
              height={12}
              style={{ filter: 'invert(80%) sepia(50%) saturate(400%) brightness(105%)' }}
            />
            Transparent Pricing
          </span>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#F1F6F4',
              lineHeight: 1.15,
            }}
          >
            Simple pricing,{' '}
            <span className="gradient-text">powerful results</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(217,232,226,0.6)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            Start free, scale as you grow. No hidden fees. No surprises.
          </p>
        </div>

        {/* Controls: billing toggle + currency dropdown */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {/* Billing toggle */}
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button
              ref={billingMonthRef}
              type="button"
              className="billing-btn active"
              onClick={() => handleBillingToggle(false)}
              aria-pressed="true"
              id="billing-monthly"
            >
              Monthly
            </button>
            <button
              ref={billingAnnualRef}
              type="button"
              className="billing-btn"
              onClick={() => handleBillingToggle(true)}
              aria-pressed="false"
              id="billing-annual"
            >
              Annual
            </button>
          </div>

          {/* Savings badge */}
          <span
            ref={savingsBadgeRef}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.75rem',
              borderRadius: '50px',
              background: 'rgba(255,200,1,0.15)',
              color: '#FFC801',
              border: '1px solid rgba(255,200,1,0.25)',
              opacity: 0,
              transition: 'opacity 200ms ease-out',
            }}
            aria-live="polite"
          >
            Save 20%
          </span>

          {/* Currency dropdown */}
          <div className="relative w-full md:w-auto">
            <label htmlFor="currency-select" className="sr-only">
              Select currency
            </label>
            <select
              id="currency-select"
              className="currency-select"
              onChange={handleCurrencyChange}
              defaultValue="USD"
            >
              <option value="USD">🇺🇸 USD ($)</option>
              <option value="INR">🇮🇳 INR (₹)</option>
              <option value="EUR">🇪🇺 EUR (€)</option>
            </select>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Pricing plans"
        >
          {tiers.map((t) => (
            <PricingCard
              key={t.tierId}
              {...t}
              currencyRef={currencyRef}
              isAnnualRef={isAnnualRef}
              symbolRef={symbolRef}
            />
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="text-center mt-10"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.82rem',
            color: 'rgba(217,232,226,0.35)',
          }}
        >
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  )
}
