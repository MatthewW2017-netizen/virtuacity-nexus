"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your identity (email) first.");
      return;
    }
    
    setIsResending(true);
    setError(null);
    setSuccess(null);

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (resendError) {
      setError(`Resend failed: ${resendError.message}`);
    } else {
      setSuccess("New verification link transmitted. Check your Outlook.");
    }
    setIsResending(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[Login] Error:', error.message);
      let userFriendlyError = error.message;
      
      // Friendly error mapping
      if (error.message.includes("Email not confirmed")) {
        userFriendlyError = "Identity verification pending. (Tip: Turn off 'Confirm email' in Supabase Dashboard > Auth > Settings to bypass this for now).";
      } else if (error.message.includes("Invalid login credentials")) {
        userFriendlyError = "Invalid identity or access key. Please verify your credentials.";
      } else if (error.message.includes("rate limit")) {
        userFriendlyError = "Rate limit reached. (Tip: Disable 'Confirm email' in Supabase to bypass email limits).";
      }
      
      setError(userFriendlyError);
      setIsLoading(false);
    } else {
      router.push("/nexus");
    }
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
          <Link href="/" className="inline-block mb-4">
            <div className="w-12 h-12 bg-nexus-indigo/20 rounded-xl flex items-center justify-center border border-nexus-indigo/30 group hover:border-nexus-indigo transition-colors">
              <Zap className="text-nexus-indigo group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-header tracking-tight">Welcome Back</h1>
          <p className="text-nexus-indigo/60 mt-2 font-soft">Re-establish your connection to the Nexus.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
                className="w-full bg-nexus-dark/50 border border-nexus-indigo/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-nexus-indigo transition-all placeholder:text-nexus-indigo/20 text-sm md:text-base overflow-hidden text-ellipsis"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-nexus-indigo/50">Access Key (Password)</label>
              <Link href="/forgot-password" size="sm" className="text-[10px] uppercase tracking-widest text-nexus-indigo/40 hover:text-nexus-indigo transition-colors font-bold">
                Forgot Key?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-indigo/30 group-focus-within:text-nexus-indigo transition-colors" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-nexus-dark/50 border border-nexus-indigo/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-nexus-indigo transition-all placeholder:text-nexus-indigo/20"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium leading-relaxed"
            >
              {error}
              {error.includes("Identity verification pending") && (
                <button 
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="block mt-2 text-nexus-indigo hover:underline font-bold disabled:opacity-50"
                >
                  {isResending ? "Retransmitting..." : "Resend Verification Link"}
                </button>
              )}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium"
            >
              {success}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-nexus-indigo hover:bg-nexus-indigo-light text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Login
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-nexus-indigo/40 font-soft">
            New to the grid?{" "}
            <Link href="/signup" className="text-nexus-indigo hover:text-nexus-indigo-light font-bold transition-colors">
              Create Identity
            </Link>
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-8 bg-nexus-indigo/10" />
             <span className="text-[10px] uppercase tracking-[0.2em] text-nexus-indigo/20 font-bold">Protocol Alpha</span>
             <div className="h-px w-8 bg-nexus-indigo/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
