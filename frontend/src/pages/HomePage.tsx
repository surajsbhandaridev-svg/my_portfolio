import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { api } from '../services/api';

export const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  useEffect(() => {
    api.getSiteSettings().then((res) => {
      if (res.success && res.data) setSettings(res.data);
    }).catch(console.error);

    api.getProjects({ featured: true }).then((res) => {
      if (res.success && res.data) setFeaturedProjects(res.data.slice(0, 3));
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-24 py-6">
      {/* ===================== HERO SECTION (CHAPTER 01) ===================== */}
      <section className="relative min-h-[580px] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Chapter 01 Badge with hand-drawn scribbled oval */}
            <div className="inline-flex items-center gap-2">
              <span className="font-handwriting text-lg md:text-xl text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
                Chapter 01 — The Developer's Sketchbook
              </span>
            </div>

            {/* Hand-drawn Crown Doodle */}
            <div className="relative pt-2">
              <div className="absolute -top-6 left-48 text-[#d4af37] select-none pointer-events-none transform -rotate-6">
                <svg
                  className="w-8 h-8 opacity-90"
                  viewBox="0 0 40 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 24L8 8L16 16L24 4L32 16L36 8L38 24Z" />
                  <circle cx="8" cy="7" r="1.5" fill="currentColor" />
                  <circle cx="24" cy="4" r="1.5" fill="currentColor" />
                  <circle cx="36" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Main Heading */}
              <h1 className="font-handwriting text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#F0E9EF] leading-[0.95] drop-shadow-sm">
                Suraj Singh <br />
                <span className="text-[#F0E9EF]">Bhandari</span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="font-serif text-2xl sm:text-3xl text-[#F0E9EF] font-medium tracking-wide">
              {settings?.tagline || "Building. Breaking. Learning. Engineering."}
            </p>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-[#BDB5B9] font-light tracking-wide max-w-xl">
              {settings?.subtitle || "B.Tech CSE Student • Aspiring Software Engineer • Full-Stack Developer"}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Primary Pink Paper Tag Button */}
              <Link
                to="/projects"
                className="group relative inline-flex items-center gap-2 bg-[#F2A6AC] text-[#101010] font-handwriting text-xl font-bold px-7 py-2.5 rounded shadow-sketch-pink hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 transform -rotate-1"
              >
                <span>Explore My Work</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Outline Hand-drawn Button */}
              <a
                href={settings?.resumeUrl || "/resume.pdf"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-[#F0E9EF] font-handwriting text-xl px-6 py-2.5 rounded-full hover:border-[#F2A6AC] hover:text-[#F2A6AC] transition-colors"
              >
                <span>Download Resume</span>
                <Download size={16} />
              </a>
            </div>

            {/* Status & Social Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 max-w-2xl">
              {/* System Status Pill */}
              <div className="flex items-center gap-2 font-mono text-xs text-[#8FCF9B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8FCF9B] animate-pulse"></span>
                <span>System Online // Scroll Down ↓</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href={settings?.github || "https://github.com/surajsbhandaridev-svg"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-white/5 border border-white/15 text-[#F0E9EF] hover:text-[#F2A6AC] hover:border-[#F2A6AC] transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={settings?.linkedin || "https://linkedin.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-white/5 border border-white/15 text-[#F0E9EF] hover:text-[#76A9FF] hover:border-[#76A9FF] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={`mailto:${settings?.email || "bhandarisuraj382@gmail.com"}`}
                  className="p-2 rounded bg-white/5 border border-white/15 text-[#F0E9EF] hover:text-[#8FCF9B] hover:border-[#8FCF9B] transition-all"
                  aria-label="Email Suraj"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Astronaut Sitting on Asteroid with Laptop (Exact 2D Image) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[480px] flex items-center justify-center select-none py-2">
              <div className="relative z-10 w-[360px] sm:w-[440px]">
                <img
                  src="/astronaut_asteroid_clean.png"
                  alt="Suraj Singh Bhandari — Astronaut on asteroid with laptop"
                  className="w-full h-auto object-contain filter contrast-110 drop-shadow-[0_15px_35px_rgba(168,85,247,0.2)] pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CHAPTER 02 — MY DEVELOPER JOURNEY ===================== */}
      <section className="relative pt-12 border-t border-dashed border-[#353535]">
        {/* Chapter 02 Badge */}
        <div className="mb-6">
          <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/50 px-4 py-1 rounded-full hand-drawn-circle">
            Chapter 02 — My Developer Journey
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Polaroid Workspace Photograph */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group p-3 bg-white shadow-2xl rounded-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300 max-w-[300px]">
              {/* Realistic scotch tape strip on top left */}
              <div className="absolute -top-3.5 left-4 w-24 h-7 tape-strip z-10" />

              {/* Photo */}
              <div className="w-full h-52 bg-zinc-900 overflow-hidden rounded-[1px] relative">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
                  alt="Suraj's Developer Workspace"
                  className="w-full h-full object-cover filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-900/15 pointer-events-none" />
              </div>

              {/* Polaroid caption */}
              <div className="pt-3 pb-1 text-center font-handwriting text-zinc-900 text-lg font-bold">
                Late night coding // Dehradun
              </div>
            </div>
          </div>

          {/* Center: Story & Description */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#F0E9EF] leading-tight">
              Turning ideas into <br />
              <span className="text-[#F2A6AC] scribble-underline">real-world solutions.</span>
            </h2>

            <p className="font-serif text-[#BDB5B9] text-sm sm:text-base leading-relaxed pt-2">
              I'm a passionate B-Tech CSE student, who loves to code, explore new technologies, and solve real problems.
              My journey is all about continuous learning, building projects, and growing as a developer.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/journey"
                className="inline-flex items-center gap-1.5 font-handwriting text-lg text-[#76A9FF] hover:text-[#F2A6AC] transition-colors"
              >
                <span>Read Full Journal</span>
                <ArrowRight size={16} />
              </Link>

              {/* Hand-drawn arrow pointing toward Quick Facts */}
              <svg
                className="w-12 h-6 text-[#BDB5B9] opacity-70 hidden sm:block"
                viewBox="0 0 50 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2 10 Q25 2 45 10" />
                <path d="M38 5 L45 10 L39 15" />
              </svg>
            </div>
          </div>

          {/* Center-Right: Quick Facts Torn-Paper Card */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-full max-w-[230px] bg-[#EAE0D5] text-[#1c1917] p-4 rounded-sm shadow-xl transform rotate-2 hover:rotate-1 transition-transform">
              {/* Paper tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 tape-strip z-10" />

              <h3 className="font-handwriting text-xl font-bold text-[#1c1917] mb-2.5 border-b border-black/15 pb-1">
                Quick Facts:
              </h3>

              <ul className="space-y-2 font-handwriting text-base">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">☑</span>
                  <span>B.Tech CSE @ GEHU</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">☑</span>
                  <span>DSA Enthusiast</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">☑</span>
                  <span>Full-Stack Developer</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">☑</span>
                  <span>Space Explorer ☺</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Far Right: CPU Processor Image (Exact 2D Image, Not 3D model) */}
          <div className="md:col-span-2 flex flex-col items-center justify-center">
            <div className="w-[180px] h-[140px] sm:w-[200px] sm:h-[150px] flex items-center justify-center">
              <img
                src="/cpu_processor_clean.png"
                alt="Microprocessor chip and circuit connections"
                className="w-full h-auto object-contain filter contrast-110 pointer-events-none"
              />
            </div>

            {/* Hand-drawn Doodles underneath CPU */}
            <div className="text-center select-none font-handwriting text-xs text-[#BDB5B9] mt-2 space-y-0.5">
              <span className="text-[#F0E9EF] font-bold text-base block">Think</span>
              <span className="text-[#F2A6AC] font-bold text-base block">Build</span>
              <span className="text-[#76A9FF] font-bold text-base block scribble-underline">Innovate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED WORK PREVIEW ===================== */}
      {featuredProjects.length > 0 && (
        <section className="pt-8 border-t border-dashed border-[#353535]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/50 px-3 py-0.5 rounded-full hand-drawn-circle">
                Chapter 03 — Featured Projects
              </span>
              <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#F0E9EF] mt-2">
                Experiments, ideas and things brought to life.
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-handwriting text-xl text-[#F2A6AC] hover:underline"
            >
              <span>View All Projects</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <div
                key={p._id || p.slug}
                className="group relative bg-[#161616] border border-white/10 rounded-sm p-5 hover:border-[#F2A6AC]/50 transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative w-full h-44 rounded overflow-hidden bg-black/40 mb-4 border border-white/5">
                  <img
                    src={p.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-mono uppercase bg-black/80 backdrop-blur-md rounded border border-white/20 text-[#8FCF9B]">
                    {p.status}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-handwriting text-2xl font-bold text-[#F0E9EF] group-hover:text-[#F2A6AC] transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-serif text-sm text-[#BDB5B9] line-clamp-2">
                    {p.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {p.technologies?.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[#76A9FF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#BDB5B9] hover:text-[#F2A6AC]"
                    >
                      <GithubIcon size={14} /> Repository
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#8FCF9B] hover:underline"
                    >
                      Live Demo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
