import type { QuestionCategory } from '@/types/reading';

export const questionCategories: QuestionCategory[] = [
  {
    id: 'general',
    title: 'General Clarity',
    description: 'For broad guidance when you feel the situation but not the exact question.',
    prompts: ['What wants my attention right now?', 'What is the real lesson under the surface?'],
  },
  {
    id: 'love',
    title: 'Love and Bond',
    description: 'For intimacy, emotional patterns, attraction, distance and relationship timing.',
    prompts: ['What dynamic is shaping this connection?', 'What should I stop idealizing in this bond?'],
  },
  {
    id: 'career',
    title: 'Career and Direction',
    description: 'For choices, visibility, risk, momentum, collaboration and practical next moves.',
    prompts: ['Where should I place effort next?', 'What is blocking professional momentum?'],
  },
  {
    id: 'healing',
    title: 'Healing and Recovery',
    description: 'For emotional repair, nervous system care, rest cycles and self-trust.',
    prompts: ['What needs gentleness instead of pressure?', 'What am I trying to heal too quickly?'],
  },
  {
    id: 'shadow',
    title: 'Shadow Work',
    description: 'For control, fear, repetition, hidden motives and difficult inner truth.',
    prompts: ['What pattern keeps repeating itself?', 'What truth am I resisting because it changes me?'],
  },
  {
    id: 'creativity',
    title: 'Creative Fire',
    description: 'For artistic flow, originality, visibility, experimentation and block release.',
    prompts: ['What wants to be made through me?', 'Where is fear disguising itself as perfectionism?'],
  },
];

export const defaultQuestionCategory = questionCategories[0];
