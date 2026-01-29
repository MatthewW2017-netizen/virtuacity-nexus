"use client";

import { motion } from "framer-motion";
import { Bot, Code, MousePointer2, LayoutTemplate, Zap, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

export default function BotForgePage() {
  return (
    <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-nexus-indigo font-bold mb-6"
          >
            <Bot size={24} />
            THE BOT FORGE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
          >
            Create bots with <span className="text-nexus-indigo">AETHERYX</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-xl mb-10 leading-relaxed"
          >
            The world's most advanced autonomous agent builder. No code, low code, or full-stack control—powered by the intelligence of AETHERYX.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/nexus">
              <Button size="lg" className="gap-2 bg-nexus-indigo hover:bg-nexus-indigo-light text-white border-none shadow-[0_0_20px_rgba(75,63,226,0.3)]">
                Initialize Forge <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="flex-1 w-full">
          <div className="relative aspect-square w-full glass-card rounded-3xl border border-nexus-indigo/30 nexus-glow flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-nexus-indigo/20 to-transparent" />
            <Bot size={160} className="text-nexus-indigo animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Editor Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
        <Card className="p-0 overflow-hidden flex flex-col h-[500px]">
          <div className="bg-nexus-card p-4 border-b border-nexus-border flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
              <MousePointer2 size={12} />
              Drag-and-Drop Builder
            </div>
          </div>
          <div className="flex-grow bg-nexus-dark/50 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 p-8 opacity-10">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border border-white/20 rounded-lg" />
                ))}
             </div>
             <div className="relative z-10 glass-card p-6 border-nexus-indigo/40 text-center">
                <div className="w-12 h-12 bg-nexus-indigo rounded-lg mx-auto mb-4" />
                <div className="text-sm font-bold">Logic: OnEvent</div>
                <div className="text-[10px] text-gray-500">Trigger: User Joins</div>
             </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden flex flex-col h-[500px]">
          <div className="bg-nexus-card p-4 border-b border-nexus-border flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
              <Code size={12} />
              NexusScript Editor
            </div>
          </div>
          <div className="flex-grow bg-[#0d0d0f] p-8 font-mono text-sm overflow-hidden">
            <div className="text-nexus-indigo">class</div> <span className="text-white">NexusBot</span> {"{"}
            <div className="ml-4 text-gray-500 mt-2">// Initialize AETHERYX Core</div>
            <div className="ml-4"><span className="text-nexus-indigo">async</span> <span className="text-blue-400">onInit</span>() {"{"}</div>
            <div className="ml-8 text-white">this.aetheryx.connect();</div>
            <div className="ml-4">{"}"}</div>
            <div className="ml-4 mt-4"><span className="text-nexus-indigo">on</span>(<span className="text-orange-400">"message"</span>, (msg) ={">"} {"{"}</div>
            <div className="ml-8 text-white">msg.reply(<span className="text-orange-400">"Hello from Nexus!"</span>);</div>
            <div className="ml-4">{"}"});</div>
            <div className="text-white">{"}"}</div>
            <div className="animate-pulse w-1 h-5 bg-nexus-indigo inline-block mt-4" />
          </div>
        </Card>
      </div>

      {/* Templates */}
      <div className="mb-32">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
          <LayoutTemplate className="text-nexus-indigo" />
          Ready-to-use Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Community Mod", "Economy Manager", "AI Tutor", "World Builder"].map((t) => (
            <Card key={t} className="text-center group hover:border-nexus-indigo transition-all cursor-pointer">
              <div className="w-12 h-12 bg-nexus-indigo/10 rounded-xl mx-auto mb-4 flex items-center justify-center text-nexus-indigo group-hover:bg-nexus-indigo group-hover:text-white transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="font-bold">{t}</h3>
              <p className="text-xs text-gray-500 mt-2">Deploy in 1-click</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
