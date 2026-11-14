import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Sparkles, Coffee, Book, Cpu, Compass, Heart } from 'lucide-react';

export const BeyondCodePage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBeyondCode()
      .then((res) => {
        if (res.success && res.data) setItems(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-6 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
          Chapter 06 — Beyond the Code
        </span>
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl font-bold text-[#F0E9EF]">
          Curiosity, engineering habits & <br />
          <span className="text-[#F2A6AC] scribble-underline">what fuels the craft.</span>
        </h1>
        <p className="font-serif text-lg text-[#BDB5B9] max-w-2xl leading-relaxed">
          Great engineering rarely happens in a vacuum. A scrapbook of technical curiosities, workspace aesthetics, reading lists, and algorithmic problem-solving habits.
        </p>
      </div>

      {/* Scrapbook Cards */}
      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-[#76A9FF] animate-pulse">
          OPENING PERSONAL SCRAPBOOK...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <article
              key={item._id || idx}
              className={`relative bg-[#161616] border border-white/10 rounded-sm p-6 shadow-paper flex flex-col justify-between hover:border-[#F2A6AC]/40 transition-all transform ${
                idx % 2 === 0 ? 'hover:-rotate-0.5' : 'hover:rotate-0.5'
              }`}
            >
              {/* Paper tape decoration */}
              <div className="absolute -top-3 left-8 w-20 h-6 tape-strip pointer-events-none" />

              <div className="space-y-4">
                {/* Photo if available */}
                {item.image && (
                  <div className="w-full h-52 rounded overflow-hidden bg-black/50 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter contrast-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <div>
                  <span className="font-mono text-xs uppercase text-[#76A9FF] tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF]">
                    {item.title}
                  </h2>
                </div>

                <p className="font-serif text-sm text-[#BDB5B9] leading-relaxed">
                  {item.description}
                </p>

                {/* Handwritten Annotation Note */}
                {item.annotation && (
                  <div className="p-3 bg-[#EAE0D5] text-[#1c1917] rounded shadow-sm font-handwriting text-base">
                    <span className="font-bold">Note: </span>
                    <span className="italic">"{item.annotation}"</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[#8FCF9B]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
