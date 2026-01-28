"use client";

import { motion } from "framer-motion";
import { Layout, Users, Library, Clock, Kanban, Brain, Search, Plus } from "lucide-react";
import Card from "@/components/Card";

export default function StudioOSPage() {
  return (
    <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-nexus-indigo/10 rounded-3xl text-nexus-indigo mb-6 nexus-glow"
        >
          <Layout size={48} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Nexus <span className="text-nexus-indigo">Studio OS</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          The professional operating system for the next generation of digital creators and workforce.
        </p>
      </div>

      {/* OS Interface Mockup */}
      <div className="relative glass-card rounded-3xl border border-nexus-indigo/30 p-4 mb-32 nexus-glow overflow-hidden">
        <div className="flex items-center gap-4 mb-4 border-b border-nexus-border pb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-grow flex justify-center">
            <div className="bg-nexus-dark px-4 py-1 rounded-full text-xs text-gray-500 flex items-center gap-2">
              <Search size={12} />
              Search Studio Assets...
            </div>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Sidebar */}
          <div className="col-span-3 border-r border-nexus-border pr-4 space-y-2">
            {[
              { icon: <Users size={18} />, label: "Team Dashboard" },
              { icon: <Library size={18} />, label: "Asset Libraries" },
              { icon: <Clock size={18} />, label: "Clock-In System" },
              { icon: <Kanban size={18} />, label: "Project Boards" },
              { icon: <Brain size={18} />, label: "AI Mentor" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                  i === 0 ? "bg-nexus-indigo text-white" : "text-gray-400 hover:bg-nexus-card hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 p-4 overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Team Performance</h2>
                <div className="flex gap-2">
                   <div className="bg-nexus-indigo/10 text-nexus-indigo px-3 py-1 rounded-lg text-xs font-bold">LIVE</div>
                   <div className="bg-nexus-card px-3 py-1 rounded-lg text-xs font-bold text-gray-400">Week</div>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-4 mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-nexus-card/50 rounded-2xl p-4 border border-nexus-border">
                    <div className="text-xs text-gray-500 mb-1">METRIC {i + 1}</div>
                    <div className="text-2xl font-bold">{(Math.random() * 100).toFixed(1)}%</div>
                    <div className="w-full bg-nexus-dark h-1 rounded-full mt-4">
                       <div className="bg-nexus-indigo h-full rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                ))}
             </div>

             <div className="bg-nexus-card/50 rounded-2xl p-6 border border-nexus-border h-64 flex items-center justify-center">
                <div className="text-nexus-indigo/20 font-bold text-xl uppercase tracking-widest">Workspace Visualizer</div>
             </div>
          </div>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="space-y-4">
          <Users className="text-nexus-indigo" size={32} />
          <h3 className="text-xl font-bold">Team Dashboards</h3>
          <p className="text-gray-400 text-sm">Real-time collaboration and performance tracking for distributed teams.</p>
        </Card>
        <Card className="space-y-4">
          <Library className="text-nexus-indigo" size={32} />
          <h3 className="text-xl font-bold">Asset Libraries</h3>
          <p className="text-gray-400 text-sm">Unified repository for 3D models, textures, scripts, and media assets.</p>
        </Card>
        <Card className="space-y-4">
          <Clock className="text-nexus-indigo" size={32} />
          <h3 className="text-xl font-bold">Clock-In System</h3>
          <p className="text-gray-400 text-sm">Secure time-tracking and productivity management for virtual workforces.</p>
        </Card>
        <Card className="space-y-4">
          <Kanban className="text-nexus-indigo" size={32} />
          <h3 className="text-xl font-bold">Project Boards</h3>
          <p className="text-gray-400 text-sm">Cinematic task management with automated workflow triggers.</p>
        </Card>
        <Card className="space-y-4">
          <Brain className="text-nexus-indigo" size={32} />
          <h3 className="text-xl font-bold">AI Mentor</h3>
          <p className="text-gray-400 text-sm">AETHERYX-powered guidance to help you optimize your creation process.</p>
        </Card>
        <Card className="space-y-4 bg-nexus-indigo/5 border-nexus-indigo/20">
          <Plus className="text-nexus-indigo" size={32} />
          <h3 className="text-xl font-bold">And More</h3>
          <p className="text-gray-400 text-sm">New tools added every week to the Studio OS ecosystem.</p>
        </Card>
      </div>
    </main>
  );
}
