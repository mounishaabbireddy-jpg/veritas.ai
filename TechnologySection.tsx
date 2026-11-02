// ==============================================================================
// VERITAS AI - Technology & Neural Architecture Section
// ==============================================================================

import React from 'react';
import { Cpu, Terminal, GitBranch, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="relative py-24 bg-veritas-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" size="md">
            MODEL ARCHITECTURE
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            Under the Hood: VERITAS Core
          </h2>
          <p className="text-base text-slate-400">
            A hybrid convolutional-transformer backbone trained across 4.8 million authentic and synthesized frames.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: ResNet-18 Convolutional Backbone */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-5">
            <div className="p-3 rounded-2xl bg-veritas-cyan/10 border border-veritas-cyan/30 text-veritas-cyan w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              ResNet-18 Deep Residual Backbone
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Utilizes residual skip connections to extract micro-texture anomalies across 18 deep convolutional layers without gradient degradation. Optimized specifically for real-time inference latency.
            </p>
            <div className="pt-2 font-mono text-xs text-veritas-cyan space-y-1">
              <div>&bull; Params: 11.2M Weights</div>
              <div>&bull; Inference: ~32ms per frame</div>
              <div>&bull; Dataset: FaceForensics++ & DFDC</div>
            </div>
          </div>

          {/* Card 2: 2D FFT Frequency Analysis */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-5">
            <div className="p-3 rounded-2xl bg-veritas-violet/10 border border-veritas-violet/30 text-veritas-violet w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              Spatial Frequency Fourier Engine
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transforms RGB pixel grids into 2D frequency domain representations. Exposes the telltale high-frequency periodic grid spikes left behind by upsampling layers in GANs and Diffusion models.
            </p>
            <div className="pt-2 font-mono text-xs text-veritas-violet space-y-1">
              <div>&bull; Transform: 2D Discrete Laplacian</div>
              <div>&bull; Bandwidth: 0.1Hz - 24kHz</div>
              <div>&bull; Robustness: JPEG Q=60 Resilient</div>
            </div>
          </div>

          {/* Card 3: Biometric Temporal Graph */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-5">
            <div className="p-3 rounded-2xl bg-veritas-cyan/10 border border-veritas-cyan/30 text-veritas-cyan w-fit">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              Biometric Landmark Mesh
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tracks 68 facial landmark coordinates in real-time. Detects warp seams along the jawline, pupil gaze divergence, and involuntary eye blink cadence variations characteristic of DeepFaceLab.
            </p>
            <div className="pt-2 font-mono text-xs text-veritas-cyan space-y-1">
              <div>&bull; Landmark Track: 68 3D Nodes</div>
              <div>&bull; Temporal Window: 30-frame sequence</div>
              <div>&bull; Optical Flow: Farneback Dense Matrix</div>
            </div>
          </div>

        </div>

        {/* Code Snippet / API Integration Preview */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-veritas-cyan" />
              <span>VERITAS Python & REST API Client Integration</span>
            </div>
            <span className="text-[10px] text-veritas-cyan">v4.2.0</span>
          </div>
          <pre className="pt-4 text-slate-300 leading-relaxed">
{`import requests

url = "https://api.veritas-ai.io/v1/detect/image"
headers = {"Authorization": "Bearer VRT_LIVE_SECRET_KEY"}

with open("suspect_media.png", "rb") as media_file:
    response = requests.post(url, files={"media": media_file}, headers=headers)

result = response.json()
print(f"Verdict: {result['assessment']} (Confidence: {result['confidenceScore']}%)")
# Verdict: SYNTHETIC (Confidence: 94%)
# Forensic ELA: 84.2% Anomaly detected`}
          </pre>
        </div>

      </div>
    </section>
  );
};
