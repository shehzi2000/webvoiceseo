export type ActivePage = 'home' | 'projects' | 'skills' | 'research' | 'blog' | 'blog-post';

export interface Project {
  id: string;
  title: string;
  category: 'ai' | 'web';
  description: string;
  tags: string[];
  imageUrl?: string;
  metric?: {
    label: string;
    value: string;
  };
  features?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  percentage: number;
  icon: string;
  specs: { label: string; value: string }[];
  description: string;
}

export interface ResearchPillar {
  id: string;
  tag: string;
  title: string;
  description: string;
  details: string[];
  imageUrl?: string;
}

export interface Benchmark {
  metric: string;
  voiceWebSEO: string | number;
  whisperSOTA: string | number;
  elevenSOTA: string | number;
  industryAvg: string | number;
  unit: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  content?: string; // Rich markdown content or structured paragraph list for detail view
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
