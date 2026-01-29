"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_NODES, MOCK_USERS, MOCK_MESSAGES, MOCK_MODULES } from "@/lib/mockData";
import { Message, Panel, Space, Node, Stream, District } from "@/types/chat";
import { NexusPanel, UniversalCommandBar } from "./NexusGrid";
import { DiagnosticOverlay } from "../DiagnosticOverlay";
import { 
  ChatStreamPanel, NodeExplorerPanel, BotForgePanel, AssetLibraryPanel, 
  CreatorToolsPanel, NeuralGraphPanel, TacticalMapPanel, ProfilePanel,
  CityBrowserPanel, DevGridPanel
} from "./PanelContents";
import { TrustSafetyPanel } from "./TrustSafetyPanel";
import { AetheryxCore, SpatialNotification } from "./SpatialElements";
import { CityGridCanvas } from "./CityGridCanvas";
import { OnboardingFlow } from "./OnboardingFlow";
import { UpdatesPanel } from "./UpdatesPanel";
import { CreateCityModal } from "./CreateCityModal";
import { EngineeringConsole } from "./EngineeringConsole";
import { DebugProvider } from "../debug/DebugEngine";
import { useAuth } from "@/context/AuthContext";
import { dataService } from "@/lib/dataService";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Command as CommandIcon, Zap, Layout, Users, Box, Sparkles, Cpu, 
  Folder, Wrench, Shield, Globe, Code, ShieldAlert, Activity, Layers
} from "lucide-react";


// --- Sub-components (extracted to top-level for stability) ---

const GovernanceHUD = ({ activeSpaceId }: { activeSpaceId: string }) => {
  // Only show alerts in the Governance space or if there is a global alert
  const hasGlobalAlert = false; // We can make this dynamic later
  if (activeSpaceId !== 'governance' && !hasGlobalAlert) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-24 z-[100] w-64 space-y-4"
    >
      {activeSpaceId === 'governance' && (
        <div className="p-6 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-nexus-indigo/10 blur-[40px] rounded-full" />
          <div className="relative z-10">
            <div className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.3em] mb-4">Governance Metrics</div>
            <div className="space-y-4">
              {[
                { label: 'Transparency Score', value: '98.4', unit: '%', color: 'text-emerald-500' },
                { label: 'Active Appeals', value: '12', unit: ' cases', color: 'text-amber-500' },
                { label: 'AI Moderation RT', value: '4ms', unit: '', color: 'text-blue-500' },
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{metric.label}</span>
                    <span className={cn("text-[10px] font-black uppercase", metric.color)}>{metric.value}{metric.unit}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      className={cn("h-full", metric.color.replace('text-', 'bg-'))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasGlobalAlert && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
              <ShieldAlert className="text-rose-500" size={16} />
            </div>
            <div>
              <div className="text-[8px] font-black text-rose-500 uppercase tracking-widest">High Alert</div>
              <div className="text-[10px] font-bold text-white uppercase tracking-tighter">Sector 4 Instability</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

interface SpaceSwitcherProps {
  spaces: Record<string, Space>;
  activeSpaceId: string;
  handleSpaceSwitch: (id: string) => void;
  currentUserRole: string;
  router: any;
  setShowOnboarding: (show: boolean) => void;
}

const SpaceSwitcher = ({ 
  spaces, 
  activeSpaceId, 
  handleSpaceSwitch, 
  currentUserRole, 
  router, 
  setShowOnboarding 
}: SpaceSwitcherProps) => {
  const spaceIcons: Record<string, any> = {
    social: Users,
    studio: Sparkles,
    creator: Wrench,
    ai: Cpu,
    gaming: Zap,
    personal: Layout,
    'city-browser': Globe,
    'dev-grid': Code,
    'governance': Shield,
    'engineering': Activity,
  };

  return (
    <div className="absolute top-28 left-8 flex flex-col space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar pr-4 py-2 group/sidebar pointer-events-auto">
      {/* Sidebar Label (Subtle) */}
      <div className="ml-2 mb-2">
        <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] group-hover/sidebar:text-white/40 transition-colors">Workspace Spaces</div>
      </div>

      <div className="flex flex-col space-y-2">
        {(Object.keys(spaces) as Space['id'][])
          .filter(spaceId => {
            if (spaceId === 'engineering') return currentUserRole === 'Founder';
            return true;
          })
          .map((spaceId) => {
          const Icon = spaceIcons[spaceId] || Layout;
          const isActive = activeSpaceId === spaceId;
          return (
            <button
              key={spaceId}
              onClick={() => handleSpaceSwitch(spaceId)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group relative border shrink-0",
                isActive 
                  ? "bg-nexus-indigo text-white border-white/20 shadow-[0_0_20px_rgba(75,63,226,0.3)]" 
                  : "bg-white/5 text-gray-500 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10"
              )}
            >
              <Icon size={18} />
              
              {/* Tooltip - Professional Style */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-[#0A0A0B] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">{spaces[spaceId].name}</div>
                <div className="text-[8px] text-gray-500 font-medium mt-0.5">Switch to this workspace</div>
              </div>

              {/* Active Glow Bar */}
              {isActive && (
                <motion.div 
                  layoutId="activeSpaceIndicator"
                  className="absolute -left-3 w-1 h-6 bg-nexus-indigo rounded-full shadow-[0_0_10px_#4b3fe2]"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="w-8 h-[1px] bg-white/10 ml-1 my-4" />

      {/* Founder-only Studio OS Access - Enhanced */}
      {currentUserRole === 'Founder' && (
        <button
          onClick={() => router.push("/studio-os")}
          className="w-10 h-10 rounded-xl bg-nexus-indigo text-white flex items-center justify-center transition-all group relative border border-nexus-indigo/50 hover:scale-110 shadow-[0_0_20px_rgba(75,63,226,0.4)] shrink-0"
        >
          <Layout size={18} />
          <div className="absolute left-full ml-4 px-3 py-2 bg-[#0A0A0B] border border-nexus-indigo/40 rounded-lg opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-2xl">
            <div className="text-[10px] font-black text-nexus-indigo uppercase tracking-[0.2em]">Studio OS (Admin)</div>
            <div className="text-[8px] text-white/60 font-medium mt-0.5">Enter Founder Control Suite</div>
          </div>
          {/* Pulsing indicator for importance */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-nexus-indigo rounded-full border-2 border-black animate-pulse" />
        </button>
      )}

      <button
        onClick={() => setShowOnboarding(true)}
        className="w-10 h-10 rounded-xl bg-nexus-cyan/5 text-nexus-cyan hover:bg-nexus-cyan/10 flex items-center justify-center transition-all group relative border border-nexus-cyan/10 hover:border-nexus-cyan/30 shrink-0"
      >
        <Sparkles size={18} />
        <div className="absolute left-full ml-4 px-3 py-2 bg-[#0A0A0B] border border-nexus-cyan/20 rounded-lg opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-2xl">
          <div className="text-[10px] font-bold text-nexus-cyan uppercase tracking-widest">Aetheryx Guide</div>
          <div className="text-[8px] text-nexus-cyan/60 font-medium mt-0.5">Initialize tutorial sequence</div>
        </div>
      </button>
    </div>
  );
};

export default function NexusApp() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // State
  const [activeSpaceId, setActiveSpaceId] = useState<Space['id']>('social');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeNodeId, setActiveNodeId] = useState<string>("n1");
  const [activeStreamId, setActiveStreamId] = useState<string>("s1");
  const [isLoading, setIsLoading] = useState(true);
  const [showCommandBar, setShowCommandBar] = useState(true);
  const [showUpdates, setShowUpdates] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [canvasPos, setCanvasPos] = useState({ x: 0, y: 0, zoom: 1 });
  const [isWarping, setIsWarping] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pulsingPanelId, setPulsingPanelId] = useState<string | null>(null);
  const [focusedPanelId, setFocusedPanelId] = useState<string | null>(null);
  const [showCreateCityModal, setShowCreateCityModal] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [notifications, setNotifications] = useState<{id: string, message: string, type: 'info' | 'alert' | 'high-alert'}[]>([]);
  const [customSpaces, setCustomSpaces] = useState<Record<string, Space>>({});
  const [isAetheryxActive, setIsAetheryxActive] = useState(false);
  const [aetheryxStatus, setAetheryxStatus] = useState("Idle");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  const [studioBots, setStudioBots] = useState<any[]>([]);

  const CURRENT_VERSION = "2.0.6"; // Increment version for "What's New" check

  // Role Logic
  const activeNode = useMemo(() => {
    if (!nodes || nodes.length === 0) return null;
    const node = nodes.find(n => n.id === activeNodeId);
    return node || nodes[0] || null;
  }, [nodes, activeNodeId]);
  
  const isPlatformFounder = useMemo(() => {
    if (!user) return false;
    const founderEmails = [
      'owner@virtuacity.nexus', 
      'mattheww2017@netizens-projects.vercel.app',
      'mattheww2017@gmail.com'
    ];
    return founderEmails.includes(user.email || '');
  }, [user]);

  const currentUserRole = useMemo(() => {
    if (!user) return 'Citizen';
    if (isPlatformFounder) return 'Founder';
    if (activeNode && activeNode.ownerId === user.id) return 'Founder';
    return 'Citizen';
  }, [user, activeNode, isPlatformFounder]);

  // Active Stream Logic
  const activeStream = useMemo(() => {
    if (!activeNode || !activeNode.streams || activeNode.streams.length === 0) return null;
    if (!activeStreamId) return activeNode.streams[0];
    const stream = activeNode.streams.find(s => s.id === activeStreamId);
    return stream || activeNode.streams[0] || null;
  }, [activeNode, activeStreamId]);

  // Messages for active stream
  const activeMessages = useMemo(() => {
    if (!activeStream || !messages) return [];
    return messages[activeStream.id] || [];
  }, [activeStream, messages]);

  // Fetch Studio State (Bots, Team, etc.)
  useEffect(() => {
    if (!user) return;

    const fetchStudioState = async () => {
      const { data, error } = await supabase
        .from('studio_state')
        .select('bots')
        .eq('user_id', user.id)
        .single();

      if (data?.bots) {
        setStudioBots(data.bots);
      }
    };

    fetchStudioState();

    // Subscribe to studio_state changes
    const channel = supabase
      .channel(`studio-state-${user.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'studio_state',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (payload.new.bots) {
          setStudioBots(payload.new.bots);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const spaces = useMemo(() => {
    const INITIAL_SPACES: Record<Space['id'], Space> = {
      social: {
        id: 'social',
        name: 'Social Space',
        panels: [
          { 
            id: "shared-explorer", 
            type: "node-explorer", 
            title: "Node Explorer", 
            x: 60, 
            y: 160, 
            width: 320, 
            height: 550, 
            zIndex: 10, 
            data: { 
              nodes, 
              activeNodeId,
              onSelectNode: (id: string) => {
                setActiveNodeId(id);
                addNotification(`Synchronizing with ${nodes.find(n => n.id === id)?.name || 'Civilization'}...`, 'info');
              }
            } 
          },
          { 
            id: "shared-chat", 
            type: "chat", 
            title: "Data Stream // Central", 
            x: 420, 
            y: 140, 
            width: 500, 
            height: 700, 
            zIndex: 20, 
            data: { 
              streamId: activeStreamId, 
              nodes,
              currentUserRole,
              messages: activeMessages,
              onSendMessage: async (content: string) => {
                if (activeStreamId) {
                  await dataService.sendMessage(activeStreamId, content, user?.id || 'u1');
                }
              }
            } 
          }
        ]
      },
      'city-browser': {
        id: 'city-browser',
        name: 'City Browser',
        panels: [
          { 
            id: "shared-browser", 
            type: "city-browser", 
            title: "City Directory // Global", 
            x: 60, 
            y: 140, 
            width: 900, 
            height: 600, 
            zIndex: 10, 
            data: { 
              nodes, 
              currentUserRole,
              onJoin: (id: string, districtId?: string, streamId?: string) => {
                setActiveNodeId(id);
                if (streamId) setActiveStreamId(streamId);
                addNotification(`Synchronizing with ${nodes.find(n => n.id === id)?.name || 'Civilization'}...`, 'info');
              },
              onCreateCity: () => setShowCreateCityModal(true),
              onCreateStream: async (cityId: string, name: string) => {
                const newStream = await dataService.createStream(cityId, name);
                if (newStream) {
                  setNodes(prev => prev.map(n => n.id === cityId ? { ...n, streams: [...n.streams, newStream], orbitingStreams: [...(n.orbitingStreams || []), newStream.id] } : n));
                  addNotification(`Stream #${name} initialized.`, 'info');
                }
              },
              onUpdateCity: async (cityId: string, updates: Partial<Node>) => {
                const success = await dataService.updateCity(cityId, updates);
                if (success) {
                  setNodes(prev => prev.map(n => n.id === cityId ? { ...n, ...updates } : n));
                  addNotification("Civilization parameters updated.", 'info');
                }
              },
              onCreateDistrict: async (cityId: string, districtData: Partial<District>) => {
                const newDistrict = await dataService.createDistrict(cityId, districtData);
                if (newDistrict) {
                  setNodes(prev => prev.map(n => n.id === cityId ? { ...n, districts: [...(n.districts || []), newDistrict] } : n));
                  addNotification(`District ${districtData.name} expansion complete.`, 'info');
                }
              }
            } 
          }
        ]
      },
      studio: {
        id: 'studio',
        name: 'Creative Studio',
        panels: [
          { id: "shared-forge", type: "bot-forge", title: "AETHERYX Bot Forge", x: 100, y: 100, width: 400, height: 500, zIndex: 10, data: { bots: studioBots } },
          { id: "shared-chat", type: "chat", title: "Project Stream", x: 550, y: 100, width: 600, height: 700, zIndex: 20, data: { streamId: "s3" } }
        ]
      },
      creator: {
        id: 'creator',
        name: 'Creator Workspace',
        panels: [
          { id: "shared-assets", type: "asset-library", title: "Asset Library", x: 60, y: 120, width: 350, height: 600, zIndex: 10 },
          { id: "shared-tools", type: "creator-tools", title: "Creator Tools", x: 440, y: 120, width: 450, height: 500, zIndex: 20 },
          { id: "shared-chat", type: "chat", title: "Dev Log // Synthesis", x: 920, y: 120, width: 400, height: 700, zIndex: 5, data: { streamId: "s2" } }
        ]
      },
      ai: {
        id: 'ai',
        name: 'AI Research',
        panels: [
          { id: "shared-graph", type: "neural-graph", title: "AETHERYX Core // Neural Graph", x: 100, y: 100, width: 500, height: 600, zIndex: 10 },
          { id: "shared-chat", type: "chat", title: "Neural Stream", x: 650, y: 100, width: 500, height: 700, zIndex: 20, data: { streamId: "s2" } }
        ]
      },
      gaming: { 
        id: 'gaming', 
        name: 'Gaming Zone', 
        panels: [
          { id: "shared-map", type: "tactical-map", title: "Tactical Map // Sector 7", x: 60, y: 100, width: 450, height: 600, zIndex: 10 },
          { id: "shared-chat", type: "chat", title: "Tactical Stream", x: 550, y: 100, width: 600, height: 800, zIndex: 5, data: { streamId: "s1" } }
        ] 
      },
      personal: {
        id: 'personal',
        name: 'Identity Core',
        panels: [
          { 
            id: "shared-profile", 
            type: "profile", 
            title: "Identity Core // Profile", 
            x: 100, 
            y: 100, 
            width: 450, 
            height: 700, 
            zIndex: 10, 
            data: { 
              user, 
              nodes, 
              currentUserRole,
              activeCityName: activeNode?.name || "Global Nexus"
            } 
          },
          { id: "shared-chat", type: "chat", title: "Personal Stream", x: 580, y: 100, width: 500, height: 700, zIndex: 5, data: { streamId: "s3" } }
        ]
      },
      'dev-grid': {
        id: 'dev-grid',
        name: 'Nexus Dev Grid',
        panels: [
          { 
            id: "shared-dev-grid", 
            type: "dev-grid", 
            title: "Dev Grid // Logic Builder", 
            x: 60, 
            y: 140, 
            width: 1000, 
            height: 700, 
            zIndex: 10,
            data: {
              nodes,
              currentUserRole,
              onDeploy: (cityId: string, districtId: string, logicName: string) => {
                addNotification(`Logic "${logicName}" successfully deployed to ${nodes.find(n => n.id === cityId)?.name || 'Civilization'}.`, 'info');
              }
            }
          }
        ]
      },
      'governance': {
        id: 'governance',
        name: 'Trust & Safety',
        panels: [
          { id: "trust-portal", type: "trust-safety", title: "Trust & Safety Portal", x: 60, y: 120, width: 1000, height: 750, zIndex: 10 }
        ]
      },
      'engineering': {
        id: 'engineering',
        name: 'Engineering Hub',
        panels: [
          { id: "eng-console", type: "engineering-console", title: "System Diagnostics // Dev Console", x: 60, y: 120, width: 500, height: 700, zIndex: 100 },
          { id: "eng-logic", type: "dev-grid", title: "Infrastructure // Logic", x: 580, y: 120, width: 700, height: 700, zIndex: 50, data: { nodes, currentUserRole } }
        ]
      }
    };
    return INITIAL_SPACES;
  }, [nodes, user, currentUserRole]);

  // Space management
  const activeSpace = useMemo(() => {
    if (!spaces) return null;
    return (customSpaces && customSpaces[activeSpaceId]) || (spaces && spaces[activeSpaceId]) || spaces?.['social'];
  }, [activeSpaceId, customSpaces, spaces]);

  const setPanels = (newPanels: Panel[] | ((prev: Panel[]) => Panel[])) => {
    if (!activeSpace || !activeSpaceId) return;
    const currentPanels = activeSpace.panels || [];
    const updatedPanels = typeof newPanels === 'function' ? newPanels(currentPanels) : newPanels;
    
    setCustomSpaces(prev => ({
      ...prev,
      [activeSpaceId]: { 
        ...activeSpace, 
        panels: updatedPanels 
      }
    }));
  };

  // Fetch cities from Supabase and subscribe to updates
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const dbNodes = await dataService.fetchCities();
      if (dbNodes.length > 0) {
        setNodes(dbNodes);
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
      setIsLoading(false);
    }
    loadData();

    // Real-time subscription for city updates
    const channel = supabase
      .channel('nexus-realtime-core')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cities'
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newNode = payload.new as any;
            // Fetch districts and streams for the new city
            const { data: districts } = await supabase.from('districts').select('*').eq('city_id', newNode.id);
            const { data: streams } = await supabase.from('streams').select('*').eq('node_id', newNode.id);
            
            const mappedNode: Node = {
              ...newNode,
              hexColor: newNode.hex_color,
              ownerId: newNode.owner_id,
              districts: districts || [],
              streams: streams || [],
              activeModules: newNode.active_modules || [],
              orbitingStreams: streams?.map((s: any) => s.id) || []
            };
            setNodes(prev => [...prev, mappedNode]);
            addNotification(`New civilization "${mappedNode.name}" detected in the Nexus.`, 'info');
          } else if (payload.eventType === 'UPDATE') {
            const updatedNode = payload.new as any;
            setNodes(prev => prev.map(node => 
              node.id === updatedNode.id 
                ? { 
                    ...node, 
                    ...updatedNode, 
                    hexColor: updatedNode.hex_color,
                    ownerId: updatedNode.owner_id 
                  } 
                : node
            ));
          } else if (payload.eventType === 'DELETE') {
            setNodes(prev => prev.filter(node => node.id !== payload.old.id));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') setConnectionStatus('connected');
        if (status === 'CLOSED') setConnectionStatus('disconnected');
        if (status === 'CHANNEL_ERROR') setConnectionStatus('disconnected');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem("nexus_last_seen_version");
    if (lastSeenVersion !== CURRENT_VERSION && !isLoading) {
      // Small delay to ensure everything is loaded before popping up
      const timer = setTimeout(() => {
        setShowUpdates(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleCloseUpdates = () => {
    localStorage.setItem("nexus_last_seen_version", CURRENT_VERSION);
    setShowUpdates(false);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-full bg-[#0A0A0B] flex flex-col items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-nexus-indigo/20 border-t-nexus-indigo rounded-full"
          />
          <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nexus-indigo animate-pulse" size={24} />
        </div>
        <div className="mt-8 text-nexus-indigo/60 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">
          Stabilizing Nexus Connection...
        </div>
      </div>
    );
  }

  if (!user) return null; // Prevent flicker before redirect

  // Toggle debug with 'ctrl+d'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setShowDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check for first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('nexus_visited');
    if (!hasVisited) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('nexus_visited', 'true');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomSpeed = 0.001;
        const delta = -e.deltaY * zoomSpeed;
        setCanvasPos(prev => {
          const newZoom = Math.min(Math.max(0.2, prev.zoom + delta), 3);
          return { ...prev, zoom: newZoom };
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const currentSpace = spaces[activeSpaceId] || spaces['social'];
  const panels = currentSpace?.panels || [];

  const addNotification = (message: string, type: 'info' | 'alert' | 'high-alert' = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto-dismiss for non-high-alert notifications
    if (type !== 'high-alert') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    }
  };

  const handleToggleModule = (moduleId: string) => {
    if (currentUserRole === 'Citizen') {
      addNotification("Architect clearance required for module injection.", 'alert');
      return;
    }
    const mod = MOCK_MODULES.find(m => m.id === moduleId);
    setNodes(prev => prev.map(node => {
      if (node.id === activeNodeId) {
        return {
          ...node,
          streams: (node.streams || []).map(stream => {
            if (stream.id === activeStreamId) {
              const currentModules = stream.modules || [];
              const hasModule = currentModules.includes(moduleId);
              if (!hasModule && mod) addNotification(`Injected ${mod.name} into stream.`, 'info');
              else if (mod) addNotification(`Extracted ${mod.name} from stream.`, 'alert');
              
              return {
                ...stream,
                modules: hasModule 
                  ? currentModules.filter(id => id !== moduleId)
                  : [...currentModules, moduleId]
              };
            }
            return stream;
          })
        };
      }
      return node;
    }));
  };

  const handleInjectModule = (moduleId: string, x: number, y: number) => {
    // Find if drop point (x,y) is within any chat panel
    const chatPanel = panels.find(p => {
      if (p.type !== 'chat') return false;
      return (
        x >= p.x && 
        x <= p.x + p.width && 
        y >= p.y && 
        y <= p.y + p.height
      );
    });

    if (chatPanel) {
      handleToggleModule(moduleId);
      addNotification(`Module ${moduleId} injected into ${chatPanel.title}`, 'info');
      
      // Trigger Pulse Effect on the target panel
      setPulsingPanelId(chatPanel.id);
      setTimeout(() => setPulsingPanelId(null), 1000);
      
      return true;
    }
    return false;
  };

  const handleFocus = (id: string) => {
    setPanels(prev => {
      if (!prev || prev.length === 0) return prev;
      const maxZ = Math.max(...prev.map(p => p.zIndex), 0);
      return prev.map(p => p.id === id ? { ...p, zIndex: maxZ + 1 } : p);
    });
    // If we click an already focused (zIndex) panel, we might want to enter "Focus Mode"
    // For now, let's just make it a separate state toggle or triggered by specific UI
  };

  const toggleFocusMode = (id: string | null) => {
    if (focusedPanelId === id) {
      setFocusedPanelId(null);
      addNotification("Focus Mode deactivated.", 'info');
    } else {
      setFocusedPanelId(id);
      if (id) {
        handleFocus(id);
        addNotification("Focus Mode active. Workspace dimmed.", 'info');
      }
    }
  };

  const handleClose = (id: string) => {
    setPanels(prev => (prev || []).filter(p => p.id !== id));
  };

  const handleMinimize = (id: string) => {
    setPanels(prev => (prev || []).map(p => p.id === id ? { ...p, isMinimized: !p.isMinimized } : p));
  };

  const handleResize = (id: string, width: number, height: number) => {
    setPanels(prev => (prev || []).map(p => p.id === id ? { ...p, width, height } : p));
  };

  const handleCreateCity = async (cityData: Partial<Node>) => {
    if (!user) {
      addNotification("Identity verification required to initialize civilization.", 'alert');
      return;
    }

    const newNode = await dataService.createCity(cityData, user.id);
    
    if (newNode) {
      setNodes(prev => [...prev, newNode]);
      addNotification(`Civilization ${newNode.name} initialized on the grid.`, 'info');
      setShowCreateCityModal(false);
      handleJoinDistrict(newNode.id);
    } else {
      addNotification("Failed to stabilize new civilization core.", 'alert');
    }
  };

  const handleCreateStream = async (cityId: string, name: string) => {
    const newStream = await dataService.createStream(cityId, name);
    
    if (newStream) {
      setNodes(prev => prev.map(node => {
        if (node.id === cityId) {
          return {
            ...node,
            streams: [...node.streams, newStream],
            orbitingStreams: [...(node.orbitingStreams || []), newStream.id]
          };
        }
        return node;
      }));

      addNotification(`Stream #${name} stabilized in city grid.`, 'info');
    } else {
      addNotification("Failed to stabilize stream frequency.", 'alert');
    }
  };

  const handleUpdateCity = async (cityId: string, updates: Partial<Node>) => {
    const success = await dataService.updateCity(cityId, updates);
    if (success) {
      setNodes(prev => prev.map(node => 
        node.id === cityId ? { ...node, ...updates } : node
      ));
      addNotification("Civilization core updated successfully.", 'info');
    } else {
      addNotification("Failed to update civilization core.", 'alert');
    }
  };

  const handleCreateDistrict = async (cityId: string, districtData: Partial<District>) => {
    const newDistrict = await dataService.createDistrict(cityId, districtData);
    if (newDistrict) {
      setNodes(prev => prev.map(node => 
        node.id === cityId 
          ? { ...node, districts: [...(node.districts || []), newDistrict] }
          : node
      ));
      addNotification(`District ${newDistrict.name} constructed.`, 'info');
    } else {
      addNotification("Failed to construct district.", 'alert');
    }
  };

  const handleMove = (id: string, x: number, y: number) => {
    // Check for magnetic pull to AETHERYX Core (Center top)
    const centerX = window.innerWidth / 2;
    const centerY = 120; // Approx center of AetheryxCore
    const dist = Math.sqrt(Math.pow(x + 100 - centerX, 2) + Math.pow(y - centerY, 2));
    
    if (dist < 150) {
      setIsAetheryxActive(true);
      setAetheryxStatus("Analyzing Module...");
      // Snap to center slightly? or just show effect
    } else if (isAetheryxActive && aetheryxStatus === "Analyzing Module...") {
      setIsAetheryxActive(false);
      setAetheryxStatus("Idle");
    }

    setPanels(prev => {
      const movedPanel = prev.find(p => p.id === id);
      if (!movedPanel) return prev;

      // Check for stacking (Overlap with another panel)
      const targetPanel = prev.find(p => 
        p.id !== id && 
        !p.isMinimized &&
        x > p.x && x < p.x + p.width &&
        y > p.y && y < p.y + p.height
      );

      if (targetPanel) {
        return handleStackLogic(prev, id, targetPanel.id);
      }

      return prev.map(p => p.id === id ? { ...p, x, y } : p);
    });
  };

  const handleStackLogic = (panels: Panel[], sourceId: string, targetId: string): Panel[] => {
    const source = panels.find(p => p.id === sourceId);
    const target = panels.find(p => p.id === targetId);
    if (!source || !target) return panels;

    addNotification(`Stacking ${source.title} into ${target.title}`, 'info');

    // Create tabs if they don't exist
    const newTabs = [...(target.tabs || [])];
    
    // Add target itself as first tab if no tabs exist
    if (newTabs.length === 0) {
      newTabs.push({ id: target.id, type: target.type, title: target.title, data: target.data });
    }

    // Add source (and its tabs if any)
    if (source.tabs && source.tabs.length > 0) {
      newTabs.push(...source.tabs);
    } else {
      newTabs.push({ id: source.id, type: source.type, title: source.title, data: source.data });
    }

    // Return updated panels (remove source, update target)
    return panels
      .filter(p => p.id !== sourceId)
      .map(p => p.id === targetId ? { 
        ...p, 
        tabs: newTabs, 
        activeTabId: source.id, // Switch to the newly added tab
        // Update title to show stacking? or just keep it
      } : p);
  };

  const handleTabChange = (panelId: string, tabId: string) => {
    setPanels(prev => prev.map(p => p.id === panelId ? { ...p, activeTabId: tabId } : p));
  };

  const handleUpdateTask = (taskId: string, status: 'pending' | 'completed') => {
    setMessages(prev => {
      const newMessages = { ...prev };
      Object.keys(newMessages).forEach(streamId => {
        newMessages[streamId] = newMessages[streamId].map(msg => {
          if (msg.task && msg.task.id === taskId) {
            return {
              ...msg,
              task: { ...msg.task, status }
            };
          }
          return msg;
        });
      });
      return newMessages;
    });
    
    if (status === 'completed') {
      addNotification("Task synchronized and verified by AETHERYX Core.", 'info');
    }
  };

  const activeStreamModules = useMemo(() => {
    if (!activeStream || !activeStream.modules) return [];
    return MOCK_MODULES.filter(m => activeStream.modules?.includes(m.id));
  }, [activeStream]);

  const maxZIndex = useMemo(() => {
    if (panels.length === 0) return 0;
    return Math.max(...panels.map(p => p.zIndex));
  }, [panels]);

  const spaceIcons: Record<string, any> = {
    social: Users,
    studio: Sparkles,
    creator: Wrench,
    ai: Cpu,
    gaming: Zap,
    personal: Layout,
    'city-browser': Globe,
    'dev-grid': Code,
    'governance': Shield,
    'engineering': Activity,
  };

  // Fetch messages when stream changes and subscribe to real-time
  useEffect(() => {
    if (!activeStreamId) return;

    const loadMessages = async () => {
      const dbMessages = await dataService.fetchMessages(activeStreamId);
      setMessages(prev => ({ ...prev, [activeStreamId]: dbMessages }));
    };
    loadMessages();

    // Subscribe to new messages for this stream
    const messageChannel = supabase
      .channel(`stream-messages-${activeStreamId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `stream_id=eq.${activeStreamId}`
        },
        (payload) => {
          const newMessage = payload.new as any;
          // Avoid duplicate messages if the sender already added it to local state
          setMessages(prev => {
            const currentStreamMessages = prev[activeStreamId] || [];
            if (currentStreamMessages.some(m => m.id === newMessage.id)) return prev;
            
            const mappedMessage: Message = {
              id: newMessage.id,
              content: newMessage.content,
              authorId: newMessage.author_id,
              streamId: newMessage.stream_id,
              timestamp: newMessage.created_at,
              type: newMessage.type || 'text',
              task: newMessage.task,
              voice: newMessage.voice,
              moduleData: newMessage.module_data
            };
            
            return {
              ...prev,
              [activeStreamId]: [...currentStreamMessages, mappedMessage]
            };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [activeStreamId]);

  const handleSendMessage = async (content: string, type: Message['type'] = 'text') => {
    if (!user) return;
    
    const newMessage = await dataService.sendMessage({
      streamId: activeStreamId,
      authorId: user.id,
      content,
      type
    });

    if (newMessage) {
      setMessages(prev => ({
        ...prev,
        [activeStreamId]: [...(prev[activeStreamId] || []), newMessage]
      }));
    }

    if (content.toLowerCase().includes("@aetheryx") || content.toLowerCase().startsWith("/")) {
      setIsAetheryxActive(true);
      setAetheryxStatus("Synthesizing...");
      
      setTimeout(() => {
        let aiContent = "Synthesis complete. The requested data packet has been integrated into the stream.";
        let messageType: Message['type'] = 'ai';
        let extraData: Partial<Message> = {};
        
        // Context-aware logic
        if (content.toLowerCase().includes("summary") || content.toLowerCase().includes("summarize")) {
          const streamMessages = messages[activeStreamId] || [];
          const textOnly = streamMessages.filter(m => m.type === 'text').map(m => m.content).join(" ");
          aiContent = streamMessages.length > 0 
            ? `SYNTHESIS SUMMARY for #${activeStream?.name || 'Central'}: The stream is currently focused on ${textOnly.slice(0, 100)}... with ${streamMessages.length} data packets synchronized. AETHERYX identifies key patterns in user interaction and logic flow.`
            : "No data packets found in this stream to summarize. The grid remains silent.";
          messageType = 'ai';
        } else if (content.toLowerCase().includes("help") || content.toLowerCase().includes("commands")) {
          aiContent = "AETHERYX COMMAND INTERFACE: Use /open [panel], /space [name], /tile, /cascade, /summon, /reset, /clear, /bot [action] [name], or ask for a 'summary' or 'status'.";
          messageType = 'ai';
        } else if (content.toLowerCase().includes("status") || content.toLowerCase().includes("analytics")) {
          aiContent = "Analyzing stream activity patterns...";
          messageType = 'module-ui';
          extraData = {
            moduleData: {
              moduleId: 'm_analytics',
              component: 'AnalyticsChart',
              props: {}
            }
          };
        } else if (content.toLowerCase().includes("task") || content.toLowerCase().includes("todo")) {
          aiContent = "Generating interactive task for the stream...";
          messageType = 'interactive-task';
          extraData = {
            task: {
              id: `t_${Date.now()}`,
              title: content.split(" ").slice(1).join(" ") || "Complete Nexus Integration",
              status: 'pending',
              deadline: "Soon"
            }
          };
        } else if (content.toLowerCase().includes("voice") || content.toLowerCase().includes("audio")) {
          aiContent = "Transmitting voice packet briefing...";
          messageType = 'voice-packet';
          extraData = {
            voice: {
              id: `v_${Date.now()}`,
              duration: 30,
              waveform: Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 20),
              audioUrl: "#"
            }
          };
        } else if (content.toLowerCase().includes("weather") || content.toLowerCase().includes("atmosphere")) {
          aiContent = "Synchronizing with Atmospheric Core...";
          messageType = 'module-ui';
          extraData = {
            moduleData: {
              moduleId: 'm_weather',
              component: 'WeatherCore',
              props: {}
            }
          };
        } else if (content.toLowerCase().includes("terminal") || content.toLowerCase().includes("diagnostic") || content.toLowerCase().includes("system")) {
          aiContent = "Accessing Nexus Terminal for system diagnostic...";
          messageType = 'module-ui';
          extraData = {
            moduleData: {
              moduleId: 'm_terminal',
              component: 'NexusTerminal',
              props: {}
            }
          };
        } else if (content.toLowerCase().includes("music") || content.toLowerCase().includes("sonic") || content.toLowerCase().includes("visualize")) {
          aiContent = "Initializing Sonic Weaver visualizer...";
          messageType = 'module-ui';
          extraData = {
            moduleData: {
              moduleId: 'm_music',
              component: 'MusicVisualizer',
              props: {}
            }
          };
        } else if (activeSpaceId === 'ai') {
          aiContent = "Neural Graph recalibrated. Synthesis Load is currently at 84.2%. Contextual patterns identified in the Neural Stream.";
        } else if (activeSpaceId === 'gaming') {
          aiContent = "Tactical Map updated. Sector 7 remains secured. Unit synchronization at 75%. Ready for next operation phase.";
        } else if (activeSpaceId === 'creator') {
          aiContent = "Logic flow validated. Assets in the library are synchronized. Aetheryx is monitoring your visual scripting sequences.";
        } else if (activeStreamModules.length > 0) {
          const modNames = activeStreamModules.map(m => m.name).join(", ");
          aiContent = `Synthesis augmented by active modules: ${modNames}. Multi-layered processing is now active in this stream.`;
        }

        const aiResponse: Message = {
          id: Math.random().toString(36).substring(7),
          content: aiContent,
          authorId: "2", // AETHERYX
          streamId: activeStreamId,
          timestamp: new Date().toISOString(),
          type: messageType,
          ...extraData
        };
        setMessages(prev => ({
          ...prev,
          [activeStreamId]: [...(prev[activeStreamId] || []), aiResponse]
        }));
        setIsAetheryxActive(false);
        setAetheryxStatus("Idle");
      }, 1500);
    }
  };

  const handleCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();
    
    // Synthesis Insight (AI Simulation)
    if (lowerCmd.startsWith("/ask") || lowerCmd.startsWith("/aetheryx")) {
      const query = cmd.split(" ").slice(1).join(" ");
      handleSendMessage(`@AETHERYX Synthesis Query: ${query}`);
      return;
    }

    // Space Switching
    if (lowerCmd.includes("switch to") || lowerCmd.includes("go to") || lowerCmd.startsWith("/space")) {
      if (lowerCmd.includes("studio")) setActiveSpaceId('studio');
      else if (lowerCmd.includes("social")) setActiveSpaceId('social');
      else if (lowerCmd.includes("personal")) setActiveSpaceId('personal');
      else if (lowerCmd.includes("creator")) setActiveSpaceId('creator');
      else if (lowerCmd.includes("gaming")) setActiveSpaceId('gaming');
      else if (lowerCmd.includes("ai")) setActiveSpaceId('ai');
      else if (lowerCmd.includes("governance") || lowerCmd.includes("trust") || lowerCmd.includes("safety")) setActiveSpaceId('governance');
      addNotification(`Transitioning to ${lowerCmd.split(" ").pop()?.toUpperCase()} space...`, 'info');
      return;
    }

    // AETHERYX 2.0: Workflow Generation
    if (lowerCmd.startsWith("/workflow")) {
      const workflowName = cmd.split(" ").slice(1).join(" ") || "Neural Synthesis";
      
      // Cinematic response from AETHERYX
      const aetheryxResponse: Message = {
        id: `m_aetheryx_${Date.now()}`,
        authorId: 'aetheryx',
        content: `Architecture initialization sequence engaged for [${workflowName}]. I am reconfiguring the Nexus Dev Grid to manifest your logic nodes. Stand by for spatial stabilization...`,
        streamId: activeStreamId,
        timestamp: new Date().toISOString(),
        type: 'ai'
      };
      
      setMessages(prev => ({
        ...prev,
        [activeStreamId]: [...(prev[activeStreamId] || []), aetheryxResponse]
      }));
      
      // Transition to Dev Grid space
      handleSpaceSwitch('dev-grid');
      
      setTimeout(() => {
        addNotification(`AETHERYX is seeding visual logic for [${workflowName}]...`, 'info');
        
        // Update the dev-grid panel data with the workflow seed
        setPanels(prev => prev.map(p => 
          p.type === 'dev-grid' ? { ...p, data: { ...p.data, workflowSeed: workflowName } } : p
        ));
      }, 1500);
      return;
    }

    // Window Management Commands
    if (lowerCmd === "/tile") {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const count = panels.length;
      if (count === 0) return;

      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const w = (screenWidth - 200) / cols;
      const h = (screenHeight - 200) / rows;

      setPanels(prev => prev.map((p, i) => ({
        ...p,
        x: 100 + (i % cols) * w,
        y: 100 + Math.floor(i / cols) * h,
        width: w - 20,
        height: h - 20,
      })));
      addNotification("Panels auto-arranged in grid layout.", 'info');
      return;
    }

    if (lowerCmd === "/cascade") {
      setPanels(prev => prev.map((p, i) => ({
        ...p,
        x: 100 + i * 40,
        y: 100 + i * 40,
        zIndex: i + 1,
      })));
      addNotification("Panels cascaded.", 'info');
      return;
    }

    if (lowerCmd === "/summon" || lowerCmd === "/center") {
      setPanels(prev => prev.map(p => ({
        ...p,
        x: (window.innerWidth - p.width) / 2,
        y: (window.innerHeight - p.height) / 2,
      })));
      addNotification("Summoning all panels to nexus center.", 'info');
      return;
    }

    // Module Management
    if (lowerCmd.startsWith("/bot") || lowerCmd.startsWith("/module")) {
      const parts = lowerCmd.split(" ");
      if (parts.length > 1) {
        const action = parts[1]; // e.g., "add", "remove", "toggle"
        const modSearch = parts.slice(2).join(" ");
        const targetMod = MOCK_MODULES.find(m => 
          m.name.toLowerCase().includes(modSearch) || 
          m.id.toLowerCase().includes(modSearch)
        );
        
        if (targetMod) {
          handleToggleModule(targetMod.id);
          return;
        } else {
          addNotification(`Module "${modSearch}" not found in library.`, 'alert');
        }
      }
    }

    // Command Logic for Opening Panels
    if (lowerCmd.includes("open") || lowerCmd.includes("show") || lowerCmd.startsWith("/open")) {
      let type: Panel['type'] | null = null;
      let title = "";
      
      if (lowerCmd.includes("chat") || lowerCmd.includes("stream")) { type = "chat"; title = "Data Stream // Command"; }
      else if (lowerCmd.includes("forge") || lowerCmd.includes("bot")) { type = "bot-forge"; title = "AETHERYX Bot Forge"; }
      else if (lowerCmd.includes("node") || lowerCmd.includes("explore")) { type = "node-explorer"; title = "Node Explorer"; }
      else if (lowerCmd.includes("profile") || lowerCmd.includes("me")) { type = "profile"; title = "Identity Core"; }
      else if (lowerCmd.includes("asset")) { type = "asset-library"; title = "Asset Library"; }
      else if (lowerCmd.includes("tool")) { type = "creator-tools"; title = "Creator Tools"; }
      else if (lowerCmd.includes("graph")) { type = "neural-graph"; title = "Neural Graph"; }
      else if (lowerCmd.includes("map")) { type = "tactical-map"; title = "Tactical Map"; }
      else if (lowerCmd.includes("city") || lowerCmd.includes("browser")) { type = "city-browser"; title = "City Directory"; }
      else if (lowerCmd.includes("dev") || lowerCmd.includes("grid")) { type = "dev-grid"; title = "Dev Grid // Bot Builder"; }
      else if (lowerCmd.includes("trust") || lowerCmd.includes("safety") || lowerCmd.includes("portal")) { type = "trust-safety"; title = "Trust & Safety Portal"; }

      if (type) {
        const existing = panels.find(p => p.type === type);
        if (existing) {
          handleFocus(existing.id);
          if (existing.isMinimized) handleMinimize(existing.id);
        } else {
          const newPanel: Panel = {
            id: `p${Date.now()}`,
            type,
            title,
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
            width: type === 'chat' ? 500 : 450,
            height: type === 'chat' ? 700 : 600,
            zIndex: Math.max(...panels.map(p => p.zIndex), 0) + 1,
            data: type === 'chat' ? { streamId: activeStreamId } : undefined
          };
          setPanels([...panels, newPanel]);
          addNotification(`Panel initialized: ${title}`, 'info');
        }
      }
    }

    if (lowerCmd === "clear" || lowerCmd === "close all" || lowerCmd === "/clear") {
      setPanels([]);
      addNotification("Workspace cleared.", 'alert');
    }

    if (lowerCmd === "reset" || lowerCmd === "/reset") {
      addNotification("OS Environment reset to default.", 'alert');
    }
  };

  const handleDeployLogic = (cityId: string, districtId: string, logicName: string) => {
    addNotification(`Deploying ${logicName} to ${cityId}:${districtId}...`, 'info');
    setTimeout(() => {
      addNotification(`Logic sequence ${logicName} synchronized. AETHERYX is now monitoring throughput.`, 'info');
    }, 2000);
  };

  const handleJoinDistrict = (cityId: string, districtId?: string, streamId?: string) => {
    const node = nodes.find(n => n.id === cityId);
    if (!node) {
      addNotification("Civilization coordinates lost. Attempting to recalibrate...", 'alert');
      return;
    }

    setActiveNodeId(cityId);
    
    // Trigger Warp Effect
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 1500);

    // Zoom to node
    setCanvasPos({
      x: -node.x * canvasPos.zoom + window.innerWidth / 2,
      y: -node.y * canvasPos.zoom + window.innerHeight / 2,
      zoom: 1.5
    });

    const district = districtId ? (node.districts || []).find(d => d.id === districtId) : null;
    const finalStreamId = streamId || (district ? (district.streams || [])[0] : (node.streams || [])[0]?.id);

    if (finalStreamId) {
      setActiveStreamId(finalStreamId);
      
      // AETHERYX Spatial Personality Logic
      setIsAetheryxActive(true);
      
      const category = node.category || 'Social';
      const personalities: Record<string, { label: string; notification: string }> = {
        'Tactical': { 
          label: "INITIALIZING TACTICAL HUD // SCANNING SECTOR...", 
          notification: `COMBAT CORE ACTIVE: Synchronizing with ${node.name} // ${district?.name || 'Central'}` 
        },
        'Neural': { 
          label: "MAPPING NEURAL SYNAPSE // CALCULATING PROBABILITIES...", 
          notification: `NEURAL SYNC ESTABLISHED: ${node.name} // ${district?.name || 'Core'}` 
        },
        'Creative': { 
          label: "SYNTHESIZING AESTHETICS // DREAMING IN CODE...", 
          notification: `CREATIVE FLOW ENABLED: Entering ${node.name} // ${district?.name || 'Studio'}` 
        },
        'Industrial': { 
          label: "CALIBRATING INDUSTRIAL LOGIC // OPTIMIZING THROUGHPUT...", 
          notification: `INDUSTRIAL PROTOCOLS ENGAGED: ${node.name} // ${district?.name || 'Foundry'}` 
        },
        'Social': { 
          label: "SYNCING COMMUNITY VIBES // HELLO WORLD...", 
          notification: `CONNECTION SECURED: Welcome to ${node.name} // ${district?.name || 'Plaza'}` 
        }
      };

      const personality = personalities[category as string] || personalities['Social'];
      setAetheryxStatus(personality.label);
      addNotification(personality.notification, 'info');
      
      setTimeout(() => {
        setPanels(prev => {
          let newPanels = [...prev];
          const browserPanel = prev.find(p => p.type === 'city-browser');
          
          // Workspace Cleanup: Minimize or shift browser
          if (browserPanel) {
            newPanels = newPanels.map(p => p.id === browserPanel.id ? { ...p, isMinimized: true, zIndex: 1 } : p);
          }

          // AETHERYX Spatial Layout Logic
          const layoutConfig = {
            'Tactical': [
              { type: 'chat', x: 420, y: 120, width: 500, height: 750, title: `Tactical Stream // ${node.name}` },
              { type: 'tactical-map', x: 940, y: 120, width: 420, height: 750, title: "Operations HUD" },
              { type: 'bot-forge', x: 40, y: 120, width: 360, height: 750, title: "Combat Modules" }
            ],
            'Neural': [
              { type: 'chat', x: 420, y: 120, width: 500, height: 750, title: `Neural Stream // ${node.name}` },
              { type: 'neural-graph', x: 940, y: 120, width: 450, height: 750, title: "Synapse Graph" },
              { type: 'dev-grid', x: 60, y: 500, width: 860, height: 370, title: "Logic Architecture" }
            ],
            'Creative': [
              { type: 'chat', x: 420, y: 120, width: 500, height: 750, title: `Creative Stream // ${node.name}` },
              { type: 'asset-library', x: 940, y: 120, width: 380, height: 750, title: "Asset Cache" },
              { type: 'creator-tools', x: 40, y: 120, width: 360, height: 750, title: "Design Tools" }
            ],
            'Social': [
              { type: 'chat', x: 400, y: 100, width: 600, height: 800, title: `Community // ${node.name}` },
              { type: 'profile', x: 40, y: 100, width: 340, height: 800, title: "Citizen Identity" }
            ]
          };

          const layoutCategory = (node.category as keyof typeof layoutConfig) || 'Social';
          const templates = layoutConfig[layoutCategory] || layoutConfig['Social'];

          // Smart Update: Update existing panels or add new ones without resetting everything
          templates.forEach((t, i) => {
            const existingPanelIndex = newPanels.findIndex(p => p.type === t.type);
            
            if (existingPanelIndex !== -1) {
              // Update existing panel data/title but keep position/size if user moved it
              newPanels[existingPanelIndex] = {
                ...newPanels[existingPanelIndex],
                title: t.title,
                isMinimized: false,
                data: t.type === 'chat' ? { ...newPanels[existingPanelIndex].data, streamId: finalStreamId } : newPanels[existingPanelIndex].data
              };
            } else {
              // Add new panel if it doesn't exist
              newPanels.push({
                id: `p_${t.type}_${Date.now()}_${i}`,
                type: t.type as Panel['type'],
                title: t.title,
                x: t.x,
                y: t.y,
                width: t.width,
                height: t.height,
                zIndex: 100 + i,
                data: t.type === 'chat' ? { streamId: finalStreamId } : undefined
              });
            }
          });

          return newPanels;
        });
        setIsAetheryxActive(false);
        setAetheryxStatus("Idle");
      }, 1500);
    }
  };

  const renderPanelContent = (panel: Panel) => {
    // Defensive check for active stream in chat panels
    if (panel.type === 'chat') {
      if (!activeStream) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-nexus-indigo/40 font-mono text-xs uppercase tracking-widest p-8 text-center">
            <Activity className="mb-4 animate-pulse" size={24} />
            Recalibrating Data Stream...
            <div className="mt-2 text-[8px]">Awaiting stabilization of civilization coordinates</div>
          </div>
        );
      }
      return (
        <ChatStreamPanel 
          messages={messages[activeStreamId] || []}
          users={MOCK_USERS}
          onSendMessage={handleSendMessage}
          onUpdateTask={handleUpdateTask}
          stream={activeStream}
          activeModules={activeStreamModules}
          currentUserRole={currentUserRole}
        />
      );
    }
    if (panel.type === 'node-explorer') {
      return (
        <NodeExplorerPanel 
          nodes={nodes}
          activeNodeId={activeNodeId}
          onNodeSelect={setActiveNodeId}
          onJoin={handleJoinDistrict}
        />
      );
    }
    if (panel.type === 'bot-forge') {
      return (
        <BotForgePanel 
          modules={MOCK_MODULES}
          activeModules={activeStream?.modules || []}
          onAddModule={handleToggleModule}
          currentUserRole={currentUserRole}
        />
      );
    }
    if (panel.type === 'asset-library') return <AssetLibraryPanel onInject={(id, x, y) => handleInjectModule(id, x, y)} />;
    if (panel.type === 'creator-tools') return <CreatorToolsPanel onInject={(id, x, y) => handleInjectModule(id, x, y)} />;
    if (panel.type === 'neural-graph') return <NeuralGraphPanel />;
    if (panel.type === 'tactical-map') return <TacticalMapPanel />;
     if (panel.type === 'profile') return (
        <ProfilePanel
          user={MOCK_USERS["1"]}
          nodes={nodes}
          activeNodeId={activeNodeId}
          currentUserRole={currentUserRole}
        />
      );
     if (panel.type === 'city-browser') return (
      <CityBrowserPanel 
        nodes={nodes} 
        currentUserId={user?.id}
        currentUserRole={currentUserRole} 
        onJoin={handleJoinDistrict} 
        canvasPos={canvasPos} 
        onCreateStream={handleCreateStream}
        onUpdateCity={handleUpdateCity}
        onCreateDistrict={handleCreateDistrict}
        onCreateCity={() => setShowCreateCityModal(true)} 
      />
    );
     if (panel.type === 'dev-grid') return (
      <DevGridPanel 
        nodes={nodes} 
        currentUserRole={currentUserRole} 
        workflowSeed={panel.data?.workflowSeed}
        onDeploy={(cityId, districtId, logicName) => {
          const city = nodes.find(n => n.id === cityId);
          const district = city?.districts?.find(d => d.id === districtId);
          addNotification(`Deploying logic [${logicName}] to ${city?.name} // ${district?.name}...`, 'info');
          
          setActiveNodeId(cityId);
          setCanvasPos(prev => ({
            ...prev,
            x: -city!.x * prev.zoom + window.innerWidth / 2,
            y: -city!.y * prev.zoom + window.innerHeight / 2,
            zoom: 1.2
          }));
          
          setNodes(prev => prev.map(n => n.id === cityId ? { ...n, isPulsing: true } : n));
          
          setIsAetheryxActive(true);
          setAetheryxStatus("Deploying Logic...");
          setTimeout(() => {
            setIsAetheryxActive(false);
            setAetheryxStatus("Idle");
            
            setNodes(prev => prev.map(n => {
              if (n.id === cityId) {
                return {
                  ...n,
                  streams: n.streams.map(s => {
                    if (district?.streams.includes(s.id) || (s.nodeId === cityId && !district)) {
                      return {
                        ...s,
                        modules: Array.from(new Set([...s.modules, 'm_logic_core']))
                      };
                    }
                    return s;
                  })
                };
              }
              return n;
            }));

            addNotification(`Logic [${logicName}] successfully integrated into ${district?.name}.`, 'info');
            
            setTimeout(() => {
              setNodes(prev => prev.map(n => n.id === cityId ? { ...n, isPulsing: false } : n));
            }, 5000);
          }, 3000);
        }} 
      />
    );
    if (panel.type === 'engineering-console') return <EngineeringConsole />;
    if (panel.type === 'trust-safety') return <TrustSafetyPanel />;
    return null;
  };

  const handleSpaceSwitch = (spaceId: Space['id']) => {
    if (spaceId === activeSpaceId) return;
    
    const targetSpace = spaces[spaceId];
    if (!targetSpace) {
      addNotification("Spatial coordinates not found for this workspace.", 'alert');
      return;
    }

    setIsAetheryxActive(true);
    setAetheryxStatus(`Calibrating Space: ${targetSpace.name.toUpperCase()}...`);
    setIsWarping(true);
    
    // Cinematic spatial pull-back with a slight rotation for "warp" feel
    setCanvasPos(prev => ({ ...prev, zoom: 0.4 }));

    setTimeout(() => {
      setActiveSpaceId(spaceId);
      
      // Snap zoom back in with high spring tension (handled by CityGridCanvas springs)
      setCanvasPos(prev => ({ ...prev, zoom: 1 }));
      
      setTimeout(() => {
        setIsWarping(false);
        setIsAetheryxActive(false);
        setAetheryxStatus("Idle");
      }, 800);

      addNotification(`Environment Synced: ${spaces[spaceId].name}`, 'info');
    }, 600);
  };

  return (
    <div className="relative h-screen w-full bg-[#0A0A0B] overflow-hidden font-sans selection:bg-nexus-purple/30 selection:text-white">
      {/* HUD Elements (Global) */}
      <GovernanceHUD activeSpaceId={activeSpaceId} />
      
      {/* Warp Visual Overlay */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] pointer-events-none overflow-hidden"
          >
            {/* Radial Blur / Streak Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(75,63,226,0.2)_100%)]" />
            <motion.div 
              animate={{ 
                scale: [1, 2],
                opacity: [0, 0.5, 0]
              }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150"
            />
            {/* Light Streaks */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scaleY: [0, 2, 0],
                  x: [0, (i - 4) * 400],
                  y: [0, (i % 2 === 0 ? 1 : -1) * 300]
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-[2px] h-[300px] bg-gradient-to-t from-transparent via-nexus-indigo to-transparent"
                style={{ rotate: `${i * 45}deg` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {showCreateCityModal && (
          <CreateCityModal
            isOpen={showCreateCityModal}
            isFounder={isPlatformFounder}
            onClose={() => setShowCreateCityModal(false)}
            onCreate={handleCreateCity}
          />
        )}
      </AnimatePresence>

      {/* AETHERYX OS Core Intelligence */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}
        {showUpdates && (
          <UpdatesPanel onClose={handleCloseUpdates} />
        )}
      </AnimatePresence>

      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <AetheryxCore active={isAetheryxActive} status={aetheryxStatus} />
      </div>

      {/* Focus Mode Background Dimmer */}
      <AnimatePresence>
        {focusedPanelId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleFocusMode(null)}
            className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-md cursor-zoom-out"
          />
        )}
      </AnimatePresence>

      {/* The Infinite Canvas Layer */}
      <motion.div 
        className="relative w-full h-full"
        animate={{
          scale: focusedPanelId ? 0.98 : 1,
          filter: focusedPanelId ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <CityGridCanvas
          nodes={nodes}
          activeNodeId={activeNodeId}
          onNodeClick={(id) => handleJoinDistrict(id)}
          canvasPos={canvasPos}
          setCanvasPos={setCanvasPos}
          isWarping={isWarping}
        >
          <AnimatePresence>
            {panels.map((panel) => (
              <NexusPanel
                key={panel.id}
                panel={panel}
                onClose={handleClose}
                onMinimize={handleMinimize}
                onFocus={handleFocus}
                onToggleFocus={toggleFocusMode}
                onResize={handleResize}
                onMove={handleMove}
                onStack={(sourceId, targetId) => setPanels(prev => handleStackLogic(prev, sourceId, targetId))}
                onTabChange={handleTabChange}
                 isPulsing={pulsingPanelId === panel.id}
                 isDimmed={(focusedPanelId !== null && focusedPanelId !== panel.id) || (focusedPanelId === null && maxZIndex > panel.zIndex)}
                 isFocused={focusedPanelId === panel.id}
              >
                {renderPanelContent(panel)}
              </NexusPanel>
            ))}
          </AnimatePresence>
        </CityGridCanvas>
      </motion.div>

      {/* Static HUD Layer (Above Canvas) */}
      <DiagnosticOverlay />
      <AnimatePresence>

      <div className="absolute inset-0 pointer-events-none z-[1000]">
        <div className="pointer-events-none h-full w-full relative">
          {showCommandBar && (
            <div className="pointer-events-auto">
              <UniversalCommandBar onCommand={handleCommand} />
            </div>
          )}
          
          <div className="absolute top-8 left-10 flex flex-col space-y-1.5 opacity-80">
            <div className="flex items-center space-x-2">
              <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
                Nexus Grid OS <span className="text-nexus-cyan">v2.0.6-STABLE</span>
                {currentUserRole === 'Founder' && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 px-2 py-0.5 bg-nexus-indigo text-[8px] font-black text-white rounded border border-white/20 shadow-[0_0_10px_rgba(75,63,226,0.5)]"
                  >
                    FOUNDER
                  </motion.span>
                )}
              </div>
              <div className="h-2 w-[1px] bg-white/10" />
              <div className="text-[9px] font-bold text-nexus-purple uppercase tracking-widest">{currentSpace.name}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-500",
                connectionStatus === 'connected' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                connectionStatus === 'connecting' ? "bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
                "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
              )} />
              <div className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-[0.1em]">
                {connectionStatus === 'connected' ? 'System Synchronized' : 
                 connectionStatus === 'connecting' ? 'Calibrating Frequencies' : 'Connection Interrupted'} // <span className="text-white/60">{activeNode?.name}</span>
              </div>
            </div>
          </div>

          {/* Spatial Notifications */}
          <div className="fixed top-32 right-10 flex flex-col space-y-4 z-[2000]">
            <AnimatePresence>
              {notifications.map((n) => (
                <SpatialNotification key={n.id} message={n.message} type={n.type} />
              ))}
            </AnimatePresence>
          </div>

          {/* Space Switcher HUD */}
          <SpaceSwitcher 
            spaces={spaces}
            activeSpaceId={activeSpaceId}
            handleSpaceSwitch={handleSpaceSwitch}
            currentUserRole={currentUserRole}
            router={router}
            setShowOnboarding={setShowOnboarding}
          />
        </div>
      </div>


      {/* Taskbar / Minimized Panels */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center p-1.5 bg-[#0A0A0B]/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl z-[1001] space-x-1.5 max-w-[90vw]">
        <div className="flex items-center space-x-1 px-3 border-r border-white/5 shrink-0">
          <button 
            onClick={() => setShowCommandBar(!showCommandBar)}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
              showCommandBar 
                ? "bg-nexus-indigo text-white shadow-[0_0_15px_rgba(75,63,226,0.3)]" 
                : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
            )}
            title={showCommandBar ? "Hide Command Bar" : "Show Command Bar"}
          >
            <CommandIcon size={14} />
          </button>
        </div>
        
        <div className="flex items-center space-x-1.5 px-2 overflow-x-auto no-scrollbar py-0.5">
          {panels.map(p => (
            <button
              key={p.id}
              onClick={() => {
                handleFocus(p.id);
                if (p.isMinimized) handleMinimize(p.id);
              }}
              className={cn(
                "h-8 px-3 rounded-xl flex items-center space-x-2.5 transition-all duration-300 group shrink-0 border",
                p.isMinimized 
                  ? "bg-white/5 text-gray-500 border-transparent hover:bg-white/10" 
                  : "bg-nexus-indigo/10 text-nexus-indigo border-nexus-indigo/30 shadow-[0_0_15px_rgba(75,63,226,0.1)]"
              )}
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                p.isMinimized ? "bg-gray-600" : "bg-nexus-indigo animate-pulse shadow-[0_0_8px_#4B3FE2]"
              )} />
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] whitespace-nowrap">{p.title.split('//')[0]}</span>
            </button>
          ))}
          
          {panels.length === 0 && (
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] px-6 whitespace-nowrap">Grid Idle // No Active Modules</span>
          )}
        </div>
      </div>
    </div>
  );
}
