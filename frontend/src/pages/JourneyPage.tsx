import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Terminal, Code, Cpu, Target, Compass, BookOpen } from 'lucide-react';

export const JourneyPage: React.FC = () => {
  const [journey, setJourney] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJourney()
      .then((res) => {
        if (res.success && res.data) setJourney(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-6 space-y-16 max-w-4xl">
      {/* Header Badge */}
      <div className="space-y-4">
        <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
          Chapter 02 — My Developer Journey
        </span>
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl font-bold text-[#F0E9EF]">
          Turning curiosity into <br />
          <span className="text-[#F2A6AC] scribble-underline">working software.</span>
        </h1>
        <p className="font-serif text-lg sm:text-xl text-[#BDB5B9] leading-relaxed italic border-l-2 border-[#F2A6AC] pl-4">
          {journey?.introduction ||
            "I'm a Computer Science Engineering student passionate about software development, problem-solving, and building useful digital products. I enjoy exploring technologies, learning by building, and turning ideas into working solutions."}
        </p>
      </div>

      {/* Story Sections Editorial Notebook Layout */}
      <div className="space-y-12">
        {/* Section 1: How I Started */}
        <section className="relative p-6 sm:p-8 rounded-sm bg-[#161616]/90 border border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 rounded bg-white/5 border border-white/10 text-[#76A9FF]">
              <Terminal size={20} />
            </span>
            <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF]">
              01. The First Line of Code
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3 font-serif text-[#BDB5B9] leading-relaxed text-base">
              <p>
                {journey?.howIStarted ||
                  "I wrote my first lines of code understanding loops, pointers, and memory mechanics in C++. That early experience with low-level thinking sparked an obsession with clean code, runtime efficiency, and algorithm design. Soon after, I began architecting full-stack web applications using Node.js and TypeScript."}
              </p>
              <p>
                Seeing logic translate into actionable interfaces created a feedback loop: whenever I wanted to understand an architectural concept, I didn't just read documentation—I built a working prototype.
              </p>
            </div>
            {/* Hand-drawn sticky note */}
            <div className="md:col-span-4 p-4 bg-[#EAE0D5] text-[#1c1917] rounded shadow-md transform rotate-2 font-handwriting text-sm">
              <div className="font-bold border-b border-black/15 pb-1 mb-2">Notebook Memo:</div>
              <p className="italic">
                "Code is poetry where syntax errors are forbidden and every character has execution weight."
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Building Real-World Systems */}
        <section className="relative p-6 sm:p-8 rounded-sm bg-[#161616]/90 border border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 rounded bg-white/5 border border-white/10 text-[#8FCF9B]">
              <Code size={20} />
            </span>
            <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF]">
              02. From Syntax to Distributed Systems
            </h2>
          </div>
          <div className="space-y-4 font-serif text-[#BDB5B9] leading-relaxed text-base">
            <p>
              {journey?.story ||
                "My developer journey started with a deep fascination with how complex systems function behind the screen. Rather than just learning syntax, I've always preferred building practical applications from scratch. From real-time multiplayer servers in DostLeague to automated vulnerability scanners, every challenge has shaped my technical foundation."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded border border-white/10 bg-black/40">
                <span className="font-mono text-xs text-[#76A9FF] uppercase tracking-wider block mb-1">
                  Real-time Architecture
                </span>
                <p className="text-xs text-[#F0E9EF] font-sans">
                  Engineered state machines and WebSockets for synchronous multiplayer room gameplay in DostLeague.
                </p>
              </div>
              <div className="p-4 rounded border border-white/10 bg-black/40">
                <span className="font-mono text-xs text-[#8FCF9B] uppercase tracking-wider block mb-1">
                  Static Analysis & Security
                </span>
                <p className="text-xs text-[#F0E9EF] font-sans">
                  Constructed Abstract Syntax Tree (AST) scanning rules in VulnGuard AI to catch software vulnerabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Problem Solving Philosophy */}
        <section className="relative p-6 sm:p-8 rounded-sm bg-[#161616]/90 border border-white/10 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 rounded bg-white/5 border border-white/10 text-[#F2A6AC]">
              <Cpu size={20} />
            </span>
            <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF]">
              03. First-Principles Problem Solving
            </h2>
          </div>
          <div className="space-y-3 font-serif text-[#BDB5B9] leading-relaxed text-base">
            <p>
              {journey?.problemSolvingApproach ||
                "When facing a complex problem, I deconstruct it into small, independent sub-systems. I focus first on data modeling and interface boundaries before writing implementation code. Writing testable, predictable logic and profiling performance bottlenecks are central to my workflow."}
            </p>
            <div className="p-4 rounded border border-[#F2A6AC]/30 bg-[#F2A6AC]/5 mt-4">
              <span className="font-handwriting text-lg text-[#F2A6AC] block font-bold mb-1">
                Engineering Mantra:
              </span>
              <p className="font-serif italic text-sm text-[#F0E9EF]">
                Understand the requirements ➔ Model the data structures ➔ Implement minimal surface area ➔ Benchmark under stress.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: What I'm Learning & Future Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 rounded-sm bg-[#161616]/90 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#76A9FF]">
              <BookOpen size={18} />
              <h3 className="font-handwriting text-2xl font-bold text-[#F0E9EF]">Currently Mastering</h3>
            </div>
            <p className="font-serif text-sm text-[#BDB5B9] leading-relaxed">
              {journey?.currentLearning ||
                "Currently deepening my understanding of Advanced Graph Algorithms, Dynamic Programming, Distributed System primitives, Database indexing strategies, and microservice communication patterns."}
            </p>
          </section>

          <section className="p-6 rounded-sm bg-[#161616]/90 border border-white/10 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#8FCF9B]">
              <Target size={18} />
              <h3 className="font-handwriting text-2xl font-bold text-[#F0E9EF]">Future Horizon</h3>
            </div>
            <p className="font-serif text-sm text-[#BDB5B9] leading-relaxed">
              {journey?.futureGoals ||
                "My objective is to grow into an impactful systems software engineer, contribute meaningfully to high-performance open-source projects, and architect resilient software that solves real user challenges at scale."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
