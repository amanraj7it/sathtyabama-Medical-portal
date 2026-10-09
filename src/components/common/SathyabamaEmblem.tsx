import React, { useState } from 'react';
import { SathyabamaHospitalLogo } from './SathyabamaHospitalLogo';
import logoSrc from '../../assets/images/sathyabama_hospital_logo.png';

interface SathyabamaEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withRing?: boolean;
}

export const SathyabamaEmblem: React.FC<SathyabamaEmblemProps> = ({
  size = 'md',
  className = '',
  withRing = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }[size];

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs border border-slate-200/90 dark:border-slate-700/80 p-0.5 overflow-hidden transition-all duration-200 hover:scale-[1.03] ${sizeClasses} ${
        withRing ? 'ring-2 ring-blue-600/30 dark:ring-blue-400/40' : ''
      } ${className}`}
      title="Sathyabama Hospital Medical System"
    >
      {!imageError ? (
        <img
          src={logoSrc}
          alt="Sathyabama Hospital Medical System Official Seal"
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
          loading="eager"
        />
      ) : (
        <SathyabamaHospitalLogo size={size} />
      )}
    </div>
  );
};
