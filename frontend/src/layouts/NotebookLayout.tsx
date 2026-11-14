import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NotebookNav } from '../components/NotebookNav';
import { ShootingStarsCanvas } from '../components/ShootingStarsCanvas';
import { Check, Copy, Database, Layers, Sparkles, Terminal } from 'lucide-react';

export const NotebookLayout: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const promptText = `Create a premium developer portfolio website with the same aesthetic as the provided design: black ruled notebook background, handwritten typography, minimal 3D elements, shooting star animation, and a clean layout. Include multi-page sections: Home, Journey, Projects, Skills, Education, Beyond Code, Contact. Use MongoDB for storing projects, skills, and content. Add an admin portal with secure authentication to manage the website. Keep animations subtle and performance optimized.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen notebook-ruled-bg text-[#F0E9EF] font-sans paper-grain flex flex-col justify-between selection:bg-[#F2A6AC] selection:text-[#101010]">
      {/* Background Shooting Stars Animation */}
      <ShootingStarsCanvas />

      {/* Top-Left Corner Cratered Moon (from visual design) */}
      <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 w-44 h-44 sm:w-60 sm:h-60 rounded-full overflow-hidden pointer-events-none opacity-85 z-10 mix-blend-screen select-none">
        <img
          src="/moon.jpg"
          alt="Cratered Moon"
          className="w-full h-full object-cover filter contrast-125 brightness-95"
        />
      </div>

      {/* Top Header Labels */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 pt-5 pb-2 flex items-center justify-between text-sm md:text-base font-handwriting text-[#BDB5B9] select-none">
        <div className="flex items-center gap-2">
          <span className="text-[#F2A6AC]">✦</span>
          <span className="italic">Personal Engineering Journal</span>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs md:text-sm text-[#76A9FF]">B.Tech CSE — GEU '28</span>
        </div>
      </div>

      {/* Main Body with Left Vertical Torn-Paper Navigation on Desktop */}
      <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <NotebookNav />

        {/* Content Area offset by the left navigation on desktop */}
        <main className="lg:pl-64 transition-all duration-300">
          <Outlet />
        </main>
      </div>

      {/* Bottom Engineering Metadata Bar (Editorial Reference Panel) */}
      <footer className="relative z-20 mt-16 border-t border-[#353535] bg-[#121212]/90 backdrop-blur-sm py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto lg:pl-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {/* Tech Stack */}
          <div className="p-4 rounded border border-white/10 bg-[#161616]/70">
            <h4 className="font-mono text-xs uppercase text-[#76A9FF] tracking-wider mb-3 flex items-center gap-2">
              <Layers size={14} /> Core Tech Stack
            </h4>
            <div className="flex items-center gap-4 text-xs font-mono text-[#F0E9EF]">
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[#76A9FF]">React 19</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[#8FCF9B]">Node.js</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[#F2A6AC]">Tailwind</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-emerald-400">MongoDB</span>
            </div>
          </div>

          {/* Features */}
          <div className="p-4 rounded border border-white/10 bg-[#161616]/70">
            <h4 className="font-mono text-xs uppercase text-[#8FCF9B] tracking-wider mb-2 flex items-center gap-2">
              <Check size={14} /> System Features
            </h4>
            <ul className="text-xs text-[#BDB5B9] space-y-1 font-serif">
              <li className="flex items-center gap-1.5">
                <Check size={12} className="text-[#8FCF9B]" /> Multi-page Notebook Portfolio
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={12} className="text-[#8FCF9B]" /> MongoDB Data Persistence
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={12} className="text-[#8FCF9B]" /> Secure JWT Admin Dashboard
              </li>
            </ul>
          </div>

          {/* Database Status */}
          <div className="p-4 rounded border border-white/10 bg-[#161616]/70">
            <h4 className="font-mono text-xs uppercase text-emerald-400 tracking-wider mb-2 flex items-center gap-2">
              <Database size={14} /> Database Engine
            </h4>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>MongoDB Atlas Connected</span>
            </div>
            <p className="text-[11px] text-[#BDB5B9] mt-2 font-serif">
              Full CRUD synchronization across projects, skills, education, and journal content.
            </p>
          </div>

          {/* Engineering Prompt Box */}
          <div className="p-4 rounded border border-white/10 bg-[#161616]/70 relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-xs uppercase text-[#F2A6AC] tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} /> Architecture Prompt
              </h4>
              <button
                onClick={handleCopyPrompt}
                className="text-xs text-[#BDB5B9] hover:text-[#F2A6AC] p-1 rounded hover:bg-white/5 transition-colors"
                title="Copy architecture prompt"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-[11px] text-[#BDB5B9] line-clamp-3 font-serif italic">
              "{promptText}"
            </p>
          </div>
        </div>

        {/* Footer bottom note */}
        <div className="max-w-7xl mx-auto lg:pl-64 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BDB5B9] font-handwriting">
          <p>© {new Date().getFullYear()} Suraj Singh Bhandari. Handcrafted with clean code and engineering curiosity.</p>
          <p className="font-mono text-[11px] text-white/40 mt-2 sm:mt-0">
            GEU CSE // Dehradun, Uttarakhand
          </p>
        </div>
      </footer>
    </div>
  );
};
