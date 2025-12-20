import React from 'react';

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ className = "", showText = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/Logo_MedIA_Novo.svg"
        alt="MedIA"
        title="MedIA"
        className="h-12 w-auto drop-shadow-sm"
        loading="lazy"
        decoding="async"
      />
      {showText && (
        <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          MedIA - Medicina e Ensino Inteligente
        </span>
      )}
    </div>
  );
};