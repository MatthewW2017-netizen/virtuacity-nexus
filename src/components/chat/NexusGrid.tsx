"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { 
  X, 
  Minus, 
  Maximize2, 
  Pin, 
  MoreHorizontal, 
  GripHorizontal,
  Command as CommandIcon,
  Search,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Panel } from "@/types/chat";

interface PanelProps {
  panel: Panel;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onToggleFocus?: (id: string) => void;
  onResize: (id: string, width: number, height: number) => void;
  onMove: (id: string, x: number, y: number) => void;
  onStack: (sourceId: string, targetId: string) => void;
  onTabChange: (panelId: string, tabId: string) => void;
  isPulsing?: boolean;
  isDimmed?: boolean;
  isFocused?: boolean;
  children: React.ReactNode;
}

const SNAP_SPRING = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 1.5,
  velocity: 2
} as const;

export const NexusPanel = ({ 
  panel, onClose, onMinimize, onFocus, onToggleFocus, onResize, onMove, onStack, onTabChange, isPulsing, isDimmed, isFocused, children 
}: PanelProps) => {
  const dragControls = useDragControls();
  const [isResizing, setIsResizing] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = panel.width;
    const startHeight = panel.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(200, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(150, startHeight + (moveEvent.clientY - startY));
      onResize(panel.id, newWidth, newHeight);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <motion.div
      ref={panelRef}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ 
        opacity: 0, 
        scale: 0.8, 
        x: panel.x, 
        y: panel.y,
        clipPath: "inset(50% 50% 50% 50%)" 
      }}
      animate={{ 
        opacity: panel.isMinimized ? 0 : 1, 
        scale: panel.isMinimized ? 0.8 : 1,
        x: panel.x,
        y: panel.y,
        zIndex: isFocused ? 1000 : panel.zIndex,
        width: panel.width,
        height: panel.height,
        clipPath: panel.isMinimized ? "inset(50% 50% 50% 50%)" : "inset(0% 0% 0% 0%)",
        filter: (isSnapping || isPulsing) 
          ? "brightness(1.5) saturate(1.2) blur(0px)" 
          : (isDimmed && !isFocused)
            ? "brightness(0.4) saturate(0.6) blur(4px)" 
            : "brightness(1) saturate(1) blur(0px)",
        boxShadow: isFocused 
          ? "0 0 100px rgba(75,63,226,0.3)" 
          : isPulsing 
            ? "0 0 50px rgba(75,63,226,0.4)" 
            : "0 0 0px rgba(0,0,0,0)"
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.5,
        clipPath: "inset(50% 50% 50% 50%)",
        transition: { duration: 0.3 }
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8,
        opacity: { duration: 0.2 },
        clipPath: { duration: 0.5, ease: "circOut" },
        x: isSnapping ? SNAP_SPRING : { type: "spring", stiffness: 400, damping: 40 },
        y: isSnapping ? SNAP_SPRING : { type: "spring", stiffness: 400, damping: 40 },
        filter: { duration: 0.4 }
      }}
      onDragEnd={(event, info) => {
        const threshold = 60; // Increased threshold for magnetic feel
        const gridSize = 20;
        
        let finalX = panel.x + info.offset.x;
        let finalY = panel.y + info.offset.y;
        let snapped = false;

        // Soft Grid Snapping
        const gridX = Math.round(finalX / gridSize) * gridSize;
        const gridY = Math.round(finalY / gridSize) * gridSize;
        
        if (Math.abs(finalX - gridX) < 10) {
          finalX = gridX;
          snapped = true;
        }
        if (Math.abs(finalY - gridY) < 10) {
          finalY = gridY;
          snapped = true;
        }

        // Screen Boundaries Magnetic Pull
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        if (Math.abs(finalX) < threshold) { finalX = 0; snapped = true; }
        if (Math.abs(finalY) < threshold) { finalY = 0; snapped = true; }
        if (Math.abs(screenW - (finalX + panel.width)) < threshold) { finalX = screenW - panel.width; snapped = true; }
        if (Math.abs(screenH - (finalY + panel.height)) < threshold) { finalY = screenH - panel.height; snapped = true; }

        // Center Snapping
        if (Math.abs(finalX + panel.width / 2 - screenW / 2) < threshold) {
          finalX = screenW / 2 - panel.width / 2;
          snapped = true;
        }
        if (Math.abs(finalY + panel.height / 2 - screenH / 2) < threshold) {
          finalY = screenH / 2 - panel.height / 2;
          snapped = true;
        }

        if (snapped) {
          setIsSnapping(true);
          setTimeout(() => setIsSnapping(false), 500);
        }

        onMove(panel.id, finalX, finalY);
      }}
      onPointerDown={() => onFocus(panel.id)}
      className={cn(
        "absolute glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl",
        panel.isMinimized && "pointer-events-none",
        isResizing ? "ring-2 ring-nexus-indigo/50 shadow-nexus-indigo/20" : "hover:shadow-[0_0_30px_rgba(75,63,226,0.1)]",
        isDimmed && "pointer-events-none" // Optional: make inactive panels un-interactable until clicked
      )}
    >
      {/* Glow Edges */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-2xl z-50 group-hover:ring-white/20 transition-all duration-500" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.05] to-transparent z-50" />

      {/* Panel Header */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="h-11 px-4 flex items-center justify-between bg-white/[0.02] border-b border-white/5 cursor-grab active:cursor-grabbing select-none relative z-50 group/header"
      >
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar max-w-[70%]">
          {/* Main Panel Title or Tabs */}
          {!panel.tabs || panel.tabs.length === 0 ? (
            <div className="flex items-center space-x-2.5 whitespace-nowrap">
              <div className="w-1 h-1 rounded-full bg-nexus-indigo shadow-[0_0_8px_#4B3FE2]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover/header:text-white/80 transition-colors duration-300">
                {panel.title}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              {panel.tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabChange(panel.id, tab.id);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap border",
                    panel.activeTabId === tab.id 
                      ? "bg-nexus-indigo/10 text-white border-nexus-indigo/30 shadow-[0_0_15px_rgba(75,63,226,0.1)]" 
                      : "text-white/30 border-transparent hover:text-white/60 hover:bg-white/5"
                  )}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 ml-2 opacity-40 group-hover/header:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onToggleFocus?.(panel.id)} 
            className={cn(
              "p-1.5 rounded-lg transition-all",
              isFocused ? "bg-nexus-indigo text-white shadow-[0_0_10px_rgba(75,63,226,0.4)]" : "hover:bg-white/10 text-gray-500 hover:text-white"
            )}
            title="Focus View"
          >
            <Maximize2 size={12} />
          </button>
          <button 
            onClick={() => onMinimize(panel.id)} 
            className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-500 hover:text-white"
            title="Minimize"
          >
            <Minus size={12} />
          </button>
          <button 
            onClick={() => onClose(panel.id)} 
            className="p-1.5 hover:bg-rose-500/20 rounded-lg transition-all text-gray-500 hover:text-rose-500"
            title="Close Module"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Resize Handle */}
      <div 
        onMouseDown={handleResizeStart}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 group"
      >
        <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-nexus-indigo transition-colors" />
      </div>
    </motion.div>
  );
};

export const UniversalCommandBar = ({ onCommand }: { onCommand: (cmd: string) => void }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    { cmd: "/space studio", desc: "Switch to Creative Studio", preview: "✨ Orbital Transition" },
    { cmd: "/space social", desc: "Switch to Social Space", preview: "👥 Nexus Plaza" },
    { cmd: "/space creator", desc: "Switch to Creator Workspace", preview: "🛠️ Synthesis Lab" },
    { cmd: "/space gaming", desc: "Switch to Gaming Zone", preview: "🎮 Sector 7 Map" },
    { cmd: "/space ai", desc: "Switch to AI Research", preview: "🧠 Neural Core" },
    { cmd: "/space governance", desc: "Switch to Trust & Safety", preview: "🛡️ Safety Portal" },
    { cmd: "/open chat", desc: "Open new data stream", preview: "📡 New Signal" },
    { cmd: "/open forge", desc: "Open Bot Forge", preview: "🤖 Agent Factory" },
    { cmd: "/tile", desc: "Auto-arrange active panels", preview: "📐 Grid Matrix" },
    { cmd: "/cascade", desc: "Stack panels diagonally", preview: "🌊 Flow Layout" },
    { cmd: "/summon", desc: "Call AETHERYX to center", preview: "🌌 Focus Core" },
    { cmd: "/clear", desc: "Close all active panels", preview: "🧹 Void Pulse" },
  ];

  const filteredSuggestions = value.startsWith("/") 
    ? suggestions.filter(s => s.cmd.toLowerCase().includes(value.toLowerCase()))
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onCommand(value);
      setValue("");
    }
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-2xl px-4">
      <motion.form
        onSubmit={handleSubmit}
        animate={{
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused ? "0 0 50px rgba(124, 58, 237, 0.2)" : "0 0 20px rgba(0,0,0,0.4)",
        }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-indigo via-nexus-purple to-nexus-cyan rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-700"></div>
        <div className="relative flex items-center bg-nexus-dark/90 backdrop-blur-3xl border border-white/10 rounded-2xl px-6 py-4 overflow-hidden">
          {/* Animated Neon Underline */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isFocused ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-nexus-indigo to-transparent origin-center z-10"
          />
          
          <CommandIcon size={20} className={cn("transition-colors duration-300 mr-4", isFocused ? "text-nexus-indigo" : "text-gray-500")} />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Summon AETHERYX or execute command... (Type '/')"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm font-header font-medium tracking-tight"
          />
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md">
              <span className="text-[9px] text-gray-500 font-mono font-bold uppercase tracking-widest">CMD</span>
              <span className="text-[9px] text-gray-500 font-mono font-bold">K</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-nexus-indigo/10 flex items-center justify-center border border-nexus-indigo/20 group-hover:border-nexus-indigo/50 transition-colors">
              <Sparkles size={16} className="text-nexus-indigo animate-pulse" />
            </div>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isFocused && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute top-full left-0 w-full mt-2 glass-panel rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-2 space-y-1">
                {filteredSuggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onCommand(s.cmd);
                      setValue("");
                    }}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 rounded-xl transition-all group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-start">
                        <span className="text-nexus-cyan font-mono text-[12px] font-bold">{s.cmd}</span>
                        <span className="text-gray-400 text-[9px] font-sans font-bold uppercase tracking-[0.1em] mt-0.5">{s.desc}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="px-2 py-1 rounded bg-nexus-indigo/10 border border-nexus-indigo/20 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-[10px] text-nexus-indigo font-bold whitespace-nowrap">{s.preview}</span>
                      </div>
                      <div className="flex items-center space-x-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] text-gray-500 font-mono">ENTER</span>
                        <Search size={12} className="text-nexus-cyan" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};
