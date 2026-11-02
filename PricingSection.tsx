// ==============================================================================
// VERITAS AI - Enterprise Pricing Tiers Section
// ==============================================================================

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const PricingSection: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const plans = [
    {
      name: 'Forensic Starter',
      tagline: 'For independent journalists and investigators',
      monthly: 29,
      annual: 24,
      popular: false,
      features: [
        'Up to 500 Image scans / month',
        'Up to 30 Video minutes / month',
        'Standard Error Level Analysis (ELA)',
        'Basic PDF Audit Certificate',
        'Community Discord Support'
      ],
      cta: 'Start with Starter'
    },
    {
      name: 'Professional',
      tagline: 'For newsrooms, law firms, and security teams',
      monthly: 99,
      annual: 79,
      popular: true,
      features: [
        'Up to 5,000 Image scans / month',
        'Up to 300 Video minutes / month',
        'Full 2D FFT & Spectral Heatmaps',
        '68-Point Biometric Landmark Mesh',
        'REST API & Webhooks Access (5 req/sec)',
        'Cryptographic SHA-256 C2PA Audits',
        'Priority 24/7 Forensic Support'
      ],
      cta: 'Deploy Pro'
    },
    {
      name: 'Enterprise Sentinel',
      tagline: 'For defense, intelligence, and platforms',
      monthly: 499,
      annual: 399,
      popular: false,
      features: [
        'Unlimited Image & Video Ingestion',
        'Ultra-low latency (<50ms) inference cluster',
        'Custom Fine-Tuning on Proprietary Datasets',
        'On-Premises Docker / Kubernetes Deployment',
        'Dedicated SLA & Threat Response Officer',
        'SOC2 Type II & HIPAA Certified Pipeline'
      ],
      cta: 'Contact Defense Team'
    }
  ];

  return (
    <section id="pricing" className="relative py-24 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="cyan" size="md">
            PRICING TIERS
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            Transparent Defense Scale
          </h2>
          <p className="text-sm text-slate-400">
            Choose the forensic verification capacity that matches your investigative requirements.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-mono ${!annualBilling ? 'text-white font-bold' : 'text-slate-400'}`}>
              MONTHLY
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors"
            >
              <div
                className={`w-4 h-4 bg-veritas-cyan rounded-full transition-transform ${
                  annualBilling ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <span className={`text-xs font-mono flex items-center gap-1 ${annualBilling ? 'text-white font-bold' : 'text-slate-400'}`}>
              ANNUAL <span className="text-[10px] bg-veritas-cyan/20 text-veritas-cyan px-1.5 py-0.5 rounded font-bold">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = annualBilling ? plan.annual : plan.monthly;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 flex flex-col justify-between space-y-8 transition-all ${
                  plan.popular
                    ? 'bg-slate-900 border-2 border-veritas-cyan shadow-2xl shadow-veritas-cyan/15 lg:-translate-y-2'
                    : 'bg-slate-900/40 border border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-veritas-cyan to-veritas-blue text-slate-950 font-mono text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {plan.tagline}
                  </p>

                  <div className="pt-4 flex items-baseline gap-1">
                    <span className="font-display font-black text-4xl text-white">
                      ${price}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ month</span>
                  </div>

                  <ul className="pt-4 space-y-3 border-t border-slate-800 text-xs text-slate-300">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-veritas-cyan flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
