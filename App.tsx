
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './config/firebase';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Lobby from './pages/Lobby';
import GameRoom from './pages/GameRoom';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import { User } from './types';
import { INITIAL_USER } from './constants';
import { authService } from './config/authService';

const AnimatedRoutes: React.FC<{ 
  user: User | null; 
  updateCoins: (a: number) => void;
  onUpdateUser: (user: User) => void;
  isAuthenticated: boolean;
}> = ({ user, updateCoins, onUpdateUser, isAuthenticated }) => {
  const location = useLocation();

  // Protected route wrapper
  const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/lobby" element={<ProtectedRoute element={user ? <Lobby user={user} /> : <div />} />} />
          <Route path="/room/:id" element={<ProtectedRoute element={user ? <GameRoom user={user} updateCoins={updateCoins} /> : <div />} />} />
          <Route path="/profile" element={<ProtectedRoute element={user ? <Profile user={user} onUpdateUser={onUpdateUser} /> : <div />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        // Mark as authenticated immediately so protected routes allow navigation,
        // then fetch profile data asynchronously and populate `user` when ready.
        setIsAuthenticated(true);

        authService.getUserData(fbUser.uid)
          .then((userData) => {
            if (userData) {
              setUser(userData);
              localStorage.setItem('quiz_vortex_user', JSON.stringify(userData));
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        // User is logged out
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('quiz_vortex_user');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateCoins = (amount: number) => {
    if (user) {
      const updated = { ...user, coins: user.coins + amount };
      setUser(updated);
      if (firebaseUser) {
        authService.updateUserProfile(firebaseUser.uid, updated).catch(console.error);
      }
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('quiz_vortex_user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">
        {/* Animated Flux Background */}
        <div className="fixed inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" 
          />
        </div>

        <Navbar user={user} isAuthenticated={isAuthenticated} />
        
        <main className="pt-16 pb-8">
          <AnimatedRoutes 
            user={user} 
            updateCoins={updateCoins} 
            onUpdateUser={handleUpdateUser}
            isAuthenticated={isAuthenticated}
          />
        </main>

        <CursorEffect />
      </div>
    </Router>
  );
};

const CursorEffect: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, .interactive'));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div 
      className="fixed pointer-events-none z-[9999] rounded-full border border-indigo-500/50 hidden md:block"
      animate={{ 
        x: pos.x - (isHovering ? 24 : 16), 
        y: pos.y - (isHovering ? 24 : 16),
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0)',
        borderColor: isHovering ? 'rgba(99, 102, 241, 0.8)' : 'rgba(99, 102, 241, 0.3)'
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      style={{ boxShadow: isHovering ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none' }}
    />
  );
};

export default App;
