import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Room, GameStatus } from '../types';

interface LobbyProps {
  user: User;
}

const MOCK_ROOMS: Room[] = [
  { id: 'room_1', name: 'Cyber Trivia 2077', status: GameStatus.LOBBY, players: [
    { id: '1', username: 'NeonKing', avatar: 'https://picsum.photos/seed/1/40/40', score: 0, streak: 0, isHost: true }
  ], currentQuestionIndex: 0, timer: 30, maxPlayers: 10, category: 'Technology' },
  { id: 'room_2', name: 'Science Wizards', status: GameStatus.QUESTION, players: Array(5).fill(0), currentQuestionIndex: 4, timer: 12, maxPlayers: 8, category: 'Science' },
  { id: 'room_3', name: 'History Buffs', status: GameStatus.LOBBY, players: Array(2).fill(0), currentQuestionIndex: 0, timer: 60, maxPlayers: 5, category: 'History' },
  { id: 'room_4', name: 'Space Explorers', status: GameStatus.LOBBY, players: Array(1).fill(0), currentQuestionIndex: 0, timer: 45, maxPlayers: 12, category: 'Science' },
  { id: 'room_5', name: 'Pop Pulse', status: GameStatus.QUESTION, players: Array(7).fill(0), currentQuestionIndex: 8, timer: 5, maxPlayers: 10, category: 'Pop Culture' },
  { id: 'room_6', name: 'Code Crackers', status: GameStatus.LOBBY, players: Array(3).fill(0), currentQuestionIndex: 0, timer: 15, maxPlayers: 6, category: 'Technology' },
];

const Lobby: React.FC<LobbyProps> = ({ user }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Create room state
  const [roomName, setRoomName] = useState(`${user.username}'s Node`);
  const [roomCategory, setRoomCategory] = useState('Science');
  const [roomMaxPlayers, setRoomMaxPlayers] = useState(10);

  const categories = ['All', 'Science', 'Technology', 'History', 'Pop Culture'];

  const filteredRooms = filter === 'All' 
    ? MOCK_ROOMS 
    : MOCK_ROOMS.filter(r => r.category === filter);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        // Fixed: Cast easing array to [number, number, number, number] for framer-motion compatibility
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      } 
    }
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would hit an API. Here we redirect to a mock ID.
    const mockId = `new_node_${Date.now()}`;
    navigate(`/room/${mockId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-black text-white mb-2 tracking-tighter italic uppercase">SIMULATION NODES</h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Identify and synchronize with an active data stream.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          // Fixed: Changed 'shadow' to 'boxShadow' as 'shadow' is not a valid framer-motion property for whileHover
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="group relative px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-xs">
            GENERATE NODE <span className="text-xl">+</span>
          </span>
        </motion.button>
      </div>

      <div className="flex gap-4 mb-14 overflow-x-auto pb-6 scrollbar-hide">
        {categories.map((cat, i) => (
          <motion.button 
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl border-2 transition-all whitespace-nowrap text-[11px] font-black uppercase tracking-[0.2em] ${
              filter === cat 
                ? 'bg-indigo-600/15 border-indigo-500 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room, idx) => (
          <motion.div 
            key={room.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ 
              delay: idx * 0.15,
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ y: -15, scale: 1.08 }}
            onClick={() => navigate(`/room/${room.id}`)}
            className="group relative glass rounded-[40px] border border-white/5 p-8 cursor-pointer overflow-hidden transition-all hover:bg-indigo-500/[0.05] hover:border-indigo-500/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600/0 before:via-indigo-600/10 before:to-indigo-600/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            {/* Background Glow Effect */}
            <motion.div 
              className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/30 transition-colors"
              whileHover={{ scale: 1.2 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
              <motion.div 
                className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl"
                whileHover={{ scale: 1.15, rotate: 10 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {room.category === 'Technology' ? '💻' : room.category === 'Science' ? '🧬' : room.category === 'History' ? '🏛️' : '🎧'}
              </motion.div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center gap-2">
                    <motion.span 
                      className={`w-2 h-2 rounded-full ${
                        room.status === GameStatus.LOBBY ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                      room.status === GameStatus.LOBBY ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {room.status === GameStatus.LOBBY ? 'Sync Ready' : 'In Progress'}
                    </span>
                 </div>
                <div className="text-[11px] text-slate-500 font-bold uppercase mt-2 tracking-widest border-b border-white/5 pb-1">
                  {room.category}
                </div>
              </div>
            </div>

            <motion.h3 
              className="text-2xl font-black text-white mb-8 group-hover:text-indigo-400 transition-colors tracking-tight leading-tight uppercase italic relative z-10"
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {room.name}
            </motion.h3>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-[#020617] bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
                <span className="text-xs font-black text-slate-400 tracking-tighter">
                  <span className="text-indigo-400">{room.players.length}</span>
                  <span className="opacity-40"> / </span>
                  {room.maxPlayers}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                INITIALIZE
                <span className="text-lg">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredRooms.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center py-20 glass rounded-[40px] border-dashed border-2 border-white/5"
        >
          <div className="text-5xl mb-4 opacity-20">📡</div>
          <p className="text-slate-500 font-bold uppercase tracking-widest">No active transmissions in this sector.</p>
        </motion.div>
      )}

      {/* CREATE NODE MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass rounded-[40px] border-indigo-500/30 p-10 overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.2)]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              
              <h3 className="text-3xl font-black text-white mb-8 italic uppercase tracking-tighter">Initialize New Node</h3>
              
              <form onSubmit={handleCreateRoom} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Designation</label>
                  <input 
                    type="text" 
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder:text-slate-700"
                    placeholder="Enter Node Name..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Data Sector</label>
                    <select 
                      value={roomCategory}
                      onChange={(e) => setRoomCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Capacity</label>
                    <input 
                      type="number" 
                      min="2" 
                      max="20"
                      value={roomMaxPlayers}
                      onChange={(e) => setRoomMaxPlayers(parseInt(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl">⚡</div>
                      <div>
                        <div className="text-xs font-black uppercase text-indigo-400">Adaptive AI Scaling</div>
                        <div className="text-[10px] text-slate-500">Node will automatically generate high-fidelity questions for the {roomCategory} sector.</div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 py-5 glass border-white/5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-5 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Sync & Initialize
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lobby;