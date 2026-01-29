"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, Shield, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
        {/* Background Animation Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nexus-indigo/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nexus-indigo/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <div className="px-4 py-1.5 rounded-full border border-nexus-indigo/30 bg-nexus-indigo/10 text-nexus-indigo text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={14} />
              The Future of Connection
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            VIRTUA<span className="text-nexus-indigo">CITY</span> NEXUS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 font-medium"
          >
            “Where every world connects.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="/nexus" size="lg" className="w-full sm:w-auto gap-2 bg-nexus-indigo hover:bg-nexus-indigo-light text-white border-none shadow-[0_0_20px_rgba(75,63,226,0.3)]">
              Initialize Nexus <ArrowRight size={18} />
            </Button>
            <Button href="/nexus" variant="outline" size="lg" className="w-full sm:w-auto border-nexus-indigo/30 hover:border-nexus-indigo hover:bg-nexus-indigo/5">
              Quick Access
            </Button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 w-full max-w-5xl px-4"
        >
          <div className="relative aspect-[16/9] w-full glass-card rounded-2xl overflow-hidden border border-nexus-indigo/20">
            <div className="absolute inset-0 bg-gradient-to-t from-nexus-dark to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center text-nexus-indigo/20">
              <Globe size={200} className="animate-pulse-slow" />
            </div>
            <div className="absolute bottom-8 left-8 z-20">
              <p className="text-sm font-mono text-nexus-indigo/60">SYSTEM STATUS: FULLY OPERATIONAL</p>
              <h3 className="text-xl font-bold uppercase tracking-widest">Nexus OS: Founder's Edition</h3>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Section */}
      <section className="py-32 w-full max-w-7xl px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Unified Ecosystem</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            Experience the "Founder's Edition" of VirtuaCity—a seamless integration of communication, creativity, and economy in a single cinematic interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="flex flex-col items-start gap-4">
            <div className="p-3 bg-nexus-indigo/10 rounded-xl text-nexus-indigo">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold">Ultra-Fast Performance</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built on the Nexus Core for sub-millisecond response times across the entire grid.
            </p>
          </Card>
          <Card className="flex flex-col items-start gap-4">
            <div className="p-3 bg-nexus-indigo/10 rounded-xl text-nexus-indigo">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold">End-to-End Security</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your identity and data are protected by our decentralized security protocols.
            </p>
          </Card>
          <Card className="flex flex-col items-start gap-4">
            <div className="p-3 bg-nexus-indigo/10 rounded-xl text-nexus-indigo">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold">Global Connectivity</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect with users and AI agents from every world in the metaverse instantly.
            </p>
          </Card>
        </div>

        {/* Simple Step-by-Step Guide for New Users */}
        <div className="mt-32 p-12 glass-card rounded-[3rem] border border-nexus-indigo/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nexus-indigo/5 blur-[80px] rounded-full" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-nexus-indigo font-bold mb-8 tracking-[0.2em] text-xs uppercase">
              <Sparkles size={16} />
              Getting Started
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black mb-12">How to use the Nexus</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Initialize", desc: "Click 'Enter Nexus' to boot up your personal operating environment." },
                { step: "02", title: "Select Space", desc: "Choose a workspace from the sidebar (Social, AI, or Studio)." },
                { step: "03", title: "Warp to City", desc: "Click a city node on the grid to jump into its live data stream." },
                { step: "04", title: "Build & Chat", desc: "Use the command bar or chat windows to interact with AETHERYX." },
              ].map((s, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-5xl font-black text-white/5">{s.step}</div>
                  <h4 className="text-lg font-bold">{s.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studio OS Showcase */}
      <section className="py-32 w-full bg-nexus-card/30 border-y border-nexus-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">Built for Creators.</h2>
              <p className="text-gray-400 text-lg mb-8 font-medium">
                Nexus Studio OS provides the professional tools you need to manage teams, track assets, and build the future of the metaverse—live and fully operational.
              </p>
              <ul className="space-y-4">
                {["Live Project Boards", "Cloud Asset Libraries", "Real-time Team Dashboards", "AETHERYX AI Mentors"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-nexus-indigo shadow-[0_0_10px_rgba(75,63,226,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="relative aspect-square w-full max-w-md mx-auto glass-card rounded-[3rem] border border-nexus-indigo/20 flex items-center justify-center group overflow-hidden">
                 <div className="text-nexus-indigo/20 font-black text-4xl transform -rotate-12 group-hover:scale-110 transition-transform duration-500">STUDIO OS</div>
                 <div className="absolute inset-0 bg-gradient-to-br from-nexus-indigo/10 to-transparent pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-nexus-indigo/10 rounded-full blur-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 w-full px-4 text-center">
        <div className="max-w-3xl mx-auto glass-card p-12 rounded-3xl border border-nexus-indigo/30 shadow-[0_0_50px_rgba(75,63,226,0.1)]">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-header">Ready to enter the Nexus?</h2>
          <p className="text-gray-400 mb-10 text-lg font-soft">
            Be among the first to experience the future of digital interaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/nexus" size="lg" className="px-12 bg-nexus-indigo hover:bg-nexus-indigo-light text-white border-none">Enter the Grid</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
