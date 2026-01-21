
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChatMessage } from '../types';

interface ChatPanelProps {
  user: User;
  roomId: string;
  onReaction?: (emoji: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ user, roomId, onReaction }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', userId: 'system', username: 'System', text: 'Vortex uplink active. Transmission ready.', timestamp: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36),
      userId: user.id,
      username: user.username,
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const quickReactions = ['🔥', '🎯', '😱', '👑', '💯'];

  return (
    <div className="glass rounded-3xl h-full flex flex-col border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em]">Comms Link</h3>
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, x: msg.userId === user.id ? 20 : -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              className={`flex flex-col ${msg.userId === user.id ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[9px] font-bold text-slate-500 mb-1">{msg.username}</span>
              <div className={`max-w-[90%] px-4 py-2 rounded-2xl text-sm ${
                msg.userId === user.id 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-[0_4px_10px_rgba(99,102,241,0.2)]' 
                  : msg.userId === 'system' 
                    ? 'bg-slate-800/50 text-indigo-300 italic text-[11px] border border-indigo-500/10' 
                    : 'bg-slate-900 text-slate-300 rounded-tl-none border border-white/5'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-white/5">
        <div className="flex gap-2 mb-3">
          {quickReactions.map(emoji => (
            <motion.button 
              key={emoji}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => onReaction && onReaction(emoji)}
              className="w-8 h-8 flex items-center justify-center rounded-xl glass border-white/10 hover:bg-white/10 text-lg"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
        <form onSubmit={sendMessage} className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Broadcast message..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-colors shadow-lg"
          >
            ↗
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
