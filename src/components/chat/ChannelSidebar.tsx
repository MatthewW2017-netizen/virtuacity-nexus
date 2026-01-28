"use client";

import React from "react";
import { 
  Hash, 
  Volume2, 
  Megaphone, 
  MessageSquare, 
  ChevronDown, 
  Plus, 
  Settings, 
  Mic, 
  Headphones, 
  Monitor,
  Search
} from "lucide-react";
import { Node as Server, Stream as Channel, User } from "@/types/chat";
import { cn } from "@/lib/utils";
import { MOCK_USERS } from "@/lib/mockData";

interface ChannelSidebarProps {
  server: Server | null;
  activeChannelId: string | null;
  onChannelSelect: (channelId: string) => void;
  currentUser: User;
}

export const ChannelSidebar = ({ server, activeChannelId, onChannelSelect, currentUser }: ChannelSidebarProps) => {
  if (!server) {
    // DM View Sidebar
    return (
      <div className="w-60 h-full bg-nexus-card flex flex-col border-r border-nexus-border">
        <div className="h-12 px-4 flex items-center shadow-sm border-b border-nexus-border">
          <button className="w-full bg-nexus-dark h-7 px-2 rounded text-xs text-gray-400 flex items-center justify-between hover:bg-black/40 transition-colors">
            Find or start a conversation
            <span className="text-[10px] bg-nexus-card px-1 rounded border border-nexus-border">Ctrl+K</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          <DMNavItem icon={<MessageSquare size={20} />} label="Friends" active={!activeChannelId} />
          <DMNavItem icon={<Megaphone size={20} />} label="Nitro" />
          <DMNavItem icon={<Search size={20} />} label="Shop" />

          <div className="pt-4 pb-2 px-2">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase flex items-center justify-between group">
              Direct Messages
              <Plus size={14} className="cursor-pointer hover:text-white transition-colors" />
            </h3>
          </div>

          {/* List of DM recipients would go here */}
          <div className="space-y-0.5">
             <DMItem user={MOCK_USERS["2"]} active={activeChannelId === "dm2"} onClick={() => onChannelSelect("dm2")} />
             <DMItem user={MOCK_USERS["3"]} active={activeChannelId === "dm3"} onClick={() => onChannelSelect("dm3")} />
          </div>
        </div>

        <UserControlPanel user={currentUser} />
      </div>
    );
  }

  return (
    <div className="w-60 h-full bg-nexus-card flex flex-col border-r border-nexus-border">
      {/* Server Header */}
      <button className="h-12 px-4 flex items-center justify-between hover:bg-white/5 transition-colors shadow-sm border-b border-nexus-border">
        <span className="font-bold text-sm truncate">{server.name}</span>
        <ChevronDown size={18} />
      </button>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {/* Channel Categories */}
        <div>
          <div className="px-2 mb-1 flex items-center justify-between group">
            <div className="flex items-center text-gray-500 hover:text-white cursor-pointer transition-colors">
              <ChevronDown size={12} className="mr-0.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-wide">Text Channels</h3>
            </div>
            <Plus size={14} className="text-gray-500 hover:text-white cursor-pointer transition-colors opacity-0 group-hover:opacity-100" />
          </div>

          <div className="space-y-0.5">
            {server.streams.filter(c => c.type === 'text' || c.type === 'announcement' || c.type === 'living-thread').map(channel => (
              <ChannelItem 
                key={channel.id} 
                channel={channel} 
                active={activeChannelId === channel.id}
                onClick={() => onChannelSelect(channel.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="px-2 mb-1 flex items-center justify-between group">
            <div className="flex items-center text-gray-500 hover:text-white cursor-pointer transition-colors">
              <ChevronDown size={12} className="mr-0.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-wide">Voice Channels</h3>
            </div>
            <Plus size={14} className="text-gray-500 hover:text-white cursor-pointer transition-colors opacity-0 group-hover:opacity-100" />
          </div>

          <div className="space-y-0.5">
            {server.streams.filter(c => c.type === 'voice').map(channel => (
              <ChannelItem 
                key={channel.id} 
                channel={channel} 
                active={activeChannelId === channel.id}
                onClick={() => onChannelSelect(channel.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <UserControlPanel user={currentUser} />
    </div>
  );
};

const DMNavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button className={cn(
    "w-full flex items-center px-2 py-1.5 rounded-md group transition-colors",
    active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
  )}>
    <div className="mr-3 text-gray-400 group-hover:text-white">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const DMItem = ({ user, active, onClick }: { user: User; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center px-2 py-1.5 rounded-md group transition-colors",
      active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
    )}
  >
    <div className="relative mr-3">
      <div className="w-8 h-8 rounded-full bg-nexus-indigo flex items-center justify-center text-white text-xs overflow-hidden">
        {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.charAt(0)}
      </div>
      <div className={cn(
        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-nexus-card",
        user.status === 'online' ? "bg-emerald-500" : user.status === 'idle' ? "bg-amber-500" : user.status === 'dnd' ? "bg-rose-500" : "bg-gray-500"
      )} />
    </div>
    <span className="text-sm font-medium truncate">{user.name}</span>
  </button>
);

const ChannelItem = ({ channel, active, onClick }: { channel: Channel; active: boolean; onClick: () => void }) => {
  const Icon = channel.type === 'voice' ? Volume2 : channel.type === 'announcement' ? Megaphone : Hash;
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center px-2 py-1.5 rounded-md group transition-colors",
        active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
      )}
    >
      <Icon size={18} className="mr-1.5 text-gray-500 group-hover:text-white" />
      <span className={cn("text-sm truncate", active ? "font-semibold" : "font-medium")}>{channel.name}</span>
      <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center space-x-1">
         <Settings size={14} className="hover:text-white" />
      </div>
    </button>
  );
};

const UserControlPanel = ({ user }: { user: User }) => (
  <div className="h-14 bg-black/30 px-2 flex items-center border-t border-nexus-border">
    <div className="flex-1 flex items-center p-1 rounded hover:bg-white/10 cursor-pointer group transition-colors min-w-0">
      <div className="relative mr-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-nexus-indigo flex items-center justify-center text-white text-xs overflow-hidden">
          {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.charAt(0)}
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-nexus-dark bg-emerald-500" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold text-white truncate leading-tight">{user.name}</div>
        <div className="text-[10px] text-gray-400 leading-tight">Online</div>
      </div>
    </div>
    <div className="flex items-center text-gray-400">
      <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"><Mic size={18} /></button>
      <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"><Headphones size={18} /></button>
      <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"><Settings size={18} /></button>
    </div>
  </div>
);
