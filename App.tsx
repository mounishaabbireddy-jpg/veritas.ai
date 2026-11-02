// ==============================================================================
// VERITAS AI - Master Application Layout
// ==============================================================================

import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { DetectionWorkspace } from './components/detection/DetectionWorkspace';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { TechnologySection } from './components/sections/TechnologySection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { Footer } from './components/layout/Footer';

export function App() {
  const scrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-veritas-bg text-slate-100 selection:bg-veritas-cyan selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Global Navbar */}
      <Navbar onScanClick={scrollToStudio} />

      {/* Hero Section with Cinematic Reticle Scanner */}
      <main>
        <HeroSection onScanClick={scrollToStudio} />

        {/* Core Detection Studio Workspace */}
        <DetectionWorkspace />

        {/* Feature Capabilities Grid */}
        <FeaturesSection />

        {/* 4-Stage Methodology Walkthrough */}
        <HowItWorksSection />

        {/* Neural Network & Spectral Technology */}
        <TechnologySection />

        {/* Pricing & Scale */}
        <PricingSection />

        {/* Interactive FAQ */}
        <FAQSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;

