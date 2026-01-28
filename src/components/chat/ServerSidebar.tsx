"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Compass, Download, Settings } from "lucide-react";
import { MOCK_NODES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Node } from "@/types/chat";

interface ServerSidebarProps {
  activeServerId: string | null;
  onServerSelect: (serverId: string | null) => void;
}

export const ServerSidebar = ({ activeServerId, onServerSelect }: ServerSidebarProps) => {
  return (
    <div className="w-[72px] h-full bg-nexus-dark flex flex-col items-center py-3 space-y-2 border-r border-nexus-border">
      {/* Home / DMs Button */}
      <ServerIcon
        id={null}
        name="Home"
        active={activeServerId === null}
        onClick={() => onServerSelect(null)}
        icon={<div className="w-6 h-6 bg-nexus-indigo rounded-full flex items-center justify-center text-white font-bold text-xs">VN</div>}
      />

      <div className="w-8 h-[2px] bg-nexus-border rounded-full mx-auto my-1" />

      {/* Server List */}
      <div className="flex-1 w-full space-y-2 overflow-y-auto no-scrollbar flex flex-col items-center">
        {MOCK_NODES.map((node: Node) => (
          <ServerIcon
            key={node.id}
            id={node.id}
            name={node.name}
            active={activeServerId === node.id}
            onClick={() => onServerSelect(node.id)}
            image={node.icon}
          />
        ))}

        {/* Action Buttons */}
        <ActionButton icon={<Plus size={24} />} label="Add a City" />
        <ActionButton icon={<Compass size={24} />} label="Explore Discoverable Cities" />
      </div>

      {/* Bottom Actions */}
      <div className="pt-2 space-y-2 border-t border-nexus-border w-full flex flex-col items-center">
        <ActionButton icon={<Download size={20} />} label="Download Apps" />
        <ActionButton icon={<Settings size={20} />} label="User Settings" />
      </div>
    </div>
  );
};

interface ServerIconProps {
  id: string | null;
  name: string;
  active: boolean;
  onClick: () => void;
  image?: string;
  icon?: React.ReactNode;
}

const ServerIcon = ({ id, name, active, onClick, image, icon }: ServerIconProps) => {
  return (
    <div className="relative group flex items-center justify-center w-full">
      {/* Active Indicator */}
      <motion.div
        initial={false}
        animate={{
          height: active ? 40 : (active ? 20 : 0),
          scale: active ? 1 : 0,
        }}
        className={cn(
          "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200",
          !active && "group-hover:h-5 group-hover:scale-100"
        )}
      />

      <button
        onClick={onClick}
        className={cn(
          "relative w-12 h-12 flex items-center justify-center transition-all duration-200 overflow-hidden",
          active ? "rounded-[16px] bg-nexus-indigo text-white" : "rounded-[24px] bg-nexus-card text-gray-400 hover:rounded-[16px] hover:bg-nexus-indigo hover:text-white"
        )}
      >
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : icon ? (
          icon
        ) : (
          <span className="text-lg font-semibold">{name.charAt(0).toUpperCase()}</span>
        )}
      </button>

      {/* Tooltip */}
      <div className="absolute left-16 px-3 py-1 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl border border-nexus-border">
        {name}
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  return (
    <div className="relative group flex items-center justify-center w-full">
      <button className="w-12 h-12 flex items-center justify-center rounded-[24px] bg-nexus-card text-emerald-500 transition-all duration-200 hover:rounded-[16px] hover:bg-emerald-500 hover:text-white">
        {icon}
      </button>
      <div className="absolute left-16 px-3 py-1 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl border border-nexus-border">
        {label}
      </div>
    </div>
  );
};
