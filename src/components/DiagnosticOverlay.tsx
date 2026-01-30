"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, Activity, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export const DiagnosticOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    supabase: 'checking',
    env: 'checking',
    auth: 'checking',
    latency: 0,
    version: '3.0.0-STABLE'
  });

  useEffect(() => {
    const checkHealth = async () => {
      const start = Date.now();
      
      // Check Supabase
      let supabaseStatus = 'error';
      try {
        const { data, error } = await supabase.from('cities').select('id').limit(1);
        if (!error) supabaseStatus = 'online';
      } catch (e) {
        supabaseStatus = 'error';
      }

      // Check Env
      const envStatus = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'valid' : 'missing';

      // Check Auth
      let authStatus = 'unauthenticated';
      const { data: { session } } = await supabase.auth.getSession();
      if (session) authStatus = 'authenticated';

      setStats({
        supabase: supabaseStatus,
        env: envStatus,
        auth: authStatus,
        latency: Date.now() - start,
        version: '3.0.0-STABLE'
      });
    };

    if (isOpen) {
      checkHealth();
      const interval = setInterval(checkHealth, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Toggle with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-24 left-6 z-[9999] w-80 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden font-mono"
    >
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-nexus-indigo" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Nexus Diagnostic v{stats.version}</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
          <XCircle size={14} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Rows */}
        <div className="space-y-2">
          <StatusRow 
            label="Supabase Core" 
            status={stats.supabase === 'online' ? 'success' : 'error'} 
            value={stats.supabase.toUpperCase()} 
          />
          <StatusRow 
            label="Environment" 
            status={stats.env === 'valid' ? 'success' : 'error'} 
            value={stats.env.toUpperCase()} 
          />
          <StatusRow 
            label="Auth Session" 
            status={stats.auth === 'authenticated' ? 'success' : 'warn'} 
            value={stats.auth.toUpperCase()} 
          />
          <StatusRow 
            label="Neural Latency" 
            status={stats.latency < 200 ? 'success' : 'warn'} 
            value={`${stats.latency}ms`} 
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
          <button 
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[8px] font-black text-white uppercase tracking-widest hover:bg-white/10"
          >
            Force Sync
          </button>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-[8px] font-black text-red-500 uppercase tracking-widest hover:bg-red-500/20"
          >
            Purge Cache
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StatusRow = ({ label, status, value }: { label: string, status: 'success' | 'error' | 'warn', value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-[9px] text-gray-500 uppercase font-bold">{label}</span>
    <div className="flex items-center space-x-2">
      <span className={cn(
        "text-[9px] font-black uppercase tracking-tighter",
        status === 'success' ? 'text-emerald-500' : status === 'error' ? 'text-red-500' : 'text-amber-500'
      )}>{value}</span>
      {status === 'success' ? <CheckCircle2 size={10} className="text-emerald-500" /> : 
       status === 'error' ? <XCircle size={10} className="text-red-500" /> : 
       <AlertCircle size={10} className="text-amber-500" />}
    </div>
  </div>
);

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
