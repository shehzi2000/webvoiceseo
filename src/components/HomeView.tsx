import React from 'react';
import { ArrowRight, Download, Code, Mic, Terminal, Brain, ArrowUpRight } from 'lucide-react';
import { ActivePage } from '../types';
import { BIO } from '../data';
import { ContactForm } from './ContactForm';
import { HeroVideoDemo } from './HeroVideoDemo';
import { SplineScene } from '@/components/ui/splite';
import { SplineSceneBasic } from '@/components/ui/demo';
import { GradientButton } from '@/components/ui/gradient-button';

interface HomeViewProps {
  onPageChange: (page: ActivePage) => void;
}

const getSliderColor = (pos: number) => {
  // Interpolates between Indigo (hue 250) -> Pink/Rose (hue 330) -> Emerald/Teal (hue 150)
  let hue = 250;
  if (pos <= 50) {
    hue = 250 + (pos / 50) * 80; // 250 to 330
  } else {
    hue = 330 - ((pos - 50) / 50) * 180; // 330 to 150
    if (hue < 0) hue += 360;
  }
  return `hsl(${hue}, 85%, 60%)`;
};

export const HomeView: React.FC<HomeViewProps> = ({ onPageChange }) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [sliderPos, setSliderPos] = React.useState(55);
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onSliderMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const onSliderTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  React.useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        window.speechSynthesis.cancel(); // clear previous
        const utterance = new SpeechSynthesisUtterance(
          "Hello! I am Shahid Saeed, Lead AI Architect at VoiceWebSEO. Welcome to my cognitive and full-stack portfolio, where we design fluid intelligence with visual precision."
        );
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
        };
        
        // Pick a male English voice if available, with a baritone pitch configuration
        const voices = window.speechSynthesis.getVoices();
        const preferredMaleVoice = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.toLowerCase().includes('male') || 
           v.name.toLowerCase().includes('david') || 
           v.name.toLowerCase().includes('mark') || 
           v.name.toLowerCase().includes('george') || 
           v.name.toLowerCase().includes('guy') || 
           v.name.toLowerCase().includes('natural') || 
           (v.name.toLowerCase().includes('google us english') && !v.name.toLowerCase().includes('female')))
        ) || 
        voices.find(v => v.lang.includes('en-US')) || 
        voices.find(v => v.lang.startsWith('en')) || 
        voices[0];

        if (preferredMaleVoice) {
          utterance.voice = preferredMaleVoice;
        }
        
        // Pitch slightly lowered to guarantee a warm masculine tone/baritone sound if fallback
        utterance.pitch = 0.90; 
        utterance.rate = 0.95; // slightly slower for professional and clear cadence
        
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      const overlay = document.createElement('div');
      overlay.className = 'fixed bottom-6 right-6 z-50 bg-neutral-900 border border-red-500/30 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in';
      overlay.innerHTML = `
        <div class="text-xs">
          <p class="font-bold">Audio Synthesis Unavailable</p>
          <p class="text-neutral-400 mt-0.5">Your browser doesn't support the Speech Synthesis API.</p>
        </div>
      `;
      document.body.appendChild(overlay);
      setTimeout(() => overlay.remove(), 4000);
    }
  };

  const handleDownloadDossier = () => {
    // Simulated dossier download
    const overlay = document.createElement('div');
    overlay.className = 'fixed bottom-6 right-6 z-50 bg-neutral-900 border border-indigo-500/30 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in';
    overlay.innerHTML = `
      <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      <div class="text-xs">
        <p class="font-bold">Dossier Synced</p>
        <p class="text-neutral-400 mt-0.5">Shahid_Saeed_Architect_Dossier.pdf downloaded</p>
      </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => overlay.remove(), 500);
    }, 4000);
  };

  return (
    <div className="space-y-24 pt-32">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 relative">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-12 w-80 h-80 bg-violet-600/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-8 relative z-10">
            <div className="flex items-center gap-3 border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-indigo-400">
                Active Voice AI Research
              </span>
            </div>

            <h1 className="font-sans text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Engineering <span className="italic text-indigo-400 font-serif">Fluid</span> Intelligence &amp; Visual Precision.
            </h1>

            <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl">
              A Senior Full-Stack Developer at <span className="text-white font-medium">VoiceWebSEO</span> specialized in architecting immersive Voice AI systems and high-performance web applications that bridge the gap between human intuition and machine logic.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <GradientButton
                onClick={() => onPageChange('projects')}
                className="hover:scale-95 transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest flex items-center gap-2 font-sans font-bold py-3.5 px-6 min-w-[150px]"
              >
                Explore Ecosystem
                <ArrowRight size={14} />
              </GradientButton>
              <GradientButton
                onClick={() => {
                  const event = new CustomEvent('trigger-voice-agent-start');
                  window.dispatchEvent(event);
                }}
                className="hover:scale-95 transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest flex items-center gap-2 font-sans font-bold py-3.5 px-6 min-w-[150px] relative overflow-hidden bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200"
              >
                <Mic size={14} className="animate-pulse text-indigo-400" />
                Speak with AI Twin
              </GradientButton>
              <GradientButton
                variant="variant"
                onClick={handleDownloadDossier}
                className="hover:scale-95 transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest flex items-center gap-2 font-sans font-bold py-3.5 px-6 min-w-[150px]"
              >
                Download Dossier
                <Download size={14} />
              </GradientButton>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            <div 
              ref={sliderRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                handleSliderMove(e.clientX);
              }}
              onMouseMove={onSliderMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchMove={onSliderTouchMove}
              className="relative w-full max-w-[360px] h-[480px] md:h-[520px] rounded-[2rem] overflow-hidden border border-neutral-900 bg-neutral-950 shadow-2xl group transition-all duration-500 hover:border-indigo-500/30 cursor-ew-resize select-none"
            >
              
              {/* --- LEFT (BEFORE): MONOCHROME --- */}
              <div className="absolute inset-0 bg-neutral-950">
                <img 
                  className="w-full h-full object-cover select-none pointer-events-none filter grayscale contrast-125 brightness-[0.75]" 
                  src={BIO.developerPortraitUrl} 
                  alt="Shahid Saeed Monochrome"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"></div>
                
                {/* Labeled BEFORE */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-[10px] font-sans font-black tracking-widest text-white/70 uppercase bg-neutral-950/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    MONOCHROME
                  </span>
                </div>

                {/* Label at bottom-left */}
                <div className="absolute bottom-6 left-6 z-10 flex items-center gap-1.5 text-white/50 font-mono text-[9px] tracking-wider uppercase font-semibold bg-neutral-950/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                  MONOCHROME PORTRAIT
                </div>
              </div>

              {/* --- RIGHT (AFTER): VIVID COLOR --- */}
              <div 
                className="absolute inset-0 bg-neutral-950 transition-all duration-75 overflow-hidden"
                style={{
                  clipPath: `polygon(${(sliderPos + 3)}% 0%, 100% 0%, 100% 100%, ${(sliderPos - 3)}% 100%)`
                }}
              >
                <img 
                  className="w-full h-full object-cover select-none pointer-events-none filter saturate-[1.25] contrast-[1.05]" 
                  src={BIO.developerPortraitUrl} 
                  alt="Shahid Saeed Vivid"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"></div>

                {/* Labeled AFTER */}
                <div className="absolute top-6 right-16 z-10">
                  <span className="text-[10px] font-sans font-black tracking-widest text-indigo-400 uppercase bg-neutral-950/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-indigo-500/20">
                    VIVID SPECTRUM
                  </span>
                </div>

                {/* Label at bottom-right */}
                <div className="absolute bottom-6 right-6 z-10 flex items-center gap-1.5 text-indigo-300 font-mono text-[9px] tracking-wider uppercase font-semibold bg-neutral-950/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  VIVID RECONSTRUCTION
                </div>
              </div>

              {/* --- SPLIT SLIDER DIVIDER LINE --- */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <line 
                  x1={`${sliderPos + 3}%`} 
                  y1="0%" 
                  x2={`${sliderPos - 3}%`} 
                  y2="100%" 
                  style={{ stroke: getSliderColor(sliderPos) }}
                  className="stroke-[2.5]" 
                />
              </svg>

              {/* --- DRAGGABLE HANDLE BUTTON --- */}
              <div 
                className="absolute z-20 top-1/2 -translate-y-1/2 -translate-x-1/2 select-none pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div 
                  style={{ backgroundColor: getSliderColor(sliderPos) }}
                  className="text-white px-2.5 py-1.5 rounded-full shadow-lg border border-white flex items-center justify-center gap-1 scale-90 group-hover:scale-95 transition-transform duration-300"
                >
                  <span className="text-[8px] font-mono font-bold tracking-widest uppercase">
                    DRAG
                  </span>
                </div>
              </div>

              {/* Interactive Audio/EQ Badge at top-right of the card */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSpeech();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                title={isSpeaking ? "Click to mute voice introduction" : "Click to play voice introduction"}
                className="absolute top-0 right-0 bg-indigo-600 text-white pl-5 pr-4 h-12 rounded-bl-3xl shadow-xl z-20 flex items-center gap-2.5 hover:bg-indigo-500 transition-all duration-300 active:scale-95 group/eq border-none outline-none cursor-pointer"
              >
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-white/90">
                  Introduction
                </span>
                <div className="flex items-end gap-[3px] h-4">
                  <div className={`w-[3px] bg-white rounded-full transition-all duration-300 animate-wave-bar ${isSpeaking ? 'h-4 animate-wave-1' : 'h-1.5'}`}></div>
                  <div className={`w-[3px] bg-white rounded-full transition-all duration-300 animate-wave-bar ${isSpeaking ? 'h-4 animate-wave-2' : 'h-3'}`}></div>
                  <div className={`w-[3px] bg-white rounded-full transition-all duration-300 animate-wave-bar ${isSpeaking ? 'h-4 animate-wave-3' : 'h-2'}`}></div>
                  <div className={`w-[3px] bg-white rounded-full transition-all duration-300 animate-wave-bar ${isSpeaking ? 'h-4 animate-wave-4' : 'h-4'}`}></div>
                  <div className={`w-[3px] bg-white rounded-full transition-all duration-300 animate-wave-bar ${isSpeaking ? 'h-4 animate-wave-5' : 'h-1.5'}`}></div>
                </div>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Solutions Grid (Bento Style) */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="projects">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-semibold">
              PRACTICE AREAS
            </span>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white">
              Technical Pillars
            </h2>
          </div>
          <p className="font-sans text-neutral-400 text-sm max-w-sm md:text-right leading-relaxed">
            Harmonizing complex backend architectures with ethereal user experiences at VoiceWebSEO.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Web Development (Col span 2) */}
          <div className="md:col-span-2 border border-neutral-900 bg-neutral-950 p-10 rounded-[2rem] flex flex-col justify-between group overflow-hidden relative shadow-md hover:border-neutral-800/80 transition-all duration-300">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 space-y-4">
              <span className="font-sans text-[10px] tracking-widest uppercase text-indigo-500 font-semibold block">
                CORE ARCHITECTURE
              </span>
              <h3 className="font-sans text-2xl font-bold text-white">
                Web Development
              </h3>
              <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
                Scalable React/Next.js applications optimized for fluid interactions, page-state cache mechanics, dynamic rendering pipelines, and modular UI patterns.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-8 relative z-10">
              <span className="px-3.5 py-1.5 bg-neutral-900 rounded-full font-mono text-[10px] text-neutral-400 border border-neutral-800">
                TYPESCRIPT
              </span>
              <span className="px-3.5 py-1.5 bg-neutral-900 rounded-full font-mono text-[10px] text-neutral-400 border border-neutral-800">
                WEBGL
              </span>
              <span className="px-3.5 py-1.5 bg-neutral-900 rounded-full font-mono text-[10px] text-neutral-400 border border-neutral-800">
                RECHARTS / D3
              </span>
            </div>

            <div className="absolute -right-8 -bottom-8 w-64 h-64 md:w-72 md:h-72 opacity-40 group-hover:opacity-100 transition-all duration-500 z-0 pointer-events-auto select-none rounded-[1.5rem] overflow-hidden bg-black/20">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                className="w-full h-full scale-[1.1]"
              />
            </div>
          </div>

          {/* Card 2: Voice AI Solutions (Primary Highlight Color) */}
          <div className="bg-indigo-600 p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden relative shadow-lg shadow-indigo-600/10 group hover:scale-[1.01] transition-transform duration-300 cursor-pointer" onClick={() => onPageChange('research')}>
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-[50px]"></div>
            
            <div className="relative z-10 space-y-4">
              <span className="font-sans text-[10px] tracking-widest uppercase text-indigo-200 font-semibold block">
                NEXT GENERATION
              </span>
              <h3 className="font-sans text-2xl font-bold text-white">
                Voice AI Solutions
              </h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                LLM-integrated voice synthesis engines with organic human-cadence modeling, acoustic vector indexing, and ultra-low conversational latency.
              </p>
            </div>

            <div className="flex justify-between items-center pt-8 relative z-10">
              <span className="text-xs text-indigo-200 uppercase font-semibold tracking-wider flex items-center gap-1">
                Explore Lab <ArrowRight size={12} />
              </span>
              <div className="bg-white text-indigo-600 w-11 h-11 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Mic size={18} />
              </div>
            </div>
          </div>

          {/* Card 3: Infrastructure */}
          <div className="border border-neutral-900 bg-neutral-950 p-10 rounded-[2rem] flex flex-col justify-between group overflow-hidden relative shadow-md hover:border-neutral-800/80 transition-all duration-300">
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px]"></div>
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center border border-neutral-800">
                <Terminal size={20} className="text-indigo-500" />
              </div>
              <h3 className="font-sans text-xl font-bold text-white">
                Infrastructure
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Edge-computing, Docker orchestration, and AWS Lambda deployments optimized for high concurrent voice channel routing.
              </p>
            </div>
          </div>

          {/* Card 4: Cognitive Systems (Col span 2) */}
          <div className="md:col-span-2 border border-neutral-900 bg-neutral-950 p-10 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group cursor-pointer hover:border-neutral-800/80 transition-colors duration-300" onClick={() => onPageChange('skills')}>
            <div className="flex-1 space-y-4">
              <span className="font-sans text-[10px] tracking-widest uppercase text-neutral-500 font-semibold block">
                ACTIVE EXPLORATION
              </span>
              <h3 className="font-sans text-2xl font-bold text-white">
                Cognitive Systems
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                Refining transformer topologies to decode continuous multi-speaker phonetic signals, intent matching, and custom voice print biometrics.
              </p>
            </div>

            <div className="w-24 h-24 rounded-full border-2 border-dashed border-indigo-500/20 flex items-center justify-center animate-[spin_20s_linear_infinite] shrink-0 self-center">
              <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-indigo-400 shadow-md">
                <Brain size={24} className="animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Video On Scroll Section */}
      <HeroVideoDemo />

      {/* Interactive 3D Spline Spotlight Section */}
      <section className="max-w-7xl mx-auto px-6 my-16">
        <SplineSceneBasic />
      </section>

      {/* 3. Capability Ticker (Marquee Effect) */}
      <div className="bg-neutral-950 py-8 overflow-hidden border-y border-neutral-900 w-full relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        
        {/* Infinite Scrolling Ticker */}
        <div className="flex whitespace-nowrap gap-12 items-center animate-[marquee_25s_linear_infinite] select-none">
          {Array(4).fill([
            { text: 'VOICEWEBSEO PRECISION', color: 'indigo-500' },
            { text: 'NEURAL SYNTHESIS', color: 'indigo-500' },
            { text: 'IMMERSIVE UI', color: 'indigo-500' },
            { text: 'ZERO LATENCY ARCHITECTURE', color: 'indigo-500' }
          ]).flat().map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 shrink-0">
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-neutral-500">
                {item.text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Contact/CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="contact">
        <div className="border border-neutral-900 bg-neutral-950 p-12 md:p-20 rounded-[3rem] text-center space-y-8 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-3 border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 rounded-full w-fit mx-auto relative z-10">
            <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-indigo-400">
              AVAILABLE FOR ENGAGEMENTS
            </span>
          </div>

          <h2 className="font-sans text-4xl md:text-5xl font-black text-white leading-tight max-w-3xl mx-auto relative z-10">
            Let's build the future of technical interaction.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <GradientButton
              asChild
              className="hover:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer text-xs uppercase tracking-widest px-8 py-4 font-sans font-bold"
            >
              <a 
                href="#contact-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Initiate Connection
                <ArrowRight size={14} />
              </a>
            </GradientButton>
            <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-5 py-4 rounded-2xl text-xs text-neutral-400 font-mono">
              <span className="material-symbols-outlined text-indigo-500 text-sm">schedule</span>
              <span>Timezone: Islamabad, Pakistan (GMT+5)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Form Section */}
      <ContactForm />

    </div>
  );
};
