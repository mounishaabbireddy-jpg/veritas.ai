// ==============================================================================
// VERITAS AI - Responsive Header & Navigation Bar
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowRight, Activity } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface NavbarProps {
  onScanClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScanClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Studio', href: '#studio' },
    { label: 'Technology', href: '#technology' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-veritas-bg/85 backdrop-blur-xl border-b border-veritas-border shadow-2xl shadow-black/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-veritas-cyan/20 to-veritas-violet/20 border border-veritas-cyan/40 group-hover:border-veritas-cyan transition-colors">
              <Shield className="w-5 h-5 text-veritas-cyan group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-veritas-cyan/10 blur-sm group-hover:blur-md transition-all"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-wider text-white flex items-center gap-1.5">
                VERITAS<span className="text-veritas-cyan italic">AI</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-mono -mt-1 uppercase">
                See Beyond the Synthetic
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-veritas-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action CTA & Status */}
          <div className="hidden lg:flex items-center gap-4">
            <Badge variant="cyan" pulse size="sm" className="hidden xl:inline-flex">
              <Activity className="w-3 h-3 mr-1" /> CORE v4.2 ONLINE
            </Badge>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onScanClick}
            >
              Launch Studio
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-veritas-bg/95 backdrop-blur-2xl border-b border-veritas-border px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-veritas-cyan py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                onScanClick();
              }}
            >
              Launch Studio
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
