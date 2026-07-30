import React from 'react';
import { EvaluationStatus, StepConfidence } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: EvaluationStatus | StepConfidence | 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-xs font-semibold';

  const getVariantStyles = () => {
    switch (variant) {
      case 'Approved':
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Pending':
      case 'warning':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Review Required':
      case 'info':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Flagged':
      case 'danger':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'High':
        return 'bg-emerald-100 text-emerald-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      case 'Low':
        return 'bg-rose-100 text-rose-800';
      case 'gold':
        return 'bg-amber-400/20 text-amber-800 border border-amber-400/40';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full ${sizeClasses} ${getVariantStyles()} ${className}`}>
      {children || variant}
    </span>
  );
};
