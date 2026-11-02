// ==============================================================================
// VERITAS AI - Media Preview & Forensic Canvas Inspection
// ==============================================================================

import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { SupportedMediaType } from '../../types/detection';
import { ForensicEngine } from '../../services/forensicEngine';

interface MediaPreviewProps {
  file: File;
  previewUrl: string;
  mediaType: SupportedMediaType;
  onAnalyze: () => void;
  onRemove: () => void;
  onReplace: () => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  file,
  previewUrl,
  mediaType,
  onAnalyze,
  onRemove,
  onReplace,
}) => {
  const [activeView, setActiveView] = useState<'original' | 'ela' | 'spectral'>('original');
  const imgRef = useRef<HTMLImageElement>(null);
  const elaCanvasRef = useRef<HTMLCanvasElement>(null);
  const spectralCanvasRef = useRef<HTMLCanvasElement>(null);

  // Compute live Canvas ELA and Spectral analysis when preview is loaded
  useEffect(() => {
    if (mediaType === 'image' && imgRef.current) {
      const img = imgRef.current;
      const runForensics = async () => {
        if (elaCanvasRef.current) {
          await ForensicEngine.computeELA(img, elaCanvasRef.current);
        }
        if (spectralCanvasRef.current) {
          ForensicEngine.computeSpectralResidual(img, spectralCanvasRef.current);
        }
      };

      if (img.complete) {
        runForensics();
      } else {
        img.onload = runForensics;
      }
    }
  }, [previewUrl, mediaType]);

  return (
    <div className="space-y-4">
      {/* Top Media Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-veritas-cyan font-bold uppercase">{mediaType}:</span>
          <span className="text-slate-200 truncate max-w-xs">{file.name}</span>
          <span className="text-slate-400">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReplace}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Replace
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[360px] max-h-[500px]">
        {mediaType === 'image' ? (
          <>
            {/* Original RGB Image */}
            <img
              ref={imgRef}
              src={previewUrl}
              alt="Inspection Subject"
              className={`max-h-[500px] w-auto max-w-full object-contain ${
                activeView === 'original' ? 'block' : 'hidden'
              }`}
            />

            {/* Error Level Analysis Canvas */}
            <canvas
              ref={elaCanvasRef}
              className={`max-h-[500px] w-auto max-w-full object-contain ${
                activeView === 'ela' ? 'block' : 'hidden'
              }`}
            />

            {/* Spectral High-Frequency Canvas */}
            <canvas
              ref={spectralCanvasRef}
              className={`max-h-[500px] w-auto max-w-full object-contain ${
                activeView === 'spectral' ? 'block' : 'hidden'
              }`}
            />
          </>
        ) : (
          <video
            src={previewUrl}
            controls
            playsInline
            className="max-h-[500px] w-auto max-w-full object-contain"
          />
        )}

        {/* View mode toggle overlay for images */}
        {mediaType === 'image' && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-lg border border-slate-700/80 shadow-lg text-[11px] font-mono">
            <button
              onClick={() => setActiveView('original')}
              className={`px-2 py-1 rounded transition-colors ${
                activeView === 'original'
                  ? 'bg-veritas-cyan text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Original RGB
            </button>
            <button
              onClick={() => setActiveView('ela')}
              className={`px-2 py-1 rounded transition-colors ${
                activeView === 'ela'
                  ? 'bg-red-500 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ELA Heatmap
            </button>
            <button
              onClick={() => setActiveView('spectral')}
              className={`px-2 py-1 rounded transition-colors ${
                activeView === 'spectral'
                  ? 'bg-veritas-violet text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Spectral 2D
            </button>
          </div>
        )}
      </div>

      {/* Start Analysis CTA */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full shadow-xl shadow-veritas-cyan/20"
          icon={<ArrowRight className="w-5 h-5" />}
          onClick={onAnalyze}
        >
          Execute Neural Deepfake Analysis
        </Button>
      </div>
    </div>
  );
};
