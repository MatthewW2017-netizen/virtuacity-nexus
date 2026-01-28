import { User, Message, Node, Stream, BotModule } from "@/types/chat";

export const MOCK_USERS: Record<string, User> = {
  "1": {
    id: "1",
    name: "Matthew",
    username: "founder",
    avatar: undefined,
    status: "online",
    isBot: false,
    roleColor: "#4B3FE2",
    globalRole: "Admin",
    cityRoles: {
      "n1": "Architect",
      "n2": "Founder"
    }
  },
  "2": {
    id: "2",
    name: "AETHERYX",
    username: "aetheryx",
    status: "online",
    isBot: true,
    roleColor: "#4B3FE2",
    badge: "AI",
    globalRole: "Dev"
  },
  "3": {
    id: "3",
    name: "Nexus Bot",
    username: "nexusbot",
    status: "online",
    isBot: true,
    roleColor: "#8E24AA",
    badge: "BOT"
  }
};

export const MOCK_MODULES: BotModule[] = [
  {
    id: "m_mod",
    type: "moderation",
    name: "Aether Guard",
    description: "AI-driven stream moderation and filter system.",
    config: {},
    icon: "Shield"
  },
  {
    id: "m_music",
    type: "music",
    name: "Sonic Weaver",
    description: "Generate and stream spatial audio sequences.",
    config: {},
    icon: "Music"
  },
  {
    id: "m_ai",
    type: "ai-assistant",
    name: "AETHERYX Core",
    description: "Direct OS intelligence interface.",
    config: {},
    icon: "Zap"
  },
  {
    id: "m_task",
    type: "task",
    name: "Nexus Flow",
    description: "Spatial task management and team synchronization.",
    config: {},
    icon: "CheckCircle2"
  },
  {
    id: "m_analytics",
    type: "analytics",
    name: "Grid Insight",
    description: "Real-time stream data and neural analytics.",
    config: {},
    icon: "BarChart"
  },
  {
    id: "m_weather",
    type: "custom",
    name: "Atmospheric Core",
    description: "Synthesized weather and environmental data.",
    config: {},
    icon: "Cloud"
  },
  {
    id: "m_terminal",
    type: "custom",
    name: "Nexus Terminal",
    description: "Low-level OS command access.",
    config: {},
    icon: "Terminal"
  }
];

export const MOCK_NODES: Node[] = [
  {
    id: "n1",
    name: "VirtuaCity Nexus",
    type: "city",
    category: "Social",
    atmosphere: "Holographic",
    status: "Stable",
    population: 12500,
    ownerId: "1",
    memberCount: 1250,
    hexColor: "#4B3FE2",
    icon: "Zap",
    x: 500,
    y: 500,
    orbitingStreams: ["s1", "s2"],
    activeModules: ["m_mod", "m_ai", "m_analytics"],
    streams: [
      { 
        id: "s1", 
        name: "Central Stream", 
        type: "living-thread", 
        nodeId: "n1", 
        topic: "The heart of the Nexus",
        lastActivityAt: new Date().toISOString(),
        modules: ["m_mod", "m_analytics"]
      },
      { 
        id: "s2", 
        name: "Bot Forge", 
        type: "bot-workspace", 
        nodeId: "n1", 
        topic: "Build with AETHERYX",
        lastActivityAt: new Date().toISOString(),
        modules: ["m_ai", "m_terminal"]
      }
    ],
    districts: [
      { id: "d1", name: "Neural Plaza", type: "neural", description: "The central intelligence hub.", nodeId: "n1", streams: ["s1"], occupancy: 85 },
      { id: "d2", name: "Logic Foundry", type: "industrial", description: "Where the grid logic is forged.", nodeId: "n1", streams: ["s2"], occupancy: 64 }
    ],
    logic: {
      nodes: [
        { 
          id: 'pn1', 
          type: 'trigger', 
          name: 'OnMessage', 
          x: 50, 
          y: 150, 
          color: 'bg-emerald-500', 
          data: 'Source: #central-stream',
          inputs: [],
          outputs: [{ id: 'out1', type: 'event' }]
        },
        { 
          id: 'pn2', 
          type: 'action', 
          name: 'Aether Synthesis', 
          x: 350, 
          y: 180, 
          color: 'bg-nexus-indigo', 
          data: 'Action: Summarize & Tag',
          inputs: [{ id: 'in1', type: 'event' }],
          outputs: [{ id: 'out2', type: 'data' }]
        }
      ],
      connections: [
        { from: 'pn1', outputId: 'out1', to: 'pn2', inputId: 'in1' }
      ]
    },
    permissions: {
      "1": "Architect",
      "2": "Founder"
    }
  },
  {
    id: "n2",
    name: "Neon Citadel",
    type: "city",
    category: "Tactical",
    atmosphere: "Cyberpunk",
    status: "Critical",
    population: 45000,
    ownerId: "1",
    memberCount: 85,
    hexColor: "#E23F8E",
    icon: "Box",
    x: 1200,
    y: 300,
    orbitingStreams: ["s3"],
    activeModules: ["m_music", "m_task"],
    streams: [
      { 
        id: "s3", 
        name: "Asset Canvas", 
        type: "media-canvas", 
        nodeId: "n2",
        topic: "Visual asset synchronization",
        lastActivityAt: new Date().toISOString(),
        modules: ["m_task"]
      }
    ],
    districts: [
      { id: "d3", name: "Upper Sector", type: "residential", description: "High-tier living modules.", nodeId: "n2", streams: ["s3"], occupancy: 92 },
      { id: "d4", name: "The Breach", type: "tactical", description: "Frontline tactical coordination.", nodeId: "n2", streams: [], occupancy: 40 }
    ],
    logic: {
      nodes: [],
      connections: []
    }
  },
  {
    id: "n3",
    name: "Aether Gardens",
    type: "city",
    category: "Creative",
    atmosphere: "Solarpunk",
    status: "Stable",
    population: 8000,
    ownerId: "2",
    memberCount: 120,
    hexColor: "#3FE2C1",
    icon: "Sparkles",
    x: 200,
    y: 200,
    activeModules: ["m_ai"],
    streams: [],
    districts: [
      { id: "d5", name: "Green Core", type: "creative", description: "Sustainable creative growth.", nodeId: "n3", streams: [], occupancy: 75 }
    ]
  },
  {
    id: "n4",
    name: "The Monolith",
    type: "city",
    category: "Industrial",
    atmosphere: "Brutalist",
    status: "Locked",
    population: 200000,
    ownerId: "3",
    memberCount: 500,
    hexColor: "#E29E3F",
    icon: "Zap",
    x: 400,
    y: 1000,
    activeModules: ["m_mod"],
    streams: [],
    districts: [
      { id: "d6", name: "Silo Alpha", type: "industrial", description: "Primary data storage.", nodeId: "n4", streams: [], occupancy: 100 }
    ]
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "s1": [
    {
      id: "msg1",
      content: "Nexus OS Initialized. Welcome to the professional dimension.",
      authorId: "2",
      streamId: "s1",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: "ai"
    },
    {
      id: "msg2",
      content: "Voice briefing for today's deployment.",
      authorId: "1",
      streamId: "s1",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: "voice-packet",
      voice: {
        id: "v1",
        duration: 45,
        waveform: [40, 60, 80, 50, 90, 30, 70, 40, 60, 80, 50, 90, 30, 70, 40, 60, 80, 50, 90, 30],
        audioUrl: "#"
      }
    },
    {
      id: "msg3",
      content: "Finalize the Nexus Core interface.",
      authorId: "2",
      streamId: "s1",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: "interactive-task",
      task: {
        id: "t1",
        title: "Integrate Aetheryx Logic",
        status: "in-progress",
        deadline: "Today at 5 PM"
      }
    },
    {
      id: "msg4",
      content: "Analyzing stream activity patterns...",
      authorId: "2",
      streamId: "s1",
      timestamp: new Date().toISOString(),
      type: "module-ui",
      moduleData: {
        moduleId: "m_analytics",
        component: "AnalyticsChart",
        props: {}
      }
    },
    {
      id: "msg5",
      content: "Current atmospheric conditions in the Grid.",
      authorId: "3",
      streamId: "s1",
      timestamp: new Date().toISOString(),
      type: "module-ui",
      moduleData: {
        moduleId: "m_weather",
        component: "WeatherCore",
        props: {}
      }
    }
  ],
  "s2": [
    {
      id: "msg_s2_1",
      content: "Forge initialized. Awaiting logic sequences.",
      authorId: "2",
      streamId: "s2",
      timestamp: new Date().toISOString(),
      type: "ai"
    },
    {
      id: "msg_s2_2",
      content: "Executing system diagnostic...",
      authorId: "2",
      streamId: "s2",
      timestamp: new Date().toISOString(),
      type: "module-ui",
      moduleData: {
        moduleId: "m_terminal",
        component: "NexusTerminal",
        props: {}
      }
    }
  ],
  "s3": [
    {
      id: "msg_s3_1",
      content: "Canvas ready for asset mapping.",
      authorId: "3",
      streamId: "s3",
      timestamp: new Date().toISOString(),
      type: "system"
    },
    {
      id: "msg_s3_2",
      content: "Spatial audio stream active.",
      authorId: "3",
      streamId: "s3",
      timestamp: new Date().toISOString(),
      type: "module-ui",
      moduleData: {
        moduleId: "m_music",
        component: "MusicVisualizer",
        props: {}
      }
    }
  ]
};
