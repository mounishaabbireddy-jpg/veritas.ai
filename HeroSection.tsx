// ==============================================================================
// VERITAS AI - Cinematic Hero Section
// ==============================================================================

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { CinematicScanner } from './CinematicScanner';

interface HeroSectionProps {
  onScanClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScanClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background ambient neon glow spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-veritas-cyan/15 via-veritas-violet/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" pulse size="md">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> NEXT-GEN DEEPFAKE FORENSICS
              </Badge>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                ResNet-18 &bull; Vision Transformers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
              See Beyond the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-veritas-cyan via-veritas-blue to-veritas-violet">
                Synthetic
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Detect deepfakes, AI-synthesized faces, diffusion-generated imagery, and tampered video streams with mathematical precision. Powered by dual-domain Error Level Analysis and high-frequency spectral decomposition.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={onScanClick}
                className="w-full sm:w-auto"
              >
                Launch Detection Studio
              </Button>
              <a
                href="#technology"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-all"
              >
                Explore Methodology
              </a>
            </div>

            {/* Metrics Chips Row */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="font-display font-black text-2xl text-veritas-cyan">99.4%</div>
                <div className="text-xs text-slate-400 font-mono">ROC-AUC Benchmark</div>
              </div>
              <div>
                <div className="font-display font-black text-2xl text-white">&lt;180ms</div>
                <div className="text-xs text-slate-400 font-mono">Inference Latency</div>
              </div>
              <div>
                <div className="font-display font-black text-2xl text-emerald-400">Zero</div>
                <div className="text-xs text-slate-400 font-mono">Data Retention</div>
              </div>
            </div>

          </div>

          {/* Right Column: Cinematic Interactive Scanner HUD */}
          <div className="lg:col-span-5 flex justify-center">
            <CinematicScanner />
          </div>

        </div>
      </div>
    </section>
  );
};
