"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Hash, 
  Volume2, 
  Megaphone, 
  PlusCircle, 
  Gift, 
  Sticker, 
  Smile,
  Send,
  Search,
  Bell,
  Pin,
  Users,
  HelpCircle,
  Sparkles,
  FileIcon,
  Download,
  ExternalLink,
  ChevronRight,
  MessageSquare as MessageSquareIcon
} from "lucide-react";
import { Stream as Channel, Message, User, Attachment } from "@/types/chat";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AetheryxOrb } from "./AetheryxVisuals";

interface ChatAreaProps {
  channel: Channel | null;
  messages: Message[];
  users: Record<string, User>;
  currentUser: User;
  onSendMessage: (content: string) => void;
  isTyping?: boolean;
}

export const ChatArea = ({ channel, messages, users, currentUser, onSendMessage, isTyping }: ChatAreaProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  if (!channel) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-nexus-dark text-gray-500 font-soft">
        <div className="mb-8">
          <AetheryxOrb size={120} />
        </div>
        <h2 className="text-2xl font-header font-bold text-white mb-2 tracking-tight">Initialize Connection</h2>
        <p className="max-w-xs text-center text-sm opacity-60">Welcome back, Architect. Select a data stream to begin your session in the Nexus.</p>
      </div>
    );
  }

  const Icon = channel.type === 'voice' ? Volume2 : channel.type === 'announcement' ? Megaphone : Hash;

  return (
    <div className="flex-1 flex flex-col bg-nexus-dark/50 backdrop-blur-md h-full min-w-0 border-l border-white/5 relative overflow-hidden">
      {/* Vertical Data Lanes (Visual Background) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-nexus-indigo to-transparent" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-nexus-purple to-transparent" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-nexus-cyan to-transparent" />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/noise.png')] z-0" />

      {/* Header */}
      <header className="h-14 px-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-2xl z-20 flex-shrink-0">
        <div className="flex items-center min-w-0">
          <div className="p-2 rounded-lg bg-nexus-indigo/10 border border-nexus-indigo/20 mr-3 shadow-[0_0_15px_rgba(75,63,226,0.1)]">
            <Icon size={18} className="text-nexus-indigo" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-header font-bold text-sm text-white truncate leading-none mb-1 tracking-tight">{channel.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono text-nexus-cyan/70 uppercase tracking-widest">Stream Active</span>
              <span className="w-1 h-1 rounded-full bg-nexus-cyan animate-pulse shadow-[0_0_5px_#06B6D4]" />
              {channel.topic && (
                <p className="text-[10px] text-gray-500 truncate hidden sm:block font-mono border-l border-white/10 pl-2">{channel.topic}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-5 text-gray-400">
          <div className="hidden md:flex items-center space-x-1 mr-4">
            <div className="text-[9px] font-mono text-gray-600 uppercase tracking-tighter">Latency</div>
            <div className="text-[9px] font-mono text-nexus-cyan">24ms</div>
          </div>
          <button className="hover:text-white transition-colors"><Bell size={18} /></button>
          <button className="hover:text-white transition-colors"><Pin size={18} /></button>
          <button className="hover:text-white transition-colors"><Users size={18} /></button>
          <div className="relative group hidden lg:block">
            <input 
              type="text" 
              placeholder="Query Stream..." 
              className="bg-black/40 border border-white/10 rounded-full px-4 py-1.5 text-[11px] w-40 focus:w-56 focus:border-nexus-indigo/50 transition-all duration-500 outline-none font-mono placeholder:text-gray-700"
            />
            <Search size={12} className="absolute right-3 top-2 text-gray-600" />
          </div>
          <button className="hover:text-white transition-colors"><HelpCircle size={18} /></button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 no-scrollbar z-10 font-soft">
        {/* Welcome message */}
        <div className="pb-12 mb-12 relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center space-x-8">
            <div className="relative">
              <AetheryxOrb size={80} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon size={24} className="text-white opacity-40" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-nexus-indigo font-bold uppercase tracking-[0.4em] mb-2">Initialize Stream</div>
              <h1 className="text-4xl font-header font-black text-white mb-2 tracking-tighter">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-indigo to-nexus-cyan">#{channel.name}</span></h1>
              <p className="text-sm text-gray-400 max-w-md font-soft leading-relaxed opacity-80">This is the start of the <span className="text-white font-mono">#{channel.name}</span> data stream. All packets are encrypted and synced across the Nexus.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => {
              const author = users[message.authorId] || { name: "Unknown", roleColor: "#fff" };
              const prevMessage = messages[index - 1];
              const isConsecutive = prevMessage && prevMessage.authorId === message.authorId && 
                                    (new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 300000);

              return (
                <React.Fragment key={message.id}>
                  {/* Animated Separator for new days or large gaps */}
                  {!isConsecutive && index > 0 && (
                    <div className="flex items-center my-8 opacity-20">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/50" />
                      <div className="mx-4 text-[8px] font-mono text-white uppercase tracking-[0.3em]">Data Link Est.</div>
                      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/50" />
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: index * 0.02 }}
                    layout
                  >
                    <MessageItem 
                      message={message} 
                      author={author} 
                      isConsecutive={isConsecutive} 
                    />
                  </motion.div>
                </React.Fragment>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 5, filter: "blur(4px)" }}
              className="flex items-center space-x-4 px-4 py-3 rounded-xl bg-nexus-indigo/5 border border-nexus-indigo/10 max-w-fit"
            >
              <AetheryxOrb size={24} />
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-nexus-cyan animate-pulse">AETHERYX</span>
                <span className="text-[10px] text-gray-500 font-soft">is calculating response...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-6 pb-8 flex-shrink-0 z-10">
        <div className="relative group/input">
          {/* Input Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-nexus-indigo/20 via-nexus-purple/20 to-nexus-cyan/20 rounded-2xl blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500" />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl px-4 py-2.5 flex items-center space-x-3 focus-within:border-nexus-indigo/50 transition-all duration-300 shadow-2xl"
          >
            <button type="button" className="text-gray-500 hover:text-nexus-indigo transition-colors p-1 hover:bg-white/5 rounded-lg">
              <PlusCircle size={22} />
            </button>
            
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Transmit to #${channel.name}...`}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 py-2 text-sm font-sans"
            />

            <div className="flex items-center space-x-1.5 text-gray-500">
              <button type="button" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"><Gift size={20} /></button>
              <button type="button" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"><Sticker size={20} /></button>
              <button type="button" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg mr-2"><Smile size={20} /></button>
              
              <div className="w-[1px] h-6 bg-white/10 mx-2" />
              
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center",
                  inputValue.trim() 
                    ? "bg-gradient-to-br from-nexus-indigo to-nexus-purple text-white shadow-[0_0_15px_rgba(75,63,226,0.4)] hover:scale-105 active:scale-95" 
                    : "text-gray-700 cursor-not-allowed bg-white/5"
                )}
              >
                <Send size={18} className={cn(inputValue.trim() && "animate-pulse")} />
              </button>
            </div>
          </form>
        </div>
        
        {/* AETHERYX Prompt Shortcut */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-nexus-indigo/10 border border-nexus-indigo/20">
              <Sparkles size={10} className="text-nexus-cyan animate-pulse" />
              <span className="text-[9px] font-mono text-nexus-indigo font-bold uppercase tracking-wider">AETHERYX Active</span>
            </div>
            <p className="text-[10px] text-gray-500 font-sans">
              Use <span className="text-nexus-cyan font-mono font-bold">/nexus</span> for spatial commands
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 rounded-full bg-nexus-cyan" />
              <span className="text-[9px] font-mono text-gray-600 uppercase">Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 rounded-full bg-nexus-purple" />
              <span className="text-[9px] font-mono text-gray-600 uppercase">Sync: v4.0.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataPacket = ({ attachment }: { attachment: Attachment }) => {
  const isImage = attachment.type.startsWith('image/');
  
  return (
    <div className="mt-3 group/packet max-w-sm">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 hover:border-nexus-indigo/50 hover:shadow-[0_0_20px_rgba(75,63,226,0.15)]">
        {isImage ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <img 
              src={attachment.url} 
              alt={attachment.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover/packet:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/packet:opacity-100 transition-opacity flex items-end p-3">
              <div className="flex items-center space-x-2 w-full">
                <button className="p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                  <Download size={14} className="text-white" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                  <ExternalLink size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-nexus-indigo/10 border border-nexus-indigo/20 flex items-center justify-center">
              <FileIcon size={24} className="text-nexus-indigo" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-header font-bold text-white truncate tracking-tight">{attachment.name}</h4>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                {(attachment.size / 1024).toFixed(1)} KB • {attachment.type.split('/')[1] || 'DATA'}
              </p>
            </div>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Download size={16} className="text-gray-400 group-hover/packet:text-white" />
            </button>
          </div>
        )}
        
        {/* Packet Meta */}
        <div className="px-3 py-1.5 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-nexus-cyan animate-pulse" />
            <span className="text-[8px] font-mono text-nexus-cyan/70 uppercase tracking-widest">Packet Secured</span>
          </div>
          <span className="text-[8px] font-mono text-gray-600 uppercase">ID: {attachment.id.slice(0, 8)}</span>
        </div>
      </div>
    </div>
  );
};

const MessageItem = ({ message, author, isConsecutive }: { message: Message; author: any; isConsecutive: boolean }) => {
  const isAI = message.type === 'ai';

  return (
    <div className={cn(
      "group flex px-4 py-1 hover:bg-white/[0.02] transition-colors -mx-4 relative",
      !isConsecutive && "mt-6",
      isAI && "bg-gradient-to-r from-nexus-indigo/10 via-transparent to-transparent"
    )}>
      {isAI && !isConsecutive && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-nexus-indigo via-nexus-purple to-transparent shadow-[0_0_10px_rgba(75,63,226,0.3)]" />
      )}

      {!isConsecutive ? (
        <div className="flex w-full">
          <div className={cn(
            "w-10 h-10 rounded-xl flex-shrink-0 mr-4 flex items-center justify-center text-white font-bold overflow-hidden mt-0.5 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]",
            isAI ? "bg-gradient-to-br from-nexus-indigo to-nexus-purple p-[1px]" : "bg-nexus-indigo/20 border border-nexus-indigo/30"
          )}>
            {isAI ? (
              <div className="w-full h-full bg-nexus-dark flex items-center justify-center relative">
                <AetheryxOrb size={40} />
              </div>
            ) : (
              author.avatar ? <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" /> : <span className="text-nexus-indigo font-header">{author.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline space-x-2 mb-1">
              <span className={cn(
                "font-header font-bold text-sm tracking-tight",
                isAI ? "text-transparent bg-clip-text bg-gradient-to-r from-nexus-indigo to-nexus-cyan" : "text-white"
              )} style={!isAI ? { color: author.roleColor } : {}}>
                {author.name}
              </span>
              {author.isBot && (
                <span className={cn(
                  "text-[9px] font-mono font-bold px-1.5 rounded flex items-center h-4 text-white tracking-tighter",
                  isAI ? "bg-nexus-indigo/50 border border-nexus-indigo/50" : "bg-gray-700"
                )}>
                  {author.badge || 'NODE'}
                </span>
              )}
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className={cn(
              "text-gray-300 text-[14px] break-words whitespace-pre-wrap leading-relaxed font-soft selection:bg-nexus-indigo/30",
              isAI && "text-white font-medium"
            )}>
              {message.content}
            </div>
            
            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {message.attachments.map(att => (
                  <DataPacket key={att.id} attachment={att} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-10 mr-4 flex-shrink-0 flex items-start justify-center pt-1.5">
            <span className="text-[9px] font-mono text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
          </div>
          <div className="flex-1 min-w-0">
             <div className={cn(
                "text-gray-300 text-[14px] break-words whitespace-pre-wrap leading-relaxed font-soft selection:bg-nexus-indigo/30",
                isAI && "text-white font-medium"
              )}>
                {message.content}
              </div>
              
              {/* Attachments for consecutive messages */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {message.attachments.map(att => (
                    <DataPacket key={att.id} attachment={att} />
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

const MessageSquare = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
