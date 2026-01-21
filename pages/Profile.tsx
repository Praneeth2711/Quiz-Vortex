
import React, { useState } from 'react';
import { User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../config/authService';

interface ProfileProps {
  user: User;
  onUpdateUser?: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    bio: user.bio || '',
    avatar: user.avatar,
  });

  const AVATAR_OPTIONS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mason',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Harper',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Evelyn',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
  ];

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updatedUser: User = {
        ...user,
        username: editData.username,
        bio: editData.bio,
        avatar: editData.avatar,
      };

      await authService.updateUserProfile(user.id, updatedUser);
      onUpdateUser?.(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-6 pt-10 pb-20"
    >
      <AnimatePresence mode="wait">
        {!isEditing ? (
          // View Mode
          <motion.div
            key="view-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-[48px] p-8 md:p-12 border border-white/5 relative overflow-hidden"
          >
            {/* Gradient Background */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />

            {/* Profile Header */}
            <motion.div
              variants={itemVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="flex flex-col md:flex-row items-center gap-8 mb-12 relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-[48px] overflow-hidden border-4 border-gradient-to-r from-indigo-600 to-purple-600 p-1 bg-slate-900 shadow-2xl"
              >
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover rounded-[40px]" />
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  {user.username}
                </h2>
                {user.bio && (
                  <p className="text-slate-300 mb-4 text-lg">{user.bio}</p>
                )}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider"
                  >
                    🏆 Top Player
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider"
                  >
                    ⭐ Gold Member
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider"
                  >
                    🔥 {user.level || 24} Vortex Mage
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold uppercase text-sm tracking-wider hover:shadow-lg hover:shadow-indigo-600/50 transition-all"
              >
                ✎ Edit Profile
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10"
            >
              {[
                { label: 'Games Played', value: user.stats.gamesPlayed, icon: '🎮', color: 'from-blue-600 to-cyan-600' },
                { label: 'Total Wins', value: user.stats.wins, icon: '🏆', color: 'from-yellow-600 to-orange-600' },
                { label: 'Avg Speed', value: `${user.stats.avgResponseTime}s`, icon: '⚡', color: 'from-green-600 to-emerald-600' },
                { label: 'Highest Streak', value: user.stats.highestStreak, icon: '🔥', color: 'from-red-600 to-pink-600' },
                { label: 'Win Rate', value: `${Math.round((user.stats.wins / Math.max(user.stats.gamesPlayed, 1)) * 100)}%`, icon: '📈', color: 'from-purple-600 to-indigo-600' },
                { label: 'Badges Earned', value: '12', icon: '🎖️', color: 'from-orange-600 to-red-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 bg-gradient-to-br ${stat.color} rounded-3xl border border-white/5 text-center overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] text-white/80 uppercase tracking-widest font-bold">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Achievements */}
            <motion.div
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>🎯 Recent Achievements</span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
                {[
                  { name: 'First Blood', date: '2 days ago', icon: '🩸', color: 'from-red-600/20' },
                  { name: 'Century Club', date: '1 week ago', icon: '💯', color: 'from-indigo-600/20' },
                  { name: 'Speed Demon', date: 'Yesterday', icon: '🌩️', color: 'from-yellow-600/20' },
                  { name: 'Social Butterfly', date: '3 days ago', icon: '🦋', color: 'from-pink-600/20' },
                  { name: 'Unstoppable', date: 'Last month', icon: '⚔️', color: 'from-purple-600/20' },
                  { name: 'Brain Wizard', date: '5 days ago', icon: '🧠', color: 'from-cyan-600/20' },
                  { name: 'Rising Star', date: '1 week ago', icon: '⭐', color: 'from-amber-600/20' },
                  { name: 'Night Owl', date: 'Yesterday', icon: '🌙', color: 'from-slate-600/20' },
                  { name: 'Challenge Master', date: '3 days ago', icon: '🎯', color: 'from-lime-600/20' },
                  { name: 'Legendary', date: '2 weeks ago', icon: '👑', color: 'from-violet-600/20' },
                ].map((ach, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-6 glass rounded-3xl border border-white/5 flex flex-col items-center text-center hover:border-indigo-500/50 transition-all`}
                  >
                    <div className="text-4xl mb-3">{ach.icon}</div>
                    <div className="text-sm font-bold mb-2">{ach.name}</div>
                    <div className="text-[10px] text-slate-500">{ach.date}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Coins Section */}
            <motion.div
              variants={itemVariants}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 flex items-center justify-between relative z-10"
            >
              <div>
                <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-1">Total Coins</p>
                <p className="text-4xl font-black text-yellow-300">{user.coins.toLocaleString()}</p>
              </div>
              <div className="text-6xl">💰</div>
            </motion.div>
          </motion.div>
        ) : (
          // Edit Mode
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-[48px] p-8 md:p-12 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />

            <h2 className="text-3xl font-black mb-8 text-white relative z-10">Edit Your Profile</h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 relative z-10"
            >
              {/* Avatar Selection */}
              <motion.div
                variants={itemVariants}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">
                  👤 Choose Avatar
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {AVATAR_OPTIONS.map((avatar, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditData({ ...editData, avatar })}
                      className={`w-full aspect-square rounded-2xl overflow-hidden border-3 transition-all ${
                        editData.avatar === avatar
                          ? 'border-indigo-500 ring-2 ring-indigo-500'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={avatar} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
                <div className="mt-4 w-32 h-32 rounded-2xl overflow-hidden border-4 border-indigo-600 mx-auto">
                  <img src={editData.avatar} alt="Current Avatar" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Username */}
              <motion.div
                variants={itemVariants}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Battle Name
                </label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  maxLength={20}
                />
                <p className="text-xs text-slate-400 mt-2">{editData.username.length}/20 characters</p>
              </motion.div>

              {/* Bio */}
              <motion.div
                variants={itemVariants}
                custom={2}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Bio / Tagline
                </label>
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none h-24"
                  placeholder="Tell the arena about yourself..."
                  maxLength={150}
                />
                <p className="text-xs text-slate-400 mt-2">{editData.bio.length}/150 characters</p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                className="flex gap-4 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      username: user.username,
                      bio: user.bio || '',
                      avatar: user.avatar,
                    });
                  }}
                  className="flex-1 py-3.5 rounded-2xl border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-indigo-600/50 disabled:opacity-70 transition-all"
                >
                  {isSaving ? 'Saving...' : '💾 Save Changes'}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;
