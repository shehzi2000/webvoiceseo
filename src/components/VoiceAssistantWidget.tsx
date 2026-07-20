import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConversation } from '@elevenlabs/react';
import { 
  Mic, PhoneCall, Sparkles, X, MessageSquare, Volume2, VolumeX,
  Shield, AlertTriangle, Check, RefreshCw, HelpCircle, ArrowRight, Play, Square
} from 'lucide-react';

export const VoiceAssistantWidget: React.FC = () => {
  const [showIntroPanel, setShowIntroPanel] = useState(true);
  const [agentId, setAgentId] = useState('agent_3101kxvxr03yexm9spsz68q6e4dr');
  const [branchId, setBranchId] = useState('agtbrch_2801kxvxr2b2fvhvatyt0f8j9qtj');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [testId, setTestId] = useState('');
  const [testBranchId, setTestBranchId] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [connectionProtocol, setConnectionProtocol] = useState<'webrtc' | 'websocket'>('websocket');

  const isPermissionError = 
    errorMessage.toLowerCase().includes('permission') || 
    errorMessage.toLowerCase().includes('notallowed') || 
    errorMessage.toLowerCase().includes('denied') ||
    errorMessage.toLowerCase().includes('microphone') ||
    errorMessage.toLowerCase().includes('user media');

  // Instantiate ElevenLabs useConversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs connected!');
      setHasError(false);
      setErrorMessage('');
      setShowIntroPanel(true); // Open panel to show active session visualization
    },
    onDisconnect: () => {
      console.log('ElevenLabs disconnected');
    },
    onError: (err) => {
      console.error('ElevenLabs Error:', err);
      setHasError(true);
      
      let msg = '';
      if (typeof err === 'string') {
        msg = err;
      } else if (err instanceof Error) {
        msg = err.message;
      } else if (err && typeof err === 'object' && 'message' in err) {
        msg = (err as any).message;
      } else if (err && typeof err === 'object' && 'name' in err) {
        msg = (err as any).name;
      } else {
        msg = JSON.stringify(err);
      }
      
      if (!msg || msg === '{}') {
        msg = 'Permission denied (Microphone access blocked)';
      }
      
      setErrorMessage(msg);
      setShowIntroPanel(true); // Show troubleshooting guide on error

      // Auto fallback if WebRTC fails
      const isPcError = msg.toLowerCase().includes('pc connection') || 
                        msg.toLowerCase().includes('peer connection') ||
                        msg.toLowerCase().includes('ice') ||
                        msg.toLowerCase().includes('establish connection');
      if (isPcError && connectionProtocol === 'webrtc') {
        console.warn('WebRTC peer connection failed in hook error. Falling back default protocol to WebSocket.');
        setConnectionProtocol('websocket');
      }
    }
  });

  const { status, isSpeaking, isListening, startSession, endSession, isMuted, setMuted } = conversation;

  // Start ElevenLabs session
  const handleStartSession = async (overrideProtocol?: 'webrtc' | 'websocket') => {
    try {
      setHasError(false);
      setErrorMessage('');
      
      // Request microphone access explicitly to trigger permission popup if needed
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      let targetAgentId = agentId;
      if (branchId.trim()) {
        targetAgentId = `${agentId}&branch_id=${branchId.trim()}`;
      }

      const activeProtocol = overrideProtocol || connectionProtocol;
      console.log(`Starting ElevenLabs session using connection protocol: ${activeProtocol}`);

      await startSession({
        agentId: targetAgentId,
        // @ts-ignore
        connectionType: activeProtocol,
      });
    } catch (err: any) {
      console.error('Failed to start ElevenLabs session:', err);
      
      let msg = '';
      if (typeof err === 'string') {
        msg = err;
      } else if (err instanceof Error) {
        msg = err.message;
      } else if (err?.message) {
        msg = err.message;
      } else if (err?.name) {
        msg = err.name;
      } else {
        msg = JSON.stringify(err);
      }
      
      if (!msg || msg === '{}') {
        msg = 'Permission denied (Microphone access blocked)';
      }

      const isPcError = msg.toLowerCase().includes('pc connection') || 
                        msg.toLowerCase().includes('peer connection') ||
                        msg.toLowerCase().includes('ice') ||
                        msg.toLowerCase().includes('establish connection');

      const currentProtocol = overrideProtocol || connectionProtocol;
      if (isPcError && currentProtocol === 'webrtc') {
        console.warn('WebRTC peer connection failed on start. Retrying session automatically with WebSocket protocol...');
        setConnectionProtocol('websocket');
        await handleStartSession('websocket');
        return;
      }

      setHasError(true);
      setErrorMessage(msg);
      setShowIntroPanel(true);
    }
  };

  // End session
  const handleEndSession = async () => {
    try {
      await endSession();
    } catch (err) {
      console.error('Failed to end ElevenLabs session:', err);
    }
  };

  // Toggle call session
  const handleToggleSession = () => {
    if (status === 'connected') {
      handleEndSession();
    } else {
      handleStartSession();
    }
  };

  // Dispatch status changes to allow other UI buttons to reflect connection/talking states
  useEffect(() => {
    const event = new CustomEvent('elevenlabs-status-change', { 
      detail: { status, isSpeaking, isListening } 
    });
    window.dispatchEvent(event);
  }, [status, isSpeaking, isListening]);

  // Listen for trigger events from other components (e.g. Hero section)
  useEffect(() => {
    const handleExternalTrigger = () => {
      if (status !== 'connected') {
        handleStartSession();
      }
    };
    const handleExternalToggle = () => {
      handleToggleSession();
    };

    window.addEventListener('trigger-voice-agent-start', handleExternalTrigger);
    window.addEventListener('trigger-voice-agent-toggle', handleExternalToggle);
    return () => {
      window.removeEventListener('trigger-voice-agent-start', handleExternalTrigger);
      window.removeEventListener('trigger-voice-agent-toggle', handleExternalToggle);
    };
  }, [status, agentId, connectionProtocol, branchId]);

  const handleApplyCustomId = (e: React.FormEvent) => {
    e.preventDefault();
    if (testId.trim()) {
      setAgentId(testId.trim());
    }
    setBranchId(testBranchId.trim());
    setHasError(false);
    setErrorMessage('');
  };

  const handleResetDefault = () => {
    setAgentId('agent_3101kxvxr03yexm9spsz68q6e4dr');
    setBranchId('agtbrch_2801kxvxr2b2fvhvatyt0f8j9qtj');
    setTestId('');
    setTestBranchId('');
    setHasError(false);
    setErrorMessage('');
  };

  // Determine helper status texts
  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting to Shahid\'s Voice Twin...';
      case 'connected':
        if (isSpeaking) return 'Voice Twin is speaking...';
        if (isListening) return 'Listening to you...';
        return 'Connected (Idle)';
      default:
        return 'Offline';
    }
  };

  return (
    <>
      {/* Floating Action Button - Pulsing Voice Console Controller */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {status === 'connected' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="flex items-center gap-2 bg-neutral-900/90 border border-indigo-500/30 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl"
            >
              <button
                onClick={() => setMuted(!isMuted)}
                className={`p-1.5 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'} cursor-pointer`}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {isMuted ? 'Muted' : 'Mic Live'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="elevenlabs-voice-trigger-btn"
          onClick={handleToggleSession}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 border-none outline-none cursor-pointer group ${
            status === 'connected' 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : status === 'connecting'
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
          title={status === 'connected' ? 'Disconnect Voice Agent' : 'Start Live Voice AI Chat'}
        >
          {/* Animated Pulsing Outer Waves */}
          {status === 'connected' && (
            <>
              <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></span>
              <span className="absolute -inset-2 rounded-full bg-red-500/10 animate-pulse"></span>
            </>
          )}
          {status === 'disconnected' && (
            <>
              <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping group-hover:scale-110 transition-transform"></span>
              <span className="absolute -inset-1.5 rounded-full bg-indigo-500/10 animate-pulse"></span>
            </>
          )}

          {/* Icon state toggle */}
          {status === 'connected' ? (
            <X size={20} className="relative z-10 animate-spin-once" />
          ) : status === 'connecting' ? (
            <RefreshCw size={20} className="relative z-10 animate-spin" />
          ) : (
            <Mic size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Main Info, Waveform Visualization, and Troubleshooting Panel */}
      <AnimatePresence>
        {showIntroPanel && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-40 w-[320px] md:w-[360px] bg-neutral-900/95 border border-indigo-500/30 text-white rounded-3xl p-6 shadow-2xl backdrop-blur-md overflow-hidden"
          >
            {/* Ambient Purple Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    hasError ? 'bg-amber-400' : status === 'connected' ? 'bg-emerald-400' : 'bg-indigo-400'
                  } opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${
                    hasError ? 'bg-amber-500' : status === 'connected' ? 'bg-emerald-500' : 'bg-indigo-500'
                  }`}></span>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-400 flex items-center gap-1 font-mono">
                  <Sparkles size={10} /> {status === 'connected' ? 'Session Live' : hasError ? 'Connection Check' : 'Conversational Voice'}
                </span>
              </div>
              <button
                onClick={() => setShowIntroPanel(false)}
                className="text-neutral-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
                title="Minimize panel"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 relative z-10">
              {!hasError && status === 'disconnected' && (
                <>
                  <h4 className="text-base font-sans font-extrabold tracking-tight text-white">
                    Speak with Shahid's AI Twin
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Start a real-time verbal conversation with Shahid's custom-trained voice clone. Ask about his portfolio, skill stack, or AI research!
                  </p>
                  
                  <button
                    onClick={handleStartSession}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs font-bold font-sans tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    <PhoneCall size={14} /> Start Voice Chat
                  </button>
                </>
              )}

              {/* Connecting or Connected State */}
              {!hasError && status !== 'disconnected' && (
                <div className="space-y-4 py-2">
                  <div className="text-center">
                    <p className="text-xs font-mono font-bold text-indigo-400 animate-pulse">
                      {getStatusText()}
                    </p>
                  </div>

                  {/* Real-time soundwave visualizer simulator */}
                  <div className="flex items-center justify-center gap-1.5 h-12 py-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => {
                      // Determine amplitude based on status & speech
                      let animationClass = 'h-1.5';
                      if (status === 'connected') {
                        if (isSpeaking) {
                          // Highly active voice twin waves
                          animationClass = bar % 2 === 0 ? 'animate-[wave-bar_0.6s_ease-in-out_infinite] h-8' : 'animate-[wave-bar_0.8s_ease-in-out_infinite] h-10';
                        } else if (isListening) {
                          // Gentle listening state waves
                          animationClass = bar % 3 === 0 ? 'animate-[wave-bar_1.2s_ease-in-out_infinite] h-5' : 'animate-[wave-bar_1.5s_ease-in-out_infinite] h-3';
                        } else {
                          // Idle breathing wave
                          animationClass = 'animate-[pulse_2s_infinite] h-2.5';
                        }
                      } else if (status === 'connecting') {
                        // Fast syncing ripples
                        animationClass = 'animate-[pulse_0.8s_infinite] h-4';
                      }
                      return (
                        <div
                          key={bar}
                          className={`w-1 bg-gradient-to-t from-indigo-500 to-violet-400 rounded-full transition-all duration-300`}
                          style={{
                            height: status === 'connected' ? undefined : undefined,
                            animationDelay: `${bar * 0.1}s`
                          }}
                        >
                          <div className={`w-full h-full bg-indigo-400 rounded-full ${animationClass}`}></div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-3.5 text-center text-xs text-neutral-400 leading-relaxed font-sans">
                    {status === 'connecting' ? (
                      'Establishing voice stream over WebRTC. Please authorize your microphone if prompted...'
                    ) : (
                      'You are now talking to Shahid Saeed\'s custom digital voice clone. Start speaking normally!'
                    )}
                  </div>

                  <button
                    onClick={handleEndSession}
                    className="w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 py-2.5 px-4 rounded-xl text-xs font-bold font-sans tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Square size={12} fill="currentColor" /> Disconnect Agent
                  </button>
                </div>
              )}

              {/* Error Troubleshooting Panel */}
              {hasError && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 text-xs text-amber-200">
                    <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 w-full">
                      <p className="font-bold font-sans">
                        {isPermissionError ? 'Microphone Access Denied' : 'Connection / Config Alert'}
                      </p>
                      <p className="text-[11px] text-neutral-300 leading-relaxed break-words">
                        {errorMessage || `ElevenLabs failed to fetch config for ${agentId}.`}
                      </p>
                    </div>
                  </div>

                  {isPermissionError ? (
                    <div className="text-[11px] text-neutral-400 space-y-3 font-sans leading-relaxed border-b border-white/5 pb-3">
                      <p className="font-bold text-neutral-200">How to Allow Microphone Permission:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-[11.5px]">
                        <li>
                          <strong>Allow browser popup:</strong> When prompted, click <span className="text-emerald-400 font-semibold">"Allow"</span> for microphone access.
                        </li>
                        <li>
                          <strong>Check address bar:</strong> Look for a microphone or block icon in your browser address bar (often on the left near the lock icon), click it, and grant permission.
                        </li>
                        <li>
                          <strong>Sandbox / Iframe Protection:</strong> Since the application is running inside an AI Studio iframe, some browsers prevent microphone access. Open the app in a standalone tab!
                        </li>
                      </ul>
                      
                      <div className="pt-1.5">
                        <a
                          href={window.location.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-sans py-2 px-3 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 text-center shadow-lg shadow-indigo-600/20"
                        >
                          <PhoneCall size={13} /> Open App in Standalone Tab
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-neutral-400 space-y-2 font-sans leading-relaxed border-b border-white/5 pb-3">
                      <p className="font-bold text-neutral-200">How to Fix on ElevenLabs:</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Log in to your <strong>ElevenLabs Dashboard</strong>.</li>
                        <li>Go to <strong>Conversational AI</strong> &rarr; Select your agent.</li>
                        <li>In the <strong>Widget/Embed Settings</strong>, toggle the access to <strong>Public</strong> (Private agents cannot be accessed publicly without authorization).</li>
                        <li>Whitelisted domains: Ensure restrictions don't block <code>{window.location.hostname}</code>.</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Expandable Advanced Config section */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <button
                  type="button"
                  onClick={() => setShowConfig(!showConfig)}
                  className="w-full flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-mono hover:text-white transition-colors cursor-pointer py-1"
                >
                  <span className="flex items-center gap-1">
                    <HelpCircle size={10} /> Advanced Config Settings
                  </span>
                  <span>{showConfig ? 'Hide ▲' : 'Show ▼'}</span>
                </button>
                
                {showConfig && (
                  <div className="pt-2 space-y-3">
                    <div className="bg-neutral-950/40 p-2.5 border border-neutral-800 rounded-xl space-y-1 text-[10px] font-mono text-neutral-400 leading-normal">
                      <p className="font-bold text-neutral-300">Active Profile Configuration:</p>
                      <p className="truncate">Agent ID: <span className="text-indigo-400">{agentId}</span></p>
                      {branchId && <p className="truncate">Branch ID: <span className="text-violet-400">{branchId}</span></p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono block font-bold">
                        Connection Protocol:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setConnectionProtocol('websocket')}
                          className={`py-1 px-2 text-[10px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                            connectionProtocol === 'websocket'
                              ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          WebSocket (Stable)
                        </button>
                        <button
                          type="button"
                          onClick={() => setConnectionProtocol('webrtc')}
                          className={`py-1 px-2 text-[10px] font-medium rounded-lg border text-center transition-all cursor-pointer ${
                            connectionProtocol === 'webrtc'
                              ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          WebRTC (Low Latency)
                        </button>
                      </div>
                      <p className="text-[9px] text-neutral-500 font-sans leading-tight mt-1">
                        {connectionProtocol === 'websocket'
                          ? 'Using stable secure WebSockets. Ideal for secure sandbox environments, iframes, and strict firewalls.'
                          : 'Direct peer-to-peer. Low latency but can be blocked by strict firewalls, NATs, or sandboxed iframes.'}
                      </p>
                    </div>

                    <form onSubmit={handleApplyCustomId} className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono block font-bold">
                          Test custom Agent ID:
                        </label>
                        <input
                          type="text"
                          value={testId}
                          onChange={(e) => setTestId(e.target.value)}
                          placeholder={agentId}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono block font-bold">
                          Test custom Branch ID:
                        </label>
                        <input
                          type="text"
                          value={testBranchId}
                          onChange={(e) => setTestBranchId(e.target.value)}
                          placeholder={branchId || 'e.g. agtbrch_...'}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-grow bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg py-1.5 px-3 text-xs font-bold font-sans tracking-wider uppercase cursor-pointer transition-colors flex items-center justify-center gap-1"
                        >
                          Apply <ArrowRight size={12} />
                        </button>
                        {(agentId !== 'agent_3101kxvxr03yexm9spsz68q6e4dr' || branchId !== 'agtbrch_2801kxvxr2b2fvhvatyt0f8j9qtj') && (
                          <button
                            type="button"
                            onClick={handleResetDefault}
                            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg py-1.5 px-3 text-xs font-bold font-sans tracking-wider uppercase cursor-pointer transition-colors"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Hint / Call to Action Footer */}
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono relative z-10">
              <span className="flex items-center gap-1">
                <Volume2 size={12} className="text-indigo-400" /> Stereo Audio AI
              </span>
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-emerald-400" /> SECURE CONVERSATION
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
