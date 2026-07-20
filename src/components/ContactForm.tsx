import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, Phone, Clock, Inbox, Trash2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { BIO } from '../data';
import { ContactMessage } from '../types';
import { GradientButton } from '@/components/ui/gradient-button';

export const ContactForm: React.FC = () => {
  // Form values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Form states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMode, setSubmitMode] = useState<'email' | 'text' | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Persistent inbox state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('voicewebseo_inquiries');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load inquiries', e);
    }
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Please write at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = (mode: 'email' | 'text') => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitMode(mode);

    // Simulate server pipeline turn delay (1.2 seconds)
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        fullName: fullName.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
      };

      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      try {
        localStorage.setItem('voicewebseo_inquiries', JSON.stringify(updatedMessages));
      } catch (err) {
        console.error('Storage quota exceeded', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger communication deep links
      const encodedSubject = encodeURIComponent(subject.trim());
      const encodedBody = encodeURIComponent(`Hi Shahid, this is ${fullName.trim()} (${email.trim()}):\n\n${message.trim()}`);
      
      if (mode === 'email') {
        window.location.href = `mailto:${BIO.email}?subject=${encodedSubject}&body=${encodedBody}`;
      } else {
        const cleanPhone = BIO.phone.replace(/[^0-9+]/g, ''); // e.g. "+923337960706"
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const separator = isIOS ? '&' : '?';
        window.location.href = `sms:${cleanPhone}${separator}body=${encodedBody}`;
      }
      
      // Reset fields
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Clear success notification after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setSubmitMode(null);
      }, 5000);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend('email');
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    try {
      localStorage.setItem('voicewebseo_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-20" id="contact-form">
      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Left Side: Copy and Meta */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
          {/* Developer / Assistant Portrait Card */}
          <div className="flex items-center gap-4 p-4 rounded-3xl border border-neutral-800/80 bg-neutral-900/10 backdrop-blur-md max-w-sm">
            <div className="relative shrink-0">
              <img 
                src={BIO.developerPortraitUrl} 
                alt={BIO.name} 
                className="w-16 h-16 rounded-2xl object-cover border border-neutral-800"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <p className="text-[10px] text-indigo-400 font-mono tracking-wider font-semibold">AI ASSISTANT ACTIVE</p>
              <h3 className="font-sans text-sm font-bold text-white">{BIO.name}</h3>
              <p className="text-[11px] text-neutral-400">Lead AI Architect &amp; Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-semibold">
              GET IN TOUCH
            </span>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white leading-tight">
              Let's Start a Conversation
            </h2>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-md">
              Harmonizing complex backend architectures with ethereal user experiences. Have a project or role that requires extreme precision? Reach out below and let's craft the future of technical interaction.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-900">
            {/* Contact Details */}
            <div className="flex items-center gap-4 text-sm text-neutral-300">
              <div className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-indigo-400">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">Email</p>
                <a href={`mailto:${BIO.email}`} className="hover:text-indigo-400 transition-colors">
                  {BIO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-300">
              <div className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-indigo-400">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">Phone</p>
                <a href={`tel:${BIO.phone}`} className="hover:text-indigo-400 transition-colors">
                  {BIO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-300">
              <div className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-indigo-400">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">Timezone</p>
                <p>{BIO.timezone} (Active Response Hours)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form and Inbox */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-neutral-800/80 bg-neutral-900/20 rounded-[2rem] p-8 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500"></div>

            {/* Success Animation Banner */}
            {isSuccess && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-start gap-3 animate-fade-in">
                <CheckCircle size={18} className="mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-400/80 mt-1">
                    Your inquiry has been processed and saved locally. You can view it in the local inbox dashboard below!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-wider text-neutral-400 ml-1 font-medium block">
                    Full Name
                  </label>
                  <input 
                    className={`w-full bg-neutral-950/50 border ${
                      errors.fullName ? 'border-red-500/40 focus:border-red-500' : 'border-neutral-800 focus:border-indigo-500'
                    } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all`} 
                    placeholder="John Doe" 
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                  />
                  {errors.fullName && <p className="text-xs text-red-400 mt-1 ml-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs uppercase tracking-wider text-neutral-400 ml-1 font-medium block">
                    Email Address
                  </label>
                  <input 
                    className={`w-full bg-neutral-950/50 border ${
                      errors.email ? 'border-red-500/40 focus:border-red-500' : 'border-neutral-800 focus:border-indigo-500'
                    } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all`} 
                    placeholder="john@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-wider text-neutral-400 ml-1 font-medium block">
                  Subject
                </label>
                <input 
                  className={`w-full bg-neutral-950/50 border ${
                    errors.subject ? 'border-red-500/40 focus:border-red-500' : 'border-neutral-800 focus:border-indigo-500'
                  } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all`} 
                  placeholder="Project Inquiry" 
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                  }}
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1 ml-1">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-wider text-neutral-400 ml-1 font-medium block">
                  Message
                </label>
                <textarea 
                  className={`w-full bg-neutral-950/50 border ${
                    errors.message ? 'border-red-500/40 focus:border-red-500' : 'border-neutral-800 focus:border-indigo-500'
                  } rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all`} 
                  placeholder="Tell me about your project or role details..." 
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                  }}
                ></textarea>
                {errors.message && <p className="text-xs text-red-400 mt-1 ml-1">{errors.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GradientButton 
                  type="button"
                  onClick={() => handleSend('email')}
                  className="cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-sans font-bold py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting && submitMode === 'email' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Dispatching Email...
                    </>
                  ) : (
                    <>
                      Email Me
                      <Mail size={14} />
                    </>
                  )}
                </GradientButton>

                <GradientButton 
                  type="button"
                  onClick={() => handleSend('text')}
                  variant="variant"
                  className="cursor-pointer text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-sans font-bold py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting && submitMode === 'text' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Preparing Text...
                    </>
                  ) : (
                    <>
                      Text Me in Mobile
                      <MessageSquare size={14} />
                    </>
                  )}
                </GradientButton>
              </div>
            </form>
          </div>

          {/* Inbox Feature for Prototyping Transparency */}
          <div className="border border-neutral-800 bg-neutral-950/30 rounded-2xl p-4 overflow-hidden shadow-md">
            <button
              onClick={() => setShowInbox(!showInbox)}
              className="w-full flex items-center justify-between text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-300 font-medium cursor-pointer p-1"
            >
              <div className="flex items-center gap-2">
                <Inbox size={14} className="text-indigo-500" />
                <span>Local Message Store ({messages.length})</span>
              </div>
              {showInbox ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showInbox && (
              <div className="mt-4 pt-4 border-t border-neutral-900 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {messages.length === 0 ? (
                  <p className="text-center py-6 text-xs text-neutral-600 font-mono">
                    Inbox is currently empty. Submit a form response to inspect local persistence!
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-900 relative group text-xs space-y-2 animate-fade-in"
                    >
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 transition-colors p-1"
                        aria-label="Delete message"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center justify-between max-w-[90%] flex-wrap gap-1">
                        <span className="font-bold text-neutral-200">{msg.fullName}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="text-neutral-500 font-mono text-[10px] select-all">{msg.email}</p>
                      <div className="pt-2 border-t border-neutral-900/60">
                        <p className="font-semibold text-neutral-300 mb-1">Sub: {msg.subject}</p>
                        <p className="text-neutral-400 whitespace-pre-wrap font-sans leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
