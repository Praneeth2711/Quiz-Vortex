import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const Landing: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const signupRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const [signupOffset, setSignupOffset] = useState({ x: 0, y: 0 });
  const [loginOffset, setLoginOffset] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const offsetX = (e.clientX / window.innerWidth - 0.5) * 40;
      const offsetY = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x: offsetX, y: offsetY });
      setSignupOffset({ x: offsetX * 0.5, y: offsetY * 0.5 });
      setLoginOffset({ x: -offsetX * 0.5, y: -offsetY * 0.5 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const titleText = "THE ARENA OF";
  const subtitleText = "KNOWLEDGE";

  const charVariants = {
    hidden: { opacity: 0, y: 20, rotate: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    }),
    hover: {
      scale: 1.2,
      color: '#a78bfa',
      textShadow: '0 0 8px rgb(167, 139, 250)',
      transition: { duration: 0.3 },
    },
  };

  const floatingVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: i * 0.3,
      },
    }),
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl text-center z-10"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="inline-block px-5 py-2 mb-8 rounded-full glass border-indigo-500/30 text-indigo-400 text-[11px] font-bold tracking-[0.3em] uppercase backdrop-blur-xl"
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mr-2"
          >
            ●
          </motion.span>
          Hyper-Reality Trivia Experience
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] text-white select-none">
          <div className="flex justify-center flex-wrap">
            {titleText.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={char === " " ? "mr-4" : "cursor-pointer inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <br />
          <motion.span 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 100 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 block"
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {subtitleText}
            </motion.span>
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Transcend the ordinary. Join thousands in a high-stakes, real-time battle for dominance in the Vortex Arena.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div 
            ref={signupRef}
            animate={{ x: signupOffset.x, y: signupOffset.y }}
            transition={{ type: 'spring', stiffness: 500, damping: 50 }}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-300"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            />
            <Link 
              to="/signup" 
              className="group relative px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl transition-all shadow-[0_0_40px_rgba(99,102,241,0.4)] flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
              <span className="relative z-10">JOIN THE VORTEX</span>
              <motion.span 
                animate={{ x: [0, 8, 0], rotate: [0, 20, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl relative z-10"
              >
                🌪️
              </motion.span>
            </Link>
          </motion.div>
          <motion.div 
            ref={loginRef}
            animate={{ x: loginOffset.x, y: loginOffset.y }}
            transition={{ type: 'spring', stiffness: 500, damping: 50 }}
            whileHover={{ scale: 1.1, y: -5 }} 
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-50 blur transition duration-300"
            />
            <Link 
              to="/login" 
              className="relative px-12 py-5 glass text-white font-black rounded-2xl transition-all hover:bg-white/10 hover:border-indigo-500/50 border border-white/5 flex items-center gap-2"
            >
              <span className="relative z-10">LOGIN</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Geometric Particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          const colors = ['indigo', 'purple', 'pink', 'cyan', 'blue'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full bg-gradient-to-b from-${color}-500 to-transparent`}
              style={{ width: size, height: size }}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: [null, "-30vh"],
                x: [null, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 5 + Math.random() * 7, 
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeIn"
              }}
            />
          );
        })}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`orb-${i}`}
            className={`absolute rounded-full blur-3xl opacity-30`}
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${25 * i}%`,
              top: `${25 * i}%`,
            }}
            animate={{
              boxShadow: i === 0 
                ? ['0 0 40px rgba(99, 102, 241, 0.5)', '0 0 80px rgba(99, 102, 241, 0.8)', '0 0 40px rgba(99, 102, 241, 0.5)']
                : i === 1
                ? ['0 0 40px rgba(168, 85, 247, 0.5)', '0 0 80px rgba(168, 85, 247, 0.8)', '0 0 40px rgba(168, 85, 247, 0.5)']
                : ['0 0 40px rgba(236, 72, 153, 0.5)', '0 0 80px rgba(236, 72, 153, 0.8)', '0 0 40px rgba(236, 72, 153, 0.5)'],
              x: [0, 50 - i * 30, 0],
              y: [0, 50 - i * 30, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Landing;