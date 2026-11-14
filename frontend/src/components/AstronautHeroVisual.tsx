import React from 'react';
import { SatelliteDoodle } from './SatelliteDoodle';

export const AstronautHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] flex items-center justify-center select-none py-4">
      {/* Ambient Purple Lighting Glow under the asteroid */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 h-36 bg-purple-700/25 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-44 h-44 bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Floating Astronaut Container */}
      <div className="relative z-10 w-[340px] sm:w-[420px] transition-transform duration-700 ease-in-out hover:scale-[1.02]">
        {/* Subtle CSS floating animation wrapper */}
        <div className="animate-[float_6s_ease-in-out_infinite]">
          {/* Astronaut on Asteroid with Laptop */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/astronaut.jpg"
              alt="Astronaut sitting on asteroid with laptop"
              className="w-full h-auto object-contain mix-blend-screen filter contrast-110 brightness-105 pointer-events-none"
            />
          </div>

          {/* Floating Satellite to the right */}
          <div className="absolute top-16 -right-6 sm:-right-10 animate-[float_4.5s_ease-in-out_infinite_reverse]">
            <SatelliteDoodle />
          </div>

          {/* Subtle Technical Engineering Telemetry Badges */}
          <div className="absolute -bottom-2 right-4 bg-[#141418]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-[#76A9FF] shadow-sm">
            GEO-SYNC // LAT: 30.3165° N
          </div>
          <div className="absolute top-6 left-2 bg-[#141418]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-[#8FCF9B] shadow-sm">
            TERMINAL // ONLINE 5.0 GHz
          </div>
        </div>
      </div>
    </div>
  );
};
