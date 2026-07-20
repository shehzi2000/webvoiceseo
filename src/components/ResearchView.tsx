import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Database, ChevronRight, ArrowUpRight, ArrowRight, Play, Terminal } from 'lucide-react';
import { ActivePage } from '../types';
import { RESEARCH_PILLARS, BENCHMARKS } from '../data';
import { GradientButton } from '@/components/ui/gradient-button';

interface ResearchViewProps {
  onPageChange: (page: ActivePage) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({ onPageChange }) => {
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM INITIALIZED: Edge pipeline loaded',
    'WEIGHTS MOUNTED: VoiceSynthesis v4.2 in Caches',
    'PING STATS: Ready to process phonemes'
  ]);

  // Simulate streaming background telemetry logs for authentic terminal aesthetic
  useEffect(() => {
    const logEvents = [
      'TRANSCRIBE INDEX: Phoneme match buffer filled [12ms]',
      'INTENT MAP: Command mapped to /api/render [99.2% confidence]',
      'TTS PIPELINE: Stream synthesis initiated on GPU node 3',
      'BIOMETRICS: Voice fingerprint verify passed [45ms]',
      'CACHE CHECK: Local intent tree resolved completely',
      'SYS STATS: Port 3000 ingress channel stable',
      'AUDIO FRAME: WAVE packet synthesized on edge'
    ];

    const interval = setInterval(() => {
      const randomEvent = logEvents[Math.floor(Math.random() * logEvents.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [`[${timestamp}] ${randomEvent}`, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handlePartnerClick = () => {
    onPageChange('home');
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="space-y-24 pt-32 max-w-7xl mx-auto px-6 mb-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* 1. Header Title */}
      <section className="space-y-4 max-w-3xl">
        <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-semibold">
          R&amp;D AND APPLIED AI
        </span>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Cognitive Research Hub.
        </h1>
        <p className="font-sans text-neutral-400 text-sm leading-relaxed">
          Pioneering zero-latency acoustics, continuous frequency transformers, and context-preserving cognitive state directories designed specifically for conversational web interactions.
        </p>
      </section>

      {/* 2. Research Pillars Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Pillar 1: Zero-Latency Synthesis (Col Span 8) */}
        <div className="md:col-span-8 border border-neutral-900 bg-neutral-950 p-8 rounded-2xl flex flex-col justify-between group shadow-md hover:border-neutral-800/80 transition-all duration-300">
          <div className="space-y-6">
            <span className="font-sans text-[9px] tracking-wider text-indigo-500 uppercase font-bold">
              {RESEARCH_PILLARS[0].tag}
            </span>
            <h2 className="font-sans text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {RESEARCH_PILLARS[0].title}
            </h2>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-lg">
              {RESEARCH_PILLARS[0].description}
            </p>

            {/* Structured details list */}
            <ul className="space-y-2 text-[11px] text-neutral-500 font-sans pt-2 border-t border-neutral-900/50">
              {RESEARCH_PILLARS[0].details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* sound wave visual representation */}
          <div className="pt-8 flex items-center justify-between h-20 w-full overflow-hidden mt-6">
            <div className="flex gap-1.5 items-end h-full">
              {[35, 60, 20, 80, 45, 95, 30, 70, 40, 65, 10, 55, 30, 85, 50, 90, 25, 60, 40].map((val, idx) => (
                <div 
                  key={idx} 
                  className="w-1.5 bg-indigo-500/20 rounded-full animate-pulse shrink-0" 
                  style={{ 
                    height: `${val}%`, 
                    animationDelay: `${idx * 150}ms`,
                    animationDuration: '1.2s'
                  }}
                ></div>
              ))}
            </div>
            <button className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 p-3 rounded-full text-indigo-400 shrink-0 hover:scale-105 transition-transform flex items-center justify-center cursor-pointer">
              <Play size={14} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Live Terminal Sidebar (Col Span 4) */}
        <div className="md:col-span-4 border border-indigo-500/30 bg-neutral-950 p-6 rounded-2xl flex flex-col justify-between shadow-sm shadow-indigo-600/5 min-h-[350px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-wider text-neutral-400 font-bold uppercase">
                SYSTEM TELEMETRY
              </span>
              <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-[8px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                <span>EDGE CONNECTED</span>
              </div>
            </div>

            {/* Logs stream console */}
            <div className="bg-neutral-950 border border-neutral-900/80 rounded-xl p-4 font-mono text-[9px] text-indigo-300 leading-relaxed space-y-2.5 h-64 overflow-y-auto overflow-x-hidden shadow-inner custom-scrollbar">
              {logs.map((log, idx) => (
                <p 
                  key={idx} 
                  className={`truncate transition-all duration-300 ${
                    idx === 0 ? 'text-indigo-400 font-bold opacity-100' : 'text-neutral-500 opacity-80'
                  }`}
                >
                  {log}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-900 mt-4">
            <span className="font-mono text-[9px] text-neutral-600">Latency: 12ms</span>
            <span className="font-mono text-[9px] text-neutral-600">Accuracy: 99.8%</span>
          </div>
        </div>

        {/* Pillar 2: Transformer Vocal Networks (Col Span 6) */}
        <div className="md:col-span-6 border border-neutral-900 bg-neutral-950 rounded-2xl overflow-hidden shadow-md group hover:border-neutral-800/80 transition-all duration-300">
          <div className="h-48 bg-neutral-900 overflow-hidden relative border-b border-neutral-900 shrink-0">
            <img 
              src={RESEARCH_PILLARS[1].imageUrl} 
              alt={RESEARCH_PILLARS[1].title}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 font-sans text-[8px] bg-neutral-950/80 px-2.5 py-1 rounded text-indigo-400 uppercase tracking-wider border border-neutral-900 font-bold">
              {RESEARCH_PILLARS[1].tag}
            </span>
          </div>

          <div className="p-8 space-y-4">
            <h3 className="font-sans text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {RESEARCH_PILLARS[1].title}
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {RESEARCH_PILLARS[1].description}
            </p>
            <ul className="pt-2 space-y-1.5 text-[10px] text-neutral-500 font-sans border-t border-neutral-900/60">
              {RESEARCH_PILLARS[1].details.slice(0, 2).map((det, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-indigo-500 font-bold shrink-0">•</span>
                  <span>{det}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillar 3: Cognitive Intent Graph (Col Span 6) */}
        <div className="md:col-span-6 border border-neutral-900 bg-neutral-950 rounded-2xl overflow-hidden shadow-md group hover:border-neutral-800/80 transition-all duration-300">
          <div className="h-48 bg-neutral-900 overflow-hidden relative border-b border-neutral-900 shrink-0">
            <img 
              src={RESEARCH_PILLARS[2].imageUrl} 
              alt={RESEARCH_PILLARS[2].title}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-4 left-4 font-sans text-[8px] bg-neutral-950/80 px-2.5 py-1 rounded text-indigo-400 uppercase tracking-wider border border-neutral-900 font-bold">
              {RESEARCH_PILLARS[2].tag}
            </span>
          </div>

          <div className="p-8 space-y-4">
            <h3 className="font-sans text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {RESEARCH_PILLARS[2].title}
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {RESEARCH_PILLARS[2].description}
            </p>
            <ul className="pt-2 space-y-1.5 text-[10px] text-neutral-500 font-sans border-t border-neutral-900/60">
              {RESEARCH_PILLARS[2].details.slice(0, 2).map((det, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-indigo-500 font-bold shrink-0">•</span>
                  <span>{det}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>

      {/* 3. Performance Benchmarks Board */}
      <section className="space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-sans text-3xl font-extrabold text-white">
            Performance Benchmarks
          </h2>
          <p className="font-sans text-neutral-400 text-xs leading-relaxed">
            Comparative analysis of VoiceWebSEO models against industry standard state-of-the-art (SOTA) voice-synthesis layers.
          </p>
        </div>

        {/* Benchmarks Board Grid */}
        <div className="border border-neutral-900 bg-neutral-950 rounded-2xl overflow-x-auto shadow-md">
          <table className="w-full text-left border-collapse min-w-[600px] text-xs">
            <thead>
              <tr className="border-b border-neutral-900 bg-neutral-950">
                <th className="p-5 font-sans font-bold text-neutral-400 uppercase tracking-wider">SPECS / METRIC</th>
                <th className="p-5 font-sans font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/5">VoiceWebSEO Core</th>
                <th className="p-5 font-sans font-bold text-neutral-500 uppercase tracking-wider">Whisper SOTA</th>
                <th className="p-5 font-sans font-bold text-neutral-500 uppercase tracking-wider">Eleven Labs SOTA</th>
                <th className="p-5 font-sans font-bold text-neutral-500 uppercase tracking-wider">Industry Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60">
              {BENCHMARKS.map((bench) => (
                <tr key={bench.metric} className="hover:bg-neutral-900/20 transition-colors">
                  <td className="p-5 font-sans text-neutral-300 font-semibold">{bench.metric}</td>
                  <td className="p-5 font-mono text-indigo-400 font-bold bg-indigo-500/5">{bench.voiceWebSEO}</td>
                  <td className="p-5 font-mono text-neutral-500">{bench.whisperSOTA}</td>
                  <td className="p-5 font-mono text-neutral-500">{bench.elevenSOTA}</td>
                  <td className="p-5 font-mono text-neutral-500">{bench.industryAvg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Lab Feed CTA */}
      <section className="bg-neutral-950 rounded-3xl overflow-hidden relative border border-neutral-900 shadow-xl py-16">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="flex flex-col items-center text-center px-6 space-y-6">
          <div className="bg-indigo-600/10 p-4 rounded-full border border-indigo-500/20 text-indigo-400">
            <ShieldCheck size={28} />
          </div>
          <h3 className="font-sans text-2xl font-bold text-white max-w-lg leading-tight">
            Partner with VoiceWebSEO for your next core integration.
          </h3>
          <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
            Collaborate on embedding zero-latency conversational layers or robust WebRTC phonetic pathways directly into your existing system architecture.
          </p>
          <GradientButton
            onClick={handlePartnerClick}
            className="hover:scale-95 transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 font-sans font-bold"
          >
            Initiate Project
            <ArrowRight size={14} />
          </GradientButton>
        </div>
      </section>

    </div>
  );
};
