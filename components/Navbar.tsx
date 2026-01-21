
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import { authService } from '../config/authService';

interface NavbarProps {
  user: User | null;
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, isAuthenticated = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { label: 'Explore', path: '/lobby' },
    { label: 'Rankings', path: '/leaderboard' },
    { label: 'Profile', path: '/profile' }
  ];

  const handleLogout = async () => {
    try {
      await authService.signout();
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass flex items-center px-6 md:px-12 justify-between border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 12, boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}
          animate={{ boxShadow: ['0 0 10px rgba(99, 102, 241, 0.3)', '0 0 20px rgba(168, 85, 247, 0.5)', '0 0 10px rgba(99, 102, 241, 0.3)'] }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
          className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl transition-all"
        >
          V
        </motion.div>
        <motion.span 
          className="font-heading font-bold text-xl tracking-tighter bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        >
          VORTEX
        </motion.span>
      </Link>

      {isAuthenticated && (
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={item.path}
                className={`text-sm font-bold uppercase tracking-wider transition-all relative group ${
                  location.pathname === item.path 
                    ? 'text-indigo-400' 
                    : 'text-slate-400 hover:text-indigo-300'
                }`}
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 rounded-full"
                  animate={{ 
                    width: location.pathname === item.path ? '100%' : '0%',
                    opacity: location.pathname === item.path ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <motion.div 
              whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(234, 179, 8, 0.4)' }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 text-sm font-bold text-yellow-400"
            >
              <motion.span 
                className="text-lg"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💰
              </motion.span>
              {user.coins.toLocaleString()}
            </motion.div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500 hover:border-purple-500 transition-all"
              >
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.9 }}
                    transition={{ duration: 0.25, type: 'spring', stiffness: 200 }}
                    className="absolute right-0 mt-3 w-56 glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-white/10">
                      <p className="font-bold text-white truncate">{user.username}</p>
                      <p className="text-xs text-slate-400">{user.email || 'No email'}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      <motion.div whileHover={{ x: 4 }}>
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="block w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 transition-all"
                        >
                          👤 Edit Profile
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ x: 4 }}>
                        <Link
                          to="/leaderboard"
                          onClick={() => setShowDropdown(false)}
                          className="block w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-300 hover:bg-purple-600/20 hover:text-purple-300 transition-all"
                        >
                          🏆 Leaderboard
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ x: 4 }}>
                        <Link
                          to="/lobby"
                          onClick={() => setShowDropdown(false)}
                          className="block w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-300 hover:bg-green-600/20 hover:text-green-300 transition-all"
                        >
                          🎮 Play
                        </Link>
                      </motion.div>

                      <div className="h-px bg-white/10 my-2" />

                      <motion.button
                        whileHover={{ x: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-red-400 hover:text-red-300 transition-all"
                      >
                        🚪 Logout
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-indigo-400 transition-colors"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-indigo-600/50 transition-all"
              >
                Sign Up
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
