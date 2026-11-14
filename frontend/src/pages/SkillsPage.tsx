import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Check, Clock, Compass, Code, Server, Database, Wrench, Binary, Monitor } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [groupedSkills, setGroupedSkills] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSkills(true)
      .then((res) => {
        if (res.success && res.data) setGroupedSkills(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryConfigs: { key: string; title: string; icon: any; color: string }[] = [
    { key: 'languages', title: '1. Programming Languages', icon: Code, color: '#F2A6AC' },
    { key: 'frontend', title: '2. Frontend Engineering', icon: Monitor, color: '#76A9FF' },
    { key: 'backend', title: '3. Backend & Distributed Systems', icon: Server, color: '#8FCF9B' },
    { key: 'databases', title: '4. Databases & Storage', icon: Database, color: '#F2A6AC' },
    { key: 'tools', title: '5. Developer Tooling & DevOps', icon: Wrench, color: '#76A9FF' },
    { key: 'core_cs', title: '6. Core Computer Science', icon: Binary, color: '#8FCF9B' },
  ];

  return (
    <div className="py-6 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
          Chapter 04 — My Technical Arsenal
        </span>
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl font-bold text-[#F0E9EF]">
          Technologies I've learned & <br />
          <span className="text-[#F2A6AC] scribble-underline">those I'm still mastering.</span>
        </h1>
        <p className="font-serif text-lg text-[#BDB5B9] max-w-2xl leading-relaxed">
          A transparent engineering ledger tracking languages, frameworks, system primitives, and CS foundations. No arbitrary percentage bars—only real competencies and active study areas.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono text-[#BDB5B9] border-y border-white/10 py-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded flex items-center justify-center bg-emerald-950/80 text-[#8FCF9B] border border-[#8FCF9B]/40 font-bold">
              ✓
            </span>
            <span>Proficient (Shipped Projects)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded flex items-center justify-center bg-blue-950/80 text-[#76A9FF] border border-[#76A9FF]/40 font-bold">
              ↻
            </span>
            <span>Learning (Active Deep-Dive)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded flex items-center justify-center bg-purple-950/80 text-purple-300 border border-purple-400/40 font-bold">
              ✦
            </span>
            <span>Exploring (Foundational Research)</span>
          </div>
        </div>
      </div>

      {/* Checklist Sections Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-[#76A9FF] animate-pulse">
          LOADING TECHNICAL ARSENAL...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryConfigs.map((config) => {
            const skills = groupedSkills[config.key] || [];
            const IconComponent = config.icon;

            return (
              <section
                key={config.key}
                className="relative p-6 rounded-sm bg-[#151515] border border-white/10 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all"
              >
                {/* Paper tape corner decoration */}
                <div className="absolute -top-3 right-6 w-16 h-5 tape-strip pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/10">
                    <span className="p-1.5 rounded bg-white/5 border border-white/10 text-[#F2A6AC]">
                      <IconComponent size={16} />
                    </span>
                    <h2 className="font-handwriting text-2xl font-bold text-[#F0E9EF]">
                      {config.title}
                    </h2>
                  </div>

                  {/* Handwritten Checklist Items */}
                  <ul className="space-y-3 font-handwriting text-xl">
                    {skills.map((skill) => {
                      const isProficient = skill.status === 'proficient';
                      const isLearning = skill.status === 'learning';

                      return (
                        <li
                          key={skill._id || skill.name}
                          className="flex items-center justify-between gap-3 group py-0.5"
                        >
                          <div className="flex items-center gap-2.5">
                            {/* Checkbox marker */}
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center text-xs font-mono font-bold border transition-colors ${
                                isProficient
                                  ? 'bg-emerald-950/80 text-[#8FCF9B] border-[#8FCF9B]/50'
                                  : isLearning
                                  ? 'bg-blue-950/80 text-[#76A9FF] border-[#76A9FF]/50'
                                  : 'bg-purple-950/80 text-purple-300 border-purple-400/50'
                              }`}
                            >
                              {isProficient ? '✓' : isLearning ? '↻' : '✦'}
                            </span>

                            <span
                              className={`transition-colors ${
                                isProficient
                                  ? 'text-[#F0E9EF] group-hover:text-[#F2A6AC]'
                                  : 'text-[#BDB5B9]'
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>

                          {/* Skill Status Tag */}
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                              isProficient
                                ? 'text-[#8FCF9B] bg-emerald-950/40'
                                : isLearning
                                ? 'text-[#76A9FF] bg-blue-950/40'
                                : 'text-purple-300 bg-purple-950/40'
                            }`}
                          >
                            {skill.status}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Card footer annotation */}
                <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[11px] text-white/40 flex justify-between items-center">
                  <span>{skills.length} tracked items</span>
                  <span className="text-[#8FCF9B]">VERIFIED</span>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Engineering Note Box */}
      <div className="p-6 rounded-sm bg-[#171717] border border-dashed border-[#F2A6AC]/40 text-center space-y-2">
        <h3 className="font-handwriting text-2xl font-bold text-[#F2A6AC]">
          Continuous Learning Philosophy
        </h3>
        <p className="font-serif text-sm text-[#BDB5B9] max-w-xl mx-auto italic">
          "Frameworks and libraries change every few seasons, but fundamentals—cache coherency, algorithmic complexity, data structures, and protocol mechanics—remain invariant."
        </p>
      </div>
    </div>
  );
};
