import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../config/authService';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'info' | 'password'>('info');

  const validateUsername = (name: string) => {
    return name.length >= 3 && name.length <= 20 && /^[a-zA-Z0-9_]+$/.test(name);
  };

  const validatePassword = (pwd: string) => {
    return pwd.length >= 6 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
  };

  const handleNext = () => {
    if (!email || !username) {
      setError('Please fill in all fields');
      return;
    }
    if (!validateUsername(username)) {
      setError('Username must be 3-20 characters, alphanumeric and underscores only');
      return;
    }
    setError('');
    setStep('password');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must be 6+ chars with uppercase and numbers');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authService.signup(email, password, username);
      navigate('/lobby');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Signup failed. Please try again.');
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

  const slideVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
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
          <div className="text-4xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            VORTEX
          </div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
            Join the Arena
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          variants={itemVariants}
          custom={1}
          initial="hidden"
          animate="visible"
          className="flex gap-2 mb-6"
        >
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step === 'info' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step === 'password' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/10'}`} />
        </motion.div>

        {/* Signup Form Card */}
        <motion.div
          variants={itemVariants}
          custom={2}
          initial="hidden"
          animate="visible"
          className="glass rounded-[32px] p-8 md:p-10 border border-white/10 backdrop-blur-xl"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {step === 'info' ? (
            <motion.form
              key="info-form"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Email Field */}
              <motion.div variants={itemVariants} custom={3} initial="hidden" animate="visible">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </motion.div>

              {/* Username Field */}
              <motion.div variants={itemVariants} custom={4} initial="hidden" animate="visible">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Battle Name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Choose your battle name"
                />
                {username && (
                  <p className={`text-xs mt-2 ${validateUsername(username) ? 'text-green-400' : 'text-yellow-400'}`}>
                    {validateUsername(username) ? '✓ Perfect!' : '3-20 alphanumeric chars & underscores only'}
                  </p>
                )}
              </motion.div>

              {/* Next Button */}
              <motion.button
                variants={itemVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleNext}
                className="w-full mt-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-purple-600/50 transition-all duration-300"
              >
                Continue
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="password-form"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleSignup}
              className="space-y-5"
            >
              {/* Password Field */}
              <motion.div variants={itemVariants} custom={3} initial="hidden" animate="visible">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-12"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {password && (
                  <p className={`text-xs mt-2 ${validatePassword(password) ? 'text-green-400' : 'text-yellow-400'}`}>
                    {validatePassword(password) ? '✓ Strong!' : '6+ chars, uppercase & numbers required'}
                  </p>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div variants={itemVariants} custom={4} initial="hidden" animate="visible">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Confirm your password"
                />
                {confirmPassword && (
                  <p className={`text-xs mt-2 ${password === confirmPassword && password ? 'text-green-400' : 'text-yellow-400'}`}>
                    {password === confirmPassword && password ? '✓ Match!' : 'Passwords must match'}
                  </p>
                )}
              </motion.div>

              {/* Terms */}
              <motion.label
                variants={itemVariants}
                custom={5}
                initial="hidden"
                animate="visible"
                className="flex items-start text-xs text-slate-400"
              >
                <input type="checkbox" className="mr-2 mt-1" required />
                I agree to the Terms of Service and Privacy Policy
              </motion.label>

              {/* Submit Buttons */}
              <motion.div
                variants={itemVariants}
                custom={6}
                initial="hidden"
                animate="visible"
                className="flex gap-3 mt-8"
              >
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="flex-1 py-3.5 rounded-2xl border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all duration-300"
                >
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-purple-600/50 disabled:opacity-70 transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          )}

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            custom={7}
            initial="hidden"
            animate="visible"
            className="my-6 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 uppercase font-bold">Already a warrior?</span>
            <div className="h-px flex-1 bg-white/10" />
          </motion.div>

          {/* Login Link */}
          <motion.div
            variants={itemVariants}
            custom={8}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/login"
              className="block w-full py-3.5 rounded-2xl border border-purple-500/50 text-purple-400 font-bold uppercase tracking-wider text-center hover:bg-purple-600/10 transition-all duration-300"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
