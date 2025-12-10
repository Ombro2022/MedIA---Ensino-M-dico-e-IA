import React from 'react';
export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/Logo%20Media.svg"
        alt="MedIA"
        className="h-12 w-auto"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};