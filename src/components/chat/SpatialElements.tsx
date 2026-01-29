"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Command, Search, Bell, Settings, User, Zap, ShieldAlert, X } from "lucide-react";
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

export const SpatialNotification = ({ 
  notification, 
  onClose 
}: { 
  notification: { id: string, message: string, type: 'info' | 'alert' | 'high-alert' }, 
  onClose: () => void 
}) => {
  const isHighAlert = notification.type === 'high-alert';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={cn(
        "p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center space-x-4 min-w-[300px] pointer-events-auto",
        isHighAlert 
          ? "bg-red-500/10 border-red-500/30 text-red-500"
          : notification.type === 'alert' 
            ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
            : "bg-nexus-indigo/10 border-nexus-indigo/30 text-nexus-indigo"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-lg",
        isHighAlert 
          ? "bg-red-500/20 border-red-500/40"
          : notification.type === 'alert' 
            ? "bg-amber-500/20 border-amber-500/40" 
            : "bg-nexus-indigo/20 border-nexus-indigo/40"
      )}>
        {isHighAlert ? <ShieldAlert size={20} className="animate-pulse" /> : notification.type === 'alert' ? <ShieldAlert size={20} /> : <Zap size={20} />}
      </div>
      <div className="flex-1">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">
          {isHighAlert ? "Critical Priority" : notification.type === 'alert' ? "Security Alert" : "Nexus Update"}
        </h4>
        <p className="text-[11px] font-medium opacity-80">{notification.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors shrink-0"
      >
        <X size={14} />
      </button>

      {isHighAlert && (
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-red-500/50"
          animate={{ opacity: [0, 0.5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
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
