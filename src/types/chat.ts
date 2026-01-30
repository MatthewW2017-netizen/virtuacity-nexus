export type UserStatus = 'online' | 'idle' | 'dnd' | 'offline';

export type CityRole = 'Architect' | 'Founder' | 'Citizen' | 'Visitor';
export type CityCategory = 'Tactical' | 'Neural' | 'Creative' | 'Social' | 'Industrial';
export type CityAtmosphere = 'Cyberpunk' | 'Solarpunk' | 'Brutalist' | 'Holographic' | 'Minimalist';
export type CityStatus = 'Stable' | 'Critical' | 'Developing' | 'Locked';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: UserStatus;
  isBot: boolean;
  roleColor?: string;
  badge?: string;
  globalRole?: 'Admin' | 'User' | 'Dev';
  cityRoles?: Record<string, CityRole>; // cityId -> role
}

export type MessageType = 'text' | 'image' | 'video' | 'voice' | 'system' | 'ai' | 'voice-packet' | 'interactive-task' | 'module-ui';

export interface Reaction {
  emoji: string;
  count: number;
  me: boolean;
}

export interface Attachment {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
}

export interface Embed {
  title?: string;
  description?: string;
  url?: string;
  color?: string;
  image?: string;
  footer?: string;
  timestamp?: string;
}

export interface InteractiveTask {
  id: string;
  title: string;
  assigneeId?: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline?: string;
}

export interface VoicePacket {
  id: string;
  duration: number;
  waveform: number[];
  audioUrl: string;
}

export interface ModuleUI {
  moduleId: string;
  component: string;
  props: any;
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  streamId: string;
  timestamp: string;
  type: MessageType;
  edited?: boolean;
  reactions?: Reaction[];
  attachments?: Attachment[];
  embeds?: Embed[];
  replyTo?: string; // ID of the message being replied to
  mediaUrl?: string;
  threadId?: string;
  replyCount?: number;
  topicId?: string;
  task?: InteractiveTask;
  voice?: VoicePacket;
  moduleData?: ModuleUI;
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  relevance: number; // 0-1
}

export interface Panel {
  id: string;
  type: 'chat' | 'feed' | 'bot-forge' | 'studio' | 'ai' | 'profile' | 'notifications' | 'node-explorer' | 'creator' | 'asset-library' | 'creator-tools' | 'neural-graph' | 'tactical-map' | 'city-browser' | 'dev-grid' | 'trust-safety' | 'engineering-console' | 'team-dashboard';
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  isPinned?: boolean;
  zIndex: number;
  data?: any;
  tabs?: { id: string; type: Panel['type']; title: string; data?: any }[];
  activeTabId?: string;
}

export interface Stream {
  id: string;
  name: string;
  type: 'living-thread' | 'media-canvas' | 'bot-workspace' | 'timeline' | 'project-board' | 'district-stream' | 'voice' | 'announcement' | 'text';
  nodeId: string;
  topic?: string;
  lastActivityAt: string;
  modules: string[]; // IDs of active modules in this stream
  districtId?: string; // If part of a City structure
}

export interface District {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'industrial' | 'creative' | 'neural' | 'tactical';
  description?: string;
  nodeId: string;
  streams: string[]; // Stream IDs
  aiAssistantId?: string;
  occupancy?: number;
}

export interface DevGridNode {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  color: string;
  data: string;
  inputs: { id: string; type: string }[];
  outputs: { id: string; type: string }[];
}

export interface DevGridConnection {
  from: string;
  outputId: string;
  to: string;
  inputId: string;
}

export interface CityRoleConfig {
  name: string;
  color: string;
  users: number;
  perms: string[];
}

export interface CityPolicy {
  id: string;
  label: string;
  desc: string;
  icon: string;
  active: boolean;
}

export interface CityLogic {
  nodes?: DevGridNode[];
  connections?: DevGridConnection[];
  roles?: CityRoleConfig[];
  policies?: CityPolicy[];
}

export interface Node {
  id: string;
  name: string;
  type: 'personal' | 'social' | 'creative' | 'studio' | 'gaming' | 'business' | 'ai-driven' | 'city';
  category?: CityCategory;
  atmosphere?: CityAtmosphere;
  status?: CityStatus;
  population?: number;
  ownerId: string;
  streams: Stream[];
  activeModules: string[];
  memberCount: number;
  theme?: string;
  layout?: any;
  districts?: District[]; // Added for City System
  icon?: string;
  hexColor?: string; // For the glowing hexagonal structures
  orbitingStreams?: string[]; // IDs of streams that orbit the node on the grid
  x: number; // Spatial coordinate
  y: number; // Spatial coordinate
  isPulsing?: boolean; // For spatial intelligence activity
  logic?: CityLogic; // Added for SECTION 3: Isolated Dev Grid
  permissions?: Record<string, CityRole>; // Added for SECTION 3: Dev Access
}

export interface DevModule {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'ui-element' | 'data-source';
  name: string;
  inputs: string[];
  outputs: string[];
  logic: string; // Visual scripting logic
}

export interface Space {
  id: 'personal' | 'social' | 'studio' | 'creator' | 'gaming' | 'ai' | 'city-browser' | 'dev-grid' | 'governance' | 'engineering';
  name: string;
  panels: Panel[];
  background?: string;
}

export interface BotModule {
  id: string;
  type: 'moderation' | 'music' | 'ai-assistant' | 'role-manager' | 'sfx' | 'studio' | 'task' | 'analytics' | 'custom';
  name: string;
  description: string;
  config: any;
  icon: string;
}

export interface NexusAppState {
  currentUser: User | null;
  activeSpaceId: Space['id'];
  spaces: Record<Space['id'], Space>;
  activeNodeId: string | null;
  nodes: Node[];
  messages: Record<string, Message[]>;
  users: Record<string, User>;
  modules: BotModule[];
}
