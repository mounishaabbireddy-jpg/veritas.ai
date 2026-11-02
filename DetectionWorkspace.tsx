// ==============================================================================
// VERITAS AI - Full Detection Studio Workspace
// ==============================================================================

import React, { useState } from 'react';
import { FileImage, Film, Shield, Zap } from 'lucide-react';
import { SupportedMediaType } from '../../types/detection';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useMediaAnalysis } from '../../hooks/useMediaAnalysis';
import { Dropzone } from './Dropzone';
import { MediaPreview } from './MediaPreview';
import { AnalysisLoading } from './AnalysisLoading';
import { ResultsDashboard } from './ResultsDashboard';

export const DetectionWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SupportedMediaType>('image');

  const {
    file,
    previewUrl,
    error: uploadError,
    isDragging,
    handleSelectFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeFile,
  } = useFileUpload(activeTab);

  const {
    stage,
    progress,
    currentStepText,
    result,
    error: analysisError,
    startAnalysis,
    resetAnalysis
  } = useMediaAnalysis();

  // Switch between Image and Video mode
  const handleTabChange = (tab: SupportedMediaType) => {
    if (tab !== activeTab) {
      removeFile();
      resetAnalysis();
      setActiveTab(tab);
    }
  };

  // Generate synthetic or authentic test preset on the fly
  const handleLoadSample = (sampleType: 'fake' | 'real') => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw ambient background
    const bgGradient = ctx.createLinearGradient(0, 0, 640, 480);
    if (sampleType === 'fake') {
      bgGradient.addColorStop(0, '#1a0b1e');
      bgGradient.addColorStop(1, '#05070f');
    } else {
      bgGradient.addColorStop(0, '#0a192f');
      bgGradient.addColorStop(1, '#020c1b');
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 640, 480);

    // Draw stylized face silhouette
    ctx.strokeStyle = sampleType === 'fake' ? '#ef4444' : '#00f2fe';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(320, 220, 110, 0, Math.PI * 2);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = sampleType === 'fake' ? '#ff3366' : '#00f2fe';
    ctx.beginPath();
    ctx.arc(280, 200, 12, 0, Math.PI * 2);
    ctx.arc(360, 200, 12, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.beginPath();
    if (sampleType === 'fake') {
      ctx.arc(320, 260, 35, 0.2 * Math.PI, 0.8 * Math.PI, false); // Asymmetrical mouth
    } else {
      ctx.arc(320, 260, 30, 0, Math.PI, false);
    }
    ctx.stroke();

    // Label on canvas
    ctx.font = 'bold 20px Orbitron, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(
      sampleType === 'fake' ? 'DEEPFAKE SYNTHETIC TEST SAMPLE' : 'CERTIFIED AUTHENTIC TEST ASSET',
      320,
      390
    );

    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillStyle = sampleType === 'fake' ? '#ef4444' : '#00f2fe';
    ctx.fillText('VERITAS FORENSIC BENCHMARK TEST DATA', 320, 420);

    canvas.toBlob((blob) => {
      if (blob) {
        const sampleFile = new File(
          [blob],
          sampleType === 'fake' ? 'deepfake_diffusion_sample.png' : 'verified_authentic_sample.png',
          { type: 'image/png' }
        );
        handleSelectFile(sampleFile);
      }
    }, 'image/png');
  };

  const handleStartAnalysis = () => {
    if (file) {
      startAnalysis(file, activeTab);
    }
  };

  const handleFullReset = () => {
    removeFile();
    resetAnalysis();
  };

  return (
    <section id="studio" className="relative py-20 lg:py-28 bg-slate-950/70 border-t border-slate-900">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-veritas-cyan/10 border border-veritas-cyan/30 text-veritas-cyan font-mono text-xs uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Interactive Forensic Studio
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Analyze Media for Synthetic Tampering
          </h2>
          <p className="text-sm text-slate-400">
            Upload any image or video to run convolutional feature extraction, Error Level Analysis, and frequency decomposition.
          </p>
        </div>

        {/* Tab Selector: Image vs Video */}
        <div className="flex justify-center">
          <div className="flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
            <button
              onClick={() => handleTabChange('image')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'image'
                  ? 'bg-veritas-cyan text-slate-950 font-bold shadow-lg shadow-veritas-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileImage className="w-4 h-4" /> AI Image Detector
            </button>
            <button
              onClick={() => handleTabChange('video')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'video'
                  ? 'bg-veritas-cyan text-slate-950 font-bold shadow-lg shadow-veritas-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" /> AI Video Detector
            </button>
          </div>
        </div>

        {/* State Machine Body: Idle (Dropzone) -> Preview -> Loading -> Results */}
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80">
          
          {stage === 'idle' && !file && (
            <Dropzone
              mediaType={activeTab}
              isDragging={isDragging}
              error={uploadError}
              onFileSelect={handleSelectFile}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onLoadSample={handleLoadSample}
            />
          )}

          {stage === 'idle' && file && previewUrl && (
            <MediaPreview
              file={file}
              previewUrl={previewUrl}
              mediaType={activeTab}
              onAnalyze={handleStartAnalysis}
              onRemove={handleFullReset}
              onReplace={handleFullReset}
            />
          )}

          {(stage === 'uploading' || stage === 'neural_inference' || stage === 'preprocessing') && (
            <AnalysisLoading
              progress={progress}
              currentStepText={currentStepText}
            />
          )}

          {stage === 'completed' && result && (
            <ResultsDashboard
              result={result}
              onReset={handleFullReset}
            />
          )}

          {stage === 'error' && (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Detection Interrupted</h3>
              <p className="text-sm text-red-400 font-mono max-w-md mx-auto">{analysisError}</p>
              <button
                onClick={handleFullReset}
                className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
