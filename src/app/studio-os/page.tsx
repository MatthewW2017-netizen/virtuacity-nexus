"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Users, Library, Clock, Kanban, Brain, Search, Plus, Play, Pause, Send, Bot, ArrowLeft, LogOut, Shield } from "lucide-react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function StudioOSPage() {
  const [activeTab, setActiveTab] = useState("Team Dashboard");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [aiQuery, setAiQuery] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', content: "Welcome back, Creator. I have analyzed your recent activity in the Synthesis Sector. Your productivity is 14% above the baseline. How can I assist your workflow today?" },
    { role: 'user', content: "I need help optimizing the shader nodes for the virtual city project." },
    { role: 'ai', content: "Understood. Initializing Shader Optimization protocols. I recommend using the new 'Decentralized Light' module for better performance across mobile neural links." }
  ]);

  // Project Board State
  const [projects, setProjects] = useState([
    { id: 1, title: "Nexus Core Update", status: "In Progress", priority: "High" },
    { id: 2, title: "AI Mentor Refinement", status: "To Do", priority: "Medium" },
    { id: 3, title: "Asset Pipeline v2", status: "Done", priority: "Low" },
  ]);

  // Asset Library State
  const [assets, setAssets] = useState([
    { id: 1, name: "Neon Shader Pro", type: "Shader", size: "12MB" },
    { id: 2, name: "City Bot v4", type: "3D Model", size: "45MB" },
    { id: 3, name: "Night Rain Texture", type: "Texture", size: "8MB" },
  ]);

  const { user } = useAuth();
  const router = useRouter();

  const [isFounder, setIsFounder] = useState(false);

  // Persistence Logic
  useEffect(() => {
    if (!user) return;

    // Load state from Supabase
    const loadState = async () => {
      const { data, error } = await supabase
        .from('studio_state')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        if (data.projects) setProjects(data.projects);
        if (data.assets) setAssets(data.assets);
      }

      // Check if user is a founder of any city
      const { data: cities } = await supabase
        .from('cities')
        .select('id')
        .eq('owner_id', user.id)
        .limit(1);
      
      setIsFounder(!!(cities && cities.length > 0));
    };

    loadState();
  }, [user]);

  // Save state when it changes
  useEffect(() => {
    if (!user) return;

    const saveState = async () => {
      await supabase
        .from('studio_state')
        .upsert({
          user_id: user.id,
          projects,
          assets,
          updated_at: new Date().toISOString()
        });
    };

    const timer = setTimeout(saveState, 2000); // Debounce saves
    return () => clearTimeout(timer);
  }, [projects, assets, user]);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    const newMsg = { role: 'user', content: aiQuery };
    setAiMessages(prev => [...prev, newMsg]);
    setAiQuery("");
    
    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Processing query through AETHERYX Neural Core... Pattern recognized. I am synchronizing the relevant data nodes for your request." 
      }]);
    }, 1000);
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTabClick = (label: string) => {
    setActiveTab(label);
    if (label === "Asset Libraries" || label === "Project Boards" || label === "Live Nexus Control") {
      triggerNotification(`${label} is synchronizing with the Nexus...`);
    }
  };

  // Redirect if not logged in (safety)
  useEffect(() => {
    if (!user) {
      // Small delay to allow auth to load
      const timer = setTimeout(() => {
        if (!user) router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const tabs = [
    { icon: <Users size={18} />, label: "Team Dashboard" },
    { icon: <Library size={18} />, label: "Asset Libraries" },
    { icon: <Clock size={18} />, label: "Clock-In System" },
    { icon: <Kanban size={18} />, label: "Project Boards" },
    { icon: <Brain size={18} />, label: "AI Mentor" },
    { icon: <Play size={18} />, label: "Live Nexus Control" },
  ];

  return (
    <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto relative">
      {/* Global Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-nexus-indigo text-white rounded-full shadow-2xl font-bold text-sm flex items-center gap-3 border border-white/20"
          >
            <Shield size={16} />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

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

        <div className="grid grid-cols-12 gap-4 h-[650px]">
          {/* Sidebar */}
          <div className="col-span-3 border-r border-nexus-border pr-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="px-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.2em]">{isFounder ? 'Founder' : 'Creator'} Dashboard</div>
                  {isFounder && (
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded text-[7px] font-black tracking-widest uppercase">Founder</span>
                  )}
                </div>
                <div className="h-0.5 w-8 bg-nexus-indigo rounded-full" />
              </div>
              
              {tabs.map((item) => (
                <div
                  key={item.label}
                  onClick={() => handleTabClick(item.label)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${
                    activeTab === item.label 
                      ? "bg-nexus-indigo text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]" 
                      : "text-gray-400 hover:bg-nexus-card hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-nexus-border space-y-2">
              <button 
                onClick={() => router.push("/nexus")}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <ArrowLeft size={18} />
                Return to Nexus
              </button>
              
              <div className="p-3 bg-nexus-indigo/5 rounded-2xl border border-nexus-indigo/10 flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                  isFounder 
                    ? "bg-amber-500/20 text-amber-500 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]" 
                    : "bg-nexus-indigo/20 text-nexus-indigo border-nexus-indigo/30"
                )}>
                  {isFounder ? <Shield size={14} /> : <Users size={14} />}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-white truncate">{user?.user_metadata?.name || user?.email?.split('@')[0] || 'Founder'}</div>
                  <div className={cn(
                    "text-[8px] font-black uppercase tracking-widest",
                    isFounder ? "text-amber-500" : "text-nexus-indigo"
                  )}>
                    {isFounder ? 'Founder Session' : 'Creator Session'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 p-4 overflow-y-auto">
             <AnimatePresence mode="wait">
               {activeTab === "Team Dashboard" && (
                 <motion.div
                   key="team"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                 >
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">Team Performance</h2>
                      <div className="flex gap-2">
                         <div className="bg-nexus-indigo/10 text-nexus-indigo px-3 py-1 rounded-lg text-xs font-bold animate-pulse">LIVE</div>
                         <div className="bg-nexus-card px-3 py-1 rounded-lg text-xs font-bold text-gray-400">Week</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { label: "NEURAL SYNC", value: "98.2%", trend: "+2.4%" },
                        { label: "ASSET FLOW", value: "1.4GB/s", trend: "+0.8%" },
                        { label: "ACTIVE NODES", value: "14", trend: "Stable" }
                      ].map((metric, i) => (
                        <div key={i} className="bg-nexus-card/50 rounded-2xl p-4 border border-nexus-border group hover:border-nexus-indigo/30 transition-all">
                          <div className="text-[10px] text-gray-500 mb-1 font-black tracking-widest uppercase">{metric.label}</div>
                          <div className="flex justify-between items-end">
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <div className="text-[10px] text-nexus-indigo font-bold">{metric.trend}</div>
                          </div>
                          <div className="w-full bg-nexus-dark h-1 rounded-full mt-4 overflow-hidden">
                             <motion.div 
                               className="bg-nexus-indigo h-full rounded-full" 
                               initial={{ width: 0 }}
                               animate={{ width: `${60 + Math.random() * 30}%` }}
                               transition={{ duration: 1, delay: i * 0.2 }}
                             />
                          </div>
                        </div>
                      ))}
                   </div>

                   <div className="bg-nexus-card/50 rounded-2xl p-8 border border-nexus-border relative overflow-hidden group">
                      <div className="absolute inset-0 bg-nexus-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 py-12">
                        <div className="w-16 h-16 rounded-full bg-nexus-indigo/10 flex items-center justify-center text-nexus-indigo mb-2">
                          <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-[0.3em]">Collaborative Core</h3>
                        <p className="text-gray-500 max-w-sm text-sm">Synchronize with your team in the AETHERYX workspace to begin visual collaboration.</p>
                        <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-nexus-indigo hover:text-white transition-all">
                          Initialize Sync
                        </button>
                      </div>
                      
                      {/* Decorative grid */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-nexus-indigo/10 to-transparent opacity-50" />
                   </div>
                 </motion.div>
               )}

               {activeTab === "Clock-In System" && (
                 <motion.div
                   key="clock"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex flex-col items-center justify-center h-full space-y-8"
                 >
                   <div className="text-center">
                     <h2 className="text-3xl font-bold mb-2">Shift Manager</h2>
                     <p className="text-gray-400">Track your contributions to the Nexus</p>
                   </div>

                   <div className="relative">
                     <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${isClockedIn ? "border-nexus-indigo nexus-glow" : "border-gray-800"}`}>
                       <div className="text-4xl font-mono font-bold tracking-tighter">
                         {isClockedIn ? "02:45:12" : "00:00:00"}
                       </div>
                     </div>
                     {isClockedIn && (
                       <motion.div
                         animate={{ scale: [1, 1.2, 1] }}
                         transition={{ repeat: Infinity, duration: 2 }}
                         className="absolute top-0 right-0 w-4 h-4 bg-nexus-indigo rounded-full shadow-[0_0_10px_#4f46e5]"
                       />
                     )}
                   </div>

                   <button
                    onClick={() => {
                      setIsClockedIn(!isClockedIn);
                      triggerNotification(isClockedIn ? "Shift terminated. Data synchronized." : "Shift initialized. Contribution tracking active.");
                    }}
                    className={`px-12 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all ${
                       isClockedIn 
                        ? "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white" 
                        : "bg-nexus-indigo text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105"
                     }`}
                   >
                     {isClockedIn ? <Pause size={24} /> : <Play size={24} />}
                     {isClockedIn ? "CLOCK OUT" : "CLOCK IN"}
                   </button>

                   <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                     <div className="bg-nexus-card/50 p-4 rounded-2xl border border-nexus-border text-center">
                       <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Today's Earnings</div>
                       <div className="text-xl font-bold text-nexus-indigo">450 NXS</div>
                     </div>
                     <div className="bg-nexus-card/50 p-4 rounded-2xl border border-nexus-border text-center">
                       <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Rank Progress</div>
                       <div className="text-xl font-bold text-nexus-indigo">+12%</div>
                     </div>
                   </div>
                 </motion.div>
               )}

               {activeTab === "AI Mentor" && (
                 <motion.div
                   key="ai"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex flex-col h-full"
                 >
                    <div className="flex items-center gap-4 mb-6 p-4 bg-nexus-indigo/10 rounded-2xl border border-nexus-indigo/20">
                      <div className="p-3 bg-nexus-indigo rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                        <Bot size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold">AETHERYX Neural Mentor</h3>
                        <p className="text-xs text-nexus-indigo/80 font-mono">STATUS: SYNCHRONIZED</p>
                      </div>
                    </div>

                    <div className="flex-grow space-y-4 mb-6 overflow-y-auto pr-2 custom-scrollbar">
                      {aiMessages.map((msg, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "p-4 rounded-2xl border max-w-[80%] text-sm",
                            msg.role === 'ai' 
                              ? "bg-nexus-card/50 border-nexus-border text-gray-300" 
                              : "bg-nexus-indigo/10 border-nexus-indigo/20 text-white ml-auto text-right"
                          )}
                        >
                          {msg.content}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAiSubmit} className="relative mt-auto">
                      <input 
                        type="text"
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        placeholder="Transmit query to AETHERYX..."
                        className="w-full bg-nexus-dark border border-nexus-border rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-nexus-indigo/50 transition-colors"
                      />
                      <button 
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-nexus-indigo rounded-xl text-white hover:bg-nexus-indigo/80 transition-all"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                 </motion.div>
               )}

               {activeTab === "Asset Libraries" && (
                 <motion.div
                   key="assets"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                 >
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">Asset Repository</h2>
                      <button 
                        onClick={() => {
                          const name = prompt("Enter asset name:");
                          if (name) {
                            setAssets([...assets, { id: Date.now(), name, type: "Generic", size: "0MB" }]);
                            triggerNotification("Asset uploaded to Nexus Cloud.");
                          }
                        }}
                        className="flex items-center gap-2 bg-nexus-indigo px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-all"
                      >
                        <Plus size={16} />
                        Upload Asset
                      </button>
                   </div>

                   <div className="grid grid-cols-1 gap-3">
                     {assets.map((asset) => (
                       <div key={asset.id} className="group flex items-center justify-between p-4 bg-nexus-card/50 rounded-2xl border border-nexus-border hover:border-nexus-indigo/50 transition-all">
                         <div className="flex items-center gap-4">
                           <div className="p-3 bg-nexus-indigo/10 rounded-xl text-nexus-indigo">
                             <Library size={20} />
                           </div>
                           <div>
                             <div className="font-bold">{asset.name}</div>
                             <div className="text-[10px] text-gray-500 uppercase tracking-widest">{asset.type} • {asset.size}</div>
                           </div>
                         </div>
                         <button 
                          onClick={() => {
                            setAssets(assets.filter(a => a.id !== asset.id));
                            triggerNotification("Asset purged from system.");
                          }}
                          className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                         >
                           Purge
                         </button>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}

               {activeTab === "Project Boards" && (
                 <motion.div
                   key="projects"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                 >
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">Project Flux</h2>
                      <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-nexus-indigo">Active: {projects.length}</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-green-500">Syncing...</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-6">
                     {["To Do", "In Progress", "Done"].map((status) => (
                       <div key={status} className="space-y-4">
                         <div className="flex items-center gap-2 px-2">
                           <div className={cn(
                             "w-2 h-2 rounded-full",
                             status === "To Do" ? "bg-gray-500" : status === "In Progress" ? "bg-nexus-indigo" : "bg-green-500"
                           )} />
                           <span className="text-xs font-black uppercase tracking-widest text-gray-400">{status}</span>
                         </div>
                         
                         <div className="space-y-3">
                           {projects.filter(p => p.status === status).map(project => (
                             <div key={project.id} className="p-4 bg-nexus-card/30 rounded-2xl border border-nexus-border hover:border-nexus-indigo/30 transition-all cursor-pointer">
                               <div className="text-sm font-bold mb-2">{project.title}</div>
                               <div className="flex justify-between items-center">
                                 <span className={cn(
                                   "text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest",
                                   project.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-nexus-indigo/10 text-nexus-indigo"
                                 )}>
                                   {project.priority}
                                 </span>
                                 <div className="flex -space-x-2">
                                   {[1, 2].map(i => (
                                     <div key={i} className="w-5 h-5 rounded-full border border-nexus-dark bg-nexus-card flex items-center justify-center text-[8px] font-bold text-gray-500">
                                       U{i}
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}

               {false && (activeTab === "Asset Libraries" || activeTab === "Project Boards") && (
                 <motion.div
                   key="placeholder"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="flex flex-col items-center justify-center h-full text-center space-y-4"
                 >
                   <div className="p-6 bg-white/5 rounded-full mb-4">
                     {tabs.find(t => t.label === activeTab)?.icon}
                   </div>
                   <h3 className="text-xl font-bold uppercase tracking-widest">{activeTab}</h3>
                   <p className="text-gray-500 max-w-xs">This module is currently undergoing synchronization. Expected online in Build 2.1.0.</p>
                   <div className="w-48 h-1 bg-nexus-dark rounded-full overflow-hidden">
                     <motion.div 
                        className="bg-nexus-indigo h-full"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                     />
                   </div>
                 </motion.div>
               )}

               {activeTab === "Live Nexus Control" && (
                 <motion.div
                   key="nexus-control"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                 >
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">Live Nexus Control</h2>
                      <div className="flex gap-2">
                         <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg text-xs font-bold">SYSTEM ONLINE</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 mb-8">
                     {[
                       { name: "Sector 01: Core", status: "Operational", load: "42%", users: 124 },
                       { name: "Sector 07: Synthesis", status: "Operational", load: "18%", users: 56 },
                       { name: "Sector 12: Neural", status: "Maintenance", load: "0%", users: 0 },
                       { name: "Sector 04: Market", status: "Operational", load: "89%", users: 1204 }
                     ].map((node, i) => (
                       <div key={i} className="bg-nexus-card/50 rounded-2xl p-6 border border-nexus-border group hover:border-nexus-indigo/50 transition-all">
                         <div className="flex justify-between items-start mb-4">
                           <div>
                             <h3 className="font-bold text-lg mb-1">{node.name}</h3>
                             <div className={cn(
                               "text-[10px] font-black uppercase tracking-widest",
                               node.status === 'Operational' ? "text-emerald-500" : "text-amber-500"
                             )}>
                               {node.status}
                             </div>
                           </div>
                           <div className="text-right">
                             <div className="text-xs text-gray-500 uppercase font-bold">Active Users</div>
                             <div className="text-lg font-bold text-white">{node.users}</div>
                           </div>
                         </div>

                         <div className="space-y-3 mb-6">
                           <div>
                             <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1">
                               <span>Neural Load</span>
                               <span>{node.load}</span>
                             </div>
                             <div className="w-full h-1 bg-nexus-dark rounded-full overflow-hidden">
                               <div className="h-full bg-nexus-indigo rounded-full" style={{ width: node.load }} />
                             </div>
                           </div>
                         </div>

                         <button 
                           onClick={() => {
                             triggerNotification(`Establishing neural link to ${node.name}...`);
                             setTimeout(() => router.push("/nexus"), 1500);
                           }}
                           className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.2em] group-hover:bg-nexus-indigo group-hover:text-white transition-all flex items-center justify-center gap-2"
                         >
                           <Play size={14} />
                           Remote In
                         </button>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
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
