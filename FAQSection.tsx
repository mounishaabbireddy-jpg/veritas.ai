// ==============================================================================
// VERITAS AI - Interactive FAQ Accordion Section
// ==============================================================================

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../common/Badge';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does VERITAS AI detect AI-generated imagery and deepfake videos?',
      a: 'VERITAS AI uses a multi-layered forensic architecture. It combines Error Level Analysis (ELA) to identify compression quantization mismatches, 2D Fast Fourier Transform (FFT) to detect high-frequency GAN/diffusion checkerboard grids, and a multi-scale ResNet-18 + Vision Transformer neural backbone that checks for biometric asymmetry and inter-frame temporal discontinuities.'
    },
    {
      q: 'What file formats and sizes are supported?',
      a: 'VERITAS AI accepts JPG, JPEG, PNG, and WEBP image files, as well as MP4, MOV, and WEBM video files. The standard client-side upload limit is 50MB per asset. Enterprise API endpoints support batch uploads and streaming video payloads up to 2GB.'
    },
    {
      q: 'What is the difference between Demo Mode and the Production API?',
      a: 'In Demo Mode (available directly in the browser with zero setup), client-side Canvas algorithms compute actual Error Level Analysis and Laplacian frequency maps, combined with simulated neural inference weights. When connected to the VERITAS Gateway API with valid environment credentials, media is processed by live multi-GPU ResNet-18 / ViT clusters with full cryptographic C2PA signature issuance.'
    },
    {
      q: 'Can VERITAS AI detect content from Sora, Runway Gen-2, Midjourney, and Stable Diffusion?',
      a: 'Yes. Modern diffusion and transformer-based generative video models leave distinct spectral artifacts during the latent upsampling and denoising steps. VERITAS AI extracts these mathematical signatures even when images or video frames have been compressed or downscaled.'
    },
    {
      q: 'Are uploaded files stored, retained, or used to train models?',
      a: 'No. VERITAS AI enforces a strict zero-retention policy. Files are processed in volatile GPU memory and immediately purged once the cryptographic SHA-256 hash and audit metrics are calculated. Your proprietary media is never used for training.'
    },
    {
      q: 'How do cryptographic audit certificates work?',
      a: 'Each completed analysis generates an immutable SHA-256 checksum of the exact binary payload, an ISO 8601 UTC timestamp, and a unique audit identification number (e.g. VRT-XXXX-XXXX). This certificate can be downloaded or printed as a legally verifiable record of forensic integrity.'
    }
  ];

  return (
    <section id="faq" className="relative py-24 bg-veritas-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <Badge variant="violet" size="md">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Forensic Intelligence FAQ
          </h2>
          <p className="text-sm text-slate-400">
            Answers to common questions regarding neural detection capabilities, verification protocols, and data security.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/40 border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-veritas-cyan transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
