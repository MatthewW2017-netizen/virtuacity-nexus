"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { supabase } from "@/lib/supabase";

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Creator",
    reason: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // In a real app, you would have a 'early_access_signups' table in Supabase
      // For now, we'll simulate the storage or attempt it if keys are provided
      if (process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Simulation for demo purposes if keys aren't set
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted (simulated):", formData);
        setStatus("success");
        return;
      }

      const { error } = await supabase
        .from('early_access_signups')
        .insert([formData]);

      if (error) throw error;
      
      setStatus("success");
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const roles = ["Creator", "Developer", "Community Owner", "Other"];

  return (
    <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Join the <span className="text-nexus-indigo">Nexus</span>
        </motion.h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Be among the first to experience the future of digital connection. Secure your spot in the early access program.
        </p>
      </div>

      <Card className="w-full max-w-2xl p-8 md:p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-4">You're on the list!</h2>
              <p className="text-gray-400 mb-8">
                Thank you for your interest in VirtuaCity Nexus. We'll reach out to {formData.email} as soon as we're ready for you.
              </p>
              <Button onClick={() => setStatus("idle")} variant="outline">Back to Form</Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-nexus-dark border border-nexus-border rounded-xl px-4 py-3 focus:outline-none focus:border-nexus-indigo transition-colors text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-nexus-dark border border-nexus-border rounded-xl px-4 py-3 focus:outline-none focus:border-nexus-indigo transition-colors text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">I am a...</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role })}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        formData.role === role
                          ? "bg-nexus-indigo border-nexus-indigo text-white shadow-[0_0_15px_rgba(75,63,226,0.3)]"
                          : "bg-nexus-dark border-nexus-border text-gray-400 hover:border-nexus-indigo/50"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Why do you want early access?</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className="w-full bg-nexus-dark border border-nexus-border rounded-xl px-4 py-3 focus:outline-none focus:border-nexus-indigo transition-colors text-white resize-none"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm">
                  <AlertCircle size={18} />
                  {errorMessage}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full py-4 relative overflow-hidden group"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Application <Sparkles size={18} />
                  </span>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-indigo/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-nexus-indigo/5 rounded-full blur-3xl -z-10" />
      </Card>

      <div className="mt-20 text-center text-gray-500 text-sm max-w-md">
        <p>By signing up, you agree to receive updates about VirtuaCity Nexus. We respect your privacy and will never share your data.</p>
      </div>
    </main>
  );
}
