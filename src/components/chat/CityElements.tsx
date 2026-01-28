"use client";

import React from "react";
import { motion } from "framer-motion";
import { Node, Stream } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Hexagon, Zap, Users, MessageSquare, Globe, Cpu, Radio } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface HexNodeProps {
  node: Node;
  x: number;
  y: number;
  zoom: number;
  isActive: boolean;
  onClick: () => void;
}

export const HexCityNode = ({ node, x, y, zoom, isActive, onClick }: HexNodeProps) => {
  const hexColor = node.hexColor || "#4B3FE2";
  const isPulsing = node.isPulsing || false;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: zoom,
        x: x,
        y: y,
      }}
      whileHover={{ scale: zoom * 1.05 }}
      className="absolute cursor-pointer group z-0"
      onClick={onClick}
    >
      {/* Dynamic Shimmer Background */}
      <motion.div 
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 blur-3xl rounded-full"
        style={{ backgroundColor: hexColor, transform: 'scale(1.5)' }}
      />

      {/* Hexagonal Structure with Shimmer */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(75,63,226,0.4)]">
          <defs>
            <linearGradient id={`shimmer-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={hexColor} stopOpacity="0.8">
                <animate attributeName="offset" values="-1; 2" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#fff" stopOpacity="0.9">
                <animate attributeName="offset" values="-0.5; 2.5" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={hexColor} stopOpacity="0.8">
                <animate attributeName="offset" values="0; 3" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="rgba(5, 5, 6, 0.9)"
            stroke={isActive ? "url(#shimmer-" + node.id + ")" : hexColor}
            strokeWidth={isActive ? "3" : "1.5"}
            className="transition-all duration-700"
          />
        </svg>

        {/* Orbiting Districts (Sub-nodes) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => {
            const angleOffset = (i * 120);
            return (
              <motion.div
                key={`district-${i}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px]"
                style={{ rotate: angleOffset }}
              >
                <motion.div 
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-sm bg-white/20 border border-white/40 rotate-45 backdrop-blur-sm"
                  style={{ borderColor: hexColor }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Node Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-all duration-500 shadow-lg",
            isActive ? "bg-white text-black" : "bg-black/40 text-white"
          )} style={{ color: isActive ? 'black' : hexColor }}>
            {node.icon === 'Zap' && <Zap size={20} />}
            {node.icon === 'Users' && <Users size={20} />}
            {!node.icon && <span className="text-xl font-black">{node.name.charAt(0)}</span>}
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest text-center line-clamp-1 w-full">
            {node.name}
          </span>
          <div className="flex items-center space-x-1 mt-1">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[7px] font-bold text-gray-500 uppercase tracking-tighter">
              {node.memberCount} Citizens
            </span>
          </div>
        </div>

        {/* Enhanced Orbiting Streams */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Inner Data Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] rounded-full border border-white/5"
          />
          
          {/* Outer Connection Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-30px] rounded-full border border-dashed border-white/10"
          />

          {/* Active Stream Packets */}
          {node.orbitingStreams?.map((streamId, i) => {
            const angle = (i * 137.5) % 360; // Golden angle for distribution
            const radius = 60 + (i * 15);
            const duration = 8 + (i * 4);
            
            return (
              <motion.div
                key={streamId}
                initial={{ rotate: angle }}
                animate={{ rotate: angle + 360 }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{ width: radius * 2, height: radius * 2, left: '50%', top: '50%', marginLeft: -radius, marginTop: -radius }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  {/* The Packet */}
                  <div 
                    className="w-1.5 h-1.5 rounded-full relative"
                    style={{ backgroundColor: hexColor }}
                  >
                    <div className="absolute inset-0 blur-sm animate-pulse" style={{ backgroundColor: hexColor }} />
                    {/* Tail Effect */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] h-12 origin-top opacity-40"
                      style={{ 
                        background: `linear-gradient(to bottom, ${hexColor}, transparent)`,
                        transform: 'rotate(180deg)'
                      }}
                    />
                  </div>
                  
                  {/* Stream Label (Visible on hover or when active) */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 whitespace-nowrap">
                      <span className="text-[6px] font-mono text-white uppercase tracking-tighter">Stream::{streamId.slice(0, 4)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Neural Pulses (Randomly appearing data packets) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              initial={{ rotate: Math.random() * 360, opacity: 0 }}
              animate={{ 
                rotate: [null, Math.random() * 360 + 360],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity, 
                repeatDelay: Math.random() * 5,
                ease: "easeInOut" 
              }}
              className="absolute inset-[-40px]"
            >
              <div 
                className="w-1 h-1 rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[1px]"
                style={{ backgroundColor: '#fff' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* District Pulse Lines (Visual only) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-[-40px] border border-dashed rounded-full pointer-events-none"
            style={{ borderColor: hexColor, opacity: 0.25 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

