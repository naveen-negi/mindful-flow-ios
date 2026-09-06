import { BookOpen, Brain, HelpCircle, Info, Lightbulb, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface LearnChapter {
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Reading order of the Learn section.
 * Drives both the contents list and the previous / next links at the end of
 * each chapter, so the order lives in exactly one place.
 */
export const learnChapters: LearnChapter[] = [
  {
    path: '/learn/about',
    title: 'About this app',
    description: 'What it teaches and how a session works',
    icon: Info,
  },
  {
    path: '/learn/basics',
    title: 'Basics',
    description: 'The fundamentals of Sahita Kumbhaka',
    icon: BookOpen,
  },
  {
    path: '/learn/tradition',
    title: 'Tradition',
    description: '3,500 years of ancient wisdom',
    icon: Lightbulb,
  },
  {
    path: '/learn/science',
    title: 'Science',
    description: 'Modern research and benefits',
    icon: Brain,
  },
  {
    path: '/learn/safety',
    title: 'Practice Tips & Safety',
    description: 'Essential guidelines for safe practice',
    icon: Shield,
  },
  {
    path: '/learn/faq',
    title: 'FAQ',
    description: 'Common questions answered',
    icon: HelpCircle,
  },
];
