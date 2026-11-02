// ==============================================================================
// VERITAS AI - Forensic Results Dashboard
// ==============================================================================

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  Hash
} from 'lucide-react';
import { DetectionResult } from '../../types/detection';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { CertificateModal } from './CertificateModal';

interface ResultsDashboardProps {
  result: DetectionResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onReset,
}) => {
  const [certModalOpen, setCertModalOpen] = useState(false);

  const isFake = result.assessment === 'SYNTHETIC';

  // SVG Radial circle computation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.confidenceScore / 100) * circumference;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Demo Mode Notice Banner */}
      {result.isDemoMode && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-veritas-cyan/30 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="sm">DEMO ENGINE MODE</Badge>
            <span className="text-slate-300">
              Simulated neural weights active. Real verification requires connecting the VERITAS Gateway API.
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-veritas-cyan font-bold">
            AUDIT: {result.auditId}
          </span>
        </div>
      )}

      {/* Main Verdict & Radial Score Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-xl ${
        isFake 
          ? 'bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border-red-500/40 shadow-2xl shadow-red-950/40' 
          : 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/40 shadow-2xl shadow-emerald-950/40'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Radial Score Gauge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className={`transition-all duration-1000 ease-out ${
                    isFake ? 'stroke-red-500' : 'stroke-emerald-400'
                  }`}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display font-extrabold text-3xl text-white">
                  {result.confidenceScore}%
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  CONFIDENCE
                </span>
              </div>
            </div>
          </div>

          {/* Verdict Text & Description */}
          <div className="md:col-span-8 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant={isFake ? 'danger' : 'success'} size="md" pulse>
                {isFake ? <AlertTriangle className="w-3.5 h-3.5 mr-1" /> : <ShieldCheck className="w-3.5 h-3.5 mr-1" />}
                VERDICT: {result.assessment} MEDIA
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                {result.mediaType.toUpperCase()} INSPECTION
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              {isFake ? 'Synthetic Deepfake Manipulation Detected' : 'Verified Authentic Media Stream'}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              {result.explanation}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="sm"
                icon={<Award className="w-4 h-4" />}
                onClick={() => setCertModalOpen(true)}
              >
                View Audit Certificate
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<RotateCcw className="w-4 h-4" />}
                onClick={onReset}
              >
                Scan Another File
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Forensic Diagnostic Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Metric Progress Bars */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-veritas-cyan flex items-center gap-2">
            <Layers className="w-4 h-4" /> Forensic Anomaly Breakdown
          </h4>

          <div className="space-y-3.5">
            {/* ELA */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Error Level Analysis (ELA) Compression Delta:</span>
                <span className={result.forensics.elaScore > 50 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {result.forensics.elaScore}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${result.forensics.elaScore > 50 ? 'bg-red-500' : 'bg-emerald-400'}`}
                  style={{ width: `${result.forensics.elaScore}%` }}
                ></div>
              </div>
            </div>

            {/* Spectral 2D Fourier */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">High-Frequency Spectral Residual Anomaly:</span>
                <span className={result.forensics.spectralAnomaly > 50 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {result.forensics.spectralAnomaly}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${result.forensics.spectralAnomaly > 50 ? 'bg-red-500' : 'bg-emerald-400'}`}
                  style={{ width: `${result.forensics.spectralAnomaly}%` }}
                ></div>
              </div>
            </div>

            {/* Facial Landmark Symmetry */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Biometric Landmark & Gaze Symmetry:</span>
                <span className={result.forensics.facialSymmetry < 60 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {result.forensics.facialSymmetry}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${result.forensics.facialSymmetry < 60 ? 'bg-red-500' : 'bg-emerald-400'}`}
                  style={{ width: `${result.forensics.facialSymmetry}%` }}
                ></div>
              </div>
            </div>

            {/* Edge Boundary Warping */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Boundary Gradient & Face Seam Blending:</span>
                <span className={result.forensics.boundaryWarping > 50 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {result.forensics.boundaryWarping}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${result.forensics.boundaryWarping > 50 ? 'bg-red-500' : 'bg-emerald-400'}`}
                  style={{ width: `${result.forensics.boundaryWarping}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Detected Signatures / Artifact List */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-veritas-cyan flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Neural Signature Analysis
          </h4>

          <div className="space-y-2.5">
            {result.signaturesDetected.map((sig, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono flex items-start gap-2.5"
              >
                {isFake ? (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-slate-200">{sig}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 border-t border-slate-800/80">
            <Hash className="w-3.5 h-3.5 text-veritas-cyan" /> SHA-256 Fingerprint:
            <span className="text-slate-300 truncate">{result.mediaHash.substring(0, 24)}...</span>
          </div>
        </div>

      </div>

      {/* Modal View */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        result={result}
      />
    </div>
  );
};
