// ==============================================================================
// VERITAS AI - Reusable Glassmorphism Card Component
// ==============================================================================

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'violet' | 'danger' | 'none';
  hoverEffect?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  glow = 'none',
  hoverEffect = false,
  className = '',
  children,
  ...props
}) => {
  const glowStyles = {
    none: '',
    cyan: 'border-veritas-cyan/30 shadow-lg shadow-veritas-cyan/10 hover:border-veritas-cyan/50',
    violet: 'border-veritas-violet/30 shadow-lg shadow-veritas-violet/10 hover:border-veritas-violet/50',
    danger: 'border-red-500/30 shadow-lg shadow-red-500/10 hover:border-red-500/50'
  };

  return (
    <div
      className={`relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-black/60' : ''
      } ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

