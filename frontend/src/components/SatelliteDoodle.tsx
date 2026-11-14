import React from 'react';

export const SatelliteDoodle: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 text-[#BDB5B9] opacity-80 filter drop-shadow-[0_0_8px_rgba(118,169,255,0.3)] animate-pulse"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central Satellite Body */}
        <rect x="42" y="38" width="16" height="24" rx="2" fill="#1b1c22" stroke="#BDB5B9" />
        <circle cx="50" cy="46" r="3" fill="#76A9FF" />
        <line x1="45" y1="54" x2="55" y2="54" stroke="#F2A6AC" />

        {/* Dish Antenna */}
        <path d="M50 38 L50 28" stroke="#BDB5B9" />
        <path d="M40 24 Q50 32 60 24" stroke="#BDB5B9" fill="none" />
        <line x1="50" y1="28" x2="50" y2="20" stroke="#76A9FF" />
        <circle cx="50" cy="19" r="1.5" fill="#76A9FF" />

        {/* Left Solar Panel Truss */}
        <line x1="42" y1="50" x2="26" y2="50" stroke="#BDB5B9" />
        {/* Left Solar Panel */}
        <rect x="6" y="40" width="20" height="20" rx="1" fill="#141824" stroke="#76A9FF" strokeWidth="1.5" />
        <line x1="16" y1="40" x2="16" y2="60" stroke="#76A9FF" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="6" y1="50" x2="26" y2="50" stroke="#76A9FF" strokeWidth="1" strokeDasharray="2 2" />

        {/* Right Solar Panel Truss */}
        <line x1="58" y1="50" x2="74" y2="50" stroke="#BDB5B9" />
        {/* Right Solar Panel */}
        <rect x="74" y="40" width="20" height="20" rx="1" fill="#141824" stroke="#76A9FF" strokeWidth="1.5" />
        <line x1="84" y1="40" x2="84" y2="60" stroke="#76A9FF" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="74" y1="50" x2="94" y2="50" stroke="#76A9FF" strokeWidth="1" strokeDasharray="2 2" />

        {/* Signal Waves */}
        <path d="M35 18 Q50 10 65 18" stroke="#8FCF9B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <path d="M30 12 Q50 2 70 12" stroke="#8FCF9B" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      </svg>
    </div>
  );
};
