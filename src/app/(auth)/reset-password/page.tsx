"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Zap, Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a session (Supabase sets it automatically via the recovery link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // If no session, they might have landed here without a link or link expired
        setError("Invalid or expired recovery session. Please request a new link.");
      }
    };
    checkSession();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-nexus-indigo/20 rounded-xl flex items-center justify-center border border-nexus-indigo/30">
              <Lock className="text-nexus-indigo" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-header tracking-tight">New Identity Key</h1>
          <p className="text-nexus-indigo/60 mt-2 font-soft">Re-authorize your access to the Nexus.</p>
        </div>

        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <div className="text-emerald-500 font-bold mb-2">Key Re-authorized</div>
            <p className="text-emerald-500/70 text-sm">
              Your identity has been secured. Redirecting to login terminal...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-nexus-indigo/50 ml-1">New Key</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-indigo/30 group-focus-within:text-nexus-indigo transition-colors" />
                <input 
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-nexus-dark/50 border border-nexus-indigo/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-nexus-indigo transition-all placeholder:text-nexus-indigo/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-nexus-indigo/50 ml-1">Confirm Key</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-indigo/30 group-focus-within:text-nexus-indigo transition-colors" />
                <input 
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
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
              disabled={isLoading || error?.includes("Invalid or expired")}
              className="w-full bg-nexus-indigo hover:bg-nexus-indigo-light text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Update Identity Key
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
