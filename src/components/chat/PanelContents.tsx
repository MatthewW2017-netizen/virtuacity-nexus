"use client";

import React from "react";
import { Message, User, Stream, Node, BotModule, District } from "@/types/chat";
import { MOCK_NODES } from "@/lib/mockData";
import { 
  Hash, Volume2, Megaphone, Sparkles, Send, MessageSquare, Share2, 
  Layers, Cpu, Zap, Shield, Music, BarChart, Settings, Plus, Activity, 
  Search, Folder, Image as ImageIcon, FileCode, Play, Palette, 
  Box as BoxIcon, Scissors, Type, Download, Globe, Mic, CheckCircle2,
  Circle, Clock, MoreHorizontal, ExternalLink, RefreshCw,
  Cloud, Terminal, Code, ChevronLeft, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dataService } from "@/lib/dataService";
import { motion, AnimatePresence } from "framer-motion";

// ... existing components ...

const HolographicDisplay = ({ color, icon: IconName, name, isSmall = false }: { color: string, icon: string, name: string, isSmall?: boolean }) => {
  const iconMap: Record<string, any> = {
    Zap, Cpu, Shield, Palette, BarChart, Globe, MessageSquare, Sparkles, Box: BoxIcon, Activity, Music, Megaphone, Volume2, Hash
  };
  const Icon = iconMap[IconName] || Zap;
  
  return (
    <div className={cn("relative flex items-center justify-center shrink-0", isSmall ? "w-16 h-16" : "w-32 h-32")}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-dashed rounded-full opacity-20"
        style={{ borderColor: color }}
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 border border-dashed rounded-full opacity-10"
        style={{ borderColor: color }}
      />
      <div className={cn("relative z-10 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl", isSmall ? "w-12 h-12" : "w-20 h-20")}>
        <Icon size={isSmall ? 20 : 32} style={{ color }} />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white/5 rounded-2xl"
        />
      </div>
      
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 blur-[30px] opacity-20 rounded-full pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export const AssetLibraryPanel = ({ onInject }: { onInject?: (id: string, x: number, y: number) => void }) => {
  const assets = [
    { id: 'a1', name: 'Nexus_Core_v2.obj', type: 'model', size: '12.4MB', color: 'text-blue-400' },
    { id: 'a2', name: 'Aether_Texture.png', type: 'texture', size: '2.1MB', color: 'text-purple-400' },
    { id: 'a3', name: 'Grid_Shader.glsl', type: 'shader', size: '45KB', color: 'text-emerald-400' },
    { id: 'a4', name: 'Ambient_Void.mp3', type: 'audio', size: '5.8MB', color: 'text-amber-400' },
  ];

  return (
    <div className="p-0 h-full flex flex-col bg-black/40">
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Asset Library</h3>
          <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Project: VirtuaCity Core</p>
        </div>
        <Folder size={16} className="text-nexus-indigo" />
      </div>

      <div className="p-4 border-b border-white/5 flex items-center space-x-2">
        <div className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 flex items-center border border-white/5">
          <Search size={12} className="text-gray-600 mr-2" />
          <input type="text" placeholder="Search assets..." className="bg-transparent border-none outline-none text-[10px] text-white placeholder-gray-700 w-full" />
        </div>
        <button className="p-1.5 rounded-lg bg-white/5 text-gray-500 hover:text-white transition-colors">
          <Plus size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="grid grid-cols-1 gap-2">
          {assets.map((asset) => (
            <motion.div 
              key={asset.id} 
              drag
              dragSnapToOrigin
              whileDrag={{ 
                scale: 1.1, 
                zIndex: 100,
                filter: "drop-shadow(0 0 15px rgba(75,63,226,0.4))"
              }}
              onDragEnd={(event, info) => {
                onInject?.(asset.id, info.point.x, info.point.y);
              }}
              className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group flex items-center justify-between cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center space-x-3 pointer-events-none">
                <div className={cn("w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center", asset.color)}>
                  {asset.type === 'model' && <BoxIcon size={14} />}
                  {asset.type === 'texture' && <ImageIcon size={14} />}
                  {asset.type === 'shader' && <FileCode size={14} />}
                  {asset.type === 'audio' && <Play size={14} />}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors">{asset.name}</div>
                  <div className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{asset.type} • {asset.size}</div>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-nexus-indigo transition-all pointer-events-auto">
                <Download size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CreatorToolsPanel = ({ onInject }: { onInject?: (id: string, x: number, y: number) => void }) => {
  const tools = [
    { id: 't1', icon: <Palette size={18} />, name: 'Styling', desc: 'CSS-in-Nexus Grid' },
    { id: 't2', icon: <BoxIcon size={18} />, name: 'Geometry', desc: '3D Node Mesh' },
    { id: 't3', icon: <Scissors size={18} />, name: 'Logic', desc: 'Flow Sequencer' },
    { id: 't4', icon: <Type size={18} />, name: 'Typography', desc: 'Aether Fonts' },
    { id: 't5', icon: <Globe size={18} />, name: 'World', desc: 'Spatial Rules' },
  ];

  return (
    <div className="p-0 h-full flex flex-col bg-black/40">
      <div className="p-6 border-b border-white/5 bg-white/5">
        <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Creator Tools</h3>
        <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Visual Scripting & Design</p>
      </div>

      <div className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <motion.button 
              key={i} 
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.1, zIndex: 100 }}
              onDragEnd={(event, info) => {
                onInject?.(tool.id, info.point.x, info.point.y);
              }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-nexus-indigo/50 hover:bg-nexus-indigo/5 transition-all group cursor-grab active:cursor-grabbing"
            >
              <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-gray-500 group-hover:text-nexus-indigo group-hover:scale-110 transition-all mb-4 shadow-xl pointer-events-none">
                {tool.icon}
              </div>
              <div className="text-[11px] font-black text-white uppercase tracking-widest mb-1 pointer-events-none">{tool.name}</div>
              <div className="text-[8px] text-gray-600 font-bold uppercase tracking-tighter pointer-events-none">{tool.desc}</div>
            </motion.button>
          ))}
          <button className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-white/5 hover:border-nexus-indigo/20 transition-all group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-nexus-indigo transition-colors">
              <Plus size={18} />
            </div>
          </button>
        </div>

        {/* Visual Scripting Simulation */}
        <div className="pt-4 border-t border-white/5">
          <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-4 flex items-center">
            <Share2 size={10} className="mr-2" />
            Active Logic Flow
          </h4>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-24 p-2 rounded bg-nexus-indigo/20 border border-nexus-indigo/30 text-center">
                <span className="text-[8px] font-bold text-nexus-indigo uppercase">OnMessage</span>
              </div>
              <div className="flex-1 h-[1px] bg-white/10 relative">
                <motion.div 
                  animate={{ left: ["0%", "100%"] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-nexus-indigo rounded-full shadow-[0_0_5px_#4b3fe2]"
                />
              </div>
              <div className="w-24 p-2 rounded bg-white/5 border border-white/10 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase">FilterAI</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 ml-8">
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex-1" />
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-24 p-2 rounded bg-white/5 border border-white/10 text-center">
                <span className="text-[8px] font-bold text-gray-400 uppercase">Aetheryx</span>
              </div>
              <div className="flex-1 h-[1px] bg-white/10 relative">
                 <motion.div 
                  animate={{ left: ["0%", "100%"] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
                />
              </div>
              <div className="w-24 p-2 rounded bg-emerald-500/20 border border-emerald-500/30 text-center">
                <span className="text-[8px] font-bold text-emerald-500 uppercase">Synthesis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NeuralGraphPanel = () => {
  const [activePulse, setActivePulse] = React.useState<string | null>(null);
  
  const nodes = [
    { id: 'n1', label: 'Logic Core', x: '25%', y: '25%', color: 'bg-blue-500', icon: <Cpu size={16} /> },
    { id: 'n2', label: 'Context', x: '75%', y: '35%', color: 'bg-purple-500', icon: <Sparkles size={16} /> },
    { id: 'n3', label: 'Memory', x: '35%', y: '75%', color: 'bg-emerald-500', icon: <Layers size={16} /> },
    { id: 'n4', label: 'Synthesis', x: '65%', y: '75%', color: 'bg-nexus-indigo', icon: <Zap size={16} /> },
  ];

  const connections = [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n2', to: 'n4' },
    { from: 'n3', to: 'n4' },
    { from: 'n1', to: 'n4' },
  ];

  return (
    <div className="p-0 h-full flex flex-col bg-black/60 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(75,63,226,0.1),transparent)] pointer-events-none" />
      
      <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md relative z-20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Neural Graph</h3>
            <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">AETHERYX Cognitive Map // Active</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-nexus-indigo animate-pulse" />
            <span className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest">Live Sync</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden group">
        {/* Dynamic Background Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(75,63,226,0.1)" />
              <stop offset="50%" stopColor="rgba(75,63,226,0.4)" />
              <stop offset="100%" stopColor="rgba(75,63,226,0.1)" />
            </linearGradient>
          </defs>
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <g key={i}>
                <line 
                  x1={fromNode.x} y1={fromNode.y} 
                  x2={toNode.x} y2={toNode.y} 
                  stroke="url(#lineGrad)" 
                  strokeWidth="1" 
                />
                <motion.circle
                  r="2"
                  fill="#4b3fe2"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                  style={{ offsetPath: `path('M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}')` }}
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            style={{ left: node.x, top: node.y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, zIndex: 30 }}
            onClick={() => setActivePulse(node.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
          >
            <div className="relative">
              {/* Outer Ring */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn("absolute -inset-4 rounded-full border border-current opacity-20", node.color.replace('bg-', 'text-'))}
              />
              
              {/* Core Node */}
              <div className={cn("w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group/node transition-all", node.color)}>
                <div className="absolute inset-0 bg-black/20 group-hover/node:bg-transparent transition-colors" />
                <div className="relative z-10 text-white drop-shadow-md">
                  {node.icon}
                </div>
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <div className="text-[6px] font-black text-white/80 uppercase tracking-tighter">{node.label}</div>
                </div>

                {/* Internal Glow */}
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-white opacity-20"
                />
              </div>

              {/* Data Tooltip (Hover) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl min-w-[120px] shadow-2xl">
                  <div className="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-1">Status: Operational</div>
                  <div className="text-[9px] font-bold text-white uppercase">Load: {Math.floor(Math.random() * 40) + 60}%</div>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={cn("h-full w-[75%]", node.color)} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="p-6 bg-white/5 border-t border-white/5 backdrop-blur-md relative z-20">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Synthesis Load</span>
              <span className="text-[10px] font-black text-white uppercase">84.2%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: "84.2%" }}
                className="h-full bg-nexus-indigo shadow-[0_0_10px_#4b3fe2]"
              />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Neural Stability</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">99.9%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: "99.9%" }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TacticalMapPanel = () => {
  const [activeSector, setActiveSector] = React.useState<number | null>(null);

  return (
    <div className="p-0 h-full flex flex-col bg-black/60 overflow-hidden relative font-mono">
      {/* HUD Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-50 opacity-20" />
      
      <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between relative z-20">
        <div>
          <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Tactical Map</h3>
          <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Operation: Nexus Grid // Sector 7</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] font-black text-white">23:44:12</div>
          <div className="text-[7px] text-gray-600 font-bold uppercase tracking-widest">Local Nexus Time</div>
        </div>
      </div>

      <div className="flex-1 p-4 relative group">
        {/* Radar Ping Effect */}
        <motion.div
          animate={{ scale: [0, 4], opacity: [0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-nexus-indigo/30 rounded-full pointer-events-none"
        />

        {/* Grid Background */}
        <div className="absolute inset-4 border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        
        {/* Map Elements */}
        <div className="relative h-full flex flex-col">
          <div className="flex-1 grid grid-cols-6 grid-rows-6 gap-1 opacity-80">
            {[...Array(36)].map((_, i) => (
              <motion.div 
                key={i} 
                onMouseEnter={() => setActiveSector(i)}
                whileHover={{ backgroundColor: "rgba(75,63,226,0.1)", borderColor: "rgba(75,63,226,0.3)" }}
                className="border border-white/5 rounded-sm flex items-center justify-center relative cursor-crosshair group/sector"
              >
                {i === 14 && <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-red-500 rotate-45 shadow-[0_0_10px_#ef4444]" />}
                {i === 21 && <div className="w-2 h-2 bg-nexus-indigo rounded-full shadow-[0_0_10px_#4b3fe2]" />}
                {i === 7 && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm" />}
                {i === 28 && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />}

                {/* Sector Coordinates */}
                <div className="absolute bottom-0.5 right-0.5 text-[5px] text-white/10 group-hover/sector:text-white/40 transition-colors">
                  {Math.floor(i / 6)}:{i % 6}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Sector Readout */}
          <AnimatePresence>
            {activeSector !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-24 right-4 bg-black/90 border border-nexus-indigo/30 p-4 rounded-xl backdrop-blur-xl w-48 shadow-2xl z-30"
              >
                <div className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span>Sector {Math.floor(activeSector / 6)}:{activeSector % 6}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-nexus-indigo animate-ping" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[7px] font-bold text-gray-500 uppercase">
                    <span>Elevation</span>
                    <span className="text-white">124.2m</span>
                  </div>
                  <div className="flex justify-between text-[7px] font-bold text-gray-500 uppercase">
                    <span>Density</span>
                    <span className="text-white">84% Neural</span>
                  </div>
                  <div className="flex justify-between text-[7px] font-bold text-gray-500 uppercase">
                    <span>Threat</span>
                    <span className="text-emerald-500">None</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Sector Status', val: 'Secured', color: 'text-emerald-500' },
              { label: 'Active Units', val: '24 / 32', color: 'text-white' },
              { label: 'Synthesis', val: 'Operational', color: 'text-nexus-indigo' },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-black/60 border border-white/5 rounded-xl text-center">
                <div className="text-[7px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className={cn("text-[10px] font-black uppercase tracking-tighter", stat.color)}>{stat.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Control Bar */}
      <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-white transition-colors"><Search size={14} /></button>
          <button className="text-gray-500 hover:text-white transition-colors"><Shield size={14} /></button>
          <button className="text-nexus-indigo"><Zap size={14} /></button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-nexus-indigo opacity-50" />
          </div>
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Scanning...</span>
        </div>
      </div>
    </div>
  );
};

export const ProfilePanel = ({ 
  user, 
  activeNodeId, 
  currentUserRole 
}: { 
  user: User, 
  activeNodeId?: string, 
  currentUserRole?: 'Architect' | 'Founder' | 'Citizen' 
}) => {
  const activeCityName = activeNodeId ? MOCK_NODES.find(n => n.id === activeNodeId)?.name : "Nexus Central";
  
  return (
    <div className="p-0 h-full flex flex-col bg-black/40 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-nexus-indigo/40 to-purple-900/40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nexus-indigo to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-24 h-24 rounded-2xl bg-black flex items-center justify-center border-2 border-white/10 overflow-hidden">
              <span className="text-4xl font-black text-white">{user.name.charAt(0)}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-[#050506]" />
          </div>
          <div className="mb-4">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{user.name}</h3>
            <p className="text-[10px] text-nexus-indigo font-black uppercase tracking-[0.3em]">@{user.username} // IDENTITY_VERIFIED</p>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-16 p-8 space-y-8 overflow-y-auto no-scrollbar">
        {/* City Specific Role Badge */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-1">Active Sector</div>
            <div className="text-[11px] font-black text-white uppercase tracking-tighter">{activeCityName}</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-1">City Role</div>
            <div className={cn(
              "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
              currentUserRole === 'Architect' ? "text-nexus-indigo border-nexus-indigo/30 bg-nexus-indigo/10" :
              currentUserRole === 'Founder' ? "text-amber-500 border-amber-500/30 bg-amber-500/10" :
              "text-gray-400 border-white/10 bg-white/5"
            )}>
              {currentUserRole || 'Citizen'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Reputation', value: '4.8k', color: 'text-blue-400' },
            { label: 'Nodes', value: '12', color: 'text-purple-400' },
            { label: 'Synthesis', value: '98%', color: 'text-emerald-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
              <div className={cn("text-lg font-black", stat.color)}>{stat.value}</div>
              <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center">
            <Activity size={12} className="mr-2 text-nexus-indigo" />
            Neural Activity
          </h4>
          <div className="space-y-2">
            {[
              "Synchronized with Node: AI Research",
              "Modified Logic Flow in Creator Workspace",
              "New Asset Uploaded: Nexus_Core_v2.obj",
            ].map((activity, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] text-gray-400 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-nexus-indigo/50" />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center">
            <Settings size={12} className="mr-2 text-nexus-indigo" />
            Core Configuration
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 rounded-xl bg-nexus-indigo/10 border border-nexus-indigo/20 text-[9px] font-black text-nexus-indigo uppercase tracking-widest hover:bg-nexus-indigo/20 transition-all">
              Edit Identity
            </button>
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
              Nexus Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CityScanner = ({ color, name, onComplete }: { color: string, name: string, onComplete: () => void }) => {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 border border-dashed rounded-full opacity-20"
          style={{ borderColor: color }}
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-dashed rounded-full opacity-10"
          style={{ borderColor: color }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">Synchronizing Civilization</div>
          <div className="text-4xl font-black text-white uppercase tracking-tighter mb-8">{name}</div>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-white shadow-[0_0_15px_white]"
              style={{ width: `${progress}%`, backgroundColor: color }}
            />
          </div>
          <div className="mt-4 text-[12px] font-mono font-bold" style={{ color }}>{progress}%</div>
        </div>
        
        {/* Scanning Beam */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] z-10 opacity-50"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, white, ${color}, transparent)` }}
        />
      </div>
      
      {/* Decorative Data Lines */}
      <div className="absolute bottom-12 left-12 right-12 grid grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-[1px] bg-white/10 w-full" />
            <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest">
              Packet_0x{Math.random().toString(16).substring(2, 6)} // Verification
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CityBrowserPanel = ({ nodes, currentUserRole, onJoin, onCreateStream, onUpdateCity, onCreateDistrict, onCreateCity, canvasPos }: { 
  nodes: Node[], 
  currentUserRole?: 'Architect' | 'Founder' | 'Citizen',
  onJoin: (id: string, districtId?: string, streamId?: string) => void,
  onCreateStream?: (cityId: string, name: string) => void,
  onUpdateCity?: (cityId: string, updates: Partial<Node>) => void,
  onCreateDistrict?: (cityId: string, updates: Partial<District>) => void,
  onCreateCity?: () => void,
  canvasPos?: { x: number, y: number, zoom: number }
}) => {
  const [selectedCityId, setSelectedCityId] = React.useState<string | null>(null);
  const [scanningCityId, setScanningCityId] = React.useState<string | null>(null);
  const [isCreatingStream, setIsCreatingStream] = React.useState(false);
  const [isCreatingDistrict, setIsCreatingDistrict] = React.useState(false);
  const [isEditingCity, setIsEditingCity] = React.useState(false);
  const [newStreamName, setNewStreamName] = React.useState("");
  const [newDistrictName, setNewDistrictName] = React.useState("");
  const [newDistrictType, setNewDistrictType] = React.useState<District['type']>('neural');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list' | 'spatial'>('grid');
  
  // Edit form state
  const [editName, setEditName] = React.useState("");
  const [editCategory, setEditCategory] = React.useState<Node['category']>('Social');
  const [editAtmosphere, setEditAtmosphere] = React.useState<Node['atmosphere']>('Cyberpunk');
  const [editColor, setEditColor] = React.useState("");

  const selectedCity = nodes.find(n => n.id === selectedCityId);

  // Initialize edit form when city is selected or edit mode toggled
  React.useEffect(() => {
    if (selectedCity && isEditingCity) {
      setEditName(selectedCity.name);
      setEditCategory(selectedCity.category || 'Social');
      setEditAtmosphere(selectedCity.atmosphere || 'Cyberpunk');
      setEditColor(selectedCity.hexColor || "#4B3FE2");
    }
  }, [selectedCity, isEditingCity]);

  const scanningCity = nodes.find(n => n.id === scanningCityId);

  const canManage = currentUserRole === 'Architect' || currentUserRole === 'Founder';

  const handleUpdateCity = () => {
    if (selectedCityId && onUpdateCity) {
      onUpdateCity(selectedCityId, {
        name: editName,
        category: editCategory,
        atmosphere: editAtmosphere,
        hexColor: editColor
      });
      setIsEditingCity(false);
    }
  };

  const handleSelectCity = (id: string) => {
    setScanningCityId(id);
  };

  const handleScanComplete = () => {
    setSelectedCityId(scanningCityId);
    setScanningCityId(null);
  };

  const handleCreateStream = () => {
    if (selectedCityId && newStreamName && onCreateStream && canManage) {
      onCreateStream(selectedCityId, newStreamName);
      setNewStreamName("");
      setIsCreatingStream(false);
    }
  };

  const handleCreateDistrict = () => {
    if (selectedCityId && newDistrictName && onCreateDistrict && canManage) {
      onCreateDistrict(selectedCityId, {
        name: newDistrictName,
        type: newDistrictType,
        occupancy: 0
      });
      setNewDistrictName("");
      setIsCreatingDistrict(false);
    }
  };

  const formatPopulation = (num: number = 0) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (scanningCityId && scanningCity) {
    return (
      <CityScanner 
        color={scanningCity.hexColor || "#4B3FE2"} 
        name={scanningCity.name} 
        onComplete={handleScanComplete} 
      />
    );
  }

  if (selectedCityId && selectedCity) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-0 h-full flex flex-col bg-black/40 overflow-hidden relative"
      >
        <div className="p-8 border-b border-white/5 bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 blur-[100px] pointer-events-none" style={{ backgroundColor: selectedCity.hexColor || "#4B3FE2" }} />
          
          <button 
            onClick={() => setSelectedCityId(null)}
            className="flex items-center space-x-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-nexus-indigo transition-colors mb-6 group relative z-10"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Directory</span>
          </button>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-6">
              <HolographicDisplay color={selectedCity.hexColor || "#4B3FE2"} icon={selectedCity.icon || "Globe"} name={selectedCity.name} />
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="px-2 py-0.5 rounded bg-nexus-indigo/20 text-nexus-indigo text-[8px] font-black uppercase tracking-widest border border-nexus-indigo/30">
                    {selectedCity.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-[8px] font-black uppercase tracking-widest border border-white/10">
                    {selectedCity.atmosphere}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-[0.2em]">{selectedCity.name}</h3>
                <div className="flex items-center space-x-6 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      selectedCity.status === 'Stable' ? "bg-emerald-500" : 
                      selectedCity.status === 'Critical' ? "bg-red-500" : "bg-amber-500"
                    )} />
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      selectedCity.status === 'Stable' ? "text-emerald-500" : 
                      selectedCity.status === 'Critical' ? "text-red-500" : "text-amber-500"
                    )}>{selectedCity.status} Core Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={12} className="text-gray-600" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{formatPopulation(selectedCity.population)} Pop.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onJoin(selectedCity.id)}
              className="px-10 py-5 rounded-2xl bg-nexus-indigo text-white font-black text-[14px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(75,63,226,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Synchronize
            </button>
            {canManage && (
              <button
                onClick={() => setIsEditingCity(!isEditingCity)}
                className={cn(
                  "ml-4 p-5 rounded-2xl border transition-all",
                  isEditingCity 
                    ? "bg-white text-black border-white" 
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                )}
              >
                <Settings size={20} className={isEditingCity ? "animate-spin-slow" : ""} />
              </button>
            )}
          </div>
        </div>

        {isEditingCity && (
          <div className="p-8 bg-nexus-indigo/5 border-b border-nexus-indigo/20 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest">Civilization Name</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-black/40 border border-nexus-indigo/30 rounded-xl px-4 py-3 text-white text-[12px] font-bold uppercase tracking-wider outline-none focus:border-nexus-indigo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest">Category</label>
                <select 
                  value={editCategory} 
                  onChange={(e) => setEditCategory(e.target.value as any)}
                  className="w-full bg-black/40 border border-nexus-indigo/30 rounded-xl px-4 py-3 text-white text-[12px] font-bold uppercase tracking-wider outline-none focus:border-nexus-indigo"
                >
                  {['Social', 'Tactical', 'Neural', 'Creative', 'Industrial'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest">Atmosphere</label>
                <select 
                  value={editAtmosphere} 
                  onChange={(e) => setEditAtmosphere(e.target.value as any)}
                  className="w-full bg-black/40 border border-nexus-indigo/30 rounded-xl px-4 py-3 text-white text-[12px] font-bold uppercase tracking-wider outline-none focus:border-nexus-indigo"
                >
                  {['Cyberpunk', 'Solarpunk', 'Brutalist', 'Holographic', 'Minimalist'].map(atm => (
                    <option key={atm} value={atm}>{atm}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest">Primary Glow</label>
                <div className="flex items-center space-x-3">
                  <input 
                    type="color" 
                    value={editColor} 
                    onChange={(e) => setEditColor(e.target.value)}
                    className="w-12 h-12 bg-transparent border-none outline-none cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={editColor} 
                    onChange={(e) => setEditColor(e.target.value)}
                    className="flex-1 bg-black/40 border border-nexus-indigo/30 rounded-xl px-4 py-3 text-white text-[10px] font-mono outline-none focus:border-nexus-indigo"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setIsEditingCity(false)}
                className="px-6 py-3 rounded-xl bg-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
              >
                Discard Changes
              </button>
              <button 
                onClick={handleUpdateCity}
                className="px-8 py-3 rounded-xl bg-nexus-indigo text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
              >
                Update Civilization Core
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 p-8 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center">
                <Layers size={14} className="mr-3 text-nexus-indigo" />
                Civilization Districts
              </h4>
              {canManage && !isCreatingDistrict && (
                <button 
                  onClick={() => setIsCreatingDistrict(true)}
                  className="p-1.5 rounded-lg bg-nexus-indigo/10 text-nexus-indigo hover:bg-nexus-indigo hover:text-white transition-all"
                >
                  <Plus size={14} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {isCreatingDistrict && (
                <div className="p-6 rounded-3xl bg-white/5 border border-nexus-indigo/30 space-y-4 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <BoxIcon size={18} className="text-nexus-indigo" />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="District Name" 
                        value={newDistrictName}
                        onChange={(e) => setNewDistrictName(e.target.value)}
                        className="bg-transparent border-none outline-none text-[14px] text-white font-black uppercase tracking-[0.2em] w-full placeholder:text-gray-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['neural', 'tactical', 'creative', 'commercial', 'residential', 'industrial'].map(type => (
                        <button
                          key={type}
                          onClick={() => setNewDistrictType(type as any)}
                          className={cn(
                            "px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all",
                            newDistrictType === type 
                              ? "bg-nexus-indigo text-white border-nexus-indigo" 
                              : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pt-2">
                    <button 
                      onClick={handleCreateDistrict}
                      className="flex-1 py-3 rounded-xl bg-nexus-indigo text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
                    >
                      Construct District
                    </button>
                    <button 
                      onClick={() => setIsCreatingDistrict(false)}
                      className="px-6 py-3 rounded-xl bg-white/5 text-gray-500 text-[11px] font-black uppercase tracking-widest hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {selectedCity.districts?.map(district => (
                <motion.div
                  key={district.id}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
                  onClick={() => onJoin(selectedCity.id, district.id)}
                  className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-nexus-indigo/30 transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-gray-500 group-hover:text-nexus-indigo transition-colors shadow-inner">
                        {district.type === 'neural' && <Cpu size={22} />}
                        {district.type === 'tactical' && <Shield size={22} />}
                        {district.type === 'creative' && <Palette size={22} />}
                        {district.type === 'commercial' && <BarChart size={22} />}
                        {district.type === 'residential' && <Globe size={22} />}
                        {district.type === 'industrial' && <Zap size={22} />}
                      </div>
                      <div>
                        <div className="text-[14px] font-black text-white uppercase tracking-wider group-hover:text-nexus-indigo transition-colors">{district.name}</div>
                        <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-0.5">{district.type} sector</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-black text-white/80 uppercase tracking-widest">{district.occupancy}%</div>
                      <div className="text-[7px] text-gray-600 font-bold uppercase tracking-tighter">Occupancy</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed mb-4 relative z-10">
                    {district.description || "Synthesizing district data for localized grid integration."}
                  </p>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative z-10">
                    <motion.div 
                      className="h-full bg-nexus-indigo" 
                      initial={{ width: 0 }}
                      animate={{ width: `${district.occupancy}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center">
                <Activity size={14} className="mr-3 text-emerald-500" />
                Atmospheric Streams
              </h4>
              {canManage && !isCreatingStream && (
                <button 
                  onClick={() => setIsCreatingStream(true)}
                  className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {selectedCity.orbitingStreams?.map(streamId => {
                const stream = selectedCity.streams.find(s => s.id === streamId);
                if (!stream) return null;
                return (
                  <motion.div
                    key={stream.id}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
                    onClick={() => onJoin(selectedCity.id, undefined, stream.id)}
                    className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-gray-500 group-hover:text-emerald-500 transition-colors shadow-inner">
                          <MessageSquare size={22} />
                        </div>
                        <div>
                          <div className="text-[14px] font-black text-white uppercase tracking-wider group-hover:text-emerald-500 transition-colors">#{stream.name}</div>
                          <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-0.5">{stream.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {isCreatingStream ? (
                <div className="p-6 rounded-3xl bg-white/5 border border-nexus-indigo/30 space-y-4 shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <Hash size={18} className="text-nexus-indigo" />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="stream-name" 
                      value={newStreamName}
                      onChange={(e) => setNewStreamName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateStream()}
                      className="bg-transparent border-none outline-none text-[14px] text-white font-black uppercase tracking-[0.2em] w-full placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={handleCreateStream}
                      className="flex-1 py-3 rounded-xl bg-nexus-indigo text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
                    >
                      Initialize Stream
                    </button>
                    <button 
                      onClick={() => setIsCreatingStream(false)}
                      className="px-6 py-3 rounded-xl bg-white/5 text-gray-500 text-[11px] font-black uppercase tracking-widest hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                  <button 
                    disabled={!canManage}
                    onClick={() => setIsCreatingStream(true)}
                    className={cn(
                      "w-full p-6 rounded-3xl border-2 border-dashed transition-all flex items-center justify-center space-x-3 group",
                      canManage 
                        ? "border-white/5 text-gray-600 hover:text-nexus-indigo hover:border-nexus-indigo/30 hover:bg-nexus-indigo/5" 
                        : "border-white/5 text-gray-700 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Plus size={20} className={canManage ? "group-hover:rotate-90 transition-transform" : ""} />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {canManage ? "Expand Civilization Grid" : "Grid Expansion Locked"}
                    </span>
                  </button>
                )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const SpatialView = ({ nodes, onSelect, canvasPos }: { nodes: Node[], onSelect: (id: string) => void, canvasPos?: { x: number, y: number, zoom: number } }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [nodePositions, setNodePositions] = React.useState<Record<string, { x: number, y: number }>>({});
    
    // Initialize positions based on percentages
    React.useEffect(() => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const initialPositions: Record<string, { x: number, y: number }> = {};
        nodes.forEach(node => {
          initialPositions[node.id] = {
            x: (node.x || 50) * offsetWidth / 100,
            y: (node.y || 50) * offsetHeight / 100
          };
        });
        setNodePositions(initialPositions);
      }
    }, [nodes]);

    const handleDrag = (id: string, info: any) => {
      setNodePositions(prev => ({
        ...prev,
        [id]: {
          x: prev[id].x + info.delta.x,
          y: prev[id].y + info.delta.y
        }
      }));
    };

    return (
      <div ref={containerRef} className="relative w-full h-full bg-black/60 overflow-hidden rounded-[2.5rem] border border-white/10 group/spatial">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(75,63,226,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]" />
        
        {/* Floating Data Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{ 
                y: [null, "-10%", "110%"],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            />
          ))}
        </div>

        {/* Dynamic Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(75,63,226,0.2)" />
              <stop offset="50%" stopColor="rgba(75,63,226,0.5)" />
              <stop offset="100%" stopColor="rgba(75,63,226,0.2)" />
            </linearGradient>
          </defs>
          {nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            const pos1 = nodePositions[node.id];
            const pos2 = nodePositions[nextNode.id];
            
            if (!pos1 || !pos2) return null;
            
            const pathData = `M ${pos1.x} ${pos1.y} L ${pos2.x} ${pos2.y}`;
            
            return (
              <g key={i}>
                <motion.path
                  d={pathData}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
                <motion.circle
                  r="2"
                  fill={node.hexColor}
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ 
                    duration: 3 + Math.random() * 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 0.5
                  }}
                  style={{ offsetPath: `path('${pathData}')` }}
                />
              </g>
            );
          })}
        </svg>

        {/* City Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            drag
            dragMomentum={false}
            onDrag={(e, info) => handleDrag(node.id, info)}
            style={{ 
              x: nodePositions[node.id]?.x || 0,
              y: nodePositions[node.id]?.y || 0,
              position: 'absolute',
              left: 0,
              top: 0
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            whileHover={{ scale: 1.05, zIndex: 100 }}
            className="cursor-grab active:cursor-grabbing group/node -translate-x-1/2 -translate-y-1/2"
            onClick={() => onSelect(node.id)}
          >
            <div className="relative">
              {/* Orbital Districts */}
              <div className="absolute inset-0 pointer-events-none">
                {node.districts?.slice(0, 6).map((district, idx) => (
                  <motion.div
                    key={district.id}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + idx * 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <motion.div 
                      className="absolute top-[-70px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/40 group-hover/node:text-white/80 transition-all shadow-2xl overflow-hidden"
                      whileHover={{ scale: 1.4, color: node.hexColor, borderColor: node.hexColor + '80' }}
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {district.type === 'neural' && <Cpu size={18} />}
                      {district.type === 'tactical' && <Shield size={18} />}
                      {district.type === 'creative' && <Palette size={18} />}
                      {district.type === 'commercial' && <BarChart size={18} />}
                      {district.type === 'residential' && <Globe size={18} />}
                      {district.type === 'industrial' && <Zap size={18} />}
                      
                      {/* Orbital Label (Mini) */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-[6px] font-black text-white uppercase tracking-tighter bg-black/80 px-1.5 py-0.5 rounded border border-white/10">
                          {district.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Core Pulse Rings */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-12 rounded-full border border-current opacity-10"
                style={{ color: node.hexColor }}
              />
              
              {/* Main City Orb */}
              <div className="relative z-10">
                <HolographicDisplay color={node.hexColor || "#4B3FE2"} icon={node.icon || "Globe"} name={node.name} />
                
                {/* Floating Status Badge */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all duration-500 scale-90 group-hover/node:scale-100"
                >
                  <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full shadow-2xl flex items-center space-x-2 whitespace-nowrap">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", node.status === 'Stable' ? "bg-emerald-500" : "bg-amber-500")} />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">{node.status} CORE</span>
                  </div>
                </motion.div>

                {/* City Identity Label */}
                <div className="absolute top-[110%] left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-60 group-hover/node:opacity-100 transition-all transform translate-y-2 group-hover/node:translate-y-4">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-[1.5rem] shadow-2xl group-hover/node:border-white/30 transition-all group-hover/node:bg-black/80">
                    <div className="text-[14px] font-black text-white uppercase tracking-[0.3em] mb-1.5">{node.name}</div>
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-[9px] font-black text-nexus-indigo uppercase tracking-widest px-2 py-1 rounded bg-nexus-indigo/20 border border-nexus-indigo/30">{node.category}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{formatPopulation(node.population)} UNITS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* HUD Overlay Elements */}
        <div className="absolute top-8 left-8 p-8 glass-panel rounded-[2.5rem] border-white/10 pointer-events-none backdrop-blur-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-nexus-indigo/20 flex items-center justify-center border border-nexus-indigo/30 shadow-[0_0_20px_rgba(75,63,226,0.2)]">
              <Globe size={22} className="text-nexus-indigo animate-pulse" />
            </div>
            <div>
              <div className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Spatial Map</div>
              <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Civilization Grid // L-Sync 2.0</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Stable Core Nodes: {nodes.filter(n => n.status === 'Stable').length}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b]" />
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Unstable Grid: {nodes.filter(n => n.status !== 'Stable').length}</span>
            </div>
            <div className="pt-4 border-t border-white/5">
              <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest mb-2">Active Data Streams</div>
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050506] bg-white/5 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-nexus-indigo animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Compass */}
        <div className="absolute bottom-8 right-8 w-40 h-40 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <filter id="compassGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Outer Rings */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" className="opacity-20" />
            <motion.circle 
              cx="50" cy="50" r="48" fill="none" stroke="rgba(75,63,226,0.3)" strokeWidth="0.2" 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Dynamic Orientation Ring */}
            <motion.g
              animate={{ 
                rotate: (canvasPos?.x || 0) / 10,
                scale: canvasPos?.zoom || 1
              }}
              className="origin-center"
            >
              <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 8" className="opacity-40" />
              <path d="M 50 10 L 52 20 L 48 20 Z" fill="white" filter="url(#compassGlow)" />
              <path d="M 50 90 L 52 80 L 48 80 Z" fill="white" className="opacity-40" />
            </motion.g>

            {/* Coordinates Display */}
            <text x="50" y="45" textAnchor="middle" fontSize="4" fontWeight="black" fill="white" className="uppercase tracking-[0.4em] opacity-80">Grid Sync</text>
            <text x="50" y="55" textAnchor="middle" fontSize="6" fontWeight="black" fill="rgba(75,63,226,1)" className="uppercase tracking-widest" filter="url(#compassGlow)">
              {Math.round(canvasPos?.x || 0)} : {Math.round(canvasPos?.y || 0)}
            </text>
            <text x="50" y="65" textAnchor="middle" fontSize="3" fontWeight="bold" fill="white" className="uppercase tracking-[0.2em] opacity-40">
              Zoom: {(canvasPos?.zoom || 1).toFixed(2)}x
            </text>

            {/* Scanning Line */}
            <motion.line
              x1="15" y1="50" x2="85" y2="50"
              stroke="rgba(75,63,226,0.2)"
              strokeWidth="0.5"
              animate={{ y: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="p-0 h-full flex flex-col bg-black/40 overflow-hidden relative">
      <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.4em]">City Directory // Discovery</h3>
            <div className="flex items-center space-x-2 bg-nexus-indigo/20 px-4 py-1.5 rounded-full border border-nexus-indigo/30">
              <Globe size={14} className="text-nexus-indigo" />
              <span className="text-[10px] font-black text-nexus-indigo uppercase tracking-widest">Global Grid Multiverse</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 uppercase font-bold tracking-tighter">Select a digital civilization to synchronize</p>
        </div>

        <div className="flex items-center space-x-6">
          {/* View Toggle */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                viewMode === 'grid' ? "bg-nexus-indigo text-white shadow-lg" : "text-gray-500 hover:text-white"
              )}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                viewMode === 'list' ? "bg-nexus-indigo text-white shadow-lg" : "text-gray-500 hover:text-white"
              )}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('spatial')}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                viewMode === 'spatial' ? "bg-nexus-indigo text-white shadow-lg" : "text-gray-500 hover:text-white"
              )}
            >
              Spatial
            </button>
          </div>

          <button 
            onClick={onCreateCity}
            className="px-6 py-3 rounded-xl bg-nexus-indigo text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center space-x-3 shadow-[0_0_20px_rgba(75,63,226,0.3)]"
          >
            <Plus size={16} />
            <span>Initialize civilization</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
        {viewMode === 'spatial' ? (
          <SpatialView nodes={nodes} onSelect={handleSelectCity} canvasPos={canvasPos} />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nodes.map(node => (
              <motion.div
                key={node.id}
              whileHover={{ scale: 1.02, y: -5, backgroundColor: "rgba(255,255,255,0.06)" }}
              onClick={() => handleSelectCity(node.id)}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-nexus-indigo/50 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: node.hexColor }} />
              
              <motion.div 
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-nexus-indigo/5 to-transparent pointer-events-none z-0"
              />

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-6">
                  <HolographicDisplay color={node.hexColor || "#4B3FE2"} icon={node.icon || "Globe"} name={node.name} isSmall={true} />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest px-1.5 py-0.5 rounded bg-nexus-indigo/10 border border-nexus-indigo/20">
                        {node.category}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-nexus-indigo transition-colors">{node.name}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{formatPopulation(node.population)} Pop.</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-40">|</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{node.atmosphere}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Active Districts</div>
                  <div className="text-[9px] font-black text-nexus-indigo uppercase tracking-widest">{node.districts?.length || 0} Sectors</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {node.districts?.slice(0, 3).map(d => (
                    <span key={d.id} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">
                      {d.name}
                    </span>
                  )) || <span className="text-[10px] text-gray-600 italic font-bold uppercase tracking-widest">No Districts Established</span>}
                  {node.districts && node.districts.length > 3 && (
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-600">
                      +{node.districts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
                <div
                  className="w-full py-4 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] hover:bg-nexus-indigo hover:text-white transition-all shadow-2xl flex items-center justify-center relative z-10"
                >
                  Inspect Civilization
                </div>
              </motion.div>
            ))}

            {/* Create City Action Card */}
            <motion.button
              whileHover={{ scale: 1.02, y: -5, backgroundColor: "rgba(75,63,226,0.08)" }}
              onClick={onCreateCity}
              className="p-8 rounded-[2rem] border-2 border-dashed border-nexus-indigo/20 bg-nexus-indigo/5 hover:border-nexus-indigo/50 transition-all group flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]"
            >
              <div className="w-20 h-20 rounded-full bg-nexus-indigo/20 flex items-center justify-center text-nexus-indigo group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(75,63,226,0.2)]">
                <Plus size={40} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-wider mb-2">Initialize Civilization</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[200px]">Expand the Nexus grid by seeding a new digital reality</p>
              </div>
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.06)" }}
                onClick={() => handleSelectCity(node.id)}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-nexus-indigo/30 transition-all group cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <HolographicDisplay color={node.hexColor || "#4B3FE2"} icon={node.icon || "Globe"} name={node.name} isSmall={true} />
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-lg font-black text-white uppercase tracking-wider group-hover:text-nexus-indigo transition-colors">{node.name}</h4>
                      <span className="text-[7px] font-black text-nexus-indigo uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-nexus-indigo/10 border border-nexus-indigo/20">
                        {node.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Users size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{formatPopulation(node.population)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{node.atmosphere}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Layers size={12} className="text-gray-600" />
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{node.districts?.length || 0} Sectors</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end mr-4">
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Grid Status</div>
                    <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
                      Synchronized
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:bg-nexus-indigo group-hover:text-white group-hover:border-nexus-indigo transition-all">
                    Inspect
                  </button>
                </div>
              </motion.div>
            ))}
            
            <motion.button
              whileHover={{ x: 10, backgroundColor: "rgba(75,63,226,0.08)" }}
              onClick={onCreateCity}
              className="w-full p-4 rounded-2xl border-2 border-dashed border-nexus-indigo/20 bg-nexus-indigo/5 hover:border-nexus-indigo/40 transition-all group flex items-center justify-center space-x-4 text-gray-500 hover:text-white"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Initialize new digital civilization</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export const DevGridPanel = ({ nodes, currentUserRole, onDeploy, workflowSeed }: { 
  nodes: Node[], 
  currentUserRole?: 'Architect' | 'Founder' | 'Citizen',
  onDeploy: (cityId: string, districtId: string, logicName: string) => void,
  workflowSeed?: string
}) => {
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [deployProgress, setDeployProgress] = React.useState(0);
  const [selectedCityId, setSelectedCityId] = React.useState<string>(nodes[0]?.id || "");
  const [selectedDistrictId, setSelectedDistrictId] = React.useState<string>(nodes[0]?.districts?.[0]?.id || "");
  const [logicName, setLogicName] = React.useState("Nexus_Automation_v1");
  const [aiPrompt, setAiPrompt] = React.useState("");
  const [isSeeding, setIsSeeding] = React.useState(false);
  const [activeConnection, setActiveConnection] = React.useState<{ nodeId: string, outputId: string } | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  
  const canManage = currentUserRole === 'Architect' || currentUserRole === 'Founder';
  
  const [placedNodes, setPlacedNodes] = React.useState([
    { 
      id: 'pn1', 
      type: 'trigger', 
      name: 'OnMessage', 
      x: 150, 
      y: 150, 
      color: 'bg-emerald-500', 
      data: 'Source: #central-stream',
      inputs: [],
      outputs: [{ id: 'out1', type: 'event' }]
    },
    { 
      id: 'pn2', 
      type: 'action', 
      name: 'Aether Synthesis', 
      x: 450, 
      y: 200, 
      color: 'bg-nexus-indigo', 
      data: 'Action: Summarize & Tag',
      inputs: [{ id: 'in1', type: 'event' }],
      outputs: [{ id: 'out2', type: 'data' }]
    },
  ]);

  const [connections, setConnections] = React.useState([
    { from: 'pn1', outputId: 'out1', to: 'pn2', inputId: 'in1' }
  ]);

  // SEED LOGIC: Auto-generate nodes if a workflowSeed is provided
  React.useEffect(() => {
    if (workflowSeed) {
      const seed = workflowSeed.toLowerCase();
      
      // Clear existing for a fresh seed
      setPlacedNodes([]);
      setConnections([]);
      setIsSeeding(true);

      setTimeout(() => {
        // Base Trigger
        const trigger = {
          id: 'seed_trigger',
          type: 'trigger',
          name: 'OnWorkflowStart',
          x: 100,
          y: 300,
          color: 'bg-emerald-500',
          data: `Workflow: ${workflowSeed}`,
          inputs: [],
          outputs: [{ id: 'seed_out1', type: 'event' }]
        };

        // Synthesis Core
        const synthesis = {
          id: 'seed_synthesis',
          type: 'action',
          name: 'Neural Synthesis',
          x: 400,
          y: 250,
          color: 'bg-nexus-indigo',
          data: 'Process: Workflow Seed Analysis',
          inputs: [{ id: 'seed_in1', type: 'event' }],
          outputs: [{ id: 'seed_out2', type: 'data' }]
        };

        const newNodes = [trigger, synthesis];
        const newConns = [{ from: 'seed_trigger', outputId: 'seed_out1', to: 'seed_synthesis', inputId: 'seed_in1' }];

        // Add more nodes based on seed content
        if (seed.includes('game') || seed.includes('roblox') || seed.includes('unity')) {
          const gameNode = {
            id: 'seed_game',
            type: 'game',
            name: 'Game Sync Core',
            x: 700,
            y: 300,
            color: 'bg-red-500',
            data: 'Platform: Multi-Engine Hub',
            inputs: [{ id: 'seed_in2', type: 'data' }],
            outputs: [{ id: 'seed_out3', type: 'game-event' }]
          };
          newNodes.push(gameNode);
          newConns.push({ from: 'seed_synthesis', outputId: 'seed_out2', to: 'seed_game', inputId: 'seed_in2' });
        }

        if (seed.includes('social') || seed.includes('chat') || seed.includes('moderation') || seed.includes('neural')) {
          const socialNode = {
            id: 'seed_social',
            type: 'action',
            name: 'Social Harmonizer',
            x: 700,
            y: 100,
            color: 'bg-blue-400',
            data: 'Mode: Proactive Moderation',
            inputs: [{ id: 'seed_in3', type: 'data' }],
            outputs: [{ id: 'seed_out_social', type: 'event' }]
          };
          newNodes.push(socialNode);
          newConns.push({ from: 'seed_synthesis', outputId: 'seed_out2', to: 'seed_social', inputId: 'seed_in3' });
        }

        if (seed.includes('security') || seed.includes('trust') || seed.includes('protect') || seed.includes('shield')) {
          const securityNode = {
            id: 'seed_security',
            type: 'condition',
            name: 'Shield Protocol',
            x: 700,
            y: 500,
            color: 'bg-rose-500',
            data: 'Level: Maximum Oversight',
            inputs: [{ id: 'seed_in4', type: 'data' }],
            outputs: [{ id: 'seed_out4', type: 'event' }]
          };
          newNodes.push(securityNode);
          newConns.push({ from: 'seed_synthesis', outputId: 'seed_out2', to: 'seed_security', inputId: 'seed_in4' });
        }

        if (seed.includes('identity') || seed.includes('auth') || seed.includes('user') || seed.includes('profile')) {
          const identityNode = {
            id: 'seed_identity',
            type: 'action',
            name: 'Identity Core',
            x: 400,
            y: 500,
            color: 'bg-purple-500',
            data: 'Protocol: Bio-Metric Sync',
            inputs: [{ id: 'seed_in_id', type: 'event' }],
            outputs: [{ id: 'seed_out_id', type: 'data' }]
          };
          newNodes.push(identityNode);
          newConns.push({ from: 'seed_trigger', outputId: 'seed_out1', to: 'seed_identity', inputId: 'seed_in_id' });
        }

        if (seed.includes('infra') || seed.includes('server') || seed.includes('cloud') || seed.includes('host')) {
          const infraNode = {
            id: 'seed_infra',
            type: 'action',
            name: 'Cloud Backbone',
            x: 100,
            y: 100,
            color: 'bg-slate-500',
            data: 'Region: Global Nexus Edge',
            inputs: [],
            outputs: [{ id: 'seed_out_infra', type: 'event' }]
          };
          newNodes.push(infraNode);
          newConns.push({ from: 'seed_infra', outputId: 'seed_out_infra', to: 'seed_synthesis', inputId: 'seed_in1' });
        }

        if (seed.includes('analytics') || seed.includes('data') || seed.includes('stats') || seed.includes('velocity')) {
          const analyticsNode = {
            id: 'seed_analytics',
            type: 'action',
            name: 'Data Insight',
            x: 1100,
            y: 300,
            color: 'bg-amber-500',
            data: 'Metric: Global Velocity',
            inputs: [{ id: 'seed_in5', type: 'data' }],
            outputs: []
          };
          newNodes.push(analyticsNode);
          // Connect from gameNode, socialNode, or synthesis if they exist
          const possibleSources = ['seed_game', 'seed_social', 'seed_security', 'seed_synthesis'];
          const sourceNode = newNodes.find(n => possibleSources.includes(n.id) && n.id !== 'seed_analytics');
          if (sourceNode) {
            const outPort = sourceNode.outputs[0]?.id || 'seed_out2';
            newConns.push({ from: sourceNode.id, outputId: outPort, to: 'seed_analytics', inputId: 'seed_in5' });
          }
        }

        setPlacedNodes(newNodes);
        setConnections(newConns);
        setIsSeeding(false);
      }, 2000); // Increased delay for cinematic feel
    }
  }, [workflowSeed]);

  const modules = [
    { id: 'm1', name: 'Trigger // OnMessage', type: 'trigger', color: 'bg-emerald-500', inputs: [], outputs: ['event'] },
    { id: 'm2', name: 'Action // Synthesis', type: 'action', color: 'bg-nexus-indigo', inputs: ['event'], outputs: ['data'] },
    { id: 'm3', name: 'Game // Roblox Sync', type: 'game', color: 'bg-red-500', inputs: ['data'], outputs: ['game-event'] },
    { id: 'm4', name: 'Game // Unity Hub', type: 'game', color: 'bg-blue-600', inputs: ['data'], outputs: ['game-event'] },
    { id: 'm5', name: 'Game // Unreal Core', type: 'game', color: 'bg-slate-400', inputs: ['data'], outputs: ['game-event'] },
    { id: 'm6', name: 'Logic // Filter', type: 'condition', color: 'bg-amber-500', inputs: ['data'], outputs: ['data'] },
  ];

  const handleAddNode = (module: typeof modules[0]) => {
    const newNode = {
      id: `pn_${Date.now()}`,
      type: module.type,
      name: module.name.split(' // ')[1],
      x: 300 + Math.random() * 50,
      y: 200 + Math.random() * 50,
      color: module.color,
      data: `Config: ${module.type} core`,
      inputs: module.inputs.map((t, i) => ({ id: `in_${Date.now()}_${i}`, type: t })),
      outputs: module.outputs.map((t, i) => ({ id: `out_${Date.now()}_${i}`, type: t }))
    };
    setPlacedNodes([...placedNodes, newNode]);
  };

  const handlePortClick = (nodeId: string, portId: string, type: 'input' | 'output') => {
    if (!canManage) return;

    if (type === 'output') {
      setActiveConnection({ nodeId, outputId: portId });
    } else if (activeConnection && type === 'input') {
      // Create connection
      const newConn = {
        from: activeConnection.nodeId,
        outputId: activeConnection.outputId,
        to: nodeId,
        inputId: portId
      };
      
      // Prevent duplicate connections
      const exists = connections.some(c => 
        c.from === newConn.from && 
        c.outputId === newConn.outputId && 
        c.to === newConn.to && 
        c.inputId === newConn.inputId
      );

      if (!exists) {
        setConnections([...connections, newConn]);
      }
      setActiveConnection(null);
    }
  };

  const handleDeploy = async () => {
    if (placedNodes.length === 0 || !selectedCityId || !selectedDistrictId) return;
    setIsDeploying(true);
    setDeployProgress(0);
    
    // Save logic to Supabase
    await dataService.updateCityLogic(selectedCityId, {
      nodes: placedNodes,
      connections: connections
    });

    const interval = setInterval(() => {
      setDeployProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDeploying(false);
            setDeployProgress(0);
            onDeploy(selectedCityId, selectedDistrictId, logicName);
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleAiCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    
    // Simulate AETHERYX thinking and adding nodes
    const prompt = aiPrompt.toLowerCase();
    if (prompt.includes("roblox") || prompt.includes("game")) {
      const robloxModule = modules.find(m => m.id === 'm3')!;
      handleAddNode(robloxModule);
    }
    setAiPrompt("");
  };

  return (
    <div className="p-0 h-full flex flex-col bg-black/40 overflow-hidden font-nexus" onMouseMove={(e) => {
      if (activeConnection) {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    }}>
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-nexus-indigo/20 border border-nexus-indigo/30 flex items-center justify-center">
            <Cpu size={20} className="text-nexus-indigo animate-pulse" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Nexus Dev Grid</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">Compiler Online</span>
              </div>
              <p className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Spatial Logic Engine // v4.0.2</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => {
              setPlacedNodes([]);
              setConnections([]);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all flex items-center space-x-2"
          >
            <RefreshCw size={14} />
            <span className="text-[8px] font-black uppercase tracking-widest">Clear Grid</span>
          </button>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
            <Terminal size={14} />
          </button>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Module Sidebar */}
        <div className="w-64 border-r border-white/5 bg-black/40 flex flex-col">
          <div className="p-5 border-b border-white/5">
            <div className="text-[9px] font-black text-nexus-indigo uppercase tracking-[0.2em] mb-4">AETHERYX Dev Assistant</div>
            <form onSubmit={handleAiCommand} className="relative">
              <input 
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AETHERYX to build..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white focus:border-nexus-indigo/50 outline-none transition-all placeholder:text-gray-600 font-bold"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-nexus-indigo hover:text-white transition-colors">
                <Sparkles size={14} />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-5">
            <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Module Library</div>
            <div className="grid grid-cols-1 gap-3">
              {modules.map(m => (
                <motion.button
                  key={m.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: canManage ? 0.98 : 1 }}
                  onClick={() => canManage && handleAddNode(m)}
                  className={cn(
                    "relative p-4 rounded-2xl border transition-all text-left overflow-hidden group",
                    canManage 
                      ? "bg-white/5 border-white/5 hover:bg-white/10 hover:border-nexus-indigo/30 cursor-pointer" 
                      : "bg-white/2 border-white/5 opacity-40 cursor-not-allowed"
                  )}
                >
                  <div className={cn("absolute top-0 left-0 w-1 h-full", m.color)} />
                  <div className="text-[10px] font-black text-gray-200 group-hover:text-white transition-colors uppercase tracking-tight flex items-center justify-between mb-1">
                    <span>{m.name.split(' // ')[1]}</span>
                    {!canManage && <Shield size={10} className="text-nexus-indigo" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] text-gray-600 font-black uppercase tracking-widest italic">
                      {m.type}
                    </span>
                    <Plus size={10} className="text-gray-700 group-hover:text-nexus-indigo transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="p-5 border-t border-white/5 bg-black/20">
            <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-3">Logic Health</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-bold text-gray-500 uppercase">Synchronization</span>
              <span className="text-[8px] font-black text-emerald-500 uppercase">99.9%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[99.9%]" />
            </div>
          </div>
        </div>

        {/* Spatial Workspace */}
        <div className="flex-1 relative bg-[#050505] overflow-hidden">
          {/* Seeding Overlay */}
          <AnimatePresence>
            {isSeeding && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-nexus-indigo/30"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sparkles className="text-nexus-indigo" size={32} />
                  </motion.div>
                </div>
                <div className="mt-8 text-center">
                  <h4 className="text-[12px] font-black text-white uppercase tracking-[0.5em] mb-2">AETHERYX Seeding</h4>
                  <p className="text-[8px] text-nexus-indigo font-black uppercase tracking-widest animate-pulse">Manifesting logic nodes...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} 
          />
          
          {/* Deployment UI */}
          <div className="absolute top-6 left-6 p-6 rounded-[2rem] bg-black/80 border border-white/10 backdrop-blur-3xl z-20 w-72 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-nexus-indigo/20 flex items-center justify-center">
                <Globe size={16} className="text-nexus-indigo" />
              </div>
              <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Deploy Config</span>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block ml-1">Process Name</label>
                <input 
                  type="text" 
                  value={logicName}
                  onChange={(e) => setLogicName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white focus:border-nexus-indigo/50 outline-none transition-all font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block ml-1">City</label>
                  <select 
                    value={selectedCityId}
                    onChange={(e) => {
                      setSelectedCityId(e.target.value);
                      const city = nodes.find(n => n.id === e.target.value);
                      if (city?.districts?.[0]) setSelectedDistrictId(city.districts[0].id);
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[9px] text-white focus:border-nexus-indigo/50 outline-none transition-all font-black uppercase appearance-none"
                  >
                    {nodes.filter(n => n.type === 'city' || n.districts).map(n => (
                      <option key={n.id} value={n.id} className="bg-nexus-dark text-white">{n.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest block ml-1">District</label>
                  <select 
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[9px] text-white focus:border-nexus-indigo/50 outline-none transition-all font-black uppercase appearance-none"
                  >
                    {nodes.find(n => n.id === selectedCityId)?.districts?.map(d => (
                      <option key={d.id} value={d.id} className="bg-nexus-dark text-white">{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 p-8 overflow-auto no-scrollbar cursor-crosshair">
             <div className="relative min-h-[2000px] min-w-[2000px]">
                {/* Connection Lines (Cables) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <defs>
                    <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4b3fe2" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {connections.map((conn, i) => {
                    const fromNode = placedNodes.find(n => n.id === conn.from);
                    const toNode = placedNodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    const x1 = fromNode.x + 180;
                    const y1 = fromNode.y + 60;
                    const x2 = toNode.x;
                    const y2 = toNode.y + 60;
                    
                    // Bezier curve for more professional "cable" look
                    const dx = Math.abs(x2 - x1) * 0.5;
                    const path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                    return (
                      <g key={`conn-${i}`}>
                        <path
                          d={path}
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="4"
                        />
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          d={path}
                          fill="none"
                          stroke="url(#cableGradient)"
                          strokeWidth="2"
                          filter="url(#glow)"
                          onClick={() => {
                            if (canManage) {
                              setConnections(prev => prev.filter((_, idx) => idx !== i));
                            }
                          }}
                          className="cursor-pointer hover:stroke-red-500 transition-colors"
                        />
                        <motion.circle
                          r="3"
                          fill="#10b981"
                          filter="url(#glow)"
                        >
                          <animateMotion
                            path={path}
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </motion.circle>
                      </g>
                    );
                  })}

                  {/* Live Connection Cable */}
                  {activeConnection && (() => {
                    const fromNode = placedNodes.find(n => n.id === activeConnection.nodeId);
                    if (!fromNode) return null;
                    const x1 = fromNode.x + 180;
                    const y1 = fromNode.y + 60;
                    const x2 = mousePos.x - 256; // Adjust for sidebar width
                    const y2 = mousePos.y - 100; // Adjust for header height
                    
                    const dx = Math.abs(x2 - x1) * 0.5;
                    const path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
                    
                    return (
                      <path
                        d={path}
                        fill="none"
                        stroke="rgba(75,63,226,0.5)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="pointer-events-none"
                      />
                    );
                  })()}
                </svg>

                {/* Placed Nodes (Puzzle Pieces) */}
                {placedNodes.map((node) => (
                  <motion.div 
                    key={node.id}
                    drag 
                    dragMomentum={false}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                    onDrag={(_, info) => {
                      setPlacedNodes(prev => prev.map(n => 
                        n.id === node.id ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y } : n
                      ));
                    }}
                    className="absolute group z-10"
                    style={{ x: 0, y: 0 }} // Let motion.div handle the positioning via animate
                  >
                    <div className="relative w-48 bg-nexus-dark/90 border border-white/10 rounded-[1.5rem] p-5 shadow-2xl backdrop-blur-xl group-hover:border-nexus-indigo/50 transition-all cursor-grab active:cursor-grabbing">
                      {/* Puzzle Piece Notch (Visual only for now) */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-nexus-dark border-y border-l border-white/10 rounded-l-full z-20" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-nexus-indigo border border-white/10 rounded-r-full z-20 shadow-[0_0_15px_rgba(75,63,226,0.4)]" />

                      <div className={cn("w-12 h-1 rounded-full mb-4", node.color)} />
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[11px] font-black text-white uppercase tracking-tighter">{node.name}</div>
                        <button 
                          onClick={() => {
                            setConnections(prev => prev.filter(c => c.from !== node.id && c.to !== node.id));
                            setPlacedNodes(prev => prev.filter(n => n.id !== node.id));
                          }}
                          className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-500 transition-all"
                        >
                          <Plus size={10} className="rotate-45" />
                        </button>
                      </div>
                      
                      <div className="text-[8px] text-gray-500 font-bold uppercase mb-4 leading-tight">{node.data}</div>
                      
                      <div className="space-y-2">
                        {node.inputs.map(input => (
                          <div key={input.id} className="flex items-center space-x-2">
                            <button
                              onClick={() => handlePortClick(node.id, input.id, 'input')}
                              className="w-3 h-3 rounded-full bg-white/10 border border-white/10 hover:bg-nexus-indigo/50 transition-colors"
                            />
                            <span className="text-[7px] font-black text-gray-600 uppercase">Input::{input.type}</span>
                          </div>
                        ))}
                        {node.outputs.map(output => (
                          <div key={output.id} className="flex items-center justify-end space-x-2">
                            <span className="text-[7px] font-black text-nexus-indigo uppercase">Output::{output.type}</span>
                            <button
                              onClick={() => handlePortClick(node.id, output.id, 'output')}
                              className={cn("w-3 h-3 rounded-full border border-white/20 shadow-lg hover:scale-125 transition-all", node.color)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Action Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-50">
            <div className="px-6 py-4 rounded-[2rem] bg-black/90 border border-white/10 backdrop-blur-3xl flex items-center space-x-6 shadow-2xl">
              <div className="flex items-center space-x-3 pr-6 border-r border-white/5">
                <div className="text-right">
                  <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Active Nodes</div>
                  <div className="text-[14px] font-black text-white">{placedNodes.length}</div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Latency</div>
                  <div className="text-[14px] font-black text-emerald-500">12ms</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying || !canManage}
                  className={cn(
                    "px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center space-x-3 shadow-2xl",
                    (isDeploying || !canManage) 
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                      : "bg-nexus-indigo text-white hover:bg-indigo-500 shadow-nexus-indigo/40"
                  )}
                >
                  {isDeploying ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Activity size={14} />
                      </motion.div>
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={14} fill="white" />
                      <span>Deploy Logic</span>
                    </>
                  )}
                </button>
                <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95 group">
                  <Play size={16} className="group-hover:text-nexus-indigo transition-colors" />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isDeploying && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-nexus-dark/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center"
              >
                <div className="relative w-80">
                  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-64 h-64 bg-nexus-indigo/20 blur-[100px] rounded-full animate-pulse" />
                  
                  <div className="text-center relative z-10">
                    <motion.div 
                      initial={{ scale: 0.5, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-24 h-24 bg-gradient-to-br from-nexus-indigo to-emerald-500 rounded-3xl mx-auto flex items-center justify-center text-white shadow-[0_0_50px_rgba(75,63,226,0.3)] mb-8"
                    >
                      <Cpu size={48} />
                    </motion.div>
                    
                    <h4 className="text-[14px] font-black text-white uppercase tracking-[0.5em] mb-2">AETHERYX Synthesis</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-10 italic">Compiling visual logic into machine-executable bytecode...</p>
                    
                    <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${deployProgress}%` }}
                        className="h-full bg-gradient-to-r from-nexus-indigo to-emerald-500"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-nexus-indigo animate-ping" />
                        <span className="text-[9px] font-black text-nexus-indigo uppercase">{deployProgress}%</span>
                      </div>
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Protocol::Nexus_Grid</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const TopicHeader = ({ title, summary }: { title: string; summary: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 p-6 rounded-2xl bg-nexus-indigo/5 border border-nexus-indigo/20 relative overflow-hidden group"
  >
    <motion.div 
      animate={{ height: ["20%", "100%", "20%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-1 bg-nexus-indigo" 
    />
    <div className="relative z-10">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles size={12} className="text-nexus-indigo" />
        <span className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.3em]">Neural Insight</span>
      </div>
      <h2 className="text-lg font-black text-white uppercase tracking-tight mb-1">{title}</h2>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter leading-relaxed">{summary}</p>
    </div>
    <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-nexus-indigo/10 rounded-full blur-3xl group-hover:bg-nexus-indigo/20 transition-all duration-700" />
  </motion.div>
);

export const MessagePacket = ({ msg, author, isAI, onUpdateTask }: { msg: Message; author: User; isAI?: boolean; onUpdateTask?: (id: string, status: 'pending' | 'completed') => void }) => {
  const renderContent = () => {
    switch (msg.type) {
      case 'voice-packet':
        return msg.voice ? (
          <div className="mt-2 p-3 rounded-xl bg-nexus-indigo/10 border border-nexus-indigo/20 flex items-center space-x-4 max-w-sm relative group">
             {/* Background Pulse */}
            <motion.div 
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-nexus-indigo rounded-xl pointer-events-none"
            />
            <button className="relative w-10 h-10 rounded-full bg-nexus-indigo flex items-center justify-center text-white hover:bg-indigo-500 transition-all shadow-lg shadow-nexus-indigo/20 active:scale-90">
              <Play size={16} fill="currentColor" />
            </button>
            <div className="flex-1 space-y-2 relative">
              <div className="flex items-end space-x-0.5 h-6">
                {msg.voice.waveform.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: "20%" }}
                    animate={{ height: `${Math.max(20, h)}%` }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                    className="flex-1 bg-nexus-indigo/40 rounded-full"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-nexus-indigo">
                  <Mic size={10} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Voice Packet</span>
                </div>
                <span className="text-[8px] text-gray-500 font-bold">{Math.floor(msg.voice.duration / 60)}:{(msg.voice.duration % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        ) : null;

      case 'interactive-task':
        return msg.task ? (
          <motion.div 
            layout
            className="mt-2 p-4 rounded-xl bg-white/5 border border-white/10 max-w-sm group/task relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => onUpdateTask?.(msg.task!.id, msg.task!.status === 'completed' ? 'pending' : 'completed')}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90",
                    msg.task.status === 'completed' ? "bg-emerald-500/20 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "bg-nexus-indigo/20 text-nexus-indigo hover:bg-nexus-indigo/30"
                  )}
                >
                  {msg.task.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                </button>
                <div>
                  <h4 className={cn(
                    "text-[11px] font-black uppercase tracking-tight transition-all",
                    msg.task.status === 'completed' ? "text-gray-500 line-through" : "text-white"
                  )}>
                    {msg.task.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[8px] font-bold text-gray-600 uppercase">Status:</span>
                    <span className={cn(
                      "text-[8px] font-black uppercase tracking-widest",
                      msg.task.status === 'completed' ? "text-emerald-500" : "text-nexus-indigo"
                    )}>
                      {msg.task.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="opacity-0 group-hover/task:opacity-100 p-1 text-gray-600 hover:text-white transition-all">
                <MoreHorizontal size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded bg-white/10 border border-white/10 flex items-center justify-center text-[8px] font-black text-white">
                  {author?.name.charAt(0)}
                </div>
                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">Assigned to you</span>
              </div>
              {msg.task.deadline && (
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock size={10} />
                  <span className="text-[8px] font-bold uppercase">{msg.task.deadline}</span>
                </div>
              )}
            </div>
            {/* Status Background Overlay */}
            {msg.task.status === 'completed' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-emerald-500/5 pointer-events-none"
              />
            )}
          </motion.div>
        ) : null;

      case 'module-ui':
        return msg.moduleData ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mt-2 rounded-xl border border-nexus-indigo/30 bg-nexus-indigo/5 overflow-hidden max-w-md shadow-2xl"
          >
            <div className="px-4 py-2 border-b border-nexus-indigo/20 flex items-center justify-between bg-nexus-indigo/10">
              <div className="flex items-center space-x-2">
                <Cpu size={12} className="text-nexus-indigo" />
                <span className="text-[9px] font-black text-nexus-indigo uppercase tracking-widest">
                  Module UI: {msg.moduleData.component}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-nexus-indigo/60 hover:text-nexus-indigo transition-colors">
                  <RefreshCw size={10} />
                </button>
                <button className="p-1 text-nexus-indigo/60 hover:text-nexus-indigo transition-colors">
                  <ExternalLink size={10} />
                </button>
              </div>
            </div>
            <div className="p-4">
              {msg.moduleData.component === 'AnalyticsChart' && (
                <div className="space-y-3">
                  <div className="flex items-end justify-between h-20 space-x-1">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        className="flex-1 bg-gradient-to-t from-nexus-indigo/40 to-nexus-indigo rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[7px] font-black text-gray-600 uppercase tracking-widest">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              )}
              {msg.moduleData.component === 'SoundBoard' && (
                <div className="grid grid-cols-3 gap-2">
                  {['Pulse', 'Glitch', 'Swoosh', 'Beep', 'Aether', 'Void'].map((sound, i) => (
                    <motion.button 
                      key={sound}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(75,63,226,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      className="py-2 px-1 rounded bg-white/5 border border-white/10 text-[8px] font-black text-gray-400 uppercase hover:text-nexus-indigo hover:border-nexus-indigo/30 transition-all"
                    >
                      {sound}
                    </motion.button>
                  ))}
                </div>
              )}
              {msg.moduleData.component === 'NexusTerminal' && (
                <div className="bg-black/60 rounded-lg p-3 font-mono text-[9px] text-emerald-500/80 space-y-1 border border-white/5 overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">nexus@aetheryx:~$</span>
                    <span className="text-white">nexus --status --all</span>
                  </div>
                  <div className="pl-4 border-l border-emerald-500/20">
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>{">>"} [OK] Core Engine v2.4.0</motion.div>
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>{">>"} [OK] Neural Graph Synced</motion.div>
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>{">>"} [WARN] Latency detected in Sector 7</motion.div>
                    <motion.div 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1.5 h-3 bg-emerald-500 ml-1"
                    />
                  </div>
                </div>
              )}
              {msg.moduleData.component === 'WeatherCore' && (
                <div className="flex items-center justify-between">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-nexus-indigo border border-white/10">
                      <Cloud size={24} />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white tracking-tighter">24°C</div>
                      <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Atmospheric Synthesis</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-right"
                  >
                    <div className="text-[9px] font-black text-nexus-indigo uppercase tracking-widest">Clear Skies</div>
                    <div className="text-[8px] font-bold text-gray-600 uppercase tracking-tighter">Humidity: 42%</div>
                  </motion.div>
                </div>
              )}
              {msg.moduleData.component === 'MusicVisualizer' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-nexus-indigo/20 flex items-center justify-center text-nexus-indigo animate-pulse">
                        <Music size={14} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-white uppercase tracking-tight">Sonic Weaver</div>
                        <div className="text-[8px] font-bold text-nexus-indigo uppercase tracking-widest">Spatial Audio Active</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ height: [4, 12, 6, 16, 4] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1 bg-nexus-indigo rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : null;

      default:
        return (
          <div className={cn(
            "text-[12px] leading-relaxed font-medium relative",
            isAI ? "text-nexus-indigo/90" : "text-gray-300 group-hover:text-white transition-colors"
          )}>
            {msg.content}
            {isAI && (
              <motion.div 
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-nexus-indigo/30 origin-left"
              />
            )}
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 1
      }}
      layout
      className={cn(
        "mb-6 flex items-start space-x-4 group",
        isAI && "bg-nexus-indigo/5 p-4 rounded-2xl border border-nexus-indigo/10 relative overflow-hidden shadow-[0_0_20px_rgba(75,63,226,0.05)]"
      )}
    >
      {isAI && (
        <motion.div 
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-nexus-indigo pointer-events-none"
        />
      )}
      <div className="relative">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg transition-all",
            isAI ? "bg-nexus-indigo shadow-nexus-indigo/20" : "bg-white/5 border border-white/10"
          )}
        >
          {author?.name.charAt(0) || "U"}
        </motion.div>
        {!isAI && <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />}
      </div>
      <div className="flex-1 min-w-0 relative">
        <div className="flex items-center space-x-2 mb-1">
          <span className={cn("text-[10px] font-black uppercase tracking-widest", isAI ? "text-nexus-indigo" : "text-white")}>
            {author?.name || "Unknown User"}
          </span>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isAI && (
            <div className="flex items-center space-x-2">
               <span className="px-1.5 py-0.5 rounded bg-nexus-indigo/20 text-nexus-indigo text-[7px] font-black uppercase tracking-widest">
                AI Core
              </span>
              <motion.div 
                animate={{ width: [4, 12, 4], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-[1px] bg-nexus-indigo/50"
              />
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </motion.div>
  );
};

export const ChatStreamPanel = ({ 
  messages, 
  users, 
  onSendMessage, 
  onUpdateTask,
  stream,
  activeModules = [],
  currentUserRole
}: { 
  messages: Message[]; 
  users: Record<string, User>; 
  onSendMessage: (content: string) => void;
  onUpdateTask?: (id: string, status: 'pending' | 'completed') => void;
  stream: Stream;
  activeModules?: BotModule[];
  currentUserRole?: 'Architect' | 'Founder' | 'Citizen';
}) => {
  const [value, setValue] = React.useState("");
  const [showModules, setShowModules] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const canManage = currentUserRole === 'Architect' || currentUserRole === 'Founder';

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSendMessage(value);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050506]/40 relative overflow-hidden">
      {/* Module Quick Access Overlay */}
      <AnimatePresence>
        {showModules && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-16 right-4 bottom-24 w-48 z-50 flex flex-col space-y-2 pointer-events-none"
          >
            {activeModules.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 glass-card bg-nexus-indigo/20 border border-nexus-indigo/30 rounded-xl pointer-events-auto cursor-pointer hover:bg-nexus-indigo/30 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(_, info) => {
                      if (!canManage) return;
                      if (info.offset.y > 100 || info.offset.x < -50) {
                        onSendMessage(`@aetheryx status ${mod.name}`);
                      }
                    }}
                    whileDrag={canManage ? { scale: 1.1, zIndex: 100 } : {}}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg",
                      canManage ? "bg-nexus-indigo shadow-nexus-indigo/20 cursor-grab active:cursor-grabbing" : "bg-gray-800 cursor-not-allowed"
                    )}
                  >
                    {mod.type === 'moderation' && <Shield size={14} />}
                    {mod.type === 'music' && <Music size={14} />}
                    {mod.type === 'ai-assistant' && <Zap size={14} />}
                    {mod.type === 'analytics' && <BarChart size={14} />}
                    {mod.type === 'custom' && mod.icon === 'Cloud' && <Cloud size={14} />}
                    {mod.type === 'custom' && mod.icon === 'Terminal' && <Terminal size={14} />}
                  </motion.div>
                  <div>
                    <div className="text-[9px] font-black text-white uppercase tracking-tighter">{mod.name}</div>
                    <div className="text-[7px] text-nexus-indigo font-bold uppercase tracking-widest">
                      {canManage ? "Drag to Inject" : "Architect Access Only"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stream Meta */}
      <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-black/20">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
            Live Stream: {stream.name}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowModules(!showModules)}
            className={cn(
              "flex items-center -space-x-1 p-1 rounded-lg transition-all",
              showModules ? "bg-nexus-indigo/20 ring-1 ring-nexus-indigo/50" : "hover:bg-white/5"
            )}
          >
            {activeModules.map((mod) => (
              <div key={mod.id} className="w-6 h-6 rounded-lg bg-nexus-indigo/20 border border-nexus-indigo/30 flex items-center justify-center text-nexus-indigo" title={mod.name}>
                {mod.type === 'moderation' && <Shield size={12} />}
                {mod.type === 'music' && <Music size={12} />}
                {mod.type === 'ai-assistant' && <Zap size={12} />}
                {mod.type === 'analytics' && <BarChart size={12} />}
                {mod.type === 'custom' && mod.icon === 'Cloud' && <Cloud size={12} />}
                {mod.type === 'custom' && mod.icon === 'Terminal' && <Terminal size={12} />}
              </div>
            ))}
            {activeModules.length === 0 && <Layers size={14} className="text-gray-600 m-1" />}
          </button>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-black bg-gray-800" />
            ))}
          </div>
          <span className="text-[9px] font-bold text-nexus-indigo uppercase">1.2k Active</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 no-scrollbar"
      >
        <TopicHeader 
          title={stream.topic || "Synthesizing Interaction"} 
          summary="AETHERYX is monitoring the flow for key insights..." 
        />
        
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <MessagePacket 
              key={msg.id} 
              msg={msg} 
              author={users[msg.authorId]} 
              isAI={msg.type === 'ai'} 
              onUpdateTask={onUpdateTask}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Module Quick Actions Bar */}
      {activeModules.length > 0 && (
        <div className="px-6 py-2 bg-black/40 border-t border-white/5 flex items-center space-x-4 overflow-x-auto no-scrollbar">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap">Inject Module:</span>
          {activeModules.map(mod => (
            <button 
              key={mod.id} 
              onClick={() => {
                if (canManage) {
                  onSendMessage(`@aetheryx show ${mod.name}`);
                }
              }}
              className={cn(
                "flex items-center space-x-2 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-tighter transition-all whitespace-nowrap",
                canManage 
                  ? "bg-white/5 border-white/10 text-gray-400 hover:bg-nexus-indigo/20 hover:text-nexus-indigo hover:border-nexus-indigo/30" 
                  : "bg-white/2 border-white/5 text-gray-600 cursor-not-allowed opacity-50"
              )}
            >
              {mod.type === 'moderation' && <Shield size={10} />}
              {mod.type === 'music' && <Music size={10} />}
              {mod.type === 'ai-assistant' && <Zap size={10} />}
              {mod.type === 'analytics' && <BarChart size={10} />}
              {mod.type === 'custom' && mod.icon === 'Cloud' && <Cloud size={10} />}
              {mod.type === 'custom' && mod.icon === 'Terminal' && <Terminal size={10} />}
              <span>{mod.name}</span>
            </button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-6 border-t border-white/5 bg-black/40">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-nexus-indigo/20 to-purple-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center bg-white/5 rounded-xl px-5 py-3 border border-white/10 focus-within:border-nexus-indigo/50 transition-all">
            <input 
              type="text" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={canManage ? "Inject data into stream..." : "Send a message..."}
              className="flex-1 bg-transparent border-none outline-none text-[12px] text-white placeholder-gray-600 font-medium"
            />
            <div className="flex items-center space-x-3 ml-4">
              {canManage && (
                <button type="button" className="text-gray-500 hover:text-white transition-colors">
                  <Sparkles size={16} />
                </button>
              )}
              {!canManage && (
                <div className="flex items-center space-x-1 px-2 py-1 rounded bg-white/5 border border-white/10">
                  <Shield size={10} className="text-nexus-indigo/50" />
                  <span className="text-[7px] font-black text-gray-600 uppercase tracking-widest">Citizen</span>
                </div>
              )}
              <button type="submit" className="w-8 h-8 rounded-lg bg-nexus-indigo flex items-center justify-center text-white hover:bg-indigo-500 transition-all shadow-lg shadow-nexus-indigo/20">
                <Send size={14} />
              </button>
            </div>
          </div>
          {!canManage && value.startsWith("/") && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-8 left-0 text-[8px] font-black text-nexus-indigo uppercase tracking-widest bg-black/80 px-2 py-1 rounded border border-nexus-indigo/30 backdrop-blur-md"
            >
              Architect Credentials Required for Commands
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};

export const NodeExplorerPanel = ({ 
  nodes, 
  activeNodeId, 
  onNodeSelect 
}: { 
  nodes: Node[]; 
  activeNodeId: string | null; 
  onNodeSelect: (id: string) => void;
}) => {
  return (
    <div className="p-0 h-full flex flex-col bg-black/40">
      <div className="p-6 border-b border-white/5 bg-white/5">
        <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Node Clusters</h3>
        <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Scanning for active social dimensions...</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {nodes.map((node) => {
          const isActive = activeNodeId === node.id;
          return (
            <button
              key={node.id}
              onClick={() => onNodeSelect(node.id)}
              className={cn(
                "w-full group relative transition-all duration-500",
                isActive ? "scale-105" : "hover:scale-102"
              )}
            >
              <div className={cn(
                "relative flex items-center p-4 rounded-2xl border transition-all duration-300",
                isActive 
                  ? "bg-nexus-indigo/10 border-nexus-indigo/50 shadow-[0_0_30px_rgba(75,63,226,0.2)]" 
                  : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
              )}>
                {/* Node Icon/Hologram */}
                <div className={cn(
                  "relative w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mr-4 overflow-hidden",
                  isActive ? "bg-nexus-indigo text-white" : "bg-white/5 text-gray-600"
                )}>
                  {node.name.charAt(0)}
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-white/20 border-dashed rounded-xl"
                    />
                  )}
                </div>

                <div className="text-left flex-1">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-[12px] font-bold tracking-tight transition-colors",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                    )}>
                      {node.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      <span className="text-[8px] font-bold text-emerald-500/70">{Math.floor(node.memberCount / 10)} active</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    {node.streams.slice(0, 3).map((stream: any) => (
                      <span key={stream.id} className="text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-500 font-bold uppercase tracking-tighter">
                        {stream.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Indicator */}
                {isActive && (
                  <div className="absolute -right-1 -top-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-indigo opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-nexus-indigo"></span>
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {/* Create Node Action */}
        <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-2 group hover:border-nexus-indigo/30 transition-all">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-nexus-indigo group-hover:bg-nexus-indigo/10 transition-all">
            <Zap size={14} />
          </div>
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-nexus-indigo transition-colors">Initialize New Node</span>
        </button>
      </div>
    </div>
  );
};

export const BotForgePanel = ({
  modules,
  activeModules = [],
  onAddModule,
  currentUserRole
}: {
  modules: BotModule[];
  activeModules: string[];
  onAddModule: (id: string) => void;
  currentUserRole?: 'Architect' | 'Founder' | 'Citizen';
}) => {
  const canManage = currentUserRole === 'Architect' || currentUserRole === 'Founder';

  return (
    <div className="p-0 h-full flex flex-col bg-black/40">
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Bot Forge</h3>
          <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Assemble visual intelligence modules</p>
        </div>
        <Sparkles size={16} className="text-nexus-indigo animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar space-y-6">
        {/* Active Modules Section */}
        <div>
          <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-4 flex items-center">
            <Activity size={10} className="mr-2" />
            Active Modules
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {modules.filter(m => activeModules.includes(m.id)).map(mod => (
              <div key={mod.id} className="relative p-4 rounded-xl bg-nexus-indigo/10 border border-nexus-indigo/30 group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-nexus-indigo flex items-center justify-center text-white">
                    {mod.type === 'moderation' && <Shield size={20} />}
                    {mod.type === 'music' && <Music size={20} />}
                    {mod.type === 'ai-assistant' && <Zap size={20} />}
                    {mod.type === 'analytics' && <BarChart size={20} />}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-tighter">{mod.name}</div>
                    <div className="text-[9px] text-nexus-indigo font-bold uppercase tracking-[0.2em]">{mod.type}</div>
                  </div>
                </div>
                <button 
                  disabled={!canManage}
                  className={cn(
                    "absolute top-4 right-4 transition-colors",
                    canManage ? "text-gray-500 hover:text-white" : "text-gray-700 cursor-not-allowed"
                  )}
                >
                  {canManage ? <Settings size={14} /> : <Shield size={12} className="text-nexus-indigo/40" />}
                </button>
              </div>
            ))}
            {activeModules.length === 0 && (
              <div className="py-8 border border-dashed border-white/5 rounded-xl flex items-center justify-center">
                <span className="text-[9px] font-bold text-gray-600 uppercase">No active modules in this stream</span>
              </div>
            )}
          </div>
        </div>

        {/* Available Modules Section */}
        <div className={cn(!canManage && "opacity-50 pointer-events-none grayscale")}>
          <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-4 flex items-center">
            <Search size={10} className="mr-2" />
            Module Library
            {!canManage && <Shield size={10} className="ml-auto text-nexus-indigo" />}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {modules.filter(m => !activeModules.includes(m.id)).map(mod => (
              <button 
                key={mod.id} 
                onClick={() => canManage && onAddModule(mod.id)}
                disabled={!canManage}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-nexus-indigo/50 hover:bg-white/10 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-nexus-indigo group-hover:bg-nexus-indigo/10 transition-all mb-3">
                  {mod.type === 'moderation' && <Shield size={16} />}
                  {mod.type === 'music' && <Music size={16} />}
                  {mod.type === 'ai-assistant' && <Zap size={16} />}
                  {mod.type === 'analytics' && <BarChart size={16} />}
                </div>
                <div className="text-[10px] font-black text-white uppercase tracking-tighter mb-1">{mod.name}</div>
                <div className="text-[8px] text-gray-500 line-clamp-2 leading-relaxed">{mod.description}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[7px] font-black text-nexus-indigo uppercase tracking-widest">Available</span>
                  <Plus size={10} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-white/5 bg-white/5">
        <button 
          disabled={!canManage}
          className={cn(
            "w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg",
            canManage 
              ? "bg-nexus-indigo text-white hover:bg-indigo-500 shadow-nexus-indigo/20" 
              : "bg-gray-800 text-gray-500 cursor-not-allowed shadow-none"
          )}
        >
          {canManage ? "Initialize Custom Construct" : "Architect Credentials Required"}
        </button>
      </div>
    </div>
  );
};
