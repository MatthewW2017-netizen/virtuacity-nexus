"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { User, Shield, Zap, MapPin, Calendar, Edit2, LogOut } from "lucide-react";
import Link from "next/link";

interface ProfileData {
  username: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      } else {
        // Fallback to auth metadata if profile row doesn't exist yet
        setProfile({
          username: user.user_metadata?.username || "Architect",
          full_name: user.user_metadata?.full_name || "Nexus User",
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
        });
      }
      setIsLoading(false);
    }

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
        <Zap className="text-nexus-indigo w-8 h-8 animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-nexus-dark flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Identity Not Found</h1>
        <Link href="/login" className="bg-nexus-indigo px-6 py-2 rounded-lg font-bold">Initialize Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexus-dark text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-nexus-indigo/5 border border-nexus-indigo/10 p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <button className="p-2 hover:bg-nexus-indigo/10 rounded-lg transition-colors">
              <Edit2 className="w-5 h-5 text-nexus-indigo/40" />
            </button>
          </div>
          
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-nexus-indigo/30 bg-nexus-dark">
              <img src={profile?.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-nexus-indigo p-2 rounded-lg shadow-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold font-header tracking-tight">{profile?.full_name}</h1>
            <p className="text-nexus-indigo font-mono text-sm mt-1">@{profile?.username}</p>
            <p className="text-nexus-indigo/60 mt-4 max-w-md font-soft">
              {profile?.bio || "No bio established. The Architect's path is still being written across the Infinite Canvas."}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Level", value: "12", icon: Zap },
            { label: "Cities Joined", value: "4", icon: MapPin },
            { label: "Reputation", value: "850", icon: Shield },
            { label: "Active Since", value: "Jan 2026", icon: Calendar },
          ].map((stat, i) => (
            <div key={i} className="bg-nexus-indigo/5 border border-nexus-indigo/10 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-nexus-indigo/10 rounded-lg">
                <stat.icon className="w-4 h-4 text-nexus-indigo" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-nexus-indigo/40 font-bold">{stat.label}</p>
                <p className="font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Settings / Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-header">Identity Controls</h2>
          <div className="grid gap-4">
            <button 
              onClick={() => signOut()}
              className="flex items-center justify-between w-full p-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="font-bold text-red-400">Terminate Session</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-red-400/40 group-hover:text-red-400/60 transition-colors">Safety Lock: Active</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
