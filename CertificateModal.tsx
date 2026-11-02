// ==============================================================================
// VERITAS AI - Verifiable Forensic Audit Certificate Modal
// ==============================================================================

import React from 'react';
import { X, ShieldCheck, AlertTriangle, Printer, Hash, Award } from 'lucide-react';
import { DetectionResult } from '../../types/detection';
import { Button } from '../common/Button';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DetectionResult;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen) return null;

  const isFake = result.assessment === 'SYNTHETIC';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isFake ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                VERITAS FORENSIC CERTIFICATE
              </h3>
              <div className="text-xs font-mono text-slate-400">
                AUDIT ID: <span className="text-veritas-cyan">{result.auditId}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Badge Assessment */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isFake 
            ? 'bg-red-500/10 border-red-500/40 text-red-300' 
            : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
        }`}>
          <div className="flex items-center gap-3">
            {isFake ? <AlertTriangle className="w-6 h-6 text-red-400" /> : <ShieldCheck className="w-6 h-6 text-emerald-400" />}
            <div>
              <div className="text-xs font-mono font-bold tracking-wider uppercase">
                FORENSIC VERDICT
              </div>
              <div className="text-xl font-display font-black text-white">
                {result.assessment} MEDIA ({result.confidenceScore}% CONFIDENCE)
              </div>
            </div>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <div>STATUS</div>
            <div className="text-white font-bold">{result.isDemoMode ? 'DEMO SIMULATION' : 'VERIFIED'}</div>
          </div>
        </div>

        {/* Audit Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Inspected Asset</div>
            <div className="text-white font-bold truncate mt-0.5">{result.filename}</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Verification Date</div>
            <div className="text-white font-bold mt-0.5">{result.timestamp}</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Neural Backbone</div>
            <div className="text-white font-bold mt-0.5">{result.modelBackbone}</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px]">File Size</div>
            <div className="text-white font-bold mt-0.5">{result.fileSizeFormatted}</div>
          </div>
        </div>

        {/* Cryptographic SHA-256 Hash Box */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-veritas-cyan flex items-center gap-1">
            <Hash className="w-3 h-3" /> SHA-256 CRYPTOGRAPHIC FINGERPRINT:
          </div>
          <div className="text-[11px] font-mono text-slate-300 break-all bg-black/40 p-2 rounded border border-slate-800/80">
            {result.mediaHash}
          </div>
        </div>

        {/* Forensic Metrics Breakdown */}
        <div className="space-y-2 text-xs">
          <div className="font-mono text-slate-400 uppercase text-[10px]">Forensic Diagnostics Summary:</div>
          <ul className="space-y-1 text-slate-300 font-mono text-[11px] list-disc list-inside">
            <li>Error Level Analysis: {result.forensics.elaScore}% compression discrepancy</li>
            <li>Spectral High-Frequency Anomaly: {result.forensics.spectralAnomaly}%</li>
            <li>Biometric Landmark Symmetry: {result.forensics.facialSymmetry}%</li>
            <li>Boundary Edge Warp Score: {result.forensics.boundaryWarping}%</li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-[10px] font-mono text-slate-400">
            VERITAS AI MEDIA AUTHENTICATION PROTOCOL
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-4 h-4" />}
              onClick={() => window.print()}
            >
              Print / Save PDF
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
