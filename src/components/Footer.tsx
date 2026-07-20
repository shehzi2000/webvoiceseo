import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { ActivePage } from '../types';
import { BIO } from '../data';

interface FooterProps {
  onPageChange: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const handleNavClick = (page: ActivePage) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 w-full py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Meta */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span 
            className="font-sans text-lg font-bold tracking-tight text-white cursor-pointer hover:text-indigo-400 transition-colors"
            onClick={() => handleNavClick('home')}
          >
            VoiceWeb<span className="text-indigo-500">SEO</span>
          </span>
          <p className="font-sans text-xs text-neutral-500">
            © 2024-2026 VoiceWebSEO. Precision in Code &amp; Voice.
          </p>
        </div>

        {/* Dynamic Page Switch Shortcuts */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <button 
            onClick={() => handleNavClick('projects')}
            className="font-sans text-xs tracking-wider uppercase font-medium text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button 
            onClick={() => handleNavClick('skills')}
            className="font-sans text-xs tracking-wider uppercase font-medium text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Technical Skills
          </button>
          <button 
            onClick={() => handleNavClick('research')}
            className="font-sans text-xs tracking-wider uppercase font-medium text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            AI Research
          </button>
          <button 
            onClick={() => handleNavClick('blog')}
            className="font-sans text-xs tracking-wider uppercase font-medium text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Insights Blog
          </button>
        </nav>

        {/* Contact Info & Socials */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4">
            <a 
              href={BIO.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center hover:bg-indigo-600/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all text-neutral-400"
              aria-label="GitHub Link"
            >
              <Github size={16} />
            </a>
            <a 
              href={BIO.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center hover:bg-indigo-600/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all text-neutral-400"
              aria-label="LinkedIn Link"
            >
              <Linkedin size={16} />
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <a href={`mailto:${BIO.email}`} className="hover:text-indigo-400 transition-colors flex items-center gap-1">
              <Mail size={12} /> {BIO.email}
            </a>
            <a href={`tel:${BIO.phone}`} className="hover:text-indigo-400 transition-colors flex items-center gap-1">
              <Phone size={12} /> {BIO.phone}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
