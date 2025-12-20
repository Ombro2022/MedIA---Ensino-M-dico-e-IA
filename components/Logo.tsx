import React from 'react';
export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/Logo_MedIA_Novo.svg"
        alt="MedIA"
        className="h-12 w-auto"
        loading="lazy"
        decoding="async"
      />
      <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
        MedIA - Medicina e Ensino Inteligente
      </span>
    </div>
  );
};