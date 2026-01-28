"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AetheryxOrbProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

export const AetheryxOrb = ({ size = 100, isActive = true, className }: AetheryxOrbProps) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Atmospheric Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-nexus-cyan blur-3xl"
      />

      {/* Breathing Core */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
          rotate: isActive ? [0, 90, 180, 270, 360] : 0,
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Geometric Shifting Shapes */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
          <defs>
            <linearGradient id="aetheryx-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#4B3FE2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Inner Hexagon */}
          <motion.polygon
            points="50,10 85,30 85,70 50,90 15,70 15,30"
            fill="none"
            stroke="url(#aetheryx-grad)"
            strokeWidth="1"
            filter="url(#glow)"
            animate={{
              strokeDasharray: ["0, 300", "300, 0", "0, 300"],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Rotating Rings */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="0.5"
            strokeDasharray="10 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#4B3FE2"
            strokeWidth="0.5"
            strokeDasharray="5 15"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Central Core Sparkle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-nexus-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          >
            <Sparkles size={size * 0.3} />
          </motion.div>
        </div>
      </motion.div>

      {/* Particle Trails */}
      {isActive && [...Array(8)].map((_, i) => (
        <AetheryxParticle key={i} size={size} index={i} />
      ))}
    </div>
  );
};

const AetheryxParticle = ({ size, index }: { size: number; index: number }) => {
  const angle = (index / 8) * Math.PI * 2;
  const radius = size * 0.45;
  
  return (
    <motion.div
      initial={{ 
        x: Math.cos(angle) * radius, 
        y: Math.sin(angle) * radius,
        opacity: 0,
        scale: 0
      }}
      animate={{
        x: [Math.cos(angle) * radius, Math.cos(angle) * (radius + 20)],
        y: [Math.sin(angle) * radius, Math.sin(angle) * (radius + 20)],
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeOut"
      }}
      className="absolute w-1 h-1 bg-nexus-cyan rounded-full blur-[1px]"
    />
  );
};
