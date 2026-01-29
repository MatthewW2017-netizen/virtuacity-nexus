'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataService } from '@/lib/dataService';
import { supabase } from '@/lib/supabase';

interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error' | 'fatal';
  source: string;
  message: string;
  details: any;
  timestamp: string;
}

export const EngineeringConsole = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'error' | 'info'>('all');
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    latency: 0
  });

  useEffect(() => {
    // Initial fetch
    fetchLogs();

    // Subscribe to new logs for real-time debugging
    const channel = supabase
      .channel('system_logs_realtime')
      .on(
        'postgres_changes' as any,
        { event: 'INSERT', table: 'system_logs', schema: 'public' },
        (payload: any) => {
          setLogs(prev => [payload.new as LogEntry, ...prev].slice(0, 100));
        }
      )
      .subscribe();

    // Simulated metrics
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        memory: Math.floor(Math.random() * 20) + 60,
        latency: Math.floor(Math.random() * 50) + 20
      });
    }, 2000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const fetchLogs = async () => {
    const { data } = await supabase
      .from('system_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);
    
    if (data) setLogs(data);
  };

  const filteredLogs = logs.filter(log => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'error') return log.level === 'error' || log.level === 'fatal';
    return log.level === 'info' || log.level === 'warn';
  });

  return (
    <div className="h-full bg-[#050506] flex flex-col font-mono text-[10px]">
      {/* Metrics Bar */}
      <div className="grid grid-cols-3 gap-1 p-2 bg-white/5 border-b border-white/10">
        {[
          { label: 'CPU_LOAD', value: `${systemStats.cpu}%`, color: 'text-emerald-500' },
          { label: 'MEM_USAGE', value: `${systemStats.memory}%`, color: 'text-blue-500' },
          { label: 'NET_LATENCY', value: `${systemStats.latency}ms`, color: 'text-amber-500' }
        ].map(stat => (
          <div key={stat.label} className="flex flex-col border-r border-white/10 last:border-0 px-2">
            <span className="text-gray-500 text-[8px] tracking-widest">{stat.label}</span>
            <span className={`${stat.color} font-black`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Control Strip */}
      <div className="flex items-center gap-2 p-2 bg-black">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-2 py-1 rounded ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'text-gray-500'}`}
        >
          ALL_EVENTS
        </button>
        <button 
          onClick={() => setActiveFilter('error')}
          className={`px-2 py-1 rounded ${activeFilter === 'error' ? 'bg-red-500/20 text-red-500' : 'text-gray-500'}`}
        >
          CRITICAL_ONLY
        </button>
        <div className="flex-1" />
        <button onClick={fetchLogs} className="text-nexus-indigo hover:text-white transition-colors">
          REFRESH_LOGS
        </button>
      </div>

      {/* Log Feed */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
        <AnimatePresence initial={false}>
          {filteredLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-2 border-l-2 ${
                log.level === 'fatal' ? 'border-red-600 bg-red-500/5' :
                log.level === 'error' ? 'border-red-400 bg-red-500/5' :
                log.level === 'warn' ? 'border-amber-500 bg-amber-500/5' :
                'border-nexus-indigo bg-white/5'
              } flex flex-col gap-1`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-black uppercase ${
                  log.level === 'fatal' || log.level === 'error' ? 'text-red-500' : 'text-nexus-indigo'
                }`}>
                  [{log.level}] {log.source}
                </span>
                <span className="text-gray-600">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-300 break-words">{log.message}</p>
              {log.details && (
                <pre className="mt-1 p-1 bg-black/50 text-gray-500 text-[8px] overflow-hidden">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredLogs.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-700 uppercase tracking-[0.3em]">
            No system anomalies detected
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2 border-t border-white/10 text-[8px] text-gray-600 flex justify-between">
        <span>ENGINEERING_SUBSYSTEM_V1.0</span>
        <span className="text-emerald-500/50">● ENCRYPTED_CONNECTION_ACTIVE</span>
      </div>
    </div>
  );
};
