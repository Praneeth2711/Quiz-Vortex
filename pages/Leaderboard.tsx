
import React, { useState } from 'react';

const Leaderboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'Weekly' | 'All-Time'>('Weekly');

  const rankings = [
    { id: 1, name: 'VortexMaster', score: 24500, winRate: '82%', avatar: 'https://picsum.photos/seed/l1/40/40' },
    { id: 2, name: 'PixelNinja', score: 22100, winRate: '75%', avatar: 'https://picsum.photos/seed/l2/40/40' },
    { id: 3, name: 'LogicQueen', score: 19800, winRate: '78%', avatar: 'https://picsum.photos/seed/l3/40/40' },
    { id: 4, name: 'CyberSage', score: 18400, winRate: '68%', avatar: 'https://picsum.photos/seed/l4/40/40' },
    { id: 5, name: 'TechnoTamer', score: 15900, winRate: '62%', avatar: 'https://picsum.photos/seed/l5/40/40' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 tracking-tighter">HALL OF FAME</h2>
        <div className="flex items-center justify-center gap-2">
          {['Weekly', 'All-Time'].map((r: any) => (
            <button 
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-8 py-2 rounded-full font-bold transition-all ${
                timeRange === r ? 'bg-indigo-600 text-white' : 'glass text-slate-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rankings.map((player, idx) => (
          <div 
            key={player.id}
            className={`glass p-6 rounded-[32px] border-white/5 flex items-center justify-between group hover:scale-[1.02] transition-all ${
              idx === 0 ? 'bg-indigo-600/10 border-indigo-500/30' : ''
            }`}
          >
            <div className="flex items-center gap-6">
              <span className={`text-2xl font-black w-8 ${
                idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-600'
              }`}>
                #{player.id}
              </span>
              <div className="w-16 h-16 rounded-3xl overflow-hidden border-2 border-white/10">
                <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{player.name}</h3>
                <span className="text-sm text-slate-500">Win Rate: {player.winRate}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black text-white">{player.score.toLocaleString()}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Points Accum.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
