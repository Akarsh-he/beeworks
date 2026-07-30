import React, { useState } from 'react';

export interface LogoProps {
  variant?: 'light' | 'dark'; // 'light' = white/gold for dark backgrounds; 'dark' = navy/gold for light backgrounds
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  useImageFile?: boolean; // Set to true to use /assets/logo.svg directly
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showText = true,
  className = '',
  useImageFile = false
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', container: 'h-7' },
    md: { icon: 'w-9 h-9', text: 'text-xl', container: 'h-9' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl', container: 'h-11' },
    xl: { icon: 'w-14 h-14', text: 'text-3xl', container: 'h-14' },
  };

  const { icon: iconSize, text: textSize, container: containerSize } = sizeClasses[size] || sizeClasses.md;

  const isLightVariant = variant === 'light';
  const textColor = isLightVariant ? 'text-white' : 'text-slate-900';
  const iconBColor = isLightVariant ? '#FFFFFF' : '#0F172A';

  if (useImageFile && !imgError) {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <img
          src="/assets/logo.svg"
          alt="BeeWorks Logo"
          className={`${containerSize} w-auto object-contain`}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Bee 'B' Icon Symbol */}
      <div className={`relative flex items-center justify-center ${iconSize} shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Main 'B' Body */}
          <path
            d="M 15 10 L 45 10 C 65 10 78 22 78 38 C 78 48 70 56 60 59 C 73 63 82 72 82 86 C 82 102 68 114 45 114 L 15 114 Z"
            fill={iconBColor}
          />
          {/* Top Yellow Wing Petal */}
          <path
            d="M 28 26 C 42 22 62 30 58 46 C 42 50 26 38 28 26 Z"
            fill="#F59E0B"
          />
          {/* Bottom Yellow Wing Petal */}
          <path
            d="M 28 72 C 42 66 62 74 58 92 C 42 96 26 84 28 72 Z"
            fill="#F59E0B"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSize} ${textColor} flex items-center`}>
            <span>Bee</span>
            <span className="relative">
              Works
              {/* Yellow Accent Stroke on top-left of 'W' */}
              <span className="absolute -top-1 left-0 text-amber-500 font-extrabold select-none">
                
              </span>
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 mt-0.5">
            AI Evaluation
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
