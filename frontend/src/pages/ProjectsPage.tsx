import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ExternalLink, Search, Filter, X, Calendar, Layers } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then((res) => {
        if (res.success && res.data) setProjects(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'ai', label: 'AI & Security' },
    { id: 'tools', label: 'Developer Tools' },
    { id: 'systems', label: 'Systems & Data' },
    { id: 'backend', label: 'Backend & APIs' },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' || project.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-6 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-handwriting text-lg text-[#F2A6AC] border border-[#F2A6AC]/60 px-4 py-1 rounded-full hand-drawn-circle shadow-sm">
          Chapter 03 — Things I've Built
        </span>
        <h1 className="font-handwriting text-5xl sm:text-6xl md:text-7xl font-bold text-[#F0E9EF]">
          Experiments, ideas and <br />
          <span className="text-[#F2A6AC] scribble-underline">things brought to life.</span>
        </h1>
        <p className="font-serif text-lg text-[#BDB5B9] max-w-2xl leading-relaxed">
          A curated collection of verified software engineering repositories, full-stack platforms, developer tooling, and algorithmic experiments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
        {/* Category Tabs styled like notebook tags */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-handwriting text-lg px-4 py-1.5 rounded transition-all duration-150 ${
                selectedCategory === cat.id
                  ? 'bg-[#F2A6AC] text-[#101010] font-bold shadow-sketch-pink -rotate-1'
                  : 'bg-[#181818] text-[#BDB5B9] border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-10 pr-4 py-2 bg-[#161616] border border-white/15 rounded text-sm font-mono text-[#F0E9EF] placeholder:text-white/30 focus:outline-none focus:border-[#F2A6AC]"
          />
        </div>
      </div>

      {/* Scrapbook Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-[#76A9FF] animate-pulse">
          INITIALIZING PROJECT REPOSITORIES...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/15 rounded p-8">
          <p className="font-handwriting text-2xl text-[#BDB5B9]">No projects matched your criteria.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 font-mono text-xs text-[#F2A6AC] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, idx) => (
            <article
              key={project._id || project.slug}
              className={`group relative bg-[#171717] border border-white/10 rounded-sm p-5 shadow-paper flex flex-col justify-between hover:border-[#F2A6AC]/60 transition-all duration-300 transform ${
                idx % 2 === 0 ? 'hover:-rotate-0.5' : 'hover:rotate-0.5'
              }`}
            >
              <div>
                {/* Scrapbook Polaroid Image Frame */}
                <div className="relative w-full h-48 rounded-[2px] overflow-hidden bg-black/60 mb-4 border border-white/10">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded backdrop-blur-md border ${
                        project.status === 'completed'
                          ? 'bg-emerald-950/80 text-[#8FCF9B] border-[#8FCF9B]/30'
                          : project.status === 'ongoing'
                          ? 'bg-blue-950/80 text-[#76A9FF] border-[#76A9FF]/30'
                          : 'bg-amber-950/80 text-amber-300 border-amber-300/30'
                      }`}
                    >
                      ● {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="font-handwriting text-3xl font-bold text-[#F0E9EF] group-hover:text-[#F2A6AC] transition-colors">
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="font-serif text-sm text-[#BDB5B9] line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Stack Tags */}
                <div className="pt-4 flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[#76A9FF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-handwriting text-lg text-[#F2A6AC] hover:underline"
                >
                  View Details →
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded hover:bg-white/10 text-[#BDB5B9] hover:text-white transition-colors"
                      title="View GitHub Repository"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <GithubIcon size={17} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded hover:bg-white/10 text-[#8FCF9B] hover:text-emerald-300 transition-colors"
                      title="View Live Demo"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Project Detail Modal / Blueprint Viewer */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#141414] border border-white/20 rounded-sm p-6 sm:p-8 shadow-2xl text-[#F0E9EF] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded hover:bg-white/10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F2A6AC]">
                <span>CHAPTER 03</span> // <span>PROJECT BLUEPRINT</span>
              </div>

              <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#F0E9EF]">
                {selectedProject.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded uppercase text-[#8FCF9B]">
                  Status: {selectedProject.status}
                </span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded uppercase text-[#76A9FF]">
                  Category: {selectedProject.category}
                </span>
              </div>

              {/* Image */}
              {selectedProject.image && (
                <div className="w-full h-64 rounded overflow-hidden border border-white/10">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Long Description / Architectural Breakdown */}
              <div className="space-y-3 font-serif text-[#BDB5B9] text-base leading-relaxed">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#F0E9EF]">Architectural Overview</h3>
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              {/* Technologies */}
              <div className="space-y-2 pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#F0E9EF]">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies?.map((t: string) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/15 rounded text-[#76A9FF]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded font-mono text-xs text-[#F0E9EF] hover:border-[#F2A6AC] hover:text-[#F2A6AC] transition-colors"
                  >
                    <GithubIcon size={15} /> Source Repository
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-[#F2A6AC] text-[#101010] rounded font-mono text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Launch Live Demo <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
