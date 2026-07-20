import React, { useState } from 'react';
import { ArrowRight, Code, Cpu, ExternalLink } from 'lucide-react';
import { ActivePage, Project } from '../types';
import { PROJECTS } from '../data';
import { GradientButton } from '@/components/ui/gradient-button';

interface ProjectsViewProps {
  onPageChange: (page: ActivePage) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onPageChange }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'web'>('all');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const handleCTAClick = () => {
    onPageChange('home');
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="space-y-16 pt-32 max-w-7xl mx-auto px-6 mb-20">
      
      {/* 1. Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="max-w-2xl space-y-4">
          <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-semibold">
            PORTFOLIO SHOWCASE
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Crafted Solutions.
          </h1>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed">
            A curated showcase of high-performance web applications and cutting-edge Voice AI integrations developed by <span className="text-white font-medium">VoiceWebSEO</span> with mathematical rigor.
          </p>
        </div>

        {/* Dynamic Filter Buttons */}
        <div className="flex items-center gap-2 border border-neutral-900 bg-neutral-950 p-1.5 rounded-full w-fit shrink-0">
          {(['all', 'ai', 'web'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-sans text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {filter === 'all' ? 'All' : filter === 'ai' ? 'AI / Voice' : 'Web Apps'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="border border-neutral-900 bg-neutral-950/40 rounded-2xl overflow-hidden flex flex-col group hover:border-neutral-800/80 transition-all duration-300 shadow-md backdrop-blur-sm"
          >
            {/* Image Banner */}
            <div className="h-56 relative bg-neutral-900 overflow-hidden shrink-0">
              {proj.category === 'ai' && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"></span>
                  </span>
                </div>
              )}
              {proj.imageUrl ? (
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-800">
                  <Code size={48} />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent pointer-events-none"></div>

              {/* Float Category Tag */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-400 font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                  {proj.category === 'ai' ? <Cpu size={10} className="text-indigo-400" /> : <Code size={10} className="text-emerald-400" />}
                  {proj.category === 'ai' ? 'VOICE AI' : 'FULLSTACK'}
                </span>
                {proj.metric && (
                  <span className="bg-indigo-600/90 text-white font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {proj.metric.label}: {proj.metric.value}
                  </span>
                )}
              </div>
            </div>

            {/* Description & Specs Content */}
            <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-sans text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {proj.title}
                  </h3>
                  <ExternalLink size={14} className="text-neutral-600 group-hover:text-indigo-400 transition-colors mt-1 shrink-0" />
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {proj.description}
                </p>

                {proj.features && proj.features.length > 0 && (
                  <ul className="pt-3 space-y-1 text-[11px] text-neutral-500 font-sans border-t border-neutral-900">
                    {proj.features.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-indigo-500 mt-1 shrink-0">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-neutral-950 rounded font-mono text-[9px] text-neutral-500 border border-neutral-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic Bento CTA Box in grid */}
        <div className="bg-neutral-950 rounded-2xl p-8 flex flex-col justify-between items-center text-center border border-neutral-900 relative overflow-hidden shadow-sm shadow-indigo-600/5 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          
          <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-indigo-500 border border-neutral-800 mb-2 mt-6">
            <Cpu size={24} className="group-hover:rotate-45 transition-transform duration-500" />
          </div>

          <div className="space-y-3 max-w-xs">
            <h3 className="font-sans text-lg font-bold text-white">
              Have a custom concept in mind?
            </h3>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Let's craft custom LLM-integrated voice synthesis engines or WebGL interfaces tailored specifically for your system context.
            </p>
          </div>

          <GradientButton
            onClick={handleCTAClick}
            className="w-full mt-6 text-white text-xs uppercase tracking-widest py-3 flex items-center justify-center gap-2 cursor-pointer font-sans font-bold"
          >
            Initiate Connection
            <ArrowRight size={12} />
          </GradientButton>
        </div>
      </div>

    </div>
  );
};
