"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Scale, Users, FileText, AlertTriangle, 
  BarChart3, Info, ChevronRight, CheckCircle2, 
  XCircle, Clock, Send, ShieldAlert, ShieldCheck,
  Eye, Lock, BookOpen, UserCheck, Heart, Zap,
  ExternalLink, Code
} from "lucide-react";
import { cn } from "@/lib/utils";

type TSSection = 'overview' | 'appeals' | 'staff' | 'reports' | 'compliance' | 'transparency' | 'policies';

export const TrustSafetyPanel = () => {
  const [activeSection, setActiveSection] = useState<TSSection>('overview');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Info, color: 'text-blue-400' },
    { id: 'appeals', name: 'Appeals', icon: Scale, color: 'text-amber-400' },
    { id: 'staff', name: 'Staff Apps', icon: Users, color: 'text-purple-400' },
    { id: 'reports', name: 'Safety Center', icon: AlertTriangle, color: 'text-rose-400' },
    { id: 'compliance', name: 'Compliance', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'transparency', name: 'Transparency', icon: BarChart3, color: 'text-indigo-400' },
    { id: 'policies', name: 'Policies', icon: FileText, color: 'text-gray-400' },
  ];

  return (
    <div className="h-full flex flex-col bg-black/60 overflow-hidden font-sans">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-between relative z-20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-nexus-indigo/20 flex items-center justify-center border border-nexus-indigo/30 shadow-[0_0_20px_rgba(75,63,226,0.2)]">
            <Shield className="text-nexus-indigo" size={24} />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.4em]">Trust & Safety Portal</h3>
            <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">VirtuaCity Nexus // Global Governance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Systems Nominal</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-56 border-r border-white/5 bg-white/[0.02] overflow-y-auto no-scrollbar">
          <div className="p-4 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as TSSection)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group",
                  activeSection === section.id 
                    ? "bg-nexus-indigo/10 border border-nexus-indigo/20 text-white" 
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                )}
              >
                <section.icon size={16} className={cn(
                  "transition-colors",
                  activeSection === section.id ? section.color : "group-hover:text-gray-400"
                )} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{section.name}</span>
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="ml-auto w-1 h-4 bg-nexus-indigo rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-auto p-6 border-t border-white/5">
            <div className="p-4 rounded-xl bg-nexus-indigo/5 border border-nexus-indigo/10">
              <div className="text-[8px] font-black text-nexus-indigo uppercase tracking-widest mb-2">Platform Status</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[7px] font-bold uppercase text-gray-500">
                  <span>Safety Core</span>
                  <span className="text-emerald-500">Active</span>
                </div>
                <div className="flex items-center justify-between text-[7px] font-bold uppercase text-gray-500">
                  <span>AI Moderation</span>
                  <span className="text-emerald-500">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-black/20 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {activeSection === 'overview' && <OverviewSection />}
              {activeSection === 'appeals' && <AppealsSection />}
              {activeSection === 'staff' && <StaffSection />}
              {activeSection === 'reports' && <ReportsSection />}
              {activeSection === 'compliance' && <ComplianceSection />}
              {activeSection === 'transparency' && <TransparencySection />}
              {activeSection === 'policies' && <PoliciesSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- SUB-SECTIONS ---

const OverviewSection = () => (
  <div className="space-y-8">
    <div className="relative">
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-nexus-indigo/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="flex items-center space-x-3 mb-4">
        <div className="px-3 py-1 rounded-lg bg-nexus-indigo/10 border border-nexus-indigo/20">
          <span className="text-[10px] font-black text-nexus-indigo uppercase tracking-widest">Mission & Philosophy</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-nexus-indigo/20 to-transparent" />
      </div>
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Digital Civilization, <span className="text-nexus-indigo">Real Responsibility</span></h2>
      <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-medium">
        The Nexus is not just a platform; it is a <span className="text-white font-bold">digital civilization</span>. As we scale, our commitment to safety scales with us. 
        The Trust & Safety Portal is your transparency dashboard—a window into how we protect the grid while preserving the freedom of the architects and citizens who build it.
      </p>
    </div>

    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-nexus-purple/5 blur-[80px] rounded-full -mr-32 -mt-32" />
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="text-nexus-purple" size={20} />
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">The Core Philosophy: <span className="text-nexus-purple">AI-Assisted, Human-Led</span></h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 italic border-l-2 border-nexus-purple/30 pl-6">
          "We believe in Algorithmic Oversight with Human Intent. AI supports. Humans decide."
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: '1', title: 'Proactive Synthesis', desc: 'AETHERYX monitors the grid for structural instability (harassment, fraud, deepfake manipulation) in real-time.', icon: Zap },
            { id: '2', title: 'Democratic Appeals', desc: 'Citizens have the right to contest AI-driven actions through the Neural Jury system.', icon: Scale },
            { id: '3', title: 'Radical Transparency', desc: 'Every moderation event is logged on the immutable Nexus Ledger.', icon: ShieldCheck },
          ].map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-nexus-purple border border-white/10 group-hover:border-nexus-purple/50 transition-colors">
                  <span className="text-[10px] font-black">{item.id}</span>
                </div>
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{item.title}</h4>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium pl-11">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-8 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
          <ShieldAlert className="text-rose-500/20 group-hover:text-rose-500/40 transition-colors" size={48} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">High Alert</span>
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Sector 4 Instability</h3>
          <p className="text-[11px] text-gray-400 leading-relaxed mb-6 font-medium">
            Sector 4 is currently experiencing high levels of unverified logic injection. Shield protocols have been engaged to preserve grid integrity.
          </p>
          <div className="flex items-center space-x-4">
            <button className="px-5 py-2 rounded-xl bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all">
              Inspect Sector
            </button>
            <span className="text-[9px] font-black text-rose-500/60 uppercase tracking-widest">Shield Active</span>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-[2rem] bg-nexus-indigo/5 border border-nexus-indigo/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
          <BarChart3 className="text-nexus-indigo/20 group-hover:text-nexus-indigo/40 transition-colors" size={48} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.2em]">Live Grid Metrics</span>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Transparency Score', value: '98.4%', color: 'bg-emerald-500' },
              { label: 'Active Appeals', value: '12 cases', color: 'bg-amber-500' },
              { label: 'AI Moderation RT', value: '4ms', color: 'bg-blue-500' },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{metric.label}</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">{metric.value}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    className={cn("h-full", metric.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppealsSection = () => {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">The Neural Jury: <span className="text-amber-400">Democratic Appeals</span></h2>
        <p className="text-gray-400 text-sm max-w-2xl font-medium leading-relaxed">
          Every citizen of the Nexus has the right to a fair hearing. Our Neural Jury system combines AI synthesis of behavior patterns with human oversight from the Vanguard to ensure justice is served fairly across the grid.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Avg Response', value: '14h', icon: Clock },
          { label: 'Appeal Rate', value: '4.2%', icon: BarChart3 },
          { label: 'Success Rate', value: '12%', icon: CheckCircle2 },
          { label: 'Active Mods', value: '24', icon: UserCheck },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <stat.icon className="mx-auto text-gray-600 mb-2" size={16} />
            <div className="text-xs font-black text-white">{stat.value}</div>
            <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nexus ID // Username</label>
              <input type="text" placeholder="e.g. NeoCitizen_01" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:border-nexus-indigo/50 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Incident Type</label>
              <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-nexus-indigo/50 outline-none transition-all appearance-none">
                <option>Communication Restriction</option>
                <option>Grid Access Suspension</option>
                <option>Identity Core Deactivation</option>
                <option>Module Usage Ban</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Case for Reinstatement</label>
            <textarea 
              rows={5} 
              placeholder="Provide context for your appeal. Be specific and honest. AETHERYX will verify all statements against stream logs."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:border-nexus-indigo/50 outline-none transition-all resize-none"
            />
          </div>
          <button 
            onClick={() => {
              setFormState('submitting');
              setTimeout(() => setFormState('success'), 2000);
            }}
            className="w-full py-4 rounded-xl bg-nexus-indigo text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-nexus-indigo/80 transition-all flex items-center justify-center space-x-2 shadow-[0_10px_30px_rgba(75,63,226,0.3)]"
          >
            {formState === 'submitting' ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : formState === 'success' ? (
              <>
                <CheckCircle2 size={18} />
                <span>Appeal Transmitted</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Submit Appeal to Core</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const StaffSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Vanguard Recruitment: <span className="text-purple-400">Human-Led Safety</span></h2>
      <p className="text-gray-400 text-sm max-w-2xl font-medium leading-relaxed">
        AI supports, but Humans decide. Join the Vanguard—the elite group of architects and guardians responsible for the ethical direction of the Nexus.
      </p>
    </div>

    <div className="space-y-4">
      {[
        { role: 'Grid Guardian', type: 'Safety', open: true, desc: 'Monitor live data streams and resolve user conflicts in real-time.' },
        { role: 'Aether Analyst', type: 'AI Training', open: true, desc: 'Work with developers to tune AETHERYX moderation parameters.' },
        { role: 'Identity Auditor', type: 'Compliance', open: false, desc: 'Verify user credentials and handle high-level security disputes.' },
      ].map((role, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all flex items-center justify-between group">
          <div className="flex items-center space-x-6">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center border",
              role.open ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-gray-500/10 border-gray-500/30 text-gray-500"
            )}>
              <Users size={20} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xs font-black text-white uppercase tracking-widest">{role.role}</h3>
                <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/5 uppercase">{role.type}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium max-w-md">{role.desc}</p>
            </div>
          </div>
          <button 
            disabled={!role.open}
            className={cn(
              "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              role.open 
                ? "bg-white/10 text-white hover:bg-nexus-indigo hover:shadow-[0_0_15px_rgba(75,63,226,0.4)]" 
                : "bg-white/5 text-gray-700 cursor-not-allowed"
            )}
          >
            {role.open ? 'Apply Now' : 'Closed'}
          </button>
        </div>
      ))}
    </div>

    <div className="p-8 rounded-3xl bg-purple-500/5 border border-purple-500/10 flex items-center space-x-8">
      <div className="flex-1">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Architect Clearance Required</h3>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Staff members are expected to uphold the highest standards of the Nexus Charter. 
          All applicants undergo a deep-scan background check and must have at least 100 
          hours of grid activity.
        </p>
      </div>
      <Heart size={48} className="text-purple-500/20" />
    </div>
  </div>
);

const ReportsSection = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Safety Center: <span className="text-rose-400">Radical Transparency</span></h2>
        <p className="text-gray-400 text-sm max-w-2xl font-medium leading-relaxed">
          Access the live moderation feed and report harmful behavior. Every action taken on the grid is logged and verifiable.
        </p>
      </div>
      <button className="px-6 py-3 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] flex items-center space-x-2">
        <AlertTriangle size={14} />
        <span>Report Incident</span>
      </button>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center space-x-2">
          <ShieldAlert size={16} className="text-rose-400" />
          <span>Quick Actions</span>
        </h3>
        <div className="space-y-3">
          {['Block User Identity', 'Mute Data Stream', 'Restrict Module Permissions', 'Request Grid Marshall'].map((action, i) => (
            <button key={i} className="w-full p-4 rounded-xl bg-black/40 border border-white/5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-rose-500/30 hover:text-rose-400 transition-all flex items-center justify-between group">
              {action}
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center space-x-2">
          <BookOpen size={16} className="text-blue-400" />
          <span>Safety Guides</span>
        </h3>
        <div className="space-y-4">
          {[
            { title: 'Cyber-Security Basics', time: '5 min read' },
            { title: 'Recognizing Neural Phishing', time: '8 min read' },
            { title: 'Safe Scripting Practices', time: '12 min read' },
          ].map((guide, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div>
                <div className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-blue-400 transition-colors">{guide.title}</div>
                <div className="text-[8px] font-bold text-gray-600 uppercase mt-1">{guide.time}</div>
              </div>
              <ExternalLink size={14} className="text-gray-700 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ComplianceSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Developer Compliance</h2>
      <p className="text-gray-400 text-sm">Ensuring third-party modules and cities meet Nexus Safety Standards.</p>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Active API Keys & Permissions</h3>
        <div className="space-y-4">
          {[
            { name: 'Aetheryx_Core_Bridge', status: 'Compliant', usage: 'High' },
            { name: 'Spatial_UI_Toolkit', status: 'Compliant', usage: 'Low' },
            { name: 'Custom_Logic_Node_v2', status: 'Under Review', usage: 'Med' },
          ].map((api, i) => (
            <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Code size={16} className="text-gray-500" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">{api.name}</div>
                  <div className="text-[8px] font-bold text-gray-600 uppercase mt-1">Usage Intensity: {api.usage}</div>
                </div>
              </div>
              <div className={cn(
                "text-[8px] font-black uppercase px-3 py-1 rounded-full border",
                api.status === 'Compliant' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-amber-500/10 border-amber-500/20 text-amber-500"
              )}>
                {api.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
          <ShieldCheck size={32} className="text-emerald-500 mb-4" />
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2">Safety Verified</h3>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Your developer identity has been verified. You have access to Tier 2 Spatial APIs.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Quick Links</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-[9px] font-bold text-white hover:text-nexus-indigo transition-colors uppercase">Developer Portal</button>
            <button className="w-full text-left text-[9px] font-bold text-white hover:text-nexus-indigo transition-colors uppercase">API Documentation</button>
            <button className="w-full text-left text-[9px] font-bold text-white hover:text-nexus-indigo transition-colors uppercase">Security Audit Request</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TransparencySection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Transparency & Governance</h2>
      <p className="text-gray-400 text-sm">Real-time data on platform moderation and administrative actions.</p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Moderation Activity (Last 24h)</h3>
        <div className="h-48 flex items-end justify-between space-x-2 px-2">
          {[45, 67, 32, 89, 54, 76, 43, 91, 56, 34].map((h, i) => (
            <div key={i} className="flex-1 group relative">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="bg-nexus-indigo/40 group-hover:bg-nexus-indigo transition-all rounded-t-sm"
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-black text-white">{h}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[7px] font-black text-gray-600 uppercase tracking-widest">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Administrative Actions</h3>
        <div className="space-y-4">
          {[
            { type: 'Global Ban', count: '12', trend: '+2%' },
            { type: 'Stream Mute', count: '142', trend: '-5%' },
            { type: 'Module Removal', count: '8', trend: '0%' },
            { type: 'Appeal Processed', count: '29', trend: '+12%' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase">{stat.type}</span>
              <div className="flex items-center space-x-4">
                <span className="text-xs font-black text-white">{stat.count}</span>
                <span className={cn(
                  "text-[8px] font-black",
                  stat.trend.startsWith('+') ? "text-rose-500" : stat.trend.startsWith('-') ? "text-emerald-500" : "text-gray-500"
                )}>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PoliciesSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Platform Policies</h2>
      <p className="text-gray-400 text-sm">The legal and ethical framework of VirtuaCity Nexus.</p>
    </div>

    <div className="space-y-4">
      {[
        { title: 'Nexus Charter (Terms of Service)', updated: 'Jan 15, 2026', icon: FileText },
        { title: 'Privacy Protocol (Neural Data)', updated: 'Jan 20, 2026', icon: Lock },
        { title: 'Creator Code of Conduct', updated: 'Dec 05, 2025', icon: UserCheck },
        { title: 'AI Ethics & Moderation Guidelines', updated: 'Jan 10, 2026', icon: ShieldCheck },
      ].map((policy, i) => (
        <button key={i} className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-nexus-indigo/30 hover:bg-white/[0.08] transition-all flex items-center justify-between group">
          <div className="flex items-center space-x-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-nexus-indigo transition-colors">
              <policy.icon size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">{policy.title}</h3>
              <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Last Updated: {policy.updated}</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      ))}
    </div>

    <div className="p-8 text-center border-t border-white/5">
      <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed max-w-lg mx-auto">
        By continuing to use VirtuaCity Nexus, you agree to these policies and the 
        autonomous governance of the AETHERYX Core.
      </p>
    </div>
  </div>
);
