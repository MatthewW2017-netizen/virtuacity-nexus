"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Cpu, Globe, Zap, Bot, Layout, Server } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

export default function AIPage() {
  const capabilities = [
    {
      icon: <Bot size={24} />,
      title: "How it builds bots",
      description: "AETHERYX translates natural language into complex bot logic, automating everything from moderation to economy management.",
    },
    {
      icon: <Server size={24} />,
      title: "How it designs servers",
      description: "Instantly generate optimized server architectures, permission systems, and interactive environments with a single prompt.",
    },
    {
      icon: <Layout size={24} />,
      title: "How it helps creators",
      description: "Acting as a digital co-pilot, AETHERYX assists in asset management, team coordination, and project optimization.",
    },
    {
      icon: <Zap size={24} />,
      title: "How it powers Nexus",
      description: "AETHERYX is the underlying intelligence that enables sub-millisecond connectivity and smart routing across the platform.",
    },
  ];

  return (
    <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nexus-indigo/10 rounded-full blur-[120px] -z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nexus-indigo/30 bg-nexus-indigo/5 text-nexus-indigo text-xs font-bold mb-8"
        >
          <Sparkles size={14} />
          INTRODUCING AETHERYX
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black mb-8 tracking-tighter"
        >
          Intelligence <span className="text-nexus-indigo">Redefined</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed">
          Meet AETHERYX, the mythic AI core powering the VirtuaCity Nexus ecosystem. More than just a model, it's the engine of the metaverse.
        </p>
      </div>

      {/* Core Concept */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">What is AETHERYX?</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            AETHERYX is a multi-modal artificial intelligence system specifically designed for virtual world operations. It combines deep learning with real-time world-state understanding to provide creators with unprecedented power.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-nexus-card rounded-2xl border border-nexus-border">
              <div className="text-nexus-indigo font-black text-3xl mb-2">1ms</div>
              <div className="text-gray-500 text-xs uppercase font-bold tracking-widest">Inference Latency</div>
            </div>
            <div className="p-6 bg-nexus-card rounded-2xl border border-nexus-border">
              <div className="text-nexus-indigo font-black text-3xl mb-2">∞</div>
              <div className="text-gray-500 text-xs uppercase font-bold tracking-widest">World Capacity</div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square">
           <div className="absolute inset-0 bg-nexus-indigo/20 rounded-full animate-pulse-slow blur-3xl" />
           <div className="relative z-10 w-full h-full glass-card rounded-full border-nexus-indigo/40 flex items-center justify-center">
              <div className="relative">
                 <Brain size={120} className="text-nexus-indigo" />
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-8 border-2 border-dashed border-nexus-indigo/20 rounded-full"
                 />
                 <motion.div
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-16 border border-nexus-indigo/10 rounded-full"
                 />
              </div>
           </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {capabilities.map((cap) => (
          <Card key={cap.title} className="flex flex-col md:flex-row gap-6 items-start">
            <div className="p-4 bg-nexus-indigo/10 rounded-2xl text-nexus-indigo shrink-0">
              {cap.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{cap.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Vision */}
      <section className="text-center py-20 bg-nexus-indigo/5 rounded-[48px] border border-nexus-indigo/10 px-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">The Future is Intelligent.</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-12">
          AETHERYX isn't just about automation; it's about augmentation. We're building a future where every creator has a super-intelligent team at their fingertips.
        </p>
        <div className="flex flex-wrap justify-center gap-12">
           <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
              <Cpu size={20} className="text-nexus-indigo" />
              NEURAL ARCHITECTURE
           </div>
           <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
              <Globe size={20} className="text-nexus-indigo" />
              DISTRIBUTED LEARNING
           </div>
           <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
              <Zap size={20} className="text-nexus-indigo" />
              REAL-TIME SYNAPSE
           </div>
        </div>
        <div className="mt-16">
          <Link href="/early-access">
            <Button size="lg" className="px-12">Join the Intelligent Era</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
