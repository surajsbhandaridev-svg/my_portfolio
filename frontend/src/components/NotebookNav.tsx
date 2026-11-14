import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ExternalLink } from 'lucide-react';

interface NavItem {
  id: string;
  number: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', number: '01', label: 'Home', path: '/' },
  { id: 'journey', number: '02', label: 'My Journey', path: '/journey' },
  { id: 'projects', number: '03', label: 'Projects', path: '/projects' },
  { id: 'skills', number: '04', label: 'Technical Skills', path: '/skills' },
  { id: 'education', number: '05', label: 'Education', path: '/education' },
  { id: 'beyond', number: '06', label: 'Beyond Code', path: '/beyond-code' },
  { id: 'contact', number: '07', label: 'Contact', path: '/contact' },
];

export const NotebookNav: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#101010]/95 backdrop-blur-md border-b border-[#353535] px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-handwriting text-2xl font-bold text-[#F0E9EF]">
          <span className="text-[#F2A6AC]">✦</span> Suraj Singh Bhandari
        </NavLink>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#F0E9EF] hover:text-[#F2A6AC] border border-white/20 rounded-md bg-[#161616]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-md pt-20 px-6 pb-8 flex flex-col justify-between">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-xl font-handwriting transition-all ${
                    isActive
                      ? 'bg-[#F2A6AC] text-[#101010] font-bold shadow-sketch-pink'
                      : 'text-[#BDB5B9] hover:text-[#F0E9EF] hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-sm opacity-70">{item.number}.</span>
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#353535] flex items-center justify-between">
            <NavLink
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-[#BDB5B9] hover:text-[#F2A6AC] font-mono"
            >
              <Shield size={14} /> Admin Portal
            </NavLink>
            <span className="text-xs font-mono text-[#8FCF9B]">SYSTEM // ONLINE</span>
          </div>
        </div>
      )}

      {/* Desktop Vertical Torn-Paper Notebook Navigation (Left Sticky Panel) */}
      <aside className="hidden lg:block fixed left-6 top-16 z-40 w-52 select-none">
        {/* Dark torn-paper bookmark strip container */}
        <div className="relative bg-[#171717] border border-white/10 p-5 rounded-sm shadow-paper torn-edge-bottom pb-8">
          {/* Top hand-drawn 4-pointed star / compass doodle */}
          <div className="flex justify-center mb-5">
            <svg
              className="w-8 h-8 text-[#F2A6AC] animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
            </svg>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={`group relative flex items-center px-3 py-1.5 transition-all duration-200 ${
                    isActive ? 'font-bold' : 'hover:translate-x-1'
                  }`}
                >
                  {/* Pink paper strip behind active item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#F2A6AC] rounded-[2px] shadow-sm transform -rotate-1 pointer-events-none" />
                  )}

                  <span
                    className={`relative z-10 font-handwriting text-lg flex items-center gap-2 ${
                      isActive ? 'text-[#101010]' : 'text-[#BDB5B9] group-hover:text-[#F0E9EF]'
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60 tracking-tighter">{item.number}.</span>
                    <span>{item.label}</span>
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Hand-drawn arrow doodle at bottom */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-handwriting text-[#BDB5B9]">
            <span className="opacity-80">Page Index</span>
            <svg
              className="w-6 h-4 text-[#F2A6AC]"
              viewBox="0 0 30 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 7h22M18 2l6 5-6 5" />
            </svg>
          </div>

          {/* Admin link discreetly at bottom */}
          <div className="mt-4 pt-2 text-center">
            <NavLink
              to="/admin"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-[#F2A6AC] transition-colors"
              title="Admin Portal"
            >
              <Shield size={11} />
              <span>Admin</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
