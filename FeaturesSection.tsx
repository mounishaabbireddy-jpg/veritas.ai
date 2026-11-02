// ==============================================================================
// VERITAS AI - Features & Defense Capabilities Section
// ==============================================================================

import React from 'react';
import { Eye, Shield, Film, Waves, Lock, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Eye className="w-6 h-6 text-veritas-cyan" />,
      title: 'Diffusion & GAN Fingerprinting',
      description: 'Identifies high-frequency spatial checkerboard patterns and noise residuals characteristic of Midjourney, Stable Diffusion, DALL-E, and StyleGAN.',
      tag: 'IMAGE FORENSICS'
    },
    {
      icon: <Film className="w-6 h-6 text-veritas-violet" />,
      title: 'Video Temporal Consistency',
      description: 'Analyzes inter-frame optical flow, lip-sync synchronicity, and subtle eye blink rate micro-tremors across consecutive video frames.',
      tag: 'VIDEO SENTINEL'
    },
    {
      icon: <Cpu className="w-6 h-6 text-veritas-cyan" />,
      title: 'Dual-Domain Error Level Analysis',
      description: 'Compares discrete compression quality deltas across image sub-regions to expose spliced facial composites and localized inpainting.',
      tag: 'COMPRESSION ELA'
    },
    {
      icon: <Waves className="w-6 h-6 text-veritas-violet" />,
      title: '2D Spectral Fourier Decomposition',
      description: 'Applies frequency-domain Laplacian transformations to isolate generative AI synthetic artifacts invisible to the naked human eye.',
      tag: 'SPECTRAL FFT'
    },
    {
      icon: <Lock className="w-6 h-6 text-veritas-cyan" />,
      title: 'Cryptographic Audit Verification',
      description: 'Computes immutable SHA-256 media signatures and issues C2PA-compliant verifiable forensic certificates for regulatory compliance.',
      tag: 'IMMUTABLE AUDIT'
    },
    {
      icon: <Shield className="w-6 h-6 text-veritas-violet" />,
      title: 'Zero-Retention Privacy Guarantee',
      description: 'All inspection streams are processed in ephemeral volatile memory with zero file storage, preserving strict corporate data confidentiality.',
      tag: 'ZERO DATA LEAK'
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-veritas-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="cyan" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> DEFENSE-GRADE CAPABILITIES
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            Comprehensive Multimodal Forensics
          </h2>
          <p className="text-base text-slate-400">
            Engineered to counteract state-of-the-art generative AI pipelines, from face swaps and voice cloning to neural inpainting.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => (
            <Card
              key={feat.title}
              hoverEffect
              className="bg-slate-900/40 border-slate-800/80 p-8 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 group-hover:border-veritas-cyan/40 transition-all">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-veritas-cyan transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs font-mono text-veritas-cyan">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in Core v4.2
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

