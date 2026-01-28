"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Command, Search, Bell, Settings, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const AetheryxCore = ({ active = false, status = "Idle" }: { active?: boolean, status?: string }) => {
  return (
    <div className="relative flex items-center justify-center pointer-events-none">
      {/* Outer Rings */}
      <motion.div 
        animate={{ rotate: 360, scale: active ? 1.25 : 1 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute w-56 h-56 border border-nexus-purple/10 rounded-full transition-all duration-700",
          active && "border-nexus-purple/30 scale-125 shadow-[0_0_30px_rgba(124,58,237,0.1)]"
        )}
      />
      <motion.div 
        animate={{ rotate: -360, scale: active ? 1.15 : 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-44 h-44 border border-nexus-cyan/10 rounded-full border-dashed"
      />
      
      {/* Inner Core */}
      <div className="relative w-28 h-28">
        <div className={cn(
          "absolute inset-0 bg-nexus-purple/20 blur-[60px] rounded-full transition-all duration-1000",
          active ? "opacity-100 scale-150" : "opacity-30 scale-100"
        )} />
        <motion.div
          animate={{ 
            scale: active ? [1, 1.1, 1] : [1, 1.05, 1],
            rotate: active ? [0, 90, 180, 270, 360] : 0,
          }}
          transition={{ 
            scale: { duration: active ? 2 : 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
          className="relative w-full h-full bg-gradient-to-br from-nexus-indigo via-nexus-purple to-nexus-magenta rounded-full shadow-[0_0_60px_rgba(124,58,237,0.4)] flex items-center justify-center overflow-hidden border border-white/20"
        >
          {/* Noise/Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
          <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
             <motion.div 
               animate={{ 
                 scale: active ? [1, 1.4, 1] : 1,
                 opacity: active ? [0.5, 1, 0.5] : 0.3
               }}
               transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
               className="w-8 h-8 bg-white/20 rounded-full blur-sm" 
             />
             <Sparkles size={20} className={cn("absolute text-white transition-all duration-500", active ? "scale-110 opacity-100" : "scale-100 opacity-50")} />
          </div>
        </motion.div>
      </div>

      {/* Status Text */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-20 text-center"
      >
        <div className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.6em] mb-1.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">AETHERYX</div>
        <div className="flex items-center justify-center space-x-2.5 px-4 py-1.5 glass-panel rounded-full border-white/5">
          <motion.div 
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.5, 1],
              backgroundColor: active ? ["#06B6D4", "#D946EF", "#06B6D4"] : ["#4B3FE2", "#7C3AED", "#4B3FE2"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
          />
          <span className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-[0.15em]">{status}</span>
        </div>
      </motion.div>
    </div>
  );
};

export const SpatialNotification = ({ message, type = 'info' }: { message: string, type?: 'info' | 'alert' | 'success' }) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 100, opacity: 0, scale: 0.9 }}
      className={cn(
        "px-6 py-4 rounded-2xl glass-panel border flex items-center space-x-5 shadow-2xl min-w-[320px]",
        type === 'info' ? "border-nexus-purple/20" : "border-rose-500/20"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
        type === 'info' ? "bg-gradient-to-br from-nexus-indigo to-nexus-purple" : "bg-gradient-to-br from-rose-600 to-rose-400"
      )}>
        {type === 'info' ? <Sparkles size={20} /> : <Zap size={20} />}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">System Packet</div>
          <div className="text-[8px] font-mono text-gray-600">JUST NOW</div>
        </div>
        <div className="text-[12px] text-white font-sans font-medium mt-1 leading-relaxed">{message}</div>
      </div>
    </motion.div>
  );
};

export const NexusOmniBar = () => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-6 border-white/10 shadow-2xl">
        <NavAction icon={<Command size={20} />} label="Command" />
        <div className="w-[1px] h-6 bg-white/10" />
        <NavAction icon={<Search size={20} />} label="Explore" />
        <NavAction icon={<Bell size={20} />} label="Activity" />
        <NavAction icon={<User size={20} />} label="Profile" />
        <NavAction icon={<Settings size={20} />} label="Nexus OS" />
      </div>
    </div>
  );
};

const NavAction = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex flex-col items-center group space-y-1">
    <div className="text-gray-400 group-hover:text-white transition-colors group-hover:scale-110 duration-200">
      {icon}
    </div>
    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </button>
);
