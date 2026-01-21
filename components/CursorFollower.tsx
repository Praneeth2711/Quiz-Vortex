import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CursorFollower: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set timeout to stop moving after mouse is still
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Follower - Large Outer Ring */}
      <motion.div
        className="fixed pointer-events-none mix-blend-screen z-50"
        animate={{
          x: mousePos.x - 25,
          y: mousePos.y - 25,
          opacity: isMoving ? 1 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 50, mass: 0.5 }}
      >
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/30" />
      </motion.div>

      {/* Inner Cursor Follower - Smaller Center Dot */}
      <motion.div
        className="fixed pointer-events-none mix-blend-screen z-50"
        animate={{
          x: mousePos.x - 5,
          y: mousePos.y - 5,
          opacity: isMoving ? 1 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 60, mass: 0.3 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
      </motion.div>

      {/* Spotlight Effect */}
      <motion.div
        className="fixed pointer-events-none z-40"
        animate={{
          x: mousePos.x - 100,
          y: mousePos.y - 100,
          opacity: isMoving ? 0.1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 60 }}
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* Trail effect - multiple dots following */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="fixed pointer-events-none z-40"
          animate={{
            x: mousePos.x - 4,
            y: mousePos.y - 4,
            opacity: isMoving ? 0.1 - i * 0.02 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500 - i * 80,
            damping: 50,
            mass: 0.5 + i * 0.2,
          }}
        >
          <div
            className="w-2 h-2 rounded-full bg-purple-400"
            style={{ opacity: 0.3 - i * 0.05 }}
          />
        </motion.div>
      ))}

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CursorFollower;
