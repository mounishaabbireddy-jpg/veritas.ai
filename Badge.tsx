// ==============================================================================
// VERITAS AI - Reusable Badge Component
// ==============================================================================

import React from 'react';

export interface BadgeProps {
  variant?: 'cyan' | 'violet' | 'danger' | 'warning' | 'success' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  size = 'md',
  pulse = false,
  children,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5'
  };

  const variantStyles = {
    cyan: 'bg-veritas-cyan/10 text-veritas-cyan border-veritas-cyan/30 shadow-sm shadow-veritas-cyan/10',
    violet: 'bg-veritas-violet/10 text-veritas-violet border-veritas-violet/30 shadow-sm shadow-veritas-violet/10',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30 shadow-sm shadow-red-500/10',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm shadow-emerald-500/10',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700'
  };

  const pulseColors = {
    cyan: 'bg-veritas-cyan',
    violet: 'bg-veritas-violet',
    danger: 'bg-red-500',
    warning: 'bg-amber-500',
    success: 'bg-emerald-500',
    neutral: 'bg-slate-400'
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded-full border ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColors[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColors[variant]}`}></span>
        </span>
      )}
      {children}
    </span>
  );
};

