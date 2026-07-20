import { Project, SkillCategory, ResearchPillar, Benchmark, BlogPost } from './types';

export const BIO = {
  name: 'Shahid Saeed',
  role: 'Lead AI Architect & Web Developer',
  company: 'VoiceWebSEO',
  email: 'm.raaiq.shahid@gmail.com',
  phone: '+92 333 7960706',
  timezone: 'Islamabad, Pakistan (GMT+5)',
  logoText: 'VoiceWebSEO',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_K8PkXMDonXn93iIm5gSXtinmXFc7y3Vc-3B1eqS4fUoTxtlAotcjaegZktRio9g0bxeVT6Vk6gXx3N90AclcztIvXycq2bsKAMkQUpb6cKh8xMhotIpyif_kjQXI6obyty36wfkaL46HGt6Gg4jcXh1iswUtEVC5dtw_fQG2aRztPZRNDFM71eD0DW8Pp9yyvo3XlqRD4H72dd4zr7Y11eG1XMQiVdW0wS6xdY8rU1AYynnvgsD2tdIKGOgs_5VViwDIrYRLw',
  developerPortraitUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwqNNcoSqe9Ah6Lx4Tx0rlHtV2TQ2OYGZpGjmTyueiorV3JLqJvcEB4SrjWLjHwKgjiRgxe0quI5zElWia7UC4UntZRfLwWXSrnhbHf78HzYJhL2joeeX17zJnkCbz1Fjl8jfOQE-woZ2KA7crlBGn97ea13_SuezosbxgyURUJv_fjoJnLawAjb4-6ykHM6wSrPjiD_KqwYFMvDpp5Ods9_0BRQhQD2dDPBGnDTzs7fV5KlpxycTsT8XN3QShglANIAb1d8tT_w',
  githubUrl: 'https://github.com/mraaiq',
  linkedinUrl: 'https://linkedin.com/in/mraaiq'
};

export const PROJECTS: Project[] = [
  {
    id: 'aether-voice-core',
    title: 'Aether Voice Core',
    category: 'ai',
    description: 'LLM-integrated voice agent orchestrating zero-latency streaming pipelines with sub-50ms conversational turns and real-time biometric verification.',
    tags: ['COGNITIVE AI', 'WEBRTC', 'NEURAL SYNTHESIS'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    metric: { label: 'LATENCY', value: '12ms' },
    features: [
      'Automatic speech recognition with phoneme extraction',
      'Real-time streaming text generation matching verbal pace',
      'Custom text-to-speech with organic human pitch modeling'
    ]
  },
  {
    id: 'voicewebseo-fintech',
    title: 'VoiceWebSEO FinTech',
    category: 'web',
    description: 'High-performance financial dashboard utilizing WebGL for real-time stock-data streaming, integrated with a secure local voice assistant query engine.',
    tags: ['TYPESCRIPT', 'WEBGL', 'D3.JS'],
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    metric: { label: 'THROUGHPUT', value: '120k/s' },
    features: [
      'Interactive canvas rendering thousands of historical points',
      'Context-aware voice queries for financial data trends',
      'Secure transaction authentication via sound tokenization'
    ]
  },
  {
    id: 'voicewebseo-labs',
    title: 'VoiceWebSEO Labs',
    category: 'ai',
    description: 'An active testing sandbox for next-generation text-to-speech algorithms, exploring emotional pitch variation and noise-resilient voice biometric triggers.',
    tags: ['TRANSFORMERS', 'VOICE BIOMETRICS', 'EDGE AI'],
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    metric: { label: 'ACCURACY', value: '99.2%' },
    features: [
      'Emotion synthesis training modules with raw audio analysis',
      'Cross-noise cancellation for precise voice print match',
      'Edge-device compilation of lightweight vocal engines'
    ]
  },
  {
    id: 'flux-portfolio',
    title: 'Flux Portfolio',
    category: 'web',
    description: 'A modular and highly interactive portfolio design system with glassmorphic layout, nested state animations, and localized offline-first persistence.',
    tags: ['REACT', 'MOTION', 'TAILWIND CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    metric: { label: 'PERFORMANCE', value: '100/100' },
    features: [
      'Stateful card animations and layout transitions',
      'Unified CSS customization with tokenized spacing rules',
      'Local persistence store tracking user inquiry flow'
    ]
  },
  {
    id: 'echo-semantics',
    title: 'Echo Semantics',
    category: 'ai',
    description: 'Custom-trained vector database search engine designed specifically for indexing auditory intent and mapping voice commands to structured API calls.',
    tags: ['NLU', 'VECTOR EMBEDDINGS', 'CHROMA'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    metric: { label: 'WER', value: '3.2%' },
    features: [
      'High-dimensional vector embeddings for phoneme inputs',
      'Semantically parsed intent nodes matching standard schemas',
      'Extremely lightweight local query cache for offline search'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-voice-ops',
    title: 'AI & Voice Ops',
    subtitle: 'COGNITIVE ARCHITECTURE & SPEECH',
    percentage: 95,
    icon: 'graphic_eq',
    specs: [
      { label: 'ASR (Speech-to-Text)', value: 'Deep SOTA' },
      { label: 'NLU / Intent Modeling', value: 'Context-Aware' },
      { label: 'Neural Text-to-Speech', value: 'Custom Pitch' },
      { label: 'Voice Biometrics', value: '99.8% Match' }
    ],
    description: 'Developing low-latency voice-activated AI pipelines utilizing vector intent maps, automatic speech representation, and neural vocal generation.'
  },
  {
    id: 'full-stack-web',
    title: 'Full-Stack Web',
    subtitle: 'INTERACTIVE ARCHITECTURE',
    percentage: 92,
    icon: 'layers',
    specs: [
      { label: 'React / Next.js SPA', value: 'Expert' },
      { label: 'State Sync / Context', value: 'Durable' },
      { label: 'Tailwind CSS v4 / Theme', value: 'Tokenized' },
      { label: 'Dynamic WebGL / D3', value: 'High Frame' }
    ],
    description: 'Crafting responsive, beautifully animated, glassmorphic interfaces that coordinate with local data systems and handle high-throughput flows seamlessly.'
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    subtitle: 'DEPLOYMENTS & SCALABILITY',
    percentage: 88,
    icon: 'hub',
    specs: [
      { label: 'AWS Lambda / Serverless', value: 'Optimized' },
      { label: 'Docker / Kubernetes', value: 'Configured' },
      { label: 'Vector Stores (ChromaDB)', value: 'High Speed' },
      { label: 'CI/CD Pipelines', value: 'Automated' }
    ],
    description: 'Configuring lightweight, secure, and containerized runtime environments optimized for zero-latency AI processing and secure credential proxying.'
  }
];

export const RIGOR_PHILOSOPHY = {
  title: 'Technical Rigor',
  headline: 'Engineering robust pathways for neural soundscapes.',
  paragraphs: [
    'My development philosophy centers on architectural honesty and extreme visual precision. I believe that professional codebases should not be hidden behind simulated metrics, but backed by concrete, clean implementations and deterministic state workflows.',
    'By harmonizing complex local storage structures with WebGL visualizations and WebRTC speech handlers, I aim to push the boundaries of technical interaction. Real craft is not about over-complicating a layout, but about refining every transition, pixel margin, and font size to create an cohesive, atmospheric digital workspace.'
  ]
};

export const INTERCONNECTIVITY_NODES = [
  { id: 'core', label: 'Core Logic', icon: 'token', type: 'central', x: '50%', y: '50%' },
  { id: 'web', label: 'React Frontend', icon: 'layers', type: 'satellite', x: '25%', y: '25%' },
  { id: 'voice', label: 'ASR & NLU Engine', icon: 'graphic_eq', type: 'satellite', x: '75%', y: '25%' },
  { id: 'cloud', label: 'AWS Serverless', icon: 'cloud', type: 'satellite', x: '25%', y: '75%' },
  { id: 'vector', label: 'Vector Store', icon: 'hub', type: 'satellite', x: '75%', y: '75%' }
];

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: 'zero-latency',
    tag: '01 // NEURAL ACOUSTICS',
    title: 'Zero-Latency Voice Synthesis',
    description: 'Achieving genuine real-time conversational loops by pipeline optimization, shifting acoustic frame generation entirely to edge processing, and parallelizing speech extraction steps.',
    details: [
      'Streaming audio synthesis with immediate buffer filling',
      'Localized phoneme mapping to prevent network wait times',
      'Dynamic pitch correction using low-overhead local algorithms'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'transformers',
    tag: '02 // DEEP LEARNING',
    title: 'Transformer-Based Vocal Networks',
    description: 'Refining transformer layers to handle continuous auditory frequencies, leading to natural pauses, organic pitch drops, and empathetic cadence matches in under-50ms turns.',
    details: [
      'Multi-head attention maps applied to pitch vectors',
      'Continuous waveform tracking to smooth artificial metallic tones',
      'Pre-compiled weight distribution specialized for speech rhythm'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cognitive-architecture',
    tag: '03 // INTENT GRAPH',
    title: 'Cognitive Architecture & Intent Mapping',
    description: 'Designing context-preserving graph maps that anchor conversation states, ensuring the AI retains deep semantic recall even across long multi-topic discussions.',
    details: [
      'Multi-layered memory nodes storing core topic threads',
      'Semantic token search resolving pronouns in voice commands',
      'Real-time background execution mapping intent to API schemas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const BENCHMARKS: Benchmark[] = [
  { metric: 'Voice Response Latency', voiceWebSEO: '12ms', whisperSOTA: '80ms', elevenSOTA: '150ms', industryAvg: '250ms', unit: 'ms' },
  { metric: 'Word Error Rate (WER)', voiceWebSEO: '3.2%', whisperSOTA: '4.5%', elevenSOTA: 'N/A', industryAvg: '7.8%', unit: '%' },
  { metric: 'Biometric Authenticate Speed', voiceWebSEO: '45ms', whisperSOTA: 'N/A', elevenSOTA: '240ms', industryAvg: '450ms', unit: 'ms' },
  { metric: 'Max Concurrent Agents / Core', voiceWebSEO: '1,200', whisperSOTA: '150', elevenSOTA: '400', industryAvg: '120', unit: 'agents' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'seo-age-of-voice',
    title: 'SEO in the Age of Voice: How Conversational AI Boosts Rankings',
    excerpt: 'As voice-activated assistants become the primary gateway for digital information, the traditional search landscape is undergoing a seismic shift. No longer are users typing fragmented keywords; they are asking complex questions.',
    date: 'July 16, 2026',
    readTime: '12 Min Read',
    category: 'SEO & NLU',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    content: `
# SEO in the Age of Voice

As voice-activated assistants become the primary gateway for digital information, the traditional search landscape is undergoing a seismic shift. No longer are users typing fragmented keywords; they are asking complex, conversational questions. To survive, modern search optimization must adapt to conversational intent.

## The Natural Language Capture

Voice search thrives on long-tail queries. While a desktop user might type "SEO voice research," a home-assistant user will ask, **"How does voice search impact my local SEO ranking?"**

This shift requires a pivot from rigid keyword density to fluid conversational intent mapping. To bridge this gap, engineers utilize high-dimensional vector search. This architecture processes phonetic soundwaves, tokenizes natural language sentences, and maps them to high-density semantic structures.

### TECHNICAL ARCHITECTURE: VOICE INDEXING PIPELINE

1. **Automatic Speech Recognition (ASR)**: Rapidly converts phonemes into structured, tokenized text data on the local edge.
2. **Natural Language Understanding (NLU)**: Resolves semantic intent, extracts entity mappings, and validates context within a high-dimensional vector database.
3. **Instant Auditory Delivery (Position Zero)**: Synthesizes a natural-sounding audio response utilizing lightweight text-to-speech weights.

---

## Reducing Bounce Rates via Intent Matching

One of the most profound benefits of voice search optimization is the reduction of bounce rates. When an AI voice agent successfully matches a user's verbal intent with a highly relevant, context-rich response, user engagement spikes. 

Instead of landing on a generic page and searching manually, the visitor receives immediate, high-fidelity answers. This creates a powerful connection, increasing both session durations and overall user trust.

### Local SEO Mastery

*"Near me" queries dominate the voice ecosystem.* 
Optimizing for local audio-based search means ensuring your schema markup is absolutely flawless, your geographic data is precise, and your business directory details are perfectly synchronized in real-time.

---

## Actionable Voice SEO Tips

- **Aim for "Position Zero"**: Structure your content to provide a concise, direct answer of 40-50 words immediately below main headings. This makes it highly extractable for voice readback.
- **Implement "Speakable" Schema**: Utilize standard schema markup to tell search engines exactly which text elements are optimized for audio text-to-speech playback.
- **Latency Optimization**: Voice assistants prioritize sites that load in under 2 seconds. Minify stylesheets, lazy-load images, and optimize server-side response times.
- **Maintain Conversational Clarity**: Keep content readable, humble, and conversational. Simplicity is key for audio clarity and user comprehension.
    `
  },
  {
    id: 'voice-revolution-website-ai-agent',
    title: 'The Voice Revolution: Why Your Website Needs an AI Agent',
    excerpt: 'Explore how embedding zero-latency conversational agents directly on your website can increase user retention, lower support load, and elevate your brand experience.',
    date: 'June 28, 2026',
    readTime: '8 Min Read',
    category: 'VOICE AI',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    content: `
# The Voice Revolution: Why Your Website Needs an AI Agent

Static websites are becoming archives of the past. The future belongs to interactive, intelligent web environments that can speak, understand, and guide visitors in real-time. By integrating a low-latency, conversational voice agent directly into your interface, you turn a passive reading experience into an active, helpful dialogue.

## Transforming the Interface

Traditional navigation menus and sidebars are often confusing or tedious for visitors. An embedded voice assistant allows users to simply ask: **"Where can I find your WebGL stock projects?"** or **"What is your experience with voice biometrics?"** and receive immediate directions or summaries.

This immediate accessibility reduces friction, especially on mobile devices where typing is slow and screen space is limited. It provides an elite, premium layer of service that differentiates your portfolio or business from the standard templates.

---

## Technical Advantages of Local Agents

1. **Immediate Intent Discovery**: No need to rely on site search logs or path tracking; users state their exact intent verbally.
2. **Support Automation**: Instantly resolve standard inquiries about skills, availability, or project architecture, reducing your administrative workload.
3. **Elevated User Retention**: Immersive experiences encourage visitors to stay longer, explore deeply, and interact with your technical work.
    `
  },
  {
    id: 'from-latency-to-loyalty',
    title: 'From Latency to Loyalty: The Business Impact of Real-Time Voice',
    excerpt: 'Analyzing the hard correlation between speech synthesis speed and user brand trust. Discover how sub-50ms turn latency shapes corporate engagement depth.',
    date: 'May 14, 2026',
    readTime: '10 Min Read',
    category: 'AI PERFORMANCE',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    content: `
# From Latency to Loyalty: The Business Impact of Real-Time Voice

When interacting verbally, humans expect response gaps under 200 milliseconds. Anything longer triggers awkward silences, leading to user frustration and immediate drop-off. In the digital world, speech processing speed is the single most critical factor determining user trust.

## The Cognitive Turn Latency

Turn latency is the time between when a user stops speaking and when the AI starts its vocal response. Traditional LLM streaming and cloud TTS processes often result in turn latencies of 1.5 to 3 seconds. This feels robotic and breaks the cognitive flow of natural speech.

By moving audio processing and phoneme mapping to lightweight serverless edge networks, we can reduce turn latency to **under 50ms**. 

---

## Designing for Human Cadence

Natural speech is not just about words; it is about rhythm, pitch, and breathing. AI models must support:
- **Intelligent Interruptibility**: If the user starts speaking while the AI is talking, the AI must immediately stop and listen.
- **Cadence Adaptation**: Slowing down or speeding up the vocal synthesis to match the user's vocal pace.
- **Empathetic Inflection**: Adjusting voice pitch based on the emotional context of the text.
    `
  },
  {
    id: 'future-search-auditory',
    title: 'The Future of Search is Auditory: Trends in Neural Synthesis',
    excerpt: 'Unveiling the technological trends in neural auditory synthesis, biometric triggers, and how screenless search is rewriting the foundational protocols of the internet.',
    date: 'April 02, 2026',
    readTime: '15 Min Read',
    category: 'FUTURE TECH',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    content: `
# The Future of Search is Auditory: Trends in Neural Synthesis

We are quickly moving towards a screenless digital ecosystem. As smart earbuds, home hubs, and screenless devices proliferate, auditory synthesis is becoming the primary protocol for web consumption. This article explores the upcoming architectural trends that will define screenless search.

## High-Fidelity Auditory Waveforms

Earlier TTS engines used concatenative synthesis, slicing pre-recorded words together. Modern engines utilize **Neural Auditory Synthesis** (such as WaveNet and transformer-based diffusion models), which model speech wave-by-wave. This produces warm, rich, human-like voice cadences that are indistinguishable from natural speech.

## Seamless Screenless Protocol

In a screenless search environment, websites must expose an "auditory structure." Just as HTML maps out headings for visual rendering, it must also provide speakable tags and phonetic guidance to allow audio agents to read back technical data, code structures, and tables accurately.
    `
  }
];
