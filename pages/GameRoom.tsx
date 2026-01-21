
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStatus, User, Player, Question, ChatMessage } from '../types';
import { MOCK_QUESTIONS, POWER_UPS } from '../constants';
import ChatPanel from '../components/ChatPanel';

interface GameRoomProps {
  user: User;
  updateCoins: (amount: number) => void;
}

const GameRoom: React.FC<GameRoomProps> = ({ user, updateCoins }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'Science'; // default to Science

  const [status, setStatus] = useState<GameStatus>(GameStatus.LOBBY);
  const [timer, setTimer] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>([
    { id: user.id, username: user.username, avatar: user.avatar, score: 0, streak: 0, isHost: true },
    { id: 'bot_1', username: 'PixelMaster', avatar: 'https://picsum.photos/seed/p1/40/40', score: 120, streak: 2, isHost: false },
    { id: 'bot_2', username: 'TriviaWhiz', avatar: 'https://picsum.photos/seed/p2/40/40', score: 85, streak: 1, isHost: false },
  ]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasPowerUpUsed, setHasPowerUpUsed] = useState<string | null>(null);
  const [reactions, setReactions] = useState<{id: number, emoji: string, x: number}[]>([]);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);

  // Initialize game questions based on category
  useEffect(() => {
    const categoryQuestions = MOCK_QUESTIONS.filter(q => q.category === category);
    const shuffledQuestions = [...categoryQuestions].sort(() => Math.random() - 0.5);
    setGameQuestions(shuffledQuestions.slice(0, 5));
  }, [category]);

  const currentQuestion = gameQuestions[currentQuestionIndex];

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      handlePhaseTransition();
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhaseTransition = () => {
    if (status === GameStatus.LOBBY) {
      setStatus(GameStatus.STARTING);
      setTimer(5);
    } else if (status === GameStatus.STARTING) {
      setStatus(GameStatus.QUESTION);
      setTimer(20);
    } else if (status === GameStatus.QUESTION) {
      setStatus(GameStatus.RESULT);
      setTimer(5);
    } else if (status === GameStatus.RESULT) {
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setStatus(GameStatus.QUESTION);
        setTimer(20);
        setSelectedAnswer(null);
        setHasPowerUpUsed(null);
      } else {
        setStatus(GameStatus.FINISHED);
        updateCoins(Math.floor(players.find(p => p.id === user.id)!.score / 2));
      }
    }
  };

  const spawnReaction = (emoji: string) => {
    const id = Date.now();
    setReactions(prev => [...prev, { id, emoji, x: Math.random() * 80 + 10 }]);
    setTimeout(() => setReactions(prev => prev.filter(r => r.id !== id)), 2000);
  };

  const submitAnswer = (index: number) => {
    if (selectedAnswer !== null || status !== GameStatus.QUESTION) return;
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctIndex;
    const timeBonus = Math.floor(timer * 5);
    const points = isCorrect ? (100 + timeBonus) * (hasPowerUpUsed === 'p3' ? 2 : 1) : 0;

    setPlayers(prev => prev.map(p => 
      p.id === user.id 
        ? { ...p, score: p.score + points, streak: isCorrect ? p.streak + 1 : 0, lastAnswerCorrect: isCorrect } 
        : p
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-8rem)] relative">
      {/* Floating Reactions Layer */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {reactions.map(r => (
            <motion.div
              key={r.id}
              initial={{ y: '100vh', opacity: 0, x: `${r.x}%` }}
              animate={{ y: '20vh', opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              className="absolute text-4xl"
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Side: Leaderboard */}
      <div className="lg:col-span-3 space-y-4">
        <motion.div layout className="glass rounded-3xl p-6 border border-white/5 sticky top-24">
          <h3 className="font-bold text-sm mb-4 text-slate-400 uppercase tracking-widest">Arena Rankings</h3>
          <div className="space-y-3">
            {[...players].sort((a, b) => b.score - a.score).map((player, idx) => (
              <motion.div 
                layout
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer group ${
                  player.id === user.id ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-slate-900/50 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="text-xs font-bold text-slate-500 w-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: idx * 0.1, duration: 2, repeat: Infinity }}
                  >
                    {idx + 1}
                  </motion.span>
                  <motion.div 
                    className="w-8 h-8 rounded-full overflow-hidden border border-white/10"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
                  </motion.div>
                  <span className="text-sm font-bold truncate max-w-[80px] group-hover:text-indigo-300 transition-colors">{player.username}</span>
                </div>
                <motion.div 
                  key={player.score}
                  initial={{ scale: 1.2, color: '#818cf8' }}
                  animate={{ scale: 1, color: '#6366f1' }}
                  className="text-sm font-black tabular-nums"
                >
                  {player.score}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Game Area */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <div className="relative h-3 rounded-full overflow-hidden bg-white/5 border border-white/10">
           <motion.div 
              className={`h-full rounded-full transition-all ${timer < 5 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
              initial={{ width: '100%' }}
              animate={{ 
                width: `${(timer / 15) * 100}%`,
                boxShadow: timer < 5 ? '0 0 20px rgba(239, 68, 68, 0.5)' : '0 0 20px rgba(99, 102, 241, 0.5)'
              }}
              transition={{ duration: 1, ease: "linear" }}
           />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 glass rounded-[40px] border border-white/10 relative overflow-hidden min-h-[400px] before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-600/10 before:via-transparent before:to-purple-600/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
          <AnimatePresence mode="wait">
            {status === GameStatus.LOBBY && (
              <motion.div 
                key="lobby"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                className="text-center relative z-10"
              >
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🛰️
                </motion.div>
                <motion.h2 
                  className="text-4xl font-black mb-4 uppercase italic"
                  animate={{ letterSpacing: ['0.05em', '0.15em', '0.05em'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Vortex Initializing
                </motion.h2>
                <motion.button 
                  onClick={handlePhaseTransition} 
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black hover:from-indigo-500 hover:to-purple-500 shadow-xl text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  <span className="relative z-10">START TRANSMISSION</span>
                </motion.button>
              </motion.div>
            )}

            {status === GameStatus.QUESTION && (
              <motion.div 
                key={currentQuestionIndex}
                initial={{ x: 100, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -100, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full space-y-8 relative z-10"
              >
                <motion.div 
                  className="text-center space-y-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="text-indigo-400 font-bold tracking-[0.3em] text-[10px] uppercase"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Node Data Chunk {currentQuestionIndex + 1}
                  </motion.div>
                  <h2 className="text-3xl font-black text-white">{currentQuestion.text}</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                      whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => submitAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`p-6 rounded-3xl border text-left font-bold relative overflow-hidden transition-all group ${
                        selectedAnswer === idx 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 shadow-lg shadow-indigo-500/50' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/50'
                      }`}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="relative z-10">{option}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {status === GameStatus.RESULT && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-8xl mb-4">{selectedAnswer === currentQuestion.correctIndex ? '✅' : '🚫'}</div>
                <h3 className="text-3xl font-black mb-2">{selectedAnswer === currentQuestion.correctIndex ? 'MATCH CONFIRMED' : 'DATA CORRUPTION'}</h3>
                <p className="text-slate-400">Response valid: <span className="text-indigo-400 font-bold">{currentQuestion.options[currentQuestion.correctIndex]}</span></p>
              </motion.div>
            )}
            
            {status === GameStatus.FINISHED && (
              <motion.div key="finished" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <h2 className="text-6xl font-black mb-12 text-indigo-400">SIMULATION COMPLETE</h2>
                <div className="flex gap-8 justify-center mb-8">
                  <div className="glass p-6 rounded-3xl"><div className="text-3xl font-black">{players[0].score}</div><div className="text-[10px] uppercase tracking-widest text-slate-500">Points</div></div>
                  <div className="glass p-6 rounded-3xl"><div className="text-3xl font-black text-yellow-500">+{Math.floor(players[0].score / 2)}</div><div className="text-[10px] uppercase tracking-widest text-slate-500">Coins</div></div>
                </div>
                <button onClick={() => navigate('/lobby')} className="px-10 py-4 glass hover:bg-white/10 rounded-2xl font-bold">RETURN TO BASE</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Side: Chat */}
      <div className="lg:col-span-3">
        <ChatPanel user={user} roomId={id || 'global'} onReaction={spawnReaction} />
      </div>
    </div>
  );
};

export default GameRoom;
