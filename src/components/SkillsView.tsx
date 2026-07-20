import React, { useState } from 'react';
import { Layers, Network, Terminal, Cpu, Database, Cloud, Activity } from 'lucide-react';
import { BIO, SKILL_CATEGORIES, RIGOR_PHILOSOPHY, INTERCONNECTIVITY_NODES } from '../data';

export const SkillsView: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Custom node descriptions for the interactive diagram
  const nodeDescriptions: { [key: string]: string } = {
    core: 'CORE LOGIC: Orchestrates multi-modal state transitions, parses user phoneme embeddings, and routes data pipelines synchronously under 10ms.',
    web: 'REACT FRONTEND: Manages the viewport state, triggers user mic capture, compiles real-time audio streams, and renders WebGL visualizations.',
    voice: 'ASR & NLU ENGINE: Converts raw speech bytes to text tokens via Whisper model structures and maps commands to structured JSON intent trees.',
    cloud: 'AWS SERVERLESS: Dispatches containerized microservices dynamically to spin up dedicated speech synthesis threads on-demand.',
    vector: 'VECTOR STORE: Queries high-dimensional semantic directories in ChromaDB to retrieve contextual reference files for RAG prompting.'
  };

  return (
    <div className="space-y-24 pt-32 max-w-7xl mx-auto px-6 mb-20">
      
      {/* 1. Hero Title */}
      <section className="relative">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="space-y-4 max-w-3xl">
          <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-semibold">
            ENGINEERING CAPABILITIES
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Precision Architecture.
          </h1>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed">
            A rigorous breakdown of key technical competencies across neural voice networks, full-stack client structures, and robust cloud configurations.
          </p>
        </div>
      </section>

      {/* 2. Skill Matrix (Bento Grid) */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
          <span className="w-8 h-[1px] bg-indigo-500"></span>
          <h2 className="font-sans text-xs uppercase tracking-widest font-bold text-indigo-500">
            Skill Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: AI & Voice Ops (Col Span 8) */}
          <div className="md:col-span-8 border border-neutral-900 bg-neutral-950 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group shadow-md">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-sans text-[9px] tracking-wider text-neutral-500 uppercase font-bold">
                    COGNITIVE ARCHITECTURE &amp; SPEECH
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-white">
                    AI &amp; Voice Ops
                  </h3>
                </div>
                <div className="text-4xl font-extrabold text-indigo-500">95%</div>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed max-w-xl">
                Developing low-latency voice-activated AI pipelines utilizing vector intent maps, automatic speech representation, and neural vocal frequency generation.
              </p>

              {/* Specs Sub-list */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900/60">
                {SKILL_CATEGORIES[0].specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center bg-neutral-900/20 px-4 py-2.5 rounded-lg border border-neutral-900">
                    <span className="text-xs text-neutral-400 font-sans">{spec.label}</span>
                    <span className="text-xs text-indigo-400 font-mono font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Visualizer Bar Graph Inside Card */}
            <div className="flex items-end gap-2.5 h-16 pt-8 w-full border-t border-neutral-900/50 mt-6 shrink-0">
              <span className="text-[10px] text-neutral-600 uppercase font-bold pr-2 tracking-wide font-mono shrink-0">Wave spectrum:</span>
              <div className="flex-1 bg-indigo-500/20 rounded-t-sm transition-all duration-700 hover:bg-indigo-500/40" style={{ height: '40%' }}></div>
              <div className="flex-1 bg-indigo-500/30 rounded-t-sm transition-all duration-700 hover:bg-indigo-500/50" style={{ height: '60%' }}></div>
              <div className="flex-1 bg-indigo-500/45 rounded-t-sm transition-all duration-700 hover:bg-indigo-500/65" style={{ height: '90%' }}></div>
              <div className="flex-1 bg-indigo-500/35 rounded-t-sm transition-all duration-700 hover:bg-indigo-500/55" style={{ height: '70%' }}></div>
              <div className="flex-1 bg-indigo-500/50 rounded-t-sm transition-all duration-700 hover:bg-indigo-500/70" style={{ height: '85%' }}></div>
            </div>
          </div>

          {/* Card 2: Core Competencies Side Panel (Col Span 4) */}
          <div className="md:col-span-4 border border-neutral-900 bg-neutral-950 p-8 rounded-2xl flex flex-col justify-between shadow-md">
            <div>
              <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-bold mb-6 border-b border-neutral-900 pb-3">
                Core Competency
              </h3>
              
              <ul className="space-y-6">
                {[
                  { label: 'Architecture Design', val: 95 },
                  { label: 'Latency Optimization', val: 90 },
                  { label: 'Real-time Streaming', val: 88 },
                  { label: 'Neural Tokenizing', val: 82 }
                ].map((item) => (
                  <li key={item.label} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-300">{item.label}</span>
                      <span className="text-indigo-400 font-mono font-semibold">{item.val}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-900/60">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${item.val}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-900 flex items-center gap-3 text-[10px] text-neutral-500 uppercase font-mono font-bold tracking-wider">
              <Activity size={14} className="text-indigo-500 animate-pulse" />
              <span>Calibrated 2026-07-16 UTC</span>
            </div>
          </div>

          {/* Card 3: Full-Stack Web (Col Span 6) */}
          <div className="md:col-span-6 border border-neutral-900 bg-neutral-950 p-8 rounded-2xl border-l-4 border-l-indigo-600 shadow-md space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Layers size={18} />
              </div>
              <div>
                <span className="font-sans text-[8px] tracking-wider text-neutral-500 uppercase font-bold">FRONTEND EXPERTISE</span>
                <h3 className="font-sans text-lg font-bold text-white">Full-Stack Web</h3>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Crafting highly responsive, visual, and modular Single Page Applications that synchronize with local state and render WebGL structures dynamically.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-neutral-900/50">
              {SKILL_CATEGORIES[1].specs.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <p className="text-neutral-500 font-sans text-[10px] uppercase font-bold tracking-wide">{spec.label}</p>
                  <p className="text-neutral-200 font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Cloud Infrastructure (Col Span 6) */}
          <div className="md:col-span-6 border border-neutral-900 bg-neutral-950 p-8 rounded-2xl border-l-4 border-l-indigo-500 shadow-md space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Network size={18} />
              </div>
              <div>
                <span className="font-sans text-[8px] tracking-wider text-neutral-500 uppercase font-bold">BACKEND EXPERTISE</span>
                <h3 className="font-sans text-lg font-bold text-white">Cloud Infrastructure</h3>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Orchestrating lightweight Docker/Kubernetes containers and secure AWS Lambda serverless functions specialized for routing concurrent speech signals.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-neutral-900/50">
              {SKILL_CATEGORIES[2].specs.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <p className="text-neutral-500 font-sans text-[10px] uppercase font-bold tracking-wide">{spec.label}</p>
                  <p className="text-neutral-200 font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Technical Rigor / Philosophy */}
      <section className="border border-neutral-900 bg-neutral-950 p-8 md:p-16 rounded-[2rem] relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none"></div>
        <div className="md:w-3/4 space-y-6 relative z-10">
          <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-bold">
            {RIGOR_PHILOSOPHY.title}
          </span>
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight">
            {RIGOR_PHILOSOPHY.headline}
          </h3>
          {RIGOR_PHILOSOPHY.paragraphs.map((para, idx) => (
            <p key={idx} className="text-neutral-400 text-sm leading-relaxed font-sans">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* 4. Interactive Central-Satellite Interconnectivity Diagram */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-sans text-2xl font-bold text-white">
            System Interconnectivity
          </h2>
          <p className="font-sans text-neutral-400 text-xs leading-relaxed">
            Hover over any tech-stack node to audit real-time information routing paths and verify integration dependencies.
          </p>
        </div>

        <div className="border border-neutral-900 bg-neutral-950/80 rounded-[2.5rem] p-8 h-[450px] w-full relative flex items-center justify-center overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          {/* SVG Animated Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {/* AWS (x: 25%, y: 75%) to Core (50%, 50%) */}
            <line stroke="#6366f1" strokeDasharray="5,5" strokeWidth="1" x1="25%" x2="50%" y1="75%" y2="50%" className="opacity-30 stroke-[2] animate-[marquee_10s_linear_infinite]" />
            {/* React (x: 25%, y: 25%) to Core (50%, 50%) */}
            <line stroke="#6366f1" strokeDasharray="5,5" strokeWidth="1" x1="25%" x2="50%" y1="25%" y2="50%" className="opacity-30 stroke-[2] animate-[marquee_10s_linear_infinite]" />
            {/* Voice (x: 75%, y: 25%) to Core (50%, 50%) */}
            <line stroke="#6366f1" strokeDasharray="5,5" strokeWidth="1" x1="75%" x2="50%" y1="25%" y2="50%" className="opacity-30 stroke-[2] animate-[marquee_10s_linear_infinite]" />
            {/* Vector (x: 75%, y: 75%) to Core (50%, 50%) */}
            <line stroke="#6366f1" strokeDasharray="5,5" strokeWidth="1" x1="75%" x2="50%" y1="75%" y2="50%" className="opacity-30 stroke-[2] animate-[marquee_10s_linear_infinite]" />
          </svg>

          {/* Node 1: Central Core Node */}
          <div 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActiveNode('core')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="w-20 h-20 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/25 animate-[pulse_3s_infinite_ease-in-out]">
              <Cpu size={28} className="text-indigo-400" />
            </div>
            <span className="mt-2.5 font-sans text-[10px] tracking-widest uppercase font-bold text-indigo-400">Core Logic</span>
          </div>

          {/* Node 2: React Frontend (Top-Left) */}
          <div 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ left: '25%', top: '25%', transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActiveNode('web')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">
              <Layers size={20} />
            </div>
            <span className="mt-2 text-[8px] font-sans tracking-wider text-neutral-500 uppercase font-bold">React UI</span>
          </div>

          {/* Node 3: Voice / NLU (Top-Right) */}
          <div 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ left: '75%', top: '25%', transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActiveNode('voice')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">
              <Cpu size={20} />
            </div>
            <span className="mt-2 text-[8px] font-sans tracking-wider text-neutral-500 uppercase font-bold">ASR &amp; TTS</span>
          </div>

          {/* Node 4: Cloud / AWS Lambda (Bottom-Left) */}
          <div 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ left: '25%', top: '75%', transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActiveNode('cloud')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">
              <Cloud size={20} />
            </div>
            <span className="mt-2 text-[8px] font-sans tracking-wider text-neutral-500 uppercase font-bold">AWS Lambda</span>
          </div>

          {/* Node 5: Vector DB / Chroma (Bottom-Right) */}
          <div 
            className="absolute z-10 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ left: '75%', top: '75%', transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActiveNode('vector')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">
              <Database size={20} />
            </div>
            <span className="mt-2 text-[8px] font-sans tracking-wider text-neutral-500 uppercase font-bold">Vector Store</span>
          </div>

          {/* Node Info Overlay Bar at Bottom */}
          <div className="absolute bottom-4 left-6 right-6 p-4 rounded-xl border border-neutral-900 bg-neutral-950/90 shadow-lg text-center select-none shrink-0 h-16 flex items-center justify-center z-20">
            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider transition-all duration-300">
              {activeNode ? nodeDescriptions[activeNode] : 'INTEGRATION CONTEXT: Hover over individual system nodes above to inspect live pipeline hooks.'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
