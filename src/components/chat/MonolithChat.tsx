"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Hash, Volume2, Megaphone, Info, Users, Sparkles } from "lucide-react";
import { Stream as Channel, Message, User } from "@/types/chat";
import { cn } from "@/lib/utils";

interface MonolithChatProps {
  channel: Channel | null;
  messages: Message[];
  users: Record<string, User>;
  currentUser: User;
  onSendMessage: (content: string) => void;
  isTyping: boolean;
}

export const MonolithChat = ({ channel, messages, users, currentUser, onSendMessage, isTyping }: MonolithChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  if (!channel) return null;

  const Icon = channel.type === 'voice' ? Volume2 : channel.type === 'announcement' ? Megaphone : Hash;

  return (
    <div className="relative w-full max-w-5xl h-[85vh] mx-auto flex flex-col z-10">
      {/* The Monolith Frame */}
      <div className="absolute inset-0 bg-nexus-card/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        
        {/* Spatial Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-white/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-nexus-indigo/20 flex items-center justify-center text-nexus-indigo shadow-inner border border-nexus-indigo/20">
              <Icon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">{channel.name}</h2>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{channel.topic || "Nexus Data Stream"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-400">
            <button className="flex items-center space-x-2 hover:text-white transition-colors">
              <Users size={18} />
              <span className="text-xs font-bold">1.2k</span>
            </button>
            <button className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-all">
              <Info size={20} />
            </button>
          </div>
        </header>

        {/* Data Stream (Messages) */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 no-scrollbar scroll-smooth">
          {messages.map((message, index) => {
            const author = users[message.authorId] || { name: "Unknown", roleColor: "#fff" };
            const isMe = message.authorId === currentUser.id;
            const isAI = message.type === 'ai';

            return (
              <motion.div
                initial={{ opacity: 0, x: isMe ? 20 : -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                key={message.id}
                className={cn(
                  "flex group",
                  isMe ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[70%] flex flex-col",
                  isMe ? "items-end" : "items-start"
                )}>
                  {!isMe && (
                    <div className="flex items-center space-x-2 mb-2 px-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: author.roleColor }}>
                        {author.name}
                      </span>
                      {author.isBot && (
                        <span className="text-[8px] bg-nexus-indigo text-white px-1.5 py-0.5 rounded font-black">
                          {author.badge || 'BOT'}
                        </span>
                      )}
                    </div>
                  )}

                  <div className={cn(
                    "px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-xl border transition-all duration-300",
                    isMe 
                      ? "bg-nexus-indigo text-white border-nexus-indigo/50 rounded-tr-none" 
                      : isAI 
                        ? "bg-gradient-to-br from-purple-900/40 to-indigo-900/40 text-indigo-100 border-indigo-500/30 backdrop-blur-md rounded-tl-none nexus-glow"
                        : "bg-white/5 text-gray-200 border-white/10 rounded-tl-none hover:bg-white/10"
                  )}>
                    {isAI && <Sparkles size={14} className="mb-2 text-indigo-300 animate-pulse" />}
                    {message.content}
                  </div>

                  <span className="mt-2 text-[9px] text-gray-600 font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            );
          })}
          
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3 text-nexus-indigo"
              >
                <div className="flex space-x-1">
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-nexus-indigo rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-nexus-indigo rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-nexus-indigo rounded-full" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest animate-pulse">AETHERYX is manifesting...</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Immersive Input */}
        <div className="p-8 pt-0">
          <form 
            onSubmit={handleSubmit}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-nexus-indigo to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-nexus-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
              <button type="button" className="text-gray-500 hover:text-white transition-colors mr-4">
                <Plus size={24} />
              </button>
              
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Transmit message to ${channel.name}...`}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm font-medium"
              />

              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className={cn(
                  "ml-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  inputValue.trim() 
                    ? "bg-nexus-indigo text-white shadow-[0_0_15px_rgba(75,63,226,0.5)] scale-100" 
                    : "bg-white/5 text-gray-700 scale-90"
                )}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-nexus-indigo/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};
