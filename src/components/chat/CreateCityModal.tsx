"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Users, Sparkles, Globe, Cpu, Palette, Shield, ArrowRight } from "lucide-react";
import { CityCategory, CityAtmosphere, Node } from "@/types/chat";
import { cn } from "@/lib/utils";

interface CreateCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: Partial<Node>) => void;
}

const CATEGORIES: { id: CityCategory; icon: any; desc: string }[] = [
  { id: 'Social', icon: Users, desc: "Built for community and connection." },
  { id: 'Creative', icon: Palette, desc: "A canvas for digital artists." },
  { id: 'Tactical', icon: Shield, desc: "Strategic operations and gaming." },
  { id: 'Neural', icon: Cpu, desc: "AI-first research and automation." },
  { id: 'Industrial', icon: Zap, desc: "High-throughput data and economy." },
];

const ATMOSPHERES: CityAtmosphere[] = ['Holographic', 'Cyberpunk', 'Solarpunk', 'Brutalist', 'Minimalist'];

const COLORS = ["#4B3FE2", "#E23F3F", "#3FE2C1", "#E29E3F", "#8E24AA", "#3F7EE2"];

export const CreateCityModal = ({ isOpen, onClose, onCreate }: CreateCityModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<CityCategory>('Social');
  const [atmosphere, setAtmosphere] = useState<CityAtmosphere>('Holographic');
  const [hexColor, setHexColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({
      name,
      category,
      atmosphere,
      hexColor,
      icon: CATEGORIES.find(c => c.id === category)?.id === 'Industrial' ? 'Zap' : 'Users'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-nexus-dark border border-nexus-indigo/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(75,63,226,0.2)] overflow-hidden relative z-10"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">Initialize Civilization</h2>
                <p className="text-[10px] text-nexus-indigo font-bold uppercase tracking-widest mt-1">Deploying new node to the Infinite Canvas</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Name Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Civilization Identity</label>
                <input 
                  autoFocus
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xl font-black text-white uppercase tracking-wider focus:outline-none focus:border-nexus-indigo transition-all placeholder:text-white/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Grid Category</label>
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isActive = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-2xl border transition-all text-left group",
                            isActive 
                              ? "bg-nexus-indigo/20 border-nexus-indigo/50 text-white" 
                              : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10"
                          )}
                        >
                          <div className={cn(
                            "p-2 rounded-xl transition-colors",
                            isActive ? "bg-nexus-indigo text-white" : "bg-black/40 text-gray-600 group-hover:text-gray-400"
                          )}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-wider">{cat.id}</div>
                            <div className="text-[9px] font-medium opacity-50">{cat.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Atmosphere */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Aesthetic Protocol</label>
                    <div className="flex flex-wrap gap-2">
                      {ATMOSPHERES.map((atm) => (
                        <button
                          key={atm}
                          type="button"
                          onClick={() => setAtmosphere(atm)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                            atmosphere === atm 
                              ? "bg-white text-black border-white" 
                              : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10 hover:text-white"
                          )}
                        >
                          {atm}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Neural Frequency (Color)</label>
                    <div className="flex gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setHexColor(color)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            hexColor === color ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-50 hover:opacity-100"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-nexus-indigo hover:bg-nexus-indigo-light text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(75,63,226,0.3)]"
              >
                Initialize Node Grid
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
