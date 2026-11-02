// ==============================================================================
// VERITAS AI - Cinematic Interactive Scanner HUD
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Scan, AlertTriangle } from 'lucide-react';

export const CinematicScanner: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'rgb' | 'ela' | 'spectral'>('rgb');
  const [threatScore, setThreatScore] = useState(94);

  // Subtle pulsing diagnostic values
  useEffect(() => {
    const timer = setInterval(() => {
      setThreatScore(prev => (prev === 94 ? 96 : 94));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-veritas-border shadow-2xl shadow-veritas-cyan/10 group"
    >
      {/* Top HUD bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-veritas-cyan">
          <Scan className="w-3.5 h-3.5 animate-pulse" />
          <span>NEURAL SCANNER // HUD-42</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">LAYER:</span>
          <div className="flex items-center gap-1 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">
            <button
              onClick={() => setActiveLayer('rgb')}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                activeLayer === 'rgb' ? 'bg-veritas-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              RGB
            </button>
            <button
              onClick={() => setActiveLayer('ela')}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                activeLayer === 'ela' ? 'bg-veritas-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ELA
            </button>
            <button
              onClick={() => setActiveLayer('spectral')}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                activeLayer === 'spectral' ? 'bg-veritas-cyan text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              SPECTRAL
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden flex items-center justify-center">
        {/* Synthetic Portrait SVG Graphic */}
        <div className="relative w-full h-full flex items-center justify-center p-6">
          <svg className="w-64 h-64 text-slate-700" viewBox="0 0 200 200" fill="none">
            {/* Ambient Face Outline */}
            <path
              d="M100 20 C65 20, 45 55, 45 100 C45 145, 68 180, 100 180 C132 180, 155 145, 155 100 C155 55, 135 20, 100 20 Z"
              stroke={activeLayer === 'ela' ? '#ef4444' : activeLayer === 'spectral' ? '#8b5cf6' : '#334155'}
              strokeWidth="1.5"
              strokeDasharray={activeLayer === 'ela' ? '4 2' : 'none'}
              fill={activeLayer === 'ela' ? 'rgba(239, 68, 68, 0.05)' : activeLayer === 'spectral' ? 'rgba(139, 92, 246, 0.05)' : 'rgba(30, 41, 59, 0.2)'}
            />
            {/* Eyes */}
            <circle cx="78" cy="85" r="8" stroke={activeLayer === 'ela' ? '#ef4444' : '#00f2fe'} strokeWidth="1.5" fill="none" />
            <circle cx="122" cy="85" r="8" stroke={activeLayer === 'ela' ? '#ef4444' : '#00f2fe'} strokeWidth="1.5" fill="none" />
            {/* Eye pupil crosshairs */}
            <path d="M78 80 L78 90 M73 85 L83 85" stroke="#00f2fe" strokeWidth="1" />
            <path d="M122 80 L122 90 M117 85 L127 85" stroke="#00f2fe" strokeWidth="1" />
            {/* Nose bridge & mouth */}
            <path d="M100 85 L96 115 L104 115" stroke={activeLayer === 'spectral' ? '#8b5cf6' : '#64748b'} strokeWidth="1.5" />
            <path d="M82 142 Q100 152 118 142" stroke={activeLayer === 'ela' ? '#ef4444' : '#64748b'} strokeWidth="1.5" />
            
            {/* Biometric Triangulation Lines */}
            <path
              d="M78 85 L100 115 L122 85 M78 85 L100 85 L122 85 M100 115 L100 142 M78 85 L82 142 M122 85 L118 142"
              stroke={activeLayer === 'ela' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 242, 254, 0.3)'}
              strokeWidth="0.8"
            />
          </svg>

          {/* ELA Heatmap Overlay Effect */}
          {activeLayer === 'ela' && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/25 via-amber-600/10 to-transparent pointer-events-none animate-pulse"></div>
          )}

          {/* Spectral Frequency Grid Overlay */}
          {activeLayer === 'spectral' && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
          )}

          {/* Targeting Bounding Box */}
          <div className="absolute w-52 h-64 border border-dashed border-red-500/70 rounded-lg pointer-events-none">
            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-500"></div>

            {/* Reticle Pill Badge */}
            <div className="absolute -top-3.5 left-3 bg-red-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-lg shadow-red-600/30">
              <AlertTriangle className="w-2.5 h-2.5" /> SYNTHETIC ARTIFACTS
            </div>

            <div className="absolute -bottom-3.5 right-3 bg-slate-900 border border-slate-700 text-veritas-cyan font-mono text-[9px] px-1.5 py-0.5 rounded tracking-wider">
              CONFIDENCE: {threatScore}%
            </div>
          </div>

          {/* Animated Horizontal Laser Scanline */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-veritas-cyan to-transparent shadow-[0_0_15px_#00f2fe] animate-scanline pointer-events-none"></div>
        </div>

        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      </div>

      {/* Bottom Diagnostic Telemetry */}
      <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-900/90 border-t border-slate-800 text-[11px] font-mono p-2.5">
        <div className="px-2 flex flex-col">
          <span className="text-slate-400">ELA VARIANCE:</span>
          <span className="text-red-400 font-bold">84.2% [ANOMALOUS]</span>
        </div>
        <div className="px-2 flex flex-col">
          <span className="text-slate-400">SPECTRAL NOISE:</span>
          <span className="text-veritas-cyan font-bold">DIFFUSION GRID MATCH</span>
        </div>
        <div className="px-2 flex flex-col">
          <span className="text-slate-400">VERDICT:</span>
          <span className="text-red-500 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> SYNTHETIC
          </span>
        </div>
      </div>
    </div>
  );
};
