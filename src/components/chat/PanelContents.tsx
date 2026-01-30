"use client";

import React from "react";
import { Message, User, Stream, Node, BotModule, District } from "@/types/chat";
import { 
  Hash, Volume2, Megaphone, Sparkles, Send, MessageSquare, Share2, 
  Layers, Cpu, Zap, Shield, Music, BarChart, Settings, Plus, Activity, 
  Search, Folder, Image as ImageIcon, FileCode, Play, Palette, 
  Box as BoxIcon, Scissors, Type, Download, Globe, Mic, CheckCircle2,
  Circle, Clock, MoreHorizontal, ExternalLink, RefreshCw,
  Cloud, Terminal, Code, ChevronLeft, Users, Trash2, BarChart3,
  Lock, Key, Eye, UserPlus, Save, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dataService } from "@/lib/dataService";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

// ========== Utility Components ==========

const HolographicDisplay = ({ color, icon: IconName, name, isSmall = false }: { color: string, icon: string, name: string, isSmall?: boolean }) => {
  const iconMap: Record<string, any> = {
    Zap, Cpu, Shield, Palette, BarChart, Globe, MessageSquare, Sparkles, Box: BoxIcon, Activity, Music, Megaphone, Volume2, Hash
  };
  const Icon = iconMap[IconName] || Globe;
  
  return (
    <div className={cn("relative flex items-center justify-center", isSmall ? "w-16 h-16" : "w-24 h-24")}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-dashed opacity-20"
        style={{ borderColor: color }}
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-2 rounded-full border border-current opacity-20"
        style={{ color: color }}
      />
      <div className="relative z-10 text-white">
        <Icon size={isSmall ? 24 : 40} style={{ color }} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
      <div className="absolute inset-0 blur-2xl opacity-20 rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
};

// ========== Panel Components ==========

export const TeamDashboardPanel = ({ team = [], isFounder, onRemoveMember }: { team?: any[], isFounder?: boolean, onRemoveMember?: (id: any) => void }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-black text-nexus-indigo uppercase tracking-wider mb-4">Team Dashboard</h2>
        <div className="grid grid-cols-1 gap-3">
          {team.length > 0 ? (
            team.map((member: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-nexus-indigo/20 flex items-center justify-center">
                      <Users size={14} className="text-nexus-indigo" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{member.name || "Team Member"}</div>
                      <div className="text-[10px] text-gray-500">{member.role || "Citizen"}</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-xs">No team members yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AssetLibraryPanel = ({ onInject }: { onInject?: (id: string, x: number, y: number) => void }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const assets = [
    { id: 'a1', name: 'Nexus_Core_v2.obj', type: 'model', size: '12.4MB', color: 'text-blue-400' },
    { id: 'a2', name: 'Aether_Texture.png', type: 'texture', size: '2.1MB', color: 'text-purple-400' },
    { id: 'a3', name: 'Grid_Shader.glsl', type: 'shader', size: '45KB', color: 'text-emerald-400' },
    { id: 'a4', name: 'Ambient_Void.mp3', type: 'audio', size: '5.8MB', color: 'text-amber-400' },
  ];

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-lg font-black text-nexus-indigo uppercase tracking-wider mb-4">Asset Library</h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {assets.map((asset) => (
          <motion.div 
            key={asset.id}
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.05, zIndex: 100 }}
            onDragEnd={(event, info) => {
              onInject?.(asset.id, info.point.x, info.point.y);
            }}
            className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={cn("w-6 h-6 rounded flex items-center justify-center", asset.color)}>
                  <FileCode size={12} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{asset.name}</div>
                  <div className="text-[10px] text-gray-500">{asset.type} • {asset.size}</div>
                </div>
              </div>
              <Download size={12} className="text-gray-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const CreatorToolsPanel = ({ onInject }: { onInject?: (id: string, x: number, y: number) => void }) => {
  const tools = [
    { id: 't1', name: 'Particle Emitter', category: 'Effects' },
    { id: 't2', name: 'Sound Visualizer', category: 'Audio' },
    { id: 't3', name: 'Terrain Generator', category: 'World' },
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-lg font-black text-purple-400 uppercase tracking-wider mb-4">Creator Tools</h2>
      <div className="space-y-2">
        {tools.map((tool) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            className="w-full p-3 text-left rounded-lg bg-white/5 border border-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
          >
            <div className="text-xs font-bold text-white">{tool.name}</div>
            <div className="text-[10px] text-gray-500">{tool.category}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export const NeuralGraphPanel = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <Cpu size={32} className="text-blue-400 mx-auto mb-3" />
        <h2 className="text-sm font-black text-blue-400 uppercase tracking-wider mb-2">Neural Graph</h2>
        <p className="text-xs text-gray-500">Graph visualization coming soon</p>
      </div>
    </div>
  );
};

export const TacticalMapPanel = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <Globe size={32} className="text-cyan-400 mx-auto mb-3" />
        <h2 className="text-sm font-black text-cyan-400 uppercase tracking-wider mb-2">Tactical Map</h2>
        <p className="text-xs text-gray-500">Strategic overview visualization</p>
      </div>
    </div>
  );
};

export const ProfilePanel = ({ user, nodes, activeNodeId, currentUserRole }: { user?: User, nodes?: Node[], activeNodeId?: string, currentUserRole?: string }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-black text-nexus-indigo uppercase tracking-wider mb-4">Profile</h2>
        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-nexus-indigo/20 flex items-center justify-center">
              <Users size={20} className="text-nexus-indigo" />
            </div>
            <div>
                <div className="text-sm font-bold text-white">{user?.name || "User"}</div>
                <div className="text-xs text-gray-500">{user?.id || "Anonymous"}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Role:</span>
              <span className="text-white font-bold">Citizen</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Status:</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CityScanner = ({ color = "text-nexus-indigo", name = "Scanner", onComplete }: { color?: string, name?: string, onComplete: () => void }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-8"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={cn("text-4xl mb-4", color)}
      >
        <Sparkles size={40} />
      </motion.div>
      <p className="text-xs text-gray-400 animate-pulse">Scanning {name}...</p>
    </motion.div>
  );
};

export const CityBrowserPanel = ({ 
  nodes = [], 
  currentUserRole, 
  onJoin, 
  onCreateStream, 
  onUpdateCity,
  onCreateDistrict,
  onCreateCity,
  canvasPos = { x: 0, y: 0 },
  currentUserId
}: { 
  nodes?: Node[], 
  currentUserRole?: string,
  onJoin?: (...args: any[]) => void,
  onCreateStream?: (...args: any[]) => void,
  onUpdateCity?: (...args: any[]) => void,
  onCreateDistrict?: (...args: any[]) => void,
  onCreateCity?: () => void,
  canvasPos?: { x: number, y: number },
  currentUserId?: string
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isCreatingStream, setIsCreatingStream] = React.useState(false);
  const canManage = currentUserRole === 'Architect' || currentUserRole === 'Founder';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div className="p-6 h-full overflow-y-auto space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-nexus-indigo uppercase tracking-wider">Cities</h2>
          {canManage && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateCity}
              className="px-3 py-1 text-xs font-black bg-nexus-indigo/20 border border-nexus-indigo/50 text-nexus-indigo rounded-lg hover:bg-nexus-indigo/30 transition-all"
            >
              <Plus size={14} className="inline mr-1" /> New City
            </motion.button>
          )}
        </div>

        <div className="space-y-2">
          {nodes && nodes.length > 0 ? (
            nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{node.name}</div>
                    <div className="text-[10px] text-gray-500">{node.districts?.length || 0} districts</div>
                  </div>
                  {onJoin && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onJoin(node.id)}
                      className="px-2 py-1 text-[10px] font-bold bg-nexus-indigo/20 text-nexus-indigo rounded hover:bg-nexus-indigo/30 transition-all"
                    >
                      Enter
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-xs">No cities created yet</div>
          )}
        </div>
      </div>

      {canManage && (
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <button
            onClick={() => setIsCreatingStream(!isCreatingStream)}
            className="w-full p-3 text-xs font-black text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-500/10 transition-all"
          >
            <Plus size={14} className="inline mr-1" /> Create Stream
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const DevGridPanel = ({ 
  nodes = [], 
  currentUserRole, 
  onDeploy, 
  workflowSeed 
}: { 
  nodes?: Node[], 
  currentUserRole?: string,
  onDeploy?: (...args: any[]) => void,
  workflowSeed?: string
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [selectedCityId, setSelectedCityId] = React.useState<string>(nodes?.[0]?.id || "");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const canManage = currentUserRole === 'Architect' || currentUserRole === 'Founder';

  return (
    <motion.div className="p-6 h-full overflow-y-auto space-y-6">
      <div>
        <h2 className="text-lg font-black text-cyan-400 uppercase tracking-wider mb-4">Dev Grid</h2>
        {workflowSeed && (
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <div className="text-xs text-cyan-400 font-bold">Workflow: {workflowSeed}</div>
          </div>
        )}
        <div className="text-center py-8 text-gray-500 text-xs">
          <Terminal size={32} className="mx-auto mb-2 opacity-50" />
          <p>Deployment grid visualization</p>
        </div>
      </div>
      {canManage && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isDeploying}
          onClick={() => {
            setIsDeploying(true);
            onDeploy?.(selectedCityId, "", "workflow_v1");
            setTimeout(() => setIsDeploying(false), 2000);
          }}
          className="w-full py-2 px-4 text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded hover:bg-cyan-500/30 transition-all disabled:opacity-50"
        >
          {isDeploying ? "Deploying..." : "Deploy Workflow"}
        </motion.button>
      )}
    </motion.div>
  );
};

// ========== Message Components ==========

export const TopicHeader = ({ title, summary }: { title: string, summary: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 border-b border-white/5 bg-white/2"
  >
    <h3 className="text-sm font-black text-nexus-indigo uppercase tracking-wider">{title}</h3>
    <p className="text-xs text-gray-500 mt-1">{summary}</p>
  </motion.div>
);

export const MessagePacket = ({ 
  msg, 
  author, 
  isAI, 
  onUpdateTask 
}: { 
  msg: Message, 
  author: User, 
  isAI?: boolean, 
  onUpdateTask?: (id: string, status: 'pending' | 'completed') => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-lg mb-3 border",
        isAI 
          ? "bg-purple-500/10 border-purple-500/20" 
          : "bg-white/5 border-white/10"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
          isAI ? "bg-purple-500/30 text-purple-400" : "bg-blue-500/30 text-blue-400"
        )}>
          {isAI ? "AI" : author.name?.charAt(0) || "U"}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-white">{author.name || "User"}</span>
            <span className="text-[10px] text-gray-600">{new Date(((msg as any).created_at) || "").toLocaleTimeString()}</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">{msg.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ChatStreamPanel = ({ 
  streamId,
  messages = [],
  onSendMessage,
  currentUserId,
  currentUserName,
  users,
  onUpdateTask,
  stream,
  activeModules,
  currentUserRole
}: { 
  streamId?: string,
  messages?: Message[],
  onSendMessage?: (content: string) => void,
  currentUserId?: string,
  currentUserName?: string,
  users?: Record<string, User>,
  onUpdateTask?: (taskId: string, status: 'pending' | 'completed') => void,
  stream?: Stream,
  activeModules?: BotModule[],
  currentUserRole?: string
}) => {
  const [input, setInput] = React.useState("");

  return (
    <motion.div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-400 p-2 bg-white/2 rounded"
            >
              {msg.content}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-xs">No messages yet</div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message..."
            className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded text-white placeholder-gray-600 focus:outline-none focus:border-nexus-indigo/50"
          />
          <button
            onClick={() => {
              if (input.trim()) {
                onSendMessage?.(input);
                setInput("");
              }
            }}
            className="p-2 text-nexus-indigo hover:bg-nexus-indigo/10 rounded transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const NodeExplorerPanel = ({ 
  nodes = [],
  onSelectNode,
  onNodeSelect,
  activeNodeId,
  onJoin
}: { 
  nodes?: Node[],
  onSelectNode?: (nodeId: string) => void,
  onNodeSelect?: (nodeId: string) => void,
  activeNodeId?: string,
  onJoin?: (...args: any[]) => void
}) => {
  const [expandedNode, setExpandedNode] = React.useState<string | null>(null);

  return (
    <motion.div className="p-4 h-full overflow-y-auto">
      <h3 className="text-xs font-black text-lime-400 uppercase tracking-wider mb-3">Node Explorer</h3>
      <div className="space-y-1">
        {nodes && nodes.length > 0 ? (
          nodes.map((node) => (
            <div key={node.id}>
              <motion.button
                onClick={() => {
                  setExpandedNode(expandedNode === node.id ? null : node.id);
                  (onNodeSelect || onSelectNode)?.(node.id);
                  onJoin?.(node.id);
                }}
                className="w-full text-left p-2 text-xs font-bold text-lime-400 hover:bg-lime-500/10 rounded transition-all"
              >
                <ChevronLeft size={12} className={cn("inline mr-1 transition-transform", expandedNode === node.id && "rotate-90")} />
                {node.name}
              </motion.button>
              {expandedNode === node.id && node.districts && (
                <div className="ml-4 space-y-1 mt-1">
                  {node.districts.map((district: any) => (
                    <div key={district.id} className="p-1 text-[10px] text-gray-500 hover:text-gray-300">
                      • {district.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-[10px] text-gray-600">No nodes</div>
        )}
      </div>
    </motion.div>
  );
};

export const BotForgePanel = ({
  bots = [],
  onCreateBot,
  onDeleteBot,
  modules,
  activeModules,
  onAddModule,
  currentUserRole
}: {
  bots?: BotModule[],
  onCreateBot?: () => void,
  onDeleteBot?: (botId: string) => void,
  modules?: any[],
  activeModules?: any[],
  onAddModule?: (...args: any[]) => void,
  currentUserRole?: string
}) => {
  return (
    <motion.div className="p-6 h-full overflow-y-auto space-y-4">
      <div>
        <h2 className="text-lg font-black text-pink-400 uppercase tracking-wider mb-4">Bot Forge</h2>
        <div className="space-y-2">
          {bots && bots.length > 0 ? (
            bots.map((bot) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-between"
              >
                <div className="text-xs font-bold text-pink-400">{bot.name || "Unnamed Bot"}</div>
                <button
                  onClick={() => onDeleteBot?.(bot.id)}
                  className="text-pink-400/50 hover:text-pink-400 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-xs">No bots created</div>
          )}
        </div>
      </div>
      {onCreateBot && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreateBot}
          className="w-full p-3 text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/50 rounded hover:bg-pink-500/30 transition-all"
        >
          <Plus size={14} className="inline mr-1" /> Create Bot
        </motion.button>
      )}
    </motion.div>
  );
};
