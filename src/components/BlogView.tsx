import React from 'react';
import { ArrowLeft, Clock, Calendar, ChevronRight, User, ExternalLink, Bookmark } from 'lucide-react';
import { ActivePage, BlogPost } from '../types';
import { BLOG_POSTS, BIO } from '../data';

interface BlogViewProps {
  activePage: ActivePage;
  activePostId: string | null;
  onPageChange: (page: ActivePage) => void;
  onPostSelect: (postId: string | null) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  activePage,
  activePostId,
  onPageChange,
  onPostSelect
}) => {
  const handlePostClick = (postId: string) => {
    onPostSelect(postId);
    onPageChange('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    onPostSelect(null);
    onPageChange('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find the selected post
  const currentPost = BLOG_POSTS.find((post) => post.id === activePostId) || BLOG_POSTS[0];

  // BLOG LISTING RENDER
  if (activePage === 'blog') {
    return (
      <div className="space-y-16 pt-32 max-w-7xl mx-auto px-6 mb-20">
        
        {/* Blog Header */}
        <div className="max-w-2xl space-y-4">
          <span className="font-sans text-xs tracking-widest text-indigo-500 uppercase font-semibold">
            TECHNICAL JOURNAL
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white animate-fade-in">
            Voice AI Insights.
          </h1>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed">
            Technical documentation, essays, and trend analysis on neural auditory synthesis, local intent matching, and conversational search protocols.
          </p>
        </div>

        {/* Featured Card (Post 1: SEO in the Age of Voice) */}
        <div 
          onClick={() => handlePostClick(BLOG_POSTS[0].id)}
          className="border border-neutral-900 bg-neutral-950/40 rounded-3xl overflow-hidden grid lg:grid-cols-12 gap-8 group cursor-pointer hover:border-neutral-800/80 transition-all duration-300 shadow-xl backdrop-blur-sm"
        >
          {/* Hero thumbnail */}
          <div className="lg:col-span-7 h-72 lg:h-96 bg-neutral-900 overflow-hidden relative shrink-0">
            <img 
              src={BLOG_POSTS[0].imageUrl} 
              alt={BLOG_POSTS[0].title}
              className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"></div>
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-indigo-600 text-white font-mono text-[9px] uppercase px-3 py-1 rounded font-bold tracking-wider">
                FEATURED ARTICLE
              </span>
            </div>
          </div>

          {/* Featured Content */}
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1"><Calendar size={11} /> {BLOG_POSTS[0].date}</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {BLOG_POSTS[0].readTime}</span>
              </div>
              <h2 className="font-sans text-2xl lg:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                {BLOG_POSTS[0].title}
              </h2>
              <p className="text-neutral-400 text-xs leading-relaxed line-clamp-4 font-sans">
                {BLOG_POSTS[0].excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-neutral-900/60 mt-auto">
              <span className="text-indigo-400 font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ChevronRight size={14} />
              </span>
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                {BLOG_POSTS[0].category}
              </span>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8 pt-8 border-t border-neutral-900">
          <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-500 font-bold">
            Recent Publications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(1).map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="border border-neutral-900 bg-neutral-950/20 rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover:border-neutral-800/80 transition-all duration-300 shadow-md backdrop-blur-sm"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-neutral-900 overflow-hidden relative shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"></div>
                  <span className="absolute bottom-4 left-4 font-mono text-[9px] bg-neutral-950/80 px-2.5 py-1 rounded text-neutral-400 uppercase tracking-wider border border-neutral-900">
                    {post.category}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[9px] text-neutral-500 font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="font-sans text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <span className="text-indigo-400 font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all pt-2">
                    Read Article <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // BLOG POST DETAIL VIEW
  return (
    <div className="space-y-12 pt-32 max-w-4xl mx-auto px-6 mb-20">
      
      {/* Back Button navigation */}
      <button
        onClick={handleBackToBlog}
        className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-indigo-400 transition-colors cursor-pointer group font-medium"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Insights
      </button>

      {/* Article Container */}
      <article className="space-y-10">
        
        {/* Meta Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] px-3 py-1 rounded uppercase tracking-wider font-bold">
              {currentPost.category}
            </span>
          </div>
          
          <h1 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {currentPost.title}
          </h1>

          <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-mono pt-2">
            <span className="flex items-center gap-1"><Calendar size={11} /> {currentPost.date}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {currentPost.readTime}</span>
            <span className="flex items-center gap-1"><Bookmark size={11} /> Verified Journal</span>
          </div>
        </div>

        {/* Hero image card */}
        <div className="h-64 md:h-[400px] w-full rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-900 shadow-lg relative">
          <img 
            src={currentPost.imageUrl} 
            alt={currentPost.title}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Author Bio Banner */}
        <div className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm shadow-md">
          <div className="w-11 h-11 rounded-full border border-indigo-500/30 overflow-hidden bg-neutral-900 shrink-0">
            <img className="w-full h-full object-cover" src={BIO.avatarUrl} alt={BIO.name} referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="font-sans text-sm font-bold text-white">{BIO.name}</p>
            <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider">{BIO.role} • VoiceWebSEO</p>
          </div>
        </div>

        {/* Custom Rich Content Renderer */}
        <div className="font-sans text-neutral-300 text-sm md:text-base leading-relaxed space-y-6 max-w-3xl border-t border-neutral-900 pt-8">
          
          {/* Render structured content statically based on postId to prevent fragile markdown issues */}
          {currentPost.id === 'seo-age-of-voice' ? (
            <div className="space-y-8 font-sans leading-relaxed text-neutral-300">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-indigo-500 first-letter:mr-3 first-letter:float-left first-letter:font-sans">
                As voice-activated assistants become the primary gateway for digital information, the traditional search landscape is undergoing a seismic shift. No longer are users typing fragmented keywords; they are asking complex, conversational questions. To survive, modern search optimization must adapt to conversational intent.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-white pt-4 tracking-tight border-b border-neutral-900 pb-2">
                The Natural Language Capture
              </h2>
              <p>
                Voice search thrives on long-tail queries. While a desktop user might type "SEO voice research," a home-assistant user will ask, <span className="text-indigo-400 font-semibold italic">"How does voice search impact my local SEO ranking?"</span>
              </p>
              <p>
                This shift requires a pivot from rigid keyword density to fluid conversational intent mapping. To bridge this gap, engineers utilize high-dimensional vector search. This architecture processes phonetic soundwaves, tokenizes natural language sentences, and maps them to high-density semantic structures.
              </p>

              {/* Styled Pipeline Widget */}
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-2xl space-y-4 shadow-inner">
                <span className="font-mono text-[9px] tracking-widest text-indigo-500 uppercase font-bold block">
                  TECHNICAL ARCHITECTURE: VOICE INDEXING PIPELINE
                </span>
                <ol className="space-y-3 font-sans text-xs text-neutral-400">
                  <li className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center font-mono shrink-0">1</span>
                    <span><strong className="text-neutral-200">Automatic Speech Recognition (ASR)</strong>: Rapidly converts phonemes into structured, tokenized text data on the local edge.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center font-mono shrink-0">2</span>
                    <span><strong className="text-neutral-200">Natural Language Understanding (NLU)</strong>: Resolves semantic intent, extracts entity mappings, and validates context within a high-dimensional vector database.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center font-mono shrink-0">3</span>
                    <span><strong className="text-neutral-200">Instant Auditory Delivery (Position Zero)</strong>: Synthesizes a natural-sounding audio response utilizing lightweight text-to-speech weights.</span>
                  </li>
                </ol>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white pt-4 tracking-tight border-b border-neutral-900 pb-2">
                Reducing Bounce Rates via Intent Matching
              </h2>
              <p>
                One of the most profound benefits of voice search optimization is the reduction of bounce rates. When an AI voice agent successfully matches a user's verbal intent with a highly relevant, context-rich response, user engagement spikes.
              </p>
              <p>
                Instead of landing on a generic page and searching manually, the visitor receives immediate, high-fidelity answers. This creates a powerful connection, increasing both session durations and overall user trust.
              </p>

              {/* Blockquote Card */}
              <div className="border-l-4 border-l-indigo-600 bg-indigo-600/5 px-6 py-4 rounded-r-xl">
                <p className="font-sans text-xs italic text-neutral-300">
                  "Near me" queries dominate the voice ecosystem. Optimizing for local audio-based search means ensuring your schema markup is absolutely flawless, your geographic data is precise, and your business directory details are perfectly synchronized in real-time.
                </p>
              </div>

              {/* Actionable Tips Bento Widget */}
              <div className="border border-neutral-900 bg-neutral-950 p-6 rounded-2xl space-y-4">
                <span className="font-mono text-[9px] tracking-widest text-indigo-500 uppercase font-bold block">
                  ACTIONABLE VOICE SEO TIPS
                </span>
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans text-neutral-400">
                  <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl space-y-1">
                    <p className="font-bold text-neutral-200">Aim for "Position Zero"</p>
                    <p className="leading-relaxed">Structure content to answer questions in 40-50 words immediately below headings.</p>
                  </div>
                  <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl space-y-1">
                    <p className="font-bold text-neutral-200">"Speakable" Schema</p>
                    <p className="leading-relaxed">Identify precise text elements suitable for automatic audio playback.</p>
                  </div>
                  <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl space-y-1">
                    <p className="font-bold text-neutral-200">Latency Thresholds</p>
                    <p className="leading-relaxed">Assistants prioritize fast sites. Load resources under 2s for core audio index ranking.</p>
                  </div>
                  <div className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl space-y-1">
                    <p className="font-bold text-neutral-200">Cadence Simplicity</p>
                    <p className="leading-relaxed">Keep phrasing conversational. Simplicity is key for audio playback clarity.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Standard formatted render for other posts
            <div className="space-y-6">
              <p className="text-neutral-200 font-medium text-lg leading-relaxed">{currentPost.excerpt}</p>
              
              <h2 className="text-xl font-bold text-white pt-4 tracking-tight border-b border-neutral-900 pb-2">
                Unveiling Auditory Horizons
              </h2>
              <p>
                As continuous speech pipelines replace traditional screen interfaces, the architecture of the web must adapt. Information must be structured not only for visual indexes, but also phonetic processing. In the next chapter of digital interaction, low-latency, edge-processed voice models are the gateway.
              </p>
              
              <h2 className="text-xl font-bold text-white pt-4 tracking-tight border-b border-neutral-900 pb-2">
                Aesthetic Synchronization
              </h2>
              <p>
                By coupling high-performance React frontends with serverless WebSocket relays, we can decrease response overhead completely. This produces empathetic vocal cadences that correspond to standard human conversations, enhancing both session loyalty and retention depths.
              </p>
            </div>
          )}

        </div>

        {/* Related Articles */}
        <div className="border-t border-neutral-900 pt-12 mt-12 space-y-6">
          <h4 className="font-sans text-xs uppercase tracking-widest text-neutral-500 font-bold">
            Read Next
          </h4>

          <div className="grid sm:grid-cols-2 gap-6 text-xs">
            {BLOG_POSTS.filter((post) => post.id !== currentPost.id).slice(0, 2).map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="p-5 border border-neutral-900 bg-neutral-950/20 rounded-xl group cursor-pointer hover:border-neutral-800 transition-colors flex justify-between items-center gap-4"
              >
                <div className="space-y-1">
                  <p className="text-[9px] text-neutral-500 font-mono uppercase">{post.category}</p>
                  <p className="font-sans font-bold text-neutral-300 group-hover:text-indigo-400 transition-colors line-clamp-1">{post.title}</p>
                </div>
                <ChevronRight size={14} className="text-neutral-500 shrink-0 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

      </article>

    </div>
  );
};
