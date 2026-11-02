# VERITAS AI — See Beyond the Synthetic

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-00f2fe?logo=github&logoColor=black)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-8b5cf6.svg)](https://opensource.org/licenses/MIT)
[![Model Backbone: ResNet-18 & ViT](https://img.shields.io/badge/Backbone-ResNet--18%20%7C%20ViT--B%2F16-emerald)](https://pytorch.org/)

**VERITAS AI** is an enterprise-grade AI deepfake and synthetic media authentication platform. Designed to combat sophisticated image and video tampering, VERITAS AI combines multi-scale convolutional residual networks (**ResNet-18**), **Vision Transformers (ViT)**, dual-domain **Error Level Analysis (ELA)**, and **2D Spatial Frequency Fourier Decomposition**.

---

## ⚡ Quickstart (Zero-Dependency Mode)

You can launch and use the complete VERITAS AI platform immediately without installing any packages:
1. Double-click `index.html` or open it in any modern browser (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).
2. The entire interactive forensic workstation will run locally with high-performance Canvas ELA computation and simulated neural weights.

---

## 🛠 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions workflow for GitHub Pages
├── dist/                         # Production-ready static distribution
│   ├── index.html                # Pre-built deployable web application
│   └── assets/                   # Vector logos and static assets
├── src/                          # Modern React + TypeScript + Tailwind source code
│   ├── main.tsx                  # Application root entry
│   ├── App.tsx                   # Master layout with smooth scrolling & modal controls
│   ├── index.css                 # Cyber dark theme, scanline animations & typography
│   ├── types/
│   │   └── detection.ts          # TypeScript interfaces for media, forensics, audits
│   ├── services/
│   │   ├── api.ts                # Detection Gateway client with transparent Demo fallback
│   │   └── forensicEngine.ts     # Real Canvas ELA, Laplacian spectral filters & SHA-256
│   ├── hooks/
│   │   ├── useFileUpload.ts      # Multi-format validation (JPG, PNG, WEBP, MP4, MOV, WEBM)
│   │   └── useMediaAnalysis.ts   # Multi-stage forensic analysis state machine
│   └── components/
│       ├── common/               # Reusable Button, Badge, and Card components
│       ├── layout/               # Responsive Navbar with mobile drawer & Footer
│       ├── hero/                 # Cinematic Hero & Interactive Reticle HUD Scanner
│       ├── detection/            # Dropzone, MediaPreview, Loading HUD, ResultsDashboard, CertificateModal
│       └── sections/             # Features, HowItWorks, Technology, Pricing, FAQ
├── server/
│   ├── server.js                 # Express.js production REST API gateway
│   └── app.py                    # PyTorch ResNet-18 Deepfake inference backend
├── public/                       # Favicon and public assets
├── package.json                  # NPM scripts & dependencies
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build configuration (base: '/veritas-ai/')
├── tailwind.config.js            # Custom cyberpunk dark palette & animation keyframes
├── .env.example                  # Environment variable configuration template
├── DEPLOYMENT.md                 # Step-by-step GitHub Pages & FitHub deployment manual
└── README.md                     # Platform overview & documentation
```

---

## 💻 Developer Installation & Build

If you wish to modify the React source code and rebuild:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🔬 Core Forensic Capabilities

| Capability | Detection Methodology | Generative AI Vector Addressed |
| :--- | :--- | :--- |
| **Error Level Analysis (ELA)** | Computes compression quantization deltas across spatial 8x8 DCT blocks | Spliced face swaps, inpainting, composite blending |
| **2D Spectral Fourier Analysis** | Applies discrete Laplacian high-pass filtering to uncover periodic grid spikes | StyleGAN, Midjourney, Stable Diffusion upsampler artifacts |
| **Biometric Landmark Mesh** | Tracks 68 facial coordinates, pupil gaze alignment, and eye-blink micro-cadence | DeepFaceLab, SimSwap, RoOP, FaceForensics |
| **Temporal Video Sentinel** | Computes inter-frame optical flow continuity and phoneme-viseme lip synchronicity | Wav2Lip, SadTalker, Sora, Runway Gen-2 video clips |
| **Cryptographic Audit** | Generates verifiable SHA-256 checksums and C2PA compliant audit certificates | Regulatory compliance, chain-of-custody verification |

---

## 🚀 GitHub Pages Deployment

The repository includes a pre-configured GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Create a GitHub repository named `veritas-ai`.
2. Push this codebase to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial release of VERITAS AI"
   git branch -M main
   git remote add origin https://github.com/<your-username>/veritas-ai.git
   git push -u origin main
   ```
3. In your GitHub repository settings:
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. The workflow will automatically build the site and deploy it to:
   `https://<your-username>.github.io/veritas-ai/`

---

## 🔒 Demo Mode vs Production API

To maintain complete transparency:
- **DEMO ENGINE MODE**: Enabled by default in client-side builds. It computes real client-side Canvas Error Level Analysis (ELA) and Laplacian spectral filters, paired with simulated neural weights. It is clearly badged in the UI to prevent fabricated accuracy claims.
- **PRODUCTION API MODE**: Set `VITE_VERITAS_API_URL=https://your-api.com/v1` in `.env.local` and launch `server/app.py` or `server/server.js`. Media is then dispatched to a GPU cluster running real PyTorch ResNet-18 convolutional inference.

