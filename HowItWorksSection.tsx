// ==============================================================================
// VERITAS AI - How It Works Methodology Section
// ==============================================================================

import React from 'react';
import { UploadCloud, Cpu, Eye, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Ingestion & Normalization',
      desc: 'Media stream is parsed in sandboxed memory. Bayer CFA color planes and metadata headers are verified against physical sensor specifications.',
      icon: <UploadCloud className="w-5 h-5 text-veritas-cyan" />
    },
    {
      num: '02',
      title: 'Dual-Domain Compression Scan',
      desc: 'Error Level Analysis (ELA) measures regional quantization discrepancies to detect manipulated face swaps and inpainting seams.',
      icon: <Eye className="w-5 h-5 text-veritas-violet" />
    },
    {
      num: '03',
      title: 'Neural Transformer Extraction',
      desc: 'Multi-scale convolutional layers (ResNet-18) and Vision Transformers evaluate biometric symmetry, gaze stability, and frequency checkerboards.',
      icon: <Cpu className="w-5 h-5 text-veritas-cyan" />
    },
    {
      num: '04',
      title: 'Cryptographic Audit Certificate',
      desc: 'A composite confidence score is synthesized, generating an immutable SHA-256 media fingerprint and downloadable audit verification certificate.',
      icon: <Award className="w-5 h-5 text-veritas-violet" />
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="violet" size="md">
            FORENSIC WORKFLOW
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Four-Stage Verification Pipeline
          </h2>
          <p className="text-sm text-slate-400">
            From raw bitstream ingestion to cryptographic certificate issuance in under 180 milliseconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4 group hover:border-veritas-cyan/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-3xl text-slate-700 group-hover:text-veritas-cyan transition-colors">
                  {step.num}
                </span>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  {step.icon}
                </div>
              </div>

              <h3 className="font-display font-bold text-base text-white">
                {step.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
