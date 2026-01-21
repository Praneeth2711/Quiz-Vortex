
export enum GameStatus {
  LOBBY = 'LOBBY',
  STARTING = 'STARTING',
  QUESTION = 'QUESTION',
  RESULT = 'RESULT',
  FINISHED = 'FINISHED'
}

export interface User {
  id: string;
  username: string;
  email?: string;
  avatar: string;
  coins: number;
  bio?: string;
  level?: number;
  achievements?: string[];
  stats: {
    gamesPlayed: number;
    wins: number;
    avgResponseTime: number;
    highestStreak: number;
  };
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  score: number;
  streak: number;
  isHost: boolean;
  lastAnswerTime?: number;
  lastAnswerCorrect?: boolean;
}

export interface Room {
  id: string;
  name: string;
  status: GameStatus;
  players: Player[];
  currentQuestionIndex: number;
  timer: number;
  maxPlayers: number;
  category: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
}
