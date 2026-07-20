import React, { useState, useEffect } from "react"
import { 
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroButton,
  HeroVideo 
 } from "@/components/ui/animated-video-on-scroll"

export const HeroVideoDemo = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [elevenlabsStatus, setElevenlabsStatus] = useState<string>('disconnected');
  const [elevenlabsSpeaking, setElevenlabsSpeaking] = useState<boolean>(false);
  const [elevenlabsListening, setElevenlabsListening] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const handleStatusChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setElevenlabsStatus(customEvent.detail.status);
        setElevenlabsSpeaking(customEvent.detail.isSpeaking);
        setElevenlabsListening(customEvent.detail.isListening);
      }
    };
    window.addEventListener('elevenlabs-status-change', handleStatusChange);
    return () => {
      window.removeEventListener('elevenlabs-status-change', handleStatusChange);
    };
  }, []);

  const speakGreeting = () => {
    if ('speechSynthesis' in window) {
      if (isTalking) {
        window.speechSynthesis.cancel();
        setIsTalking(false);
      } else {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(
          "Hello! I am Whobee, your interactive 3D robot assistant. Experience the convergence of low-latency voice models and fluid visual layers as you scroll and roll through our cognitive design architecture."
        );
        msg.onend = () => setIsTalking(false);
        msg.onerror = () => setIsTalking(false);
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.toLowerCase().includes('google') || 
           v.name.toLowerCase().includes('natural') || 
           v.name.toLowerCase().includes('zira') ||
           v.name.toLowerCase().includes('samantha') ||
           v.name.toLowerCase().includes('microsoft'))
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        if (preferredVoice) {
          msg.voice = preferredVoice;
        }
        msg.pitch = 1.15; // slightly higher pitch for a friendly, intelligent assistant
        msg.rate = 1.0;
        
        setIsTalking(true);
        window.speechSynthesis.speak(msg);
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

  return (
    <section className="relative w-full">
      <ContainerScroll className="h-[250vh]">
        <ContainerSticky
          style={{
            background:
              "radial-gradient(40% 40% at 50% 20%, #0e19ae 0%, #0b1387 22.92%, #080f67 42.71%, #030526 88.54%)", 
          }}
          className="bg-stone-900 px-6 py-10 text-slate-50 flex flex-col justify-center items-center overflow-hidden"
        >
          <ContainerAnimated className="space-y-4 text-center max-w-4xl mx-auto z-20">
            <h1 className="text-5xl font-medium tracking-tighter md:text-6xl text-white font-sans">
              Scroll &amp; Roll
            </h1>
            <p className="mx-auto max-w-[42ch] opacity-80 text-neutral-200 text-sm md:text-base">
              Experience the convergence of low-latency voice models and fluid visual layers as you scroll through our cognitive design architecture.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[450px] w-full max-w-4xl py-6 my-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-10 flex justify-center items-center bg-black/40">
            <HeroVideo
              src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              data-src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              className="rounded-xl object-cover w-full h-full max-h-[400px]"
            />
          </ContainerInset>
          
          <ContainerAnimated
            transition={{ delay: 0.4 }}
            outputRange={[-120, 0]}
            inputRange={[0, 0.7]}
            className="mx-auto mt-2 w-fit z-20 flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <HeroButton 
              onClick={() => {
                // Cancel local speech if active
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsTalking(false);
                }
                const event = new CustomEvent('trigger-voice-agent-toggle');
                window.dispatchEvent(event);
              }}
              className={`text-indigo-400 border-indigo-500 hover:border-indigo-400 font-sans text-xs uppercase tracking-widest px-6 py-3 transition-all ${
                elevenlabsStatus === 'connected' 
                  ? "bg-red-500/20 shadow-[0px_4px_32px_rgba(239,68,68,0.6)] border-red-500/50 hover:border-red-400 animate-pulse text-red-400" 
                  : elevenlabsStatus === 'connecting'
                  ? "bg-amber-500/20 shadow-[0px_4px_32px_rgba(245,158,11,0.6)] border-amber-500/50 text-amber-400 animate-pulse"
                  : "shadow-[0px_4px_24px_rgba(99,102,241,0.3)] hover:shadow-[0px_4px_32px_rgba(99,102,241,0.5)]"
              }`}
            >
              {elevenlabsStatus === 'connected' 
                ? (elevenlabsSpeaking ? "■ Stop (Speaking)" : elevenlabsListening ? "■ Stop (Listening...)" : "■ Stop AI Assistant")
                : elevenlabsStatus === 'connecting'
                ? "Connecting AI Assistant..."
                : "AI assistant talk to me"
              }
            </HeroButton>
            <HeroButton 
              onClick={() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[#84cc16] border-[#84cc16] hover:border-[#a3e635] shadow-[0px_4px_24px_rgba(132,204,22,0.3)] hover:shadow-[0px_4px_32px_rgba(132,204,22,0.5)] transition-all font-sans text-xs uppercase tracking-widest px-6 py-3"
            >
              Get Started
            </HeroButton>
          </ContainerAnimated>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  )
}
