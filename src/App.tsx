import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConversationProvider } from '@elevenlabs/react';
import { ActivePage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { SkillsView } from './components/SkillsView';
import { ResearchView } from './components/ResearchView';
import { BlogView } from './components/BlogView';
import { VoiceAssistantWidget } from './components/VoiceAssistantWidget';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
  };

  const handlePostSelect = (postId: string | null) => {
    setActivePostId(postId);
  };

  // Resolve active view component
  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return <HomeView onPageChange={handlePageChange} />;
      case 'projects':
        return <ProjectsView onPageChange={handlePageChange} />;
      case 'skills':
        return <SkillsView />;
      case 'research':
        return <ResearchView onPageChange={handlePageChange} />;
      case 'blog':
      case 'blog-post':
        return (
          <BlogView
            activePage={activePage}
            activePostId={activePostId}
            onPageChange={handlePageChange}
            onPostSelect={handlePostSelect}
          />
        );
      default:
        return <HomeView onPageChange={handlePageChange} />;
    }
  };

  return (
    <ConversationProvider>
      <div className="bg-neutral-950 text-white min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-indigo-600 selection:text-white">
        {/* Decorative ambient background glows */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Main sticky header */}
        <Header activePage={activePage} onPageChange={handlePageChange} />

        {/* Active viewport slot with smooth AnimatePresence transition */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage + (activePage === 'blog-post' ? `-${activePostId}` : '')}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Shared visual footer */}
        <Footer onPageChange={handlePageChange} />

        {/* ElevenLabs Conversational Voice Agent integration */}
        <VoiceAssistantWidget />
      </div>
    </ConversationProvider>
  );
}
