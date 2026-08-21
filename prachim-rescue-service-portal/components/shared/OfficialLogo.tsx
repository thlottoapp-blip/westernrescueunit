'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OfficialLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  withGlow?: boolean;
  alt?: string;
  priority?: boolean;
}

export function OfficialLogo({
  className = '',
  size = 56,
  showText = false,
  withGlow = false,
  alt = 'ตราสัญลักษณ์หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
  priority = false,
}: OfficialLogoProps) {
  const [imageError, setImageError] = useState(false);
  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 56;
  const dimensionStyle = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 group ${className}`}
      style={dimensionStyle}
    >
      {/* Ambient Glow Halo */}
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-md group-hover:bg-blue-400/50 group-hover:blur-lg transition-all duration-300 pointer-events-none" />
      )}

      {/* Official Circular Transparent Logo Image */}
      {!imageError ? (
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          <Image
            src="/prachim-logo.png"
            alt={alt}
            width={numericSize * 2}
            height={numericSize * 2}
            priority={priority}
            className="w-full h-full object-contain object-center transform transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* Vector Fallback if image fails */
        <div className="relative w-full h-full rounded-full bg-blue-900 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-xs shadow-md">
          <span>กู้ภัยประจิม</span>
        </div>
      )}
    </div>
  );
}
