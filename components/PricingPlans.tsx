'use client';

import { useState } from 'react';

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      '5 Active Agents',
      '100 Workflow Executions/month',
      'Basic Templates',
      'Email Support',
      'Community Access',
    ],
  },
  {
    name: 'Professional',
    monthlyPrice: 99,
    annualPrice: 990,
    features: [
      '25 Active Agents',
      'Unlimited Workflow Executions',
      'Premium Templates',
      'Priority Support',
      'Advanced Analytics',
      'Custom Integrations',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 299,
    annualPrice: 2990,
    features: [
      'Unlimited Active Agents',
      'Unlimited Everything',
      'All Templates + Custom',
      '24/7 Dedicated Support',
      'Advanced Security',
      'SLA Guarantee',
      'On-premise Option',
    ],
  },
];

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const calculateSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyCost = monthlyPrice * 12;
    const savings = monthlyCost - annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Choose Your Plan
      </h2>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => {
          const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
          const { savings, percentage } = calculateSavings(tier.monthlyPrice, tier.annualPrice);
          
          return (
            <div
              key={tier.name}
              className={`rounded-lg p-6 transition-all hover:scale-105 ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl transform scale-105'
                  : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600'
              }`}
            >
              {tier.highlighted && (
                <div className="text-center mb-2">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${
                tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {tier.name}
              </h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  ${price}
                </span>
                <span className={`text-sm ${
                  tier.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
                
                {billingCycle === 'annual' && (
                  <div className={`text-xs mt-1 ${
                    tier.highlighted ? 'text-blue-100' : 'text-green-600 dark:text-green-400'
                  }`}>
                    Save ${savings} ({percentage}% off)
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mr-2 flex-shrink-0 ${
                        tier.highlighted ? 'text-green-300' : 'text-green-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={`text-sm ${
                      tier.highlighted ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  tier.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-xl'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                }`}
              >
                Get Started
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  );
}
