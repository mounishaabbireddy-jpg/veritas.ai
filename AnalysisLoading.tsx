// ==============================================================================
// VERITAS AI - Cinematic Analysis Loading State
// ==============================================================================

import React from 'react';
import { Scan, CheckCircle } from 'lucide-react';

interface AnalysisLoadingProps {
  progress: number;
  currentStepText: string;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({
  progress,
  currentStepText,
}) => {
  const steps = [
    { title: 'Color-Space Normalization & CFA Integrity', threshold: 25 },
    { title: 'Dual-Domain Error Level Analysis (ELA)', threshold: 50 },
    { title: 'Vision Transformer & High-Frequency Spectral Extraction', threshold: 75 },
    { title: 'Synthesizing Multimodal Authenticity Matrix', threshold: 95 }
  ];

  return (
    <div className="py-12 px-6 rounded-2xl bg-slate-950/90 border border-veritas-border shadow-2xl text-center space-y-8">
      {/* Central Rotating HUD Ring */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-slate-800"></div>
        <div 
          className="absolute inset-0 rounded-full border-2 border-veritas-cyan border-t-transparent animate-spin"
          style={{ animationDuration: '1.2s' }}
        ></div>
        <div 
          className="absolute inset-2 rounded-full border-2 border-veritas-violet border-b-transparent animate-spin"
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
        ></div>
        <Scan className="w-10 h-10 text-veritas-cyan animate-pulse" />
      </div>

      {/* Progress & Current Stage Text */}
      <div className="space-y-3 max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-veritas-cyan font-bold uppercase tracking-wider">
            ANALYZING NEURAL FORENSICS...
          </span>
          <span className="text-white font-bold">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-veritas-cyan via-veritas-blue to-veritas-violet rounded-full transition-all duration-300 shadow-md shadow-veritas-cyan/40"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs font-mono text-slate-400 animate-pulse">
          {currentStepText || 'Processing frames through convolutional layers...'}
        </p>
      </div>

      {/* Forensic Pipeline Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left pt-4">
        {steps.map((step, idx) => {
          const isDone = progress >= step.threshold;
          const isCurrent = progress < step.threshold && (idx === 0 || progress >= steps[idx - 1].threshold);

          return (
            <div
              key={step.title}
              className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2.5 transition-all ${
                isDone
                  ? 'bg-slate-900/80 border-veritas-cyan/30 text-slate-200'
                  : isCurrent
                  ? 'bg-veritas-cyan/5 border-veritas-cyan text-veritas-cyan shadow-sm shadow-veritas-cyan/20'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-4 h-4 text-veritas-cyan flex-shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-veritas-cyan border-t-transparent animate-spin flex-shrink-0"></div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0"></div>
              )}
              <span className="truncate">{step.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
