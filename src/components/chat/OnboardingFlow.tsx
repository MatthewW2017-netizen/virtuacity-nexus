"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, ChevronRight, Layout, Globe, Command, Cpu, Box } from "lucide-react";

interface Step {
  title: string;
  content: string;
  icon: React.ReactNode;
  hint: string;
}

const ONBOARDING_STEPS: Step[] = [
  {
    title: "System Initialization",
    content: "I am AETHERYX, your spatial intelligence guide. Welcome to VirtuaCity Nexus—the first cinematic operating system for the decentralized world.",
    icon: <Sparkles className="w-12 h-12 text-nexus-indigo" />,
    hint: "Click 'Next' to calibrate your neural link."
  },
  {
    title: "The Infinite Grid",
    content: "The background is an infinite canvas. Cities are living nodes. Drag to navigate, and use CTRL + Scroll to zoom in on the civilization data streams.",
    icon: <Globe className="w-12 h-12 text-nexus-cyan" />,
    hint: "Try zooming in once we finish calibration."
  },
  {
    title: "Workspace Spaces",
    content: "Use the sidebar on the left to switch between 'Spaces'. Each space is a pre-configured desk for Social, AI Research, or City Building.",
    icon: <Layout className="w-12 h-12 text-nexus-purple" />,
    hint: "Look for the Users and Wrench icons on the left."
  },
  {
    title: "The Command Bar",
    content: "The top bar is your universal interface. Press '/' to search for cities, open panels, or give me direct synthesis commands.",
    icon: <Command className="w-12 h-12 text-white" />,
    hint: "Type '/help' once you are inside."
  },
  {
    title: "Modular Windowing",
    content: "Every tool is a 'Module'. Drag them to move, resize them to focus, or stack them on top of each other to create multi-tab workspaces.",
    icon: <Box className="w-12 h-12 text-nexus-indigo" />,
    hint: "Organization is the key to architecture."
  }
];

export const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center pointer-events-none p-4">
      {/* Dimmed Background with Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#050506]/80 backdrop-blur-xl pointer-events-auto"
      />

      {/* Onboarding Card - Professional Glassmorphism */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl bg-black/40 border border-white/10 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden"
      >
        {/* Animated Background Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-64 h-64 bg-nexus-indigo/20 blur-[100px] rounded-full" 
        />
        
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8 p-6 bg-white/5 rounded-[2rem] border border-white/5 shadow-inner"
            >
              {step.icon}
            </motion.div>
            
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-nexus-indigo animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-nexus-indigo/80">
                Aetheryx Neural Sync // {currentStep + 1}.0
              </span>
            </div>

            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">
              {step.title}
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium max-w-md">
              {step.content}
            </p>

            {/* Hint Box */}
            <div className="px-4 py-2 bg-nexus-indigo/5 border border-nexus-indigo/10 rounded-xl mb-12">
              <p className="text-[10px] font-bold text-nexus-indigo uppercase tracking-widest italic">
                {step.hint}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {ONBOARDING_STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentStep ? "w-10 bg-nexus-indigo shadow-[0_0_10px_#4b3fe2]" : "w-3 bg-white/10"
                  }`} 
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="group flex items-center space-x-3 bg-nexus-indigo hover:bg-nexus-indigo-light text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(75,63,226,0.4)] active:scale-95"
            >
              <span>{currentStep === ONBOARDING_STEPS.length - 1 ? "Begin Synthesis" : "Continue"}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Skip Button - Subtle */}
        <button 
          onClick={onComplete}
          className="absolute top-8 right-8 text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group"
        >
          Skip Initialization <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
