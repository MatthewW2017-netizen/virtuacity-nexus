"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Rss, 
  History, 
  Bot, 
  Layout, 
  Gamepad2, 
  Brain, 
  Coins, 
  UserCircle 
} from "lucide-react";
import Card from "@/components/Card";

const features = [
  {
    icon: <MessageSquare size={32} />,
    title: "Nexus Chat",
    description: "Ultra-low latency communication across all worlds. Direct messages, group channels, and cross-platform voice sync.",
  },
  {
    icon: <Rss size={32} />,
    title: "Nexus Feed",
    description: "The heartbeat of the Nexus. Stay updated with what's happening in every corner of the metaverse in real-time.",
  },
  {
    icon: <History size={32} />,
    title: "Nexus Stories",
    description: "Share your journey through immersive, temporary updates that capture the most epic moments of your virtual life.",
  },
  {
    icon: <Bot size={32} />,
    title: "Nexus Bots",
    description: "Autonomous agents that work for you. From simple moderators to complex AI companions, build them all in the Forge.",
  },
  {
    icon: <Layout size={32} />,
    title: "Nexus Studio OS",
    description: "The professional creator workspace. Manage assets, teams, and projects with a cinematic operating system.",
  },
  {
    icon: <Gamepad2 size={32} />,
    title: "Nexus Gaming Hub",
    description: "Your gateway to endless entertainment. Launch games, track achievements, and find your squad instantly.",
  },
  {
    icon: <Brain size={32} />,
    title: "Nexus AI",
    description: "Powered by AETHERYX. Intelligent assistance that understands context and helps you build better worlds.",
  },
  {
    icon: <Coins size={32} />,
    title: "Nexus Economy",
    description: "A secure, transparent financial system for creators and users. Trade, earn, and grow your digital assets.",
  },
  {
    icon: <UserCircle size={32} />,
    title: "Nexus Identity",
    description: "One profile to rule them all. Your reputation, assets, and history travel with you through every world.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Nexus <span className="text-nexus-indigo">Systems</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore the modular systems that power the VirtuaCity Nexus ecosystem. Everything you need to build the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={feature.title} className="group hover:scale-[1.02] transition-all">
            <div className="flex flex-col h-full">
              <div className="mb-6 p-4 bg-nexus-indigo/10 rounded-2xl text-nexus-indigo w-fit group-hover:bg-nexus-indigo group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                {feature.description}
              </p>
              <div className="aspect-video w-full glass-card rounded-xl flex items-center justify-center text-nexus-indigo/20 font-bold border-dashed border-2 border-nexus-indigo/10">
                SCREENSHOT PREVIEW
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
