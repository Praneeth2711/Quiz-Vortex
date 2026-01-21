
import React from 'react';
import { Question, PowerUp } from './types';

export const INITIAL_USER = {
  id: 'user_1',
  username: 'VortexExplorer',
  avatar: 'https://picsum.photos/seed/vortex/100/100',
  coins: 500,
  stats: {
    gamesPlayed: 42,
    wins: 15,
    avgResponseTime: 1.8,
    highestStreak: 12
  }
};

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctIndex: 1,
    category: 'Science',
    difficulty: 'Easy'
  },
  {
    id: 'q2',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctIndex: 2,
    category: 'Art',
    difficulty: 'Easy'
  },
  {
    id: 'q3',
    text: 'What is the capital city of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctIndex: 2,
    category: 'Geography',
    difficulty: 'Easy'
  },
  {
    id: 'q4',
    text: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Silver', 'Oxygen', 'Iron'],
    correctIndex: 2,
    category: 'Science',
    difficulty: 'Easy'
  }
];

export const POWER_UPS: PowerUp[] = [
  {
    id: 'p1',
    name: '50/50',
    description: 'Eliminate two wrong answers',
    cost: 50,
    icon: '🌓'
  },
  {
    id: 'p2',
    name: 'Time Freeze',
    description: 'Freeze the timer for 5 seconds',
    cost: 75,
    icon: '❄️'
  },
  {
    id: 'p3',
    name: 'Double Points',
    description: 'Earn 2x points for this question',
    cost: 100,
    icon: '💎'
  }
];
