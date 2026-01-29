"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Zap, Mail, ArrowRight, Loader2, ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nexus-dark relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-indigo/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-nexus-indigo/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-nexus-indigo/60 hover:text-nexus-indigo transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
            <ChevronLeft size={16} className="mr-1" /> Back to Login
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-nexus-indigo/20 rounded-xl flex items-center justify-center border border-nexus-indigo/30">
              <Zap className="text-nexus-indigo" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-header tracking-tight">Recover Identity</h1>
          <p className="text-nexus-indigo/60 mt-2 font-soft">Transmit a reset signal to your verified email.</p>
        </div>

        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
          >
            <div className="text-emerald-500 font-bold mb-2">Signal Transmitted</div>
            <p className="text-emerald-500/70 text-sm">
              Check your Outlook for the identity recovery link.
            </p>
            <Link 
              href="/login"
              className="mt-6 block w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 font-bold py-3 rounded-xl transition-all"
            >
              Return to Nexus
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-nexus-indigo/50 ml-1">Identity (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-indigo/30 group-focus-within:text-nexus-indigo transition-colors" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@nexus.io"
                  className="w-full bg-nexus-dark/50 border border-nexus-indigo/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-nexus-indigo transition-all placeholder:text-nexus-indigo/20"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-nexus-indigo hover:bg-nexus-indigo-light text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Transmit Reset Signal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
