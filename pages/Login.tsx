import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../config/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signin(email, password);
      navigate('/lobby');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          custom={0}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <motion.div 
            className="text-4xl font-black mb-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            VORTEX
          </motion.div>
          <motion.p 
            className="text-slate-400 text-sm font-medium uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome Back, Warrior
          </motion.p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          variants={itemVariants}
          custom={1}
          initial="hidden"
          animate="visible"
          className="glass rounded-[32px] p-8 md:p-10 border border-white/10 backdrop-blur-xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-600/10 before:via-transparent before:to-purple-600/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm font-medium relative z-10"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            {/* Email Field */}
            <motion.div variants={itemVariants} custom={2} initial="hidden" animate="visible">
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                placeholder="Enter your email"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} custom={3} initial="hidden" animate="visible">
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors text-lg"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              variants={itemVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center text-slate-400 hover:text-slate-300 cursor-pointer group">
                <motion.input 
                  type="checkbox" 
                  className="mr-2 accent-indigo-600 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                />
                <span className="group-hover:text-indigo-300 transition-colors">Remember me</span>
              </label>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/forgot" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                  Forgot Password?
                </Link>
              </motion.div>
            </motion.div>

            {/* Login Button */}
            <motion.button
              variants={itemVariants}
              custom={5}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold uppercase tracking-wider disabled:opacity-70 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform" />
              {loading ? (
                <span className="flex items-center justify-center relative z-10">
                  <motion.svg 
                    className="h-5 w-5 mr-2" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </motion.svg>
                  Logging in...
                </span>
              ) : (
                <span className="relative z-10">Enter the Vortex</span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            custom={6}
            initial="hidden"
            animate="visible"
            className="my-6 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 uppercase font-bold">New to Vortex?</span>
            <div className="h-px flex-1 bg-white/10" />
          </motion.div>

          {/* Signup Link */}
          <motion.div
            variants={itemVariants}
            custom={7}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/signup"
              className="block w-full py-3.5 rounded-2xl border border-indigo-500/50 text-indigo-400 font-bold uppercase tracking-wider text-center hover:bg-indigo-600/10 transition-all duration-300"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          variants={itemVariants}
          custom={8}
          initial="hidden"
          animate="visible"
          className="mt-6 p-4 rounded-2xl bg-slate-900/50 border border-white/5 text-center"
        >
          <p className="text-xs text-slate-400 mb-2">Demo Credentials:</p>
          <p className="text-xs text-slate-300">Email: <span className="text-indigo-400 font-mono">demo@vortex.com</span></p>
          <p className="text-xs text-slate-300">Password: <span className="text-indigo-400 font-mono">demo123456</span></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
