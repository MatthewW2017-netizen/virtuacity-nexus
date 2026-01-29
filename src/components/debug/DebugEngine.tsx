'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { dataService } from '@/lib/dataService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class DebugEngine extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Auto-log the error to Supabase so we can fix it without the user telling us
    dataService.logSystemEvent(
      'fatal',
      'GlobalErrorBoundary',
      error.message,
      {
        stack: error.stack,
        componentStack: errorInfo.componentStack
      }
    );
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-8 text-center font-mono overflow-hidden relative">
          {/* Cinematic Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="w-32 h-32 mb-12 relative">
            <div className="absolute inset-0 bg-red-500/30 blur-2xl rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="relative border-4 border-red-500 rounded-2xl p-6 text-red-500 font-black text-6xl shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-center justify-center">
              !
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-[2px] bg-red-500/50" />
              Nexus Critical Failure
              <span className="w-8 h-[2px] bg-red-500/50" />
            </h1>
            
            <div className="bg-red-500/5 border-y border-red-500/20 py-6 mb-8 backdrop-blur-sm">
              <p className="text-red-400 text-sm font-bold uppercase tracking-widest mb-2">
                AETHERYX OS // System Exception
              </p>
              <p className="text-gray-400 text-base leading-relaxed px-4">
                The Nexus grid has encountered a spatial anomaly. The engineering core (AI) has already captured this event and is deploying a fix to the production branch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="group relative px-8 py-4 bg-red-500 text-white transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 uppercase text-xs font-black tracking-[0.3em]">
                  Reboot System
                </span>
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-transparent border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-all uppercase text-xs font-black tracking-[0.3em]"
              >
                Return to Core
              </button>
            </div>
          </div>

          {/* Error Details (Hidden but available in console) */}
          <div className="mt-12 text-[10px] text-gray-700 uppercase tracking-widest opacity-30">
            Node ID: {Math.random().toString(36).substring(7).toUpperCase()} // Build: Founder Edition v{process.env.NEXT_PUBLIC_APP_VERSION || '2.0.5'}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const DebugProvider = ({ children }: { children: ReactNode }) => {
  // We can add more hooks here for performance monitoring or heatmaps later
  return <DebugEngine>{children}</DebugEngine>;
};
