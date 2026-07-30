import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = false
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-lg',
    md: 'w-9 h-9 text-xl',
    lg: 'w-11 h-11 text-2xl',
    xl: 'w-14 h-14 text-3xl'
  };

  const [iconSize, textSize] = sizeMap[size].split(' ');

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Bee & Math Hexagon Symbol */}
      <div className={`relative flex items-center justify-center ${iconSize}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Main Hexagon Background */}
          <polygon
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
            fill="url(#navyGradient)"
            stroke="#F59E0B"
            strokeWidth="4"
          />
          {/* Inner Accent Honeycomb Node */}
          <polygon
            points="50,18 78,34 78,66 50,82 22,66 22,34"
            fill="url(#goldGradient)"
            opacity="0.2"
          />
          {/* AI Checkmark + Bee Wing Vector */}
          <path
            d="M32 50L45 63L70 35"
            stroke="#F59E0B"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="70" cy="35" r="5" fill="#EAB308" />
          
          <defs>
            <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSize} ${lightText ? 'text-white' : 'text-slate-900'}`}>
            Bee<span className="text-amber-500">Works</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 mt-0.5">
            AI Evaluation
          </span>
        </div>
      )}
    </div>
  );
};
