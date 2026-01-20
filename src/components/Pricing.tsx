import { useState } from 'react'
import './Pricing.css'

interface PricingTier {
  name: string
  rank: string
  price: number
  yearlyPrice: number
  features: string[]
  xp: number
  badge: string
  popular?: boolean
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const tiers: PricingTier[] = [
    {
      name: 'Starter',
      rank: 'Apprentice',
      price: 29,
      yearlyPrice: 290,
      xp: 100,
      badge: '🥉',
      features: [
        '5 Active Agents',
        '1,000 Tasks/month',
        'Basic Analytics',
        'Email Support',
        'Community Access',
      ]
    },
    {
      name: 'Pro',
      rank: 'Guardian',
      price: 79,
      yearlyPrice: 790,
      xp: 500,
      badge: '🥈',
      popular: true,
      features: [
        '20 Active Agents',
        '10,000 Tasks/month',
        'Advanced Analytics',
        'Priority Support',
        'Custom Workflows',
        'API Access',
      ]
    },
    {
      name: 'Business',
      rank: 'Architect',
      price: 199,
      yearlyPrice: 1990,
      xp: 1500,
      badge: '🥇',
      features: [
        'Unlimited Agents',
        '100,000 Tasks/month',
        'Real-time Analytics',
        '24/7 Support',
        'Advanced Workflows',
        'Full API Access',
        'Team Collaboration',
      ]
    },
    {
      name: 'Enterprise',
      rank: 'Legend',
      price: 499,
      yearlyPrice: 4990,
      xp: 5000,
      badge: '💎',
      features: [
        'Unlimited Everything',
        'Custom Solutions',
        'Dedicated Support',
        'White Label Options',
        'SLA Guarantee',
        'Custom Integrations',
        'On-Premise Deployment',
        'Training & Onboarding',
      ]
    },
  ]

  return (
    <div className="pricing fade-in">
      <div className="pricing-header">
        <h2>💎 Choose Your Quest Tier</h2>
        <p>Level up your AI workforce with the perfect plan</p>
      </div>

      <div className="billing-toggle">
        <span className={!isAnnual ? 'active' : ''}>Monthly</span>
        <button 
          className="toggle-btn"
          onClick={() => setIsAnnual(!isAnnual)}
        >
          <span className={`toggle-slider ${isAnnual ? 'annual' : ''}`}></span>
        </button>
        <span className={isAnnual ? 'active' : ''}>
          Annual <span className="save-badge">Save 17%</span>
        </span>
      </div>

      <div className="pricing-grid">
        {tiers.map((tier, index) => (
          <div 
            key={index} 
            className={`pricing-card ${tier.popular ? 'popular' : ''}`}
          >
            {tier.popular && <div className="popular-badge">Most Popular</div>}
            
            <div className="tier-badge">{tier.badge}</div>
            <h3 className="tier-name">{tier.name}</h3>
            <div className="tier-rank">{tier.rank}</div>
            
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">
                {isAnnual ? tier.yearlyPrice : tier.price}
              </span>
              <span className="period">/{isAnnual ? 'year' : 'month'}</span>
            </div>

            <div className="xp-reward">
              ⚡ Earn {tier.xp} XP
            </div>

            <ul className="features-list">
              {tier.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`select-btn ${tier.popular ? 'popular' : ''}`}>
              {tier.popular ? '🚀 Get Started' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-footer">
        <p>✨ All plans include a 14-day free trial with no credit card required</p>
        <p>🛡️ Enterprise-grade security and 99.9% uptime SLA on Business and Enterprise plans</p>
      </div>
    </div>
  )
}

export default Pricing
