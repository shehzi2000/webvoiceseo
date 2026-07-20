import React, { useState } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { ActivePage } from '../types';
import { BIO } from '../data';

interface HeaderProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: ActivePage }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Projects', value: 'projects' },
    { label: 'Technical Skills', value: 'skills' },
    { label: 'AI Research', value: 'research' },
    { label: 'Blog', value: 'blog' },
  ];

  const handleNavClick = (page: ActivePage) => {
    onPageChange(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl border-b border-neutral-800/50 shadow-sm shadow-primary/5">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Brand Logo & Avatar */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-full border border-indigo-500/30 overflow-hidden bg-neutral-900 group-hover:border-indigo-500 transition-all duration-300">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              src={BIO.avatarUrl} 
              alt={BIO.name}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-400">
            VoiceWeb<span className="text-indigo-500">SEO</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`font-sans text-xs tracking-wider uppercase font-medium transition-all duration-300 hover:text-indigo-400 cursor-pointer ${
                activePage === item.value || (item.value === 'blog' && activePage === 'blog-post')
                  ? 'text-indigo-500 font-semibold'
                  : 'text-neutral-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Action & Socials */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href={BIO.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-indigo-400 transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a 
            href={BIO.linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-indigo-400 transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-indigo-500 hover:text-indigo-400 transition-colors p-1 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-950/95 border-b border-neutral-800 shadow-xl flex flex-col px-6 py-6 gap-6 animate-fade-in z-50">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-left text-sm tracking-wider uppercase font-medium py-2 border-b border-neutral-900/50 transition-colors cursor-pointer ${
                  activePage === item.value || (item.value === 'blog' && activePage === 'blog-post')
                    ? 'text-indigo-500 font-semibold'
                    : 'text-neutral-400 hover:text-indigo-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-center pt-2">
            <div className="flex gap-4">
              <a 
                href={BIO.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-indigo-400 transition-colors p-2"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href={BIO.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-indigo-400 transition-colors p-2"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
