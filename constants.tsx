
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
  // Science Questions
  {
    id: 'q1',
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctIndex: 1,
    category: 'Science',
    difficulty: 'Easy'
  },
  {
    id: 'q4',
    text: 'Which element has the chemical symbol "O"?',
    options: ['Gold', 'Silver', 'Oxygen', 'Iron'],
    correctIndex: 2,
    category: 'Science',
    difficulty: 'Easy'
  },
  {
    id: 'q5',
    text: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
    correctIndex: 1,
    category: 'Science',
    difficulty: 'Medium'
  },
  {
    id: 'q6',
    text: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
    correctIndex: 0,
    category: 'Science',
    difficulty: 'Medium'
  },
  {
    id: 'q7',
    text: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correctIndex: 2,
    category: 'Science',
    difficulty: 'Easy'
  },
  // Technology Questions
  {
    id: 'q8',
    text: 'What does CPU stand for?',
    options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Control Processing Unit'],
    correctIndex: 0,
    category: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 'q9',
    text: 'Which company developed the Windows operating system?',
    options: ['Apple', 'Google', 'Microsoft', 'IBM'],
    correctIndex: 2,
    category: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 'q10',
    text: 'What is the name of the first artificial Earth satellite?',
    options: ['Apollo', 'Sputnik', 'Voyager', 'Hubble'],
    correctIndex: 1,
    category: 'Technology',
    difficulty: 'Medium'
  },
  {
    id: 'q11',
    text: 'Which programming language is known for its use in web development?',
    options: ['Python', 'JavaScript', 'C++', 'Java'],
    correctIndex: 1,
    category: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 'q12',
    text: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
    correctIndex: 0,
    category: 'Technology',
    difficulty: 'Easy'
  },
  // History Questions
  {
    id: 'q13',
    text: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctIndex: 1,
    category: 'History',
    difficulty: 'Easy'
  },
  {
    id: 'q14',
    text: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
    correctIndex: 2,
    category: 'History',
    difficulty: 'Easy'
  },
  {
    id: 'q15',
    text: 'Which ancient civilization built the pyramids at Giza?',
    options: ['Romans', 'Greeks', 'Egyptians', 'Mayans'],
    correctIndex: 2,
    category: 'History',
    difficulty: 'Easy'
  },
  {
    id: 'q16',
    text: 'In which year did the Titanic sink?',
    options: ['1910', '1912', '1914', '1916'],
    correctIndex: 1,
    category: 'History',
    difficulty: 'Medium'
  },
  {
    id: 'q17',
    text: 'Who was the British monarch during World War I?',
    options: ['Queen Victoria', 'King Edward VII', 'King George V', 'King George VI'],
    correctIndex: 2,
    category: 'History',
    difficulty: 'Medium'
  },
  // Pop Culture Questions
  {
    id: 'q18',
    text: 'Which movie features the character Jack Sparrow?',
    options: ['Harry Potter', 'Pirates of the Caribbean', 'Lord of the Rings', 'Star Wars'],
    correctIndex: 1,
    category: 'Pop Culture',
    difficulty: 'Easy'
  },
  {
    id: 'q19',
    text: 'Who sang the song "Billie Jean"?',
    options: ['Prince', 'Michael Jackson', 'Madonna', 'Whitney Houston'],
    correctIndex: 1,
    category: 'Pop Culture',
    difficulty: 'Easy'
  },
  {
    id: 'q20',
    text: 'Which TV show features the character Walter White?',
    options: ['The Sopranos', 'Breaking Bad', 'The Wire', 'Game of Thrones'],
    correctIndex: 1,
    category: 'Pop Culture',
    difficulty: 'Medium'
  },
  {
    id: 'q21',
    text: 'What is the highest-grossing film of all time?',
    options: ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars: The Force Awakens'],
    correctIndex: 2,
    category: 'Pop Culture',
    difficulty: 'Medium'
  },
  {
    id: 'q22',
    text: 'Which social media platform was founded by Mark Zuckerberg?',
    options: ['Twitter', 'Instagram', 'Facebook', 'TikTok'],
    correctIndex: 2,
    category: 'Pop Culture',
    difficulty: 'Easy'
  },
  // Art Questions
  {
    id: 'q2',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctIndex: 2,
    category: 'Art',
    difficulty: 'Easy'
  },
  {
    id: 'q23',
    text: 'Which artist is known for cutting off his own ear?',
    options: ['Pablo Picasso', 'Vincent van Gogh', 'Salvador Dali', 'Claude Monet'],
    correctIndex: 1,
    category: 'Art',
    difficulty: 'Medium'
  },
  {
    id: 'q24',
    text: 'What art movement is associated with Salvador Dali?',
    options: ['Impressionism', 'Cubism', 'Surrealism', 'Abstract Expressionism'],
    correctIndex: 2,
    category: 'Art',
    difficulty: 'Medium'
  },
  {
    id: 'q25',
    text: 'Which famous sculpture depicts a mermaid?',
    options: ['David', 'The Thinker', 'The Little Mermaid', 'Venus de Milo'],
    correctIndex: 2,
    category: 'Art',
    difficulty: 'Easy'
  },
  // Geography Questions
  {
    id: 'q3',
    text: 'What is the capital city of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctIndex: 2,
    category: 'Geography',
    difficulty: 'Easy'
  },
  {
    id: 'q26',
    text: 'Which is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correctIndex: 1,
    category: 'Geography',
    difficulty: 'Medium'
  },
  {
    id: 'q27',
    text: 'What is the smallest country in the world?',
    options: ['Monaco', 'Nauru', 'Vatican City', 'San Marino'],
    correctIndex: 2,
    category: 'Geography',
    difficulty: 'Easy'
  },
  {
    id: 'q28',
    text: 'Which continent is known as the "Dark Continent"?',
    options: ['Asia', 'Africa', 'South America', 'Australia'],
    correctIndex: 1,
    category: 'Geography',
    difficulty: 'Medium'
  },
  {
    id: 'q29',
    text: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctIndex: 2,
    category: 'Geography',
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
