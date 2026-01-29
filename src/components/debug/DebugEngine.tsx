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
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-8 text-center font-mono">
          <div className="w-24 h-24 mb-8 relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative border-2 border-red-500 rounded-lg p-4 text-red-500 font-black text-4xl">
              !
            </div>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest mb-4">
            Nexus Critical Failure
          </h1>
          <p className="text-gray-400 max-w-md mb-8">
            AETHERYX OS has encountered a spatial anomaly. The error has been logged and the engineering team (AI) has been notified.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase text-xs font-black tracking-widest"
          >
            Reboot System
          </button>
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
