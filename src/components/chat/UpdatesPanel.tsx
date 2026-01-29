"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  X, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Bug, 
  Cpu,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface UpdateItem {
  type: "feature" | "fix" | "security";
  title: string;
  description: string;
}

const LATEST_UPDATES: UpdateItem[] = [
  {
    type: "feature",
    title: "Founder Authority Recognized",
    description: "System-wide recognition of the Founder role. Owners now have exclusive access to Studio OS and civilization management tools."
  },
  {
    type: "feature",
    title: "Real-time Neural Stream",
    description: "Data streams now synchronize instantly across the Nexus using the AETHERYX real-time protocol."
  },
  {
    type: "security",
    title: "Identity Recovery Protocol",
    description: "New decentralized password recovery system integrated. Access your account even if you lose your primary key."
  },
  {
    type: "fix",
    title: "Session Synchronization",
    description: "Resolved latency issues in multi-device session handling and improved persistent login stability."
  },
  {
    type: "fix",
    title: "Nexus App Flicker",
    description: "Fixed initialization sequence to prevent the landing page from appearing before identity verification."
  }
];

interface UpdatesPanelProps {
  onClose: () => void;
}

export const UpdatesPanel: React.FC<UpdatesPanelProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const getTypeIcon = (type: UpdateItem["type"]) => {
    switch (type) {
      case "feature": return <Zap size={16} className="text-nexus-indigo" />;
      case "fix": return <Bug size={16} className="text-pink-500" />;
      case "security": return <ShieldCheck size={16} className="text-emerald-500" />;
    }
  };

  const getTypeLabel = (type: UpdateItem["type"]) => {
    switch (type) {
      case "feature": return "SYSTEM ENHANCEMENT";
      case "fix": return "BUG SUPPRESSION";
      case "security": return "IDENTITY SECURITY";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative w-full max-w-2xl bg-nexus-dark/80 border border-nexus-indigo/30 rounded-3xl overflow-hidden nexus-glow"
      >
        {/* Background Grid/Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nexus-indigo to-transparent opacity-50" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-nexus-indigo/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Header */}
        <div className="relative p-6 border-b border-nexus-border flex justify-between items-center bg-nexus-card/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-nexus-indigo/20 rounded-xl">
              <Sparkles size={20} className="text-nexus-indigo" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">SYSTEM UPDATE</h2>
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <Terminal size={10} />
                <span>VERSION 2.0.5 // BUILD_SUCCESS</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {LATEST_UPDATES.map((update, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-nexus-indigo/30 transition-all"
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    {getTypeIcon(update.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                        {getTypeLabel(update.type)}
                      </span>
                      <div className="h-[1px] w-4 bg-nexus-indigo/30" />
                    </div>
                    <h3 className="font-bold text-white group-hover:text-nexus-indigo transition-colors">
                      {update.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {update.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-nexus-indigo/5 border border-nexus-indigo/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-nexus-indigo/10 rounded-full">
                <Cpu size={24} className="text-nexus-indigo" />
              </div>
              <div>
                <h4 className="font-bold text-sm">AETHERYX CORE UPGRADED</h4>
                <p className="text-xs text-gray-500">Neural processing efficiency increased by 14%</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-nexus-indigo hover:underline">
              LOGS <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="relative p-6 bg-nexus-card/50 border-t border-nexus-border flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-nexus-indigo hover:bg-nexus-indigo/90 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95 flex items-center gap-2"
          >
            ACKNOWLEDGE <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
