import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { GraduationCap, Award, BookOpen, CheckCircle, Calendar, MapPin } from 'lucide-react';

export const EducationPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEducation()
      .then((res) => {
        if (res.success && res.data) setRecords(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-6 space-y-12 max-w-4xl">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
          Chapter 05 — My Academic Journey
        </span>
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl font-bold text-[#F0E9EF]">
          Foundations, coursework & <br />
          <span className="text-[#F2A6AC] scribble-underline">academic milestones.</span>
        </h1>
        <p className="font-serif text-lg text-[#BDB5B9] max-w-2xl leading-relaxed">
          Grounding practical engineering curiosity with rigorous theoretical study in computer science, mathematics, and systems design.
        </p>
      </div>

      {/* Vertical Notebook Timeline */}
      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-[#76A9FF] animate-pulse">
          RETRIEVING ACADEMIC RECORDS...
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#353535]">
          {records.map((edu, idx) => (
            <div key={edu._id || idx} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-5 h-5 rounded-full bg-[#101010] border-2 border-[#F2A6AC] flex items-center justify-center group-hover:scale-125 transition-transform shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#F2A6AC]"></span>
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-8 rounded-sm bg-[#161616]/90 border border-white/10 shadow-lg space-y-4 hover:border-white/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF]">
                      {edu.institution}
                    </h2>
                    <p className="font-serif text-lg text-[#F2A6AC] font-medium">
                      {edu.degree} — <span className="text-[#F0E9EF]">{edu.field}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#76A9FF] bg-blue-950/40 px-3 py-1 rounded border border-[#76A9FF]/30 self-start sm:self-center">
                    <Calendar size={13} />
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.current && <span className="ml-1 text-[#8FCF9B] font-bold">(Current)</span>}
                  </div>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="font-serif text-sm text-[#BDB5B9] leading-relaxed">
                    {edu.description}
                  </p>
                )}

                {/* Milestones / Core Achievements */}
                {edu.milestones && edu.milestones.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#8FCF9B] flex items-center gap-1.5">
                      <Award size={14} /> Key Academic Milestones
                    </h3>
                    <ul className="space-y-1.5 font-serif text-xs text-[#BDB5B9]">
                      {edu.milestones.map((m: string, mIdx: number) => (
                        <li key={mIdx} className="flex items-start gap-2">
                          <span className="text-[#8FCF9B] mt-0.5">✦</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* University Information Sticky Note */}
      <div className="p-5 rounded-sm bg-[#EAE0D5] text-[#1c1917] max-w-md shadow-lg transform -rotate-1 font-handwriting">
        <div className="font-bold text-xl border-b border-black/15 pb-1 mb-2 flex items-center gap-2">
          <MapPin size={18} /> Graphic Era University (GEU)
        </div>
        <p className="text-base leading-snug">
          Dehradun, Uttarakhand, India. B.Tech Computer Science Engineering cohort 2024–2028. Focused on system architecture, algorithms, and applied software engineering.
        </p>
      </div>
    </div>
  );
};
