// ==============================================================================
// VERITAS AI - Professional Footer
// ==============================================================================

import React from 'react';
import { Shield, Lock, Terminal, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-veritas-cyan/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-veritas-cyan/10 border border-veritas-cyan/30">
                <Shield className="w-5 h-5 text-veritas-cyan" />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                VERITAS<span className="text-veritas-cyan italic">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Next-generation deepfake detection and media authentication. Defending visual truth with multi-scale neural forensics, Error Level Analysis (ELA), and spatial frequency decomposition.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.4% ROC-AUC BENCHMARK
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-veritas-cyan bg-veritas-cyan/10 px-2.5 py-1 rounded-full border border-veritas-cyan/20">
                <Lock className="w-3.5 h-3.5" /> C2PA COMPLIANT
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Forensic Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#studio" className="hover:text-veritas-cyan transition-colors">Image AI Detector</a></li>
              <li><a href="#studio" className="hover:text-veritas-cyan transition-colors">Video Temporal Scanner</a></li>
              <li><a href="#technology" className="hover:text-veritas-cyan transition-colors">Error Level Analysis (ELA)</a></li>
              <li><a href="#technology" className="hover:text-veritas-cyan transition-colors">Spectral Fourier Maps</a></li>
              <li><a href="#pricing" className="hover:text-veritas-cyan transition-colors">Enterprise API Gateway</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Resources & Docs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#technology" className="hover:text-veritas-cyan transition-colors">Model Architecture</a></li>
              <li><a href="#how-it-works" className="hover:text-veritas-cyan transition-colors">Detection Methodology</a></li>
              <li><a href="#faq" className="hover:text-veritas-cyan transition-colors">Forensic FAQ</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-veritas-cyan transition-colors flex items-center gap-1">
                GitHub Repository <Terminal className="w-3 h-3" />
              </a></li>
              <li><a href="#" className="hover:text-veritas-cyan transition-colors">Benchmark Datasets</a></li>
            </ul>
          </div>

          {/* Security & Compliance */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Security & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-veritas-cyan transition-colors">Zero-Storage Privacy Policy</a></li>
              <li><a href="#" className="hover:text-veritas-cyan transition-colors">Cryptographic Audit Hashes</a></li>
              <li><a href="#" className="hover:text-veritas-cyan transition-colors">Terms of Forensic Verification</a></li>
              <li><a href="#" className="hover:text-veritas-cyan transition-colors">Responsible AI Disclosure</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} VERITAS AI. All rights reserved. &bull; <span className="text-slate-300">See Beyond the Synthetic.</span></p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="font-mono text-[11px] text-slate-300">DEMO & PRODUCTION HYBRID SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
