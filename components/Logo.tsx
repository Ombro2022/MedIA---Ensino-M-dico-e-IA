import React from 'react';
import { GRADIENT_TEXT_CLASS } from '../constants';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 120" 
        className="w-10 h-12 shrink-0" 
        fill="none" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Top Part - Robot Head (Pink) */}
        <g className="text-mediaPink" stroke="currentColor">
            {/* Antenna */}
            <path d="M50 20 L 50 5 L 35 8" /> 
            
            {/* Head */}
            <rect x="20" y="20" width="60" height="40" rx="12" />
            
            {/* Ears */}
            <line x1="10" y1="40" x2="20" y2="40" />
            <line x1="80" y1="40" x2="90" y2="40" />
            
            {/* Eyes */}
            <line x1="40" y1="32" x2="40" y2="44" />
            <line x1="60" y1="32" x2="60" y2="44" />
        </g>
        
        {/* Bottom Part - Stethoscope (Purple) */}
        <g className="text-mediaPurple" stroke="currentColor">
            {/* Chin / Stethoscope Curve */}
            <path d="M20 66 Q 50 90 80 66" />
            
            {/* Neck / Tube */}
            <line x1="50" y1="78" x2="50" y2="100" />
            
            {/* Bottom Circle / Bell */}
            <circle cx="50" cy="108" r="8" />
        </g>
      </svg>
      <span className={`font-bold text-2xl tracking-tighter ${GRADIENT_TEXT_CLASS}`}>
        MedIA
      </span>
    </div>
  );
};